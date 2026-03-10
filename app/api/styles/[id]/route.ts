import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Style } from '@/models/Style';
import { Project } from '@/models/Project';
import mongoose from 'mongoose';

function toArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((item) => String(item || '')).filter(Boolean);
  }
  if (typeof value === 'string' && value.trim()) {
    return [value.trim()];
  }
  return [];
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid style id' }, { status: 400 });
    }

    const style = await Style.findById(id);
    if (!style) {
      return NextResponse.json({ error: 'Style not found' }, { status: 404 });
    }

    const body = await request.json();
    const newName = typeof body?.name === 'string' ? body.name.trim() : '';
    if (!newName) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const duplicate = await Style.findOne({
      _id: { $ne: style._id },
      name: { $regex: `^${newName}$`, $options: 'i' },
    }).lean();

    if (duplicate) {
      return NextResponse.json({ error: 'Style already exists' }, { status: 409 });
    }

    const oldName = String(style.name || '');
    if (oldName && oldName !== newName) {
      const projects = await Project.find()
        .or([{ style: oldName }, { style: { $in: [oldName] } }]);

      for (const project of projects) {
        const nextStyles = [...new Set(toArray(project.style).map((name) => (name === oldName ? newName : name)))];
        project.style = nextStyles;
        await project.save();
      }
    }

    style.name = newName;
    await style.save();

    return NextResponse.json({ item: style });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update style' }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid style id' }, { status: 400 });
    }

    const style = await Style.findById(id);
    if (!style) {
      return NextResponse.json({ error: 'Style not found' }, { status: 404 });
    }

    const styleName = String(style.name || '');
    if (styleName) {
      const projects = await Project.find()
        .or([{ style: styleName }, { style: { $in: [styleName] } }]);

      for (const project of projects) {
        const nextStyles = toArray(project.style).filter((name) => name !== styleName);
        project.style = nextStyles;
        await project.save();
      }
    }

    await Style.deleteOne().where('_id').equals(style._id);
    return NextResponse.json({ message: 'Style deleted' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to delete style' }, { status: 500 });
  }
}
