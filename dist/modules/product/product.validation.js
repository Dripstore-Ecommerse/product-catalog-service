import Joi from "joi";
import { objectId } from "../validate/custom.validation";
const createProductBody = {
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string().required(),
};
export const createProduct = {
    body: Joi.object().keys(createProductBody),
};
export const getProducts = {
    query: Joi.object().keys({
        name: Joi.string(),
        role: Joi.string(),
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
//# sourceMappingURL=product.validation.js.map