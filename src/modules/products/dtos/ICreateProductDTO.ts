interface supplierProduct {
  id: string;
  sku_supplier: string;
  note: string;
}

export default interface ICreateProductDTO {
  asin?: string;
  name?: string;
  image?: string;
  brand?: string;
  sku: string;
  upc?: string;
  note?: string;
  label?: string;
  prep?: string;
  suppliers: supplierProduct[];
}
