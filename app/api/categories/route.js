import { mongooseConnect } from "@/app/db/connect";
import Category from "@/app/models/Category";
import { NextResponse } from "next/server";

// creating a new category
export async function POST(req) {
    await mongooseConnect();
    let categoryDoc;

    const { categoryName: name, parentCategory, properties } = await req.json();
    categoryDoc = await Category.create({ name, parent: parentCategory || undefined, properties });

    return NextResponse.json(categoryDoc)
}

// getting all the categories
export async function GET(req) {
    await mongooseConnect();

    const categories = await Category.find().populate('parent');
    return NextResponse.json(categories)
}

// updating a category
export async function PUT(req) {
    await mongooseConnect();

    const { categoryName: name, parentCategory, properties, _id } = await req.json();
    const updatedCategory = await Category.findByIdAndUpdate(_id, { name, parent: parentCategory || undefined, properties }, { new: true });

    return NextResponse.json(updatedCategory)
}

// deleting the category
export async function DELETE({ nextUrl }) {
    await mongooseConnect();
    const {searchParams} = nextUrl
    
    const id = searchParams.get('id')
    await Category.findByIdAndDelete(id)
    return NextResponse.json('Category deleted')
}