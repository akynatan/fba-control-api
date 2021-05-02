import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import multer from 'multer';

import uploadConfig from '@config/upload';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProductsOrderController from '../controllers/ProductsOrderController';

const upload = multer(uploadConfig.multer);
const productsOrderRouter = Router();
const productsOrderController = new ProductsOrderController();

productsOrderRouter.use(ensureAuthenticated);

productsOrderRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      product_id: Joi.string().uuid().required(),
      order_id: Joi.string().uuid().required(),
      unit_price: Joi.number(),
      qtd: Joi.number(),
      label: Joi.number(),
      prep: Joi.number(),
      other_cost: Joi.number(),
      buy_box: Joi.number(),
      note: Joi.string(),
    },
  }),
  productsOrderController.create,
);

productsOrderRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      data: Joi.array(),
    },
  }),
  productsOrderController.update,
);

productsOrderRouter.put(
  '/estimate',
  celebrate({
    [Segments.BODY]: {
      product_order_id: Joi.string().uuid().required(),
      buy_box: Joi.number().required(),
      asin: Joi.string().required(),
    },
  }),
  productsOrderController.updateEstimate,
);

productsOrderRouter.get('/', productsOrderController.index);

productsOrderRouter.delete('/', productsOrderController.delete);

productsOrderRouter.get('/detail', productsOrderController.detail);

productsOrderRouter.post(
  '/upload',
  ensureAuthenticated,
  upload.single('products'),
  productsOrderController.uploadProducts,
);

export default productsOrderRouter;
