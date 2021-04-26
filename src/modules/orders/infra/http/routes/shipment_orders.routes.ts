import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import { celebrate, Segments, Joi } from 'celebrate';
import ShipmentOrdersController from '../controllers/ShipmentOrdersController';

const shipmentOrdersRouter = Router();
const shipmentOrdersController = new ShipmentOrdersController();

shipmentOrdersRouter.use(ensureAuthenticated);

shipmentOrdersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      shipment_id: Joi.string().required(),
      note: Joi.string(),
      order_id: Joi.string().uuid(),
    },
  }),
  shipmentOrdersController.create,
);

shipmentOrdersRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      shipment_order_id: Joi.string().required(),
      shipment_id: Joi.string().required(),
      note: Joi.string(),
    },
  }),
  shipmentOrdersController.update,
);

shipmentOrdersRouter.delete('/', shipmentOrdersController.delete);

shipmentOrdersRouter.get('/', shipmentOrdersController.index);

export default shipmentOrdersRouter;
