import mongoose, { Schema } from "mongoose";
import { Product } from "../../utils/types";

// product model schema
const ProductSchema = new Schema<Product>(
  {
    productName: {
      type: String,
      required: true,
    },
    productDescription: {
      type: String,
      required: true,
    },
    productImg1: {
      type: String,
      required: true,
    },
    productImg2: {
      type: String,
      required: true,
    },
    productPrice: {
      type: Number,
      required: true,
    },
    categories: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// create the model
const ProductModel =
  mongoose.models.products || mongoose.model("products", ProductSchema);

export default ProductModel;
