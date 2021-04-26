export default interface IShipmentByShipmentID {
  TransportContent: {
    TransportHeader: {
      IsPartnered: boolean;
      ShipmentType: string;
    };
    TransportDetails: {
      PartneredSmallParcelData: {
        PartneredEstimate: {
          Amount: {
            Value: number;
          };
        };
      };
      PartneredLtlData: {
        PartneredEstimate: {
          Amount: {
            Value: number;
          };
        };
      };
    };
  };
}
