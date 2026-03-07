import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Style } from '@/models/Style';

export async function GET() {
  try {
    await connectDB();
    const styles = await Style.find({}, { name: 1, id_projects_list: 1 }).sort({ name: 1 }).lean();
    return NextResponse.json({ items: styles });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch styles' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const name = typeof body?.name === 'string' ? body.name.trim() : '';

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const existing = await Style.findOne({ name: { $regex: `^${name}$`, $options: 'i' } }).lean();
    if (existing) {
      return NextResponse.json({ error: 'Style already exists' }, { status: 409 });
    }

    const created = await Style.create({ name, id_projects_list: [] });
    return NextResponse.json({ item: created }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create style' }, { status: 500 });
  }
}
