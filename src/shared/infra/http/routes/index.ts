import { Router } from 'express';

import suppliersRouter from '@modules/suppliers/infra/http/routes/suppliers.routes';
import shopsRouter from '@modules/shops/infra/http/routes/shops.routes';
import productsRouter from '@modules/products/infra/http/routes/products.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';

const routes = Router();
routes.use('/suppliers', suppliersRouter);
routes.use('/shops', shopsRouter);
routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);

export default routes;
