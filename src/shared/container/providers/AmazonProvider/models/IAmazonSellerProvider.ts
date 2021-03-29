export default interface IAmazonSellerProvider {
  GetMyFeesEstimate(): Promise<void>;
}
