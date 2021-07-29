import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import BackOrderController from '../controllers/BackOrderController';

const backOrderRouter = Router();
const backorderController = new BackOrderController();

backOrderRouter.use(ensureAuthenticated);

backOrderRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      supplier_id: Joi.string().required(),
      product_id: Joi.string().required(),
      qtd: Joi.number().allow(null, 0),
      unit_price: Joi.number().allow(null, 0),
      eta: Joi.number().allow(null, 0),
      buy_box: Joi.number().allow(null, 0),
      estimate_profit: Joi.number().allow(null, 0),
      note: Joi.string().allow(null, ''),
    },
  }),
  backorderController.create,
);

backOrderRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      backorder_id: Joi.string().required(),
      supplier_id: Joi.string().required(),
      product_id: Joi.string().required(),
      qtd: Joi.number().allow(null, 0),
      unit_price: Joi.number().allow(null, 0),
      eta: Joi.number().allow(null, 0),
      buy_box: Joi.number().allow(null, 0),
      estimate_profit: Joi.number().allow(null, 0),
      note: Joi.string().allow(null, ''),
    },
  }),
  backorderController.update,
);

backOrderRouter.get('/', backorderController.index);

backOrderRouter.delete(
  '/',
  celebrate({
    [Segments.BODY]: {
      backorder_id: Joi.string().required(),
    },
  }),
  backorderController.delete,
);

export default backOrderRouter;
