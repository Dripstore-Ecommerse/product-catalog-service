import mongoose, { Schema } from "mongoose";
import toJSON from "../toJSON/toJSON";
import paginate from "../paginate/paginate";
import { IProduct, ProductModel } from "./global.interfaces";

const productSchema: Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      regular: {
        type: Number,
        required: true,
      },
      sale: {
        type: Number,
      },
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        alt_text: {
          type: String,
          required: true,
        },
      },
    ],
    options: [
      {
        name: {
          type: String,
          required: true,
        },
        values: {
          type: [String],
          required: true,
        },
      },
    ],
    variations: [
      {
        type: mongoose.Types.ObjectId,
        ref: "ProductVariation",
      },
    ],
  },
  { timestamps: true }
);
productSchema.plugin(toJSON);
productSchema.plugin(paginate);

const Product = mongoose.model<IProduct, ProductModel>(
  "Product",
  productSchema
);

export default Product;
