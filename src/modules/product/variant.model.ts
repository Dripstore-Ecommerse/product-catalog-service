import mongoose, { Schema } from "mongoose";
import toJSON from "../toJSON/toJSON";
import paginate from "../paginate/paginate";
import { IProductVariant, ProductModel } from "./global.interfaces";

const productVariantSchema: Schema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
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
  },
  { timestamps: true }
);
productVariantSchema.plugin(toJSON);
productVariantSchema.plugin(paginate);

const ProductVariant = mongoose.model<IProductVariant, ProductModel>(
  "ProductVariant",
  productVariantSchema
);

export default ProductVariant;
