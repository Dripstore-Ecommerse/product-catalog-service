import mongoose, { Document, Model, Schema } from "mongoose";
import { QueryResult } from "../paginate/paginate";

export interface ProductOption {
  name: string;
  values: string[];
}

export interface ProductPrice {
  regular: number;
  sale?: number;
}

export interface ProductImage {
  url: string;
  alt_text: string;
}

interface ProductVariation {
  id: mongoose.Types.ObjectId;
}

export interface IProduct extends Document {
  id: number;
  name: string;
  description: string;
  category: string;
  price: ProductPrice;
  images: ProductImage[];
  options?: ProductOption[];
  variations?: ProductVariation[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IProductVariant extends IProduct {
  productId: object;
}

export interface IInventory extends Document {
  quantity: number;
  productId: Schema.Types.ObjectId;
  variantId: Schema.Types.ObjectId;
}

export interface ProductModel extends Model<IProduct> {
  paginate(
    filter: Record<string, any>,
    options: Record<string, any>
  ): Promise<QueryResult>;
}

export interface ProductVariantModel extends Model<IProductVariant> {
  paginate(
    filter: Record<string, any>,
    options: Record<string, any>
  ): Promise<QueryResult>;
}

export interface InventoryModel extends Model<IInventory> {
  paginate(
    filter: Record<string, any>,
    options: Record<string, any>
  ): Promise<QueryResult>;
}

export type UpdateProductBody = Partial<IProduct>;

export type NewRegisteredProduct = IProduct;

export type NewCreatedProduct = IProduct;
