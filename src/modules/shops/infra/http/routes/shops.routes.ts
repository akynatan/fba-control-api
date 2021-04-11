import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ShopsController from '../controllers/ShopsController';

const shopsRouter = Router();
const shopsController = new ShopsController();

shopsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      token_hubspot: Joi.string().required(),
      token_amazon: Joi.string().required(),
    },
  }),
  shopsController.create,
);

shopsRouter.get('/', shopsController.index);

export default shopsRouter;
