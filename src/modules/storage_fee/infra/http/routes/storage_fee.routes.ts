import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import StorageFeeController from '../controllers/StorageFeeController';

const storageFeeRouter = Router();
const storageFeeController = new StorageFeeController();

storageFeeRouter.use(ensureAuthenticated);

storageFeeRouter.get('/', storageFeeController.index);

export default storageFeeRouter;
