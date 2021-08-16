import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import SaleController from '../controllers/SaleController';

const saleRouter = Router();
const saleController = new SaleController();

saleRouter.use(ensureAuthenticated);

saleRouter.get('/', saleController.index);

export default saleRouter;
