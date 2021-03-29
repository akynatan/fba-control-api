import { container } from 'tsyringe';

import IAmazonSellerProvider from './models/IAmazonSellerProvider';
import AmazonSellerProvider from './implementations/AmazonSellerProvider';

container.registerInstance<IAmazonSellerProvider>(
  'AmazonSellerProvider',
  container.resolve(AmazonSellerProvider),
);
