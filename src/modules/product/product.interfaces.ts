import { Document, Model } from "mongoose";
import { QueryResult } from "../paginate/paginate";

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductModel extends Model<IProduct> {
  paginate(
    filter: Record<string, any>,
    options: Record<string, any>
  ): Promise<QueryResult>;
}

export type UpdateProductBody = Partial<IProduct>;

// export type NewRegisteredProduct = Omit<IProduct, "updatedAt" | "slug">;
export type NewRegisteredProduct = IProduct;

// export type NewCreatedProduct = Omit<IProduct, "updatedAt">;
export type NewCreatedProduct = IProduct;
