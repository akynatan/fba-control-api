export default interface IGetDataProductAmazonDTO {
  Items: {
    AttributeSets: {
      Title: string;
      Brand: string;
      SmallImage: {
        URL: string;
      };
    }[];
    Identifiers: {
      MarketplaceASIN: {
        ASIN: string;
      };
    };
  }[];
}
