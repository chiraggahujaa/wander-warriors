import { NextRequest, NextResponse } from 'next/server';
import { getApprovedComments, createComment, checkRateLimit, hashIP } from '@/lib/airtable';

// GET /api/comments/[slug] - Fetch approved comments for a trek
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

    const comments = await getApprovedComments(slug);

    return NextResponse.json(
      { comments, count: comments.length },
      { status: 200 }
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
    const { name, email, comment, honeypot } = body;

    // Spam prevention: Honeypot field should be empty
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

    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') ||
                request.headers.get('x-real-ip') ||
                'unknown';
    const ipHash = hashIP(ip);

    // Check rate limit
    const canSubmit = await checkRateLimit(ipHash);
    if (!canSubmit) {
      return NextResponse.json(
        { error: 'You can only submit one comment every 30 minutes. Please try again later.' },
        { status: 429 }
      );
    }

    // Create comment in Airtable
    const result = await createComment(
      slug,
      name.trim(),
      comment.trim(),
      email.trim(),
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
        message: 'Thank you for your feedback! Your comment will be visible once approved by our team.',
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
