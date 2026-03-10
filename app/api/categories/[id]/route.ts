import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Category } from '@/models/Category';
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
      return NextResponse.json({ error: 'Invalid category id' }, { status: 400 });
    }

    const category = await Category.findById(id);
    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    const body = await request.json();
    const newName = typeof body?.name === 'string' ? body.name.trim() : '';
    if (!newName) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const duplicate = await Category.findOne({
      _id: { $ne: category._id },
      name: { $regex: `^${newName}$`, $options: 'i' },
    }).lean();

    if (duplicate) {
      return NextResponse.json({ error: 'Category already exists' }, { status: 409 });
    }

    const oldName = String(category.name || '');
    if (oldName && oldName !== newName) {
      const projects = await Project.find()
        .or([{ category: oldName }, { category: { $in: [oldName] } }]);

      for (const project of projects) {
        const nextCategories = [...new Set(toArray(project.category).map((name) => (name === oldName ? newName : name)))];
        project.category = nextCategories;
        await project.save();
      }
    }

    category.name = newName;
    await category.save();

    return NextResponse.json({ item: category });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update category' }, { status: 500 });
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
      return NextResponse.json({ error: 'Invalid category id' }, { status: 400 });
    }

    const category = await Category.findById(id);
    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    const categoryName = String(category.name || '');
    if (categoryName) {
      const projects = await Project.find()
        .or([{ category: categoryName }, { category: { $in: [categoryName] } }]);

      for (const project of projects) {
        const nextCategories = toArray(project.category).filter((name) => name !== categoryName);
        project.category = nextCategories;
        await project.save();
      }
    }

    await Category.deleteOne().where('_id').equals(category._id);
    return NextResponse.json({ message: 'Category deleted' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
  }
}
