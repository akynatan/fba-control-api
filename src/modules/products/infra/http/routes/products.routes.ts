import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import ProductsController from '../controllers/ProductsController';

const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.use(ensureAuthenticated);

productsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      asin: Joi.string().required(),
      sku: Joi.string().required(),
      upc: Joi.string().required(),
      note: Joi.string().required(),
      suppliers: Joi.array().required(),
    },
  }),
  productsController.create,
);

productsRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      product_id: Joi.string().uuid().required(),
      name: Joi.string().required(),
      asin: Joi.string().required(),
      sku: Joi.string().required(),
      upc: Joi.string().required(),
      note: Joi.string().required(),
    },
  }),
  productsController.update,
);

productsRouter.get('/', productsController.index);

productsRouter.get('/detail', productsController.detailProduct);

productsRouter.get('/estimate', productsController.getFeesEstimate);

productsRouter.get('/suppliers', productsController.listSupplierProducts);

export default productsRouter;
