import mongoose from "mongoose";
import toJSON from "../toJSON/toJSON";
import paginate from "../paginate/paginate";
import { IInventory, InventoryModel } from "./global.interfaces";

const InventorySchema = new mongoose.Schema<IInventory>(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    variantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductVariant",
      default: null,
    },
    quantity: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

InventorySchema.plugin(toJSON);
InventorySchema.plugin(paginate);

const Inventory = mongoose.model<IInventory, InventoryModel>(
  "Inventory",
  InventorySchema
);

export default Inventory;
