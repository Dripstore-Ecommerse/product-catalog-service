import express, { Router } from "express";
import { validate } from "../../modules/validate";
import { productController, productValidation } from "../../modules/product";

const router: Router = express.Router();

router
  .route("/")
  .post(
    validate(productValidation.createProduct),
    productController.createProduct
  )
  .get(validate(productValidation.getProducts), productController.getProducts);

router
  .route("/:productId")
  .get(validate(productValidation.getProduct), productController.getProduct)
  .patch(
    validate(productValidation.updateProduct),
    productController.updateProduct
  )
  .delete(
    validate(productValidation.deleteProduct),
    productController.deleteProduct
  );

export default router;
