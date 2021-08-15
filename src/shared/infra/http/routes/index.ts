import { Router } from 'express';

import suppliersRouter from '@modules/suppliers/infra/http/routes/suppliers.routes';
import shopsRouter from '@modules/shops/infra/http/routes/shops.routes';
import productsRouter from '@modules/products/infra/http/routes/products.routes';
import productSupplierRouter from '@modules/products/infra/http/routes/product_supplier.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import ordersRouter from '@modules/orders/infra/http/routes/orders.routes';
import productsOrderRouter from '@modules/orders/infra/http/routes/products_order.routes';
import filesOrdersRouter from '@modules/orders/infra/http/routes/files_orders.routes';
import shipmentsOrdersRouter from '@modules/shipments/infra/http/routes/shipment_orders.routes';
import storageFeeRouter from '@modules/storage_fee/infra/http/routes/storage_fee.routes';
import saleRouter from '@modules/sale/infra/http/routes/sale_fee.routes';

const routes = Router();
routes.use('/suppliers', suppliersRouter);
routes.use('/shops', shopsRouter);
routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/product_supplier', productSupplierRouter);
routes.use('/orders', ordersRouter);
routes.use('/products_order', productsOrderRouter);
routes.use('/files_order', filesOrdersRouter);
routes.use('/shipments_order', shipmentsOrdersRouter);
routes.use('/storage_fee', storageFeeRouter);
routes.use('/sale', saleRouter);

export default routes;
