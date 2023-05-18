import express from 'express';
import auth from '../../middlewares/auth';
import validate from '../../middlewares/validate';
import { productValidation } from '../../validations';
import { productController } from '../../controllers';

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(productValidation.createProduct), productController.createProduct)
  .get(auth(), productController.getProducts);

router
  .route('/:id')
  .get(auth(), productController.getProductById)
  .put(auth(), validate(productValidation.updateProduct), productController.updateProduct)
  .delete(auth(), productController.deleteProduct);

export default router;
