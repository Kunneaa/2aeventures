import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const dataPath = path.join(process.cwd(), 'data', 'contacts.jsonl');
    
    await fs.mkdir(path.dirname(dataPath), { recursive: true });
    
    const record = {
      id: crypto.randomUUID(),
      ...payload,
      createdAt: new Date().toISOString(),
    };
    
    await fs.appendFile(dataPath, JSON.stringify(record) + '\n', 'utf-8');
    
    return NextResponse.json(record, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save contact' }, { status: 500 });
  }
}
