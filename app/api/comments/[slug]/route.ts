import { NextRequest, NextResponse } from 'next/server';
import {
  getComments,
  createComment,
  checkRateLimit,
  hashIP,
  detectSpam,
  hasExcessiveLinks,
} from '@/lib/supabase';

// GET /api/comments/[slug] - Fetch all comments for a trek
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    if (!slug) {
      return NextResponse.json(
        { error: 'Trek slug is required' },
        { status: 400 }
      );
    }

    const comments = await getComments(slug);

    return NextResponse.json(
      { comments, count: comments.length },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
        },
      }
    );
  } catch (error: any) {
    console.error('Error fetching comments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch comments', details: error.message },
      { status: 500 }
    );
  }
}

// POST /api/comments/[slug] - Submit a new comment
export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    if (!slug) {
      return NextResponse.json(
        { error: 'Trek slug is required' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { name, email, comment, honeypot, recaptchaToken } = body;

    // Spam prevention 1: Honeypot field should be empty
    if (honeypot && honeypot.trim() !== '') {
      console.log('Honeypot triggered - potential spam');
      return NextResponse.json(
        { error: 'Invalid submission' },
        { status: 400 }
      );
    }

    // Validate required fields: name, email, and comment
    if (!name || name.trim().length === 0) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    if (!email || email.trim().length === 0) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    if (!comment || comment.trim().length === 0) {
      return NextResponse.json(
        { error: 'Comment is required' },
        { status: 400 }
      );
    }

    // Validate name length
    if (name.trim().length > 50) {
      return NextResponse.json(
        { error: 'Name must be less than 50 characters' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate comment length
    if (comment.trim().length < 10) {
      return NextResponse.json(
        { error: 'Comment must be at least 10 characters' },
        { status: 400 }
      );
    }

    if (comment.trim().length > 500) {
      return NextResponse.json(
        { error: 'Comment must be less than 500 characters' },
        { status: 400 }
      );
    }

    // Spam prevention 2: Verify reCAPTCHA token
    if (process.env.RECAPTCHA_SECRET_KEY && recaptchaToken) {
      const recaptchaResponse = await fetch(
        'https://www.google.com/recaptcha/api/siteverify',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
        }
      );

      const recaptchaData = await recaptchaResponse.json();

      if (!recaptchaData.success || recaptchaData.score < 0.5) {
        console.log('reCAPTCHA verification failed:', recaptchaData);
        return NextResponse.json(
          { error: 'reCAPTCHA verification failed. Please try again.' },
          { status: 400 }
        );
      }
    }

    // Spam prevention 3: Content-based spam detection
    if (detectSpam(comment)) {
      console.log('Spam pattern detected in comment');
      return NextResponse.json(
        { error: 'Comment contains prohibited content. Please review and try again.' },
        { status: 400 }
      );
    }

    // Spam prevention 4: Check for excessive links
    if (hasExcessiveLinks(comment)) {
      return NextResponse.json(
        { error: 'Too many links in comment. Maximum 2 links allowed.' },
        { status: 400 }
      );
    }

    // Get client IP for rate limiting
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';
    const ipHash = hashIP(ip);

    // Spam prevention 5: Rate limiting
    const canSubmit = await checkRateLimit(ipHash);
    if (!canSubmit) {
      return NextResponse.json(
        {
          error:
            'You can only submit one comment every 30 minutes. Please try again later.',
        },
        { status: 429 }
      );
    }

    // Create comment in Supabase
    const result = await createComment(
      slug,
      name.trim(),
      email.trim(),
      comment.trim(),
      ipHash
    );

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to submit comment' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message:
          'Thank you for your feedback! Your comment has been posted successfully.',
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error submitting comment:', error);
    return NextResponse.json(
      { error: 'Failed to submit comment. Please try again.' },
      { status: 500 }
    );
  }
}
