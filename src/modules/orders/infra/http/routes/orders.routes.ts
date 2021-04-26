import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import OrdersController from '../controllers/OrdersController';

const ordersRouter = Router();
const ordersController = new OrdersController();

ordersRouter.use(ensureAuthenticated);

ordersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      date: Joi.date(),
      supplier_id: Joi.string().uuid().required(),
      form_payment: Joi.string(),
      its_paid: Joi.boolean(),
      status: Joi.string(),
      other_cost: Joi.number(),
      shipment_cost: Joi.number(),
      note: Joi.string(),
    },
  }),
  ordersController.create,
);

ordersRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      order_id: Joi.string().uuid().required(),
      supplier_id: Joi.string().uuid().required(),
      date: Joi.date(),
      invoice: Joi.string(),
      other_cost: Joi.number(),
      shipment_cost: Joi.number(),
    },
  }),
  ordersController.update,
);

ordersRouter.get('/', ordersController.index);

ordersRouter.get('/detail', ordersController.detail);

ordersRouter.get('/products', ordersController.products);

export default ordersRouter;
