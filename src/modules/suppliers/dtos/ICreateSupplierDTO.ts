export default interface ICreateSupplierDTO {
  name: string;
  note?: string;
  tel?: string;
  mail?: string;
  domain: string;
  created_at_hubspot?: string;
  updated_at_hubspot?: string;
  id_hubspot?: number;
}
