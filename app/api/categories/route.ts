import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Category } from '@/models/Category';

export async function GET() {
  try {
    await connectDB();
    const categories = await Category.find({}, { name: 1, id_projects_list: 1 })
      .sort({ name: 1 })
      .lean();

    return NextResponse.json({ items: categories });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
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

    const existing = await Category.findOne({ name: { $regex: `^${name}$`, $options: 'i' } }).lean();
    if (existing) {
      return NextResponse.json({ error: 'Category already exists' }, { status: 409 });
    }

    const created = await Category.create({ name, id_projects_list: [] });
    return NextResponse.json({ item: created }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}
