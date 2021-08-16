import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import StorageFeeController from '../controllers/StorageFeeController';

const storageFeeRouter = Router();
const storageFeeController = new StorageFeeController();

storageFeeRouter.use(ensureAuthenticated);

storageFeeRouter.get('/', storageFeeController.index);
storageFeeRouter.get('/reports_retroactive', storageFeeController.retroactive);

export default storageFeeRouter;
