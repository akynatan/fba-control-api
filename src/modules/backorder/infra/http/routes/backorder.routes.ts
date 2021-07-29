import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import multer from 'multer';

import uploadConfig from '@config/upload';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import BackOrderController from '../controllers/BackOrderController';

const upload = multer(uploadConfig.multer);
const productsRouter = Router();
const productsController = new BackOrderController();

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

productsRouter.get('/suppliers', productsController.listSupplierBackOrder);

productsRouter.get('/shipments', productsController.shipmentsForBackOrder);

productsRouter.get('/testes', productsController.testes);

productsRouter.get(
  '/get_products_updated_amazon',
  productsController.getBackOrderUpdatedAmazon,
);

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
  productsController.uploadBackOrder,
);

export default productsRouter;
