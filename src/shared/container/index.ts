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
