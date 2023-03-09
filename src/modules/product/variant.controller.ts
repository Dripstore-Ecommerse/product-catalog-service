import httpStatus from "http-status";
import { Request, Response } from "express";
import mongoose from "mongoose";
import catchAsync from "../utils/catchAsync";
import { ApiError } from "@dripstore/common/build";
import pick from "../utils/pick";
import { IOptions } from "../paginate/paginate";
import * as productService from "./variant.service";

export const createVariantProduct = catchAsync(
  async (req: Request, res: Response) => {
    const product = await productService.createProductVariant(req.body);
    res.status(httpStatus.CREATED).send(product);
  }
);

export const getVariantProducts = catchAsync(
  async (req: Request, res: Response) => {
    const filter = pick(req.query, ["name", "price"]);
    const options: IOptions = pick(req.query, [
      "sortBy",
      "limit",
      "page",
      "projectBy",
    ]);
    const result = await productService.queryVariantProducts(filter, options);
    res.send(result);
  }
);

export const getVariantProduct = catchAsync(
  async (req: Request, res: Response) => {
    if (typeof req.params["productId"] === "string") {
      const product = await productService.getVariantProductById(
        new mongoose.Types.ObjectId(req.params["productId"])
      );
      if (!product) {
        throw new ApiError(httpStatus.NOT_FOUND, "VariantProduct not found");
      }
      res.send(product);
    }
  }
);

export const updateVariantProduct = catchAsync(
  async (req: Request, res: Response) => {
    if (typeof req.params["productId"] === "string") {
      const product = await productService.updateVariantProductById(
        new mongoose.Types.ObjectId(req.params["productId"]),
        req.body
      );
      res.send(product);
    }
  }
);

export const deleteVariantProduct = catchAsync(
  async (req: Request, res: Response) => {
    if (typeof req.params["productId"] === "string") {
      await productService.deleteVariantProductById(
        new mongoose.Types.ObjectId(req.params["productId"])
      );
      res.status(httpStatus.NO_CONTENT).send();
    }
  }
);
