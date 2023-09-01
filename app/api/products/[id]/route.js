import { mongooseConnect } from "@/app/db/connect";
import Product from "@/app/models/Product";
import { NextResponse } from "next/server";

// getting a single product info
export async function GET(req, {params}) {
    await mongooseConnect()

    const product = await Product.findById(params.id)
    return NextResponse.json({product})
}

export async function DELETE(req, { params }) {
    await mongooseConnect();
    
    await Product.findByIdAndDelete(params.id)
    return NextResponse.json({msg:'product deleted'})
}