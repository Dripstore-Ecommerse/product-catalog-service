import httpStatus from "http-status";
import mongoose from "mongoose";
import ProductVariant from "./variant.model";
import { ApiError } from "@dripstore/common/build";
import { IOptions, QueryResult } from "../paginate/paginate";
import {
  NewCreatedProduct,
  UpdateProductBody,
  IProduct,
  NewRegisteredProduct,
} from "./global.interfaces";

/**
 * Create a product
 * @param {NewCreatedProduct} productBody
 * @returns {Promise<IProduct>}
 */
export const createProductVariant = async (
  productBody: NewCreatedProduct
): Promise<IProduct> => {
  return ProductVariant.create(productBody);
};

/**
 * Register a product
 * @param {NewRegisteredProduct} productBody
 * @returns {Promise<IProduct>}
 */
export const registerProductVariant = async (
  productBody: NewRegisteredProduct
): Promise<IProduct> => {
  return ProductVariant.create(productBody);
};

/**
 * Query for products
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
export const queryVariantProducts = async (
  filter: Record<string, any>,
  options: IOptions
): Promise<QueryResult> => {
  const products = await ProductVariant.paginate(filter, options);
  return products;
};

/**
 * Get product by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<IProduct | null>}
 */
export const getVariantProductById = async (
  id: mongoose.Types.ObjectId
): Promise<IProduct | null> => ProductVariant.findById(id);

/**
 * Update product by id
 * @param {mongoose.Types.ObjectId} productId
 * @param {UpdateProductBody} updateBody
 * @returns {Promise<IProduct | null>}
 */
export const updateVariantProductById = async (
  productId: mongoose.Types.ObjectId,
  updateBody: UpdateProductBody
): Promise<IProduct | null> => {
  const product = await getVariantProductById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product not found");
  }

  Object.assign(product, updateBody);
  await product.save();
  return product;
};

/**
 * Delete product by id
 * @param {mongoose.Types.ObjectId} productId
 * @returns {Promise<IProduct | null>}
 */
export const deleteVariantProductById = async (
  productId: mongoose.Types.ObjectId
): Promise<IProduct | null> => {
  const product = await getVariantProductById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product not found");
  }
  await product.remove();
  return product;
};
