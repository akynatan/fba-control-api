/* eslint-disable camelcase */
import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import SuppliersController from '../controllers/SuppliersController';
import SyncSuppliersController from '../controllers/SyncSuppliersController';

const suppliersRouter = Router();
const suppliersController = new SuppliersController();
const syncSuppliersController = new SyncSuppliersController();

suppliersRouter.use(ensureAuthenticated);

suppliersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      note: Joi.string(),
      tel: Joi.string(),
      mail: Joi.string(),
      domain: Joi.string(),
    },
  }),
  suppliersController.create,
);

suppliersRouter.post('/sync-hubspot', syncSuppliersController.create);

export default suppliersRouter;
