import express from 'express';
import auth from '../../middlewares/auth';
import validate from '../../middlewares/validate';
import { productValidation } from '../../validations';
import { productController } from '../../controllers';

const router = express.Router();

router
  .route('/')
  .post(validate(productValidation.createProduct), productController.createProduct)
  .get(productController.getProducts);

router
  .route('/:id')
  .get(productController.getProductById)
  .put(validate(productValidation.updateProduct), productController.updateProduct)
  .delete(productController.deleteProduct);

export default router;
