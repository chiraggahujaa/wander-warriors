import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  // Initialize Resend only when API is called (lazy initialization)
  const resend = new Resend(process.env.RESEND_API_KEY || '');
  try {
    // Parse the request body
    const body = await request.json();
    const { name, email, phone, trekInterest, numberOfPeople, preferredDates, message } = body;

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Email service is not configured. Please contact us directly via WhatsApp.' },
        { status: 500 }
      );
    }

    // Check if recipient email is configured
    if (!process.env.CONTACT_EMAIL) {
      console.error('CONTACT_EMAIL is not configured');
      return NextResponse.json(
        { error: 'Recipient email is not configured. Please contact us directly via WhatsApp.' },
        { status: 500 }
      );
    }

    // Prepare email content
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1E3A8A; border-bottom: 3px solid #F97316; padding-bottom: 10px;">
          New Trek Inquiry from Wander Warriors Website
        </h2>

        <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">Contact Information</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          ${phone ? `<p><strong>Phone/WhatsApp:</strong> ${phone}</p>` : ''}
        </div>

        <div style="background-color: #fff7ed; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #F97316;">
          <h3 style="color: #374151; margin-top: 0;">Trek Details</h3>
          ${trekInterest ? `<p><strong>Trek Interest:</strong> ${trekInterest}</p>` : ''}
          ${numberOfPeople ? `<p><strong>Number of People:</strong> ${numberOfPeople}</p>` : ''}
          ${preferredDates ? `<p><strong>Preferred Dates:</strong> ${preferredDates}</p>` : ''}
        </div>

        ${message ? `
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Message</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
        ` : ''}

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
          <p>This inquiry was submitted through the Wander Warriors contact form.</p>
          <p>Please respond within 24 hours via WhatsApp or email.</p>
        </div>
      </div>
    `;

    const emailText = `
New Trek Inquiry from Wander Warriors Website

CONTACT INFORMATION:
Name: ${name}
Email: ${email}
${phone ? `Phone/WhatsApp: ${phone}` : ''}

TREK DETAILS:
${trekInterest ? `Trek Interest: ${trekInterest}` : 'Not specified'}
${numberOfPeople ? `Number of People: ${numberOfPeople}` : 'Not specified'}
${preferredDates ? `Preferred Dates: ${preferredDates}` : 'Not specified'}

${message ? `MESSAGE:\n${message}` : 'No message provided'}

---
This inquiry was submitted through the Wander Warriors contact form.
Please respond within 24 hours via WhatsApp or email.
    `;

    // Send email using Resend
    const data = await resend.emails.send({
      from: 'Wander Warriors <onboarding@resend.dev>', // This will be updated once domain is verified
      to: [process.env.CONTACT_EMAIL],
      replyTo: email,
      subject: `New Trek Inquiry from ${name}${trekInterest ? ` - ${trekInterest}` : ''}`,
      html: emailHtml,
      text: emailText,
    });

    // Log success (for debugging)
    console.log('Email sent successfully:', data);

    return NextResponse.json(
      {
        success: true,
        message: 'Your inquiry has been sent successfully! We will contact you within 24 hours.',
      },
      { status: 200 }
    );

  } catch (error: any) {
    // Log the error for debugging
    console.error('Error sending email:', error);

    // Check for specific Resend errors
    if (error?.message?.includes('API key')) {
      return NextResponse.json(
        { error: 'Email service configuration error. Please contact us directly via WhatsApp at +977 9864261982.' },
        { status: 500 }
      );
    }

    if (error?.message?.includes('rate limit')) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again in a few minutes or contact us via WhatsApp.' },
        { status: 429 }
      );
    }

    // Generic error response
    return NextResponse.json(
      {
        error: 'Failed to send your inquiry. Please contact us directly via WhatsApp at +977 9864261982 or email sherpaangdawa092@gmail.com.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Please use POST to submit contact form.' },
    { status: 405 }
  );
}
