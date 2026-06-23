import { NextResponse } from 'next/server';
import { sendNotificationEmail, QuoteMailData } from '../../../lib/mail';

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    
    const record = {
      id: crypto.randomUUID(),
      ...payload,
      createdAt: new Date().toISOString(),
    };
    
    // Send email notification directly
    const emailSent = await sendNotificationEmail('New Quotation Request', payload as QuoteMailData);
    
    if (!emailSent) {
      console.warn("Email sending returned false, but we still accept the request");
    }
    
    return NextResponse.json(record, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process quote request' }, { status: 500 });
  }
}
