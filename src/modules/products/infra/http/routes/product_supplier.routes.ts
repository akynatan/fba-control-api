import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import ProductSupplierController from '../controllers/ProductSupplierController';

const productSupplierRouter = Router();
const productSupplierController = new ProductSupplierController();

productSupplierRouter.use(ensureAuthenticated);

productSupplierRouter.put(
  '/alter_supplier',
  celebrate({
    [Segments.BODY]: {
      product_supplier_id: Joi.string().required(),
      new_supplier_id: Joi.string().required(),
    },
  }),
  productSupplierController.update,
);

productSupplierRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      supplier_id: Joi.string().required(),
      product_id: Joi.string().required(),
      sku_supplier: Joi.string(),
      note: Joi.string(),
    },
  }),
  productSupplierController.create,
);

export default productSupplierRouter;
