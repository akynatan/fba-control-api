import 'reflect-metadata';
import 'dotenv/config';

import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import 'express-async-errors';
import { errors } from 'celebrate';

import cron from 'node-cron';

import routes from '@shared/infra/http/routes';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';

import ShipmentsCron from '@modules/shipments/crons';
import CronsSuppliers from '@modules/suppliers/crons';

import InsertedShipmentRetroactive from '@modules/shipments/scripts/InsertedShipmentRetroactive';

import rateLimiter from './middlewares/RateLimiter';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(rateLimiter);
app.use(routes);
app.use(errors());
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response
      .status(err.statusCode)
      .json({ status: 'error', error: err.message });
  }
  console.error(err);
  return response.status(500).json({
    status: 'error',
    error: 'Internal server error..',
  });
});

app.listen(process.env.PORT || 4444, async () => {
  new ShipmentsCron().execute();
  new CronsSuppliers().execute();

  console.log(`Server started on portt ${process.env.PORT || 4444}`);
});
