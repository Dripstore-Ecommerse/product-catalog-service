import httpStatus from "http-status";
import Product from "./product.model";
import ApiError from "../errors/ApiError";
/**
 * Create a product
 * @param {NewCreatedProduct} productBody
 * @returns {Promise<IProduct>}
 */
export const createProduct = async (productBody) => {
    return Product.create(productBody);
};
/**
 * Register a product
 * @param {NewRegisteredProduct} productBody
 * @returns {Promise<IProduct>}
 */
export const registerProduct = async (productBody) => {
    return Product.create(productBody);
};
/**
 * Query for products
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
export const queryProducts = async (filter, options) => {
    const products = await Product.paginate(filter, options);
    return products;
};
/**
 * Get product by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<IProduct | null>}
 */
export const getProductById = async (id) => Product.findById(id);
/**
 * Get product by email
 * @param {string} email
 * @returns {Promise<IProduct | null>}
 */
export const getProductByEmail = async (email) => Product.findOne({ email });
/**
 * Update product by id
 * @param {mongoose.Types.ObjectId} productId
 * @param {UpdateProductBody} updateBody
 * @returns {Promise<IProduct | null>}
 */
export const updateProductById = async (productId, updateBody) => {
    const product = await getProductById(productId);
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
export const deleteProductById = async (productId) => {
    const product = await getProductById(productId);
    if (!product) {
        throw new ApiError(httpStatus.NOT_FOUND, "Product not found");
    }
    await product.remove();
    return product;
};
//# sourceMappingURL=product.service.js.map