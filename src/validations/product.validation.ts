import Joi from 'joi';

const createProduct = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string(),
    price: Joi.number().required(),
    quantity: Joi.number().required()
  })
};

const updateProduct = {
  body: Joi.object().keys({
    id: Joi.number().required(),
    name: Joi.string(),
    description: Joi.string(),
    price: Joi.number(),
    quantity: Joi.number()
  })
};

export default {
  createProduct,
  updateProduct
};
