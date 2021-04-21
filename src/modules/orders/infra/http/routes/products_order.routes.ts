import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import ProductsOrderController from '../controllers/ProductsOrderController';

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
    },
  }),
  productsOrderController.create,
);

productsOrderRouter.get('/', productsOrderController.index);

productsOrderRouter.get('/detail', productsOrderController.detail);

export default productsOrderRouter;
