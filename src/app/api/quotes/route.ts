import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { sendNotificationEmail, QuoteMailData } from '../../../lib/mail';

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const dataPath = path.join(process.cwd(), 'data', 'quotes.jsonl');
    
    await fs.mkdir(path.dirname(dataPath), { recursive: true });
    
    const record = {
      id: crypto.randomUUID(),
      ...payload,
      createdAt: new Date().toISOString(),
    };
    
    await fs.appendFile(dataPath, JSON.stringify(record) + '\n', 'utf-8');
    
    // Send email notification without blocking the response
    sendNotificationEmail('New Quotation Request', payload as QuoteMailData).catch(console.error);
    
    return NextResponse.json(record, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save quote' }, { status: 500 });
  }
}
