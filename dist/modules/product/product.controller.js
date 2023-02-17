import httpStatus from "http-status";
import mongoose from "mongoose";
import catchAsync from "../utils/catchAsync";
import ApiError from "../errors/ApiError";
import pick from "../utils/pick";
import * as productService from "./product.service";
export const createProduct = catchAsync(async (req, res) => {
    const product = await productService.createProduct(req.body);
    res.status(httpStatus.CREATED).send(product);
});
export const getProducts = catchAsync(async (req, res) => {
    const filter = pick(req.query, ["name", "role"]);
    const options = pick(req.query, [
        "sortBy",
        "limit",
        "page",
        "projectBy",
    ]);
    const result = await productService.queryProducts(filter, options);
    res.send(result);
});
export const getProduct = catchAsync(async (req, res) => {
    if (typeof req.params["productId"] === "string") {
        const product = await productService.getProductById(new mongoose.Types.ObjectId(req.params["productId"]));
        if (!product) {
            throw new ApiError(httpStatus.NOT_FOUND, "Product not found");
        }
        res.send(product);
    }
});
export const updateProduct = catchAsync(async (req, res) => {
    if (typeof req.params["productId"] === "string") {
        const product = await productService.updateProductById(new mongoose.Types.ObjectId(req.params["productId"]), req.body);
        res.send(product);
    }
});
export const deleteProduct = catchAsync(async (req, res) => {
    if (typeof req.params["productId"] === "string") {
        await productService.deleteProductById(new mongoose.Types.ObjectId(req.params["productId"]));
        res.status(httpStatus.NO_CONTENT).send();
    }
});
//# sourceMappingURL=product.controller.js.map