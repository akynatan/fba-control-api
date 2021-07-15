export default interface IAllShipments {
  ShipmentData: {
    ShipmentStatus: string;
    ShipmentId: string;
  }[];
  NextToken: string;
}
