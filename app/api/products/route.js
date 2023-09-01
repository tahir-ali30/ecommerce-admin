import { mongooseConnect } from "@/app/db/connect";
import Product from "@/app/models/Product";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

// creating a product
export async function POST(req) {
    await mongooseConnect();

    const data = await req.json()
    // console.log(data);
    const product = await Product.create(data)

    return NextResponse.json('product')
}

// getting all the prodcuts
export async function GET(req) {
    await mongooseConnect();

    const products = await Product.find()
    return NextResponse.json({products})
}

// updating product info
export async function PUT(req) {
    await mongooseConnect();

    const data = await req.json()
    // console.log(data);
    const product = await Product.findOneAndUpdate(new mongoose.Types.ObjectId(data._id), data, { new: true });

    return NextResponse.json('product')
}