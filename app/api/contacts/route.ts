import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // TODO: Fetch contacts from database
    return NextResponse.json({ message: 'Get contacts' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 });
  }
}

import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // configure transporter using environment variables (set these in .env)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // send email to developer inbox
    await transporter.sendMail({
      from: data.email || process.env.SMTP_USER,
      to: 'hson.dev.118@gmail.com',
      subject: `New contact form message: ${data.subject || 'No subject'}`,
      text: `Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Subject: ${data.subject}
Message:
${data.message}`,
    });

    return NextResponse.json({ message: 'Email sent' }, { status: 201 });
  } catch (error) {
    console.error('Error sending email', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
