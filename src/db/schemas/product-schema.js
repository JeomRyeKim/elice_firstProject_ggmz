import { Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    productId: {
      type: String,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["furniture", "fabric", "electronics", "cooking", "lightings"],
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
  },
  {
    collection: "products",
    timestamps: true,
  }
);

export { ProductSchema };
