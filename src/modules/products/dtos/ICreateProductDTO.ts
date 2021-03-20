interface supplierProduct {
  id: string;
  sku_supplier: string;
  note: string;
}

export default interface ICreateProductDTO {
  name: string;
  sku: string;
  asin: string;
  upc: string;
  note: string;
  suppliers: supplierProduct[];
}
