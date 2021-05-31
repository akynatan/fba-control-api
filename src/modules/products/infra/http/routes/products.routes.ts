import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import multer from 'multer';

import uploadConfig from '@config/upload';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProductsController from '../controllers/ProductsController';

const upload = multer(uploadConfig.multer);
const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.use(ensureAuthenticated);

productsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().allow(null, ''),
      asin: Joi.string().allow(null, ''),
      sku: Joi.string().required(),
      upc: Joi.string().allow(null, ''),
      note: Joi.string().allow(null, ''),
      suppliers: Joi.array(),
    },
  }),
  productsController.create,
);

productsRouter.put(
  '/sync',
  celebrate({
    [Segments.BODY]: {
      product_id: Joi.string().uuid().required(),
      sku: Joi.string().required(),
    },
  }),
  productsController.syncAmazon,
);

productsRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      product_id: Joi.string().uuid().required(),
      name: Joi.string().allow(null, ''),
      asin: Joi.string().allow(null, ''),
      sku: Joi.string().required(),
      upc: Joi.string().allow(null, ''),
      note: Joi.string().allow(null, ''),
    },
  }),
  productsController.update,
);

productsRouter.get('/', productsController.index);

productsRouter.get('/detail', productsController.detailProduct);

productsRouter.get('/estimate', productsController.getFeesEstimate);

productsRouter.get('/suppliers', productsController.listSupplierProducts);

productsRouter.get('/shipments', productsController.shipmentsForProducts);

productsRouter.get(
  '/prep_instructions',
  productsController.getPrepInstructions,
);

productsRouter.delete(
  '/',
  celebrate({
    [Segments.BODY]: {
      product_id: Joi.string().required(),
    },
  }),
  productsController.delete,
);

productsRouter.post(
  '/upload',
  ensureAuthenticated,
  upload.single('products'),
  productsController.uploadProducts,
);

export default productsRouter;
