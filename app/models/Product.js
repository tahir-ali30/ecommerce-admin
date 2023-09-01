import mongoose, { models } from "mongoose";

const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    price: {
        type: Number,
        required: true
    },
    image: [{ type: String }],
    category: { type: mongoose.Types.ObjectId, ref: 'Category' },
    properties: {type:Object},
});

export default models.Product || mongoose.model('Product',ProductSchema)