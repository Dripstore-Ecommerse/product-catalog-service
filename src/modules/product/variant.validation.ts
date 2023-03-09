import Joi from "joi";
import { objectId } from "../validate/custom.validation";
/*
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: [String], required: true },
    slug: { type: String, required: true },
    attributes: { type: Object, required: true },
    image: { type: [String], required: true },  
*/
const createVariantBody = {
  name: Joi.string().required(),
  productId: Joi.string().custom(objectId),
  description: Joi.string().required(),
  price: Joi.number().required(),
  category: Joi.array().required(),
  slug: Joi.string().required(),
  attributes: Joi.object().required(),
  image: Joi.array().required(),
};

export const createProduct = {
  body: Joi.object().keys(createVariantBody),
};

export const getProducts = {
  query: Joi.object().keys({
    name: Joi.string(), // not clear
    price: Joi.string(), // not clear
    sortBy: Joi.string(),
    projectBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

export const getProduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
};

export const updateProduct = {};

export const deleteProduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
};
