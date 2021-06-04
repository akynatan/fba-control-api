export default interface IItemsByShipment {
  ItemData: {
    SellerSKU: string;
    QuantityShipped: number;
    QuantityReceived: number;
  }[];
}
