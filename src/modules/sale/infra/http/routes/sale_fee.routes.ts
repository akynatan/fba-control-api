import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import StorageFeeController from '../controllers/SaleController';

const saleRouter = Router();
const saleController = new StorageFeeController();

saleRouter.use(ensureAuthenticated);

saleRouter.get('/', saleController.index);

export default saleRouter;
