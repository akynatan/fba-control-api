import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import ISuppliersRepository from '@modules/suppliers/repositories/ISuppliersRepository';
import SuppliersRepository from '@modules/suppliers/infra/typeorm/repositories/SuppliersRepository';

import IShopsRepository from '@modules/shops/repositories/IShopsRepository';
import ShopsRepository from '@modules/shops/infra/typeorm/repositories/ShopsRepository';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';

import IProductSupplierRepository from '@modules/products/repositories/IProductSupplierRepository';
import ProductSupplierRepository from '@modules/products/infra/typeorm/repositories/ProductSupplierRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUsersTokenRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import OrdersRepository from '@modules/orders/infra/typeorm/repositories/OrdersRepository';

import IProductsOrderRepository from '@modules/orders/repositories/IProductsOrderRepository';
import ProductsOrderRepository from '@modules/orders/infra/typeorm/repositories/ProductsOrderRepository';

import IFilesOrdersRepository from '@modules/orders/repositories/IFilesOrdersRepository';
import FilesOrdersRepository from '@modules/orders/infra/typeorm/repositories/FilesOrdersRepository';

import IShipmentOrdersRepository from '@modules/orders/repositories/IShipmentOrdersRepository';
import ShipmentOrdersRepository from '@modules/orders/infra/typeorm/repositories/ShipmentOrdersRepository';

import IItemShipmentOrdersRepository from '@modules/orders/repositories/IItemShipmentOrdersRepository';
import ItemShipmentOrdersRepository from '@modules/orders/infra/typeorm/repositories/ItemShipmentOrdersRepository';

container.registerSingleton<ISuppliersRepository>(
  'SuppliersRepository',
  SuppliersRepository,
);

container.registerSingleton<IShopsRepository>(
  'ShopsRepository',
  ShopsRepository,
);

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository,
);

container.registerSingleton<IProductSupplierRepository>(
  'ProductSupplierRepository',
  ProductSupplierRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUsersTokenRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<IOrdersRepository>(
  'OrdersRepository',
  OrdersRepository,
);

container.registerSingleton<IProductsOrderRepository>(
  'ProductsOrderRepository',
  ProductsOrderRepository,
);

container.registerSingleton<IFilesOrdersRepository>(
  'FilesOrdersRepository',
  FilesOrdersRepository,
);

container.registerSingleton<IShipmentOrdersRepository>(
  'ShipmentOrdersRepository',
  ShipmentOrdersRepository,
);

container.registerSingleton<IItemShipmentOrdersRepository>(
  'ItemShipmentOrdersRepository',
  ItemShipmentOrdersRepository,
);
