import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import GetMyFeesEstimateService from '@modules/products/services/GetMyFeesEstimateService';
import CreateProductService from '@modules/products/services/CreateProductService';
import ListAllProductsService from '@modules/products/services/ListAllProductsService';
import UpdateProductService from '@modules/products/services/UpdateProductService';
import ListSupplierProductsService from '@modules/products/services/ListSupplierProductsService';
import DetailProductService from '@modules/products/services/DetailProductService';
import DeleteProductService from '@modules/products/services/DeleteProductService';
import UploadProductsService from '@modules/products/services/UploadProductsService';
import SyncDataProductByAmazonService from '@modules/products/services/SyncDataProductByAmazonService';
import GetPrepInstructionsByAsinsService from '@modules/products/services/GetPrepInstructionsByAsinsService';
import ListShipmentFromProductService from '@modules/products/services/ListShipmentFromProductService';
import GetReportProductsUpdatedInAmazon from '@modules/products/services/GetReportProductsUpdatedInAmazon';
import TestesService from '@modules/products/services/TestesService';

export default class ProductsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      asin,
      note,
      sku,
      image,
      brand,
      upc,
      suppliers,
    } = request.body;

    const createProduct = container.resolve(CreateProductService);

    const product = await createProduct.execute({
      asin,
      name,
      image,
      brand,
      note,
      sku,
      upc,
      suppliers,
    });

    return response.json(classToClass(product));
  }

  public async index(_: Request, response: Response): Promise<Response> {
    const listAllProducts = container.resolve(ListAllProductsService);

    const products = await listAllProducts.execute();

    return response.json(classToClass(products));
  }

  public async shipmentsForProducts(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { product_id } = request.query;
    const listShipmentFromProduct = container.resolve(
      ListShipmentFromProductService,
    );

    const shipments = await listShipmentFromProduct.execute({
      product_id: String(product_id),
    });

    return response.json(shipments);
  }

  public async getPrepInstructions(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { asin_list } = request.query;

    const getPrepInstructionsByAsins = container.resolve(
      GetPrepInstructionsByAsinsService,
    );

    const products = await getPrepInstructionsByAsins.execute({
      asin_list,
    });

    return response.json(products);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { product_id, asin, note, sku, upc } = request.body;

    const updateProduct = container.resolve(UpdateProductService);

    const product = await updateProduct.execute({
      product_id,
      asin,
      note,
      sku,
      upc,
    });

    return response.json(product);
  }

  public async syncAmazon(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { product_id, sku } = request.body;

    const syncDataProductByAmazon = container.resolve(
      SyncDataProductByAmazonService,
    );

    const product = await syncDataProductByAmazon.execute({
      product_id,
      sku,
    });

    return response.json(product);
  }

  public async getFeesEstimate(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const getMyFeesEstimate = container.resolve(GetMyFeesEstimateService);

    const fees = await getMyFeesEstimate.execute();

    return response.json(fees);
  }

  public async getProductsUpdatedAmazon(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const getReportProductsUpdatedInAmazon = container.resolve(
      GetReportProductsUpdatedInAmazon,
    );

    const products_updated = await getReportProductsUpdatedInAmazon.execute();

    return response.json(products_updated);
  }

  public async listSupplierProducts(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { product_id } = request.query;

    const listSupplierProducts = container.resolve(ListSupplierProductsService);

    const suppliers = await listSupplierProducts.execute({
      product_id: String(product_id),
    });

    return response.json(suppliers);
  }

  public async detailProduct(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { product_id } = request.query;

    const detailProductService = container.resolve(DetailProductService);

    const suppliers = await detailProductService.execute({
      product_id: String(product_id),
    });

    return response.json(suppliers);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { product_id } = request.body;

    const deleteProduct = container.resolve(DeleteProductService);

    const product = await deleteProduct.execute({
      id: product_id,
    });

    return response.json(product);
  }

  public async uploadProducts(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const uploadProducts = container.resolve(UploadProductsService);
    const products = await uploadProducts.execute({
      file_name: request.file.filename,
    });

    return response.json(products);
  }

  public async testes(request: Request, response: Response): Promise<Response> {
    const testesService = container.resolve(TestesService);
    const res = await testesService.execute();

    return response.json(res);
  }
}
