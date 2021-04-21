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
      note: Joi.string(),
    },
  }),
  ordersController.create,
);

ordersRouter.get('/', ordersController.index);

ordersRouter.get('/detail', ordersController.detail);

ordersRouter.get('/products', ordersController.products);

export default ordersRouter;
