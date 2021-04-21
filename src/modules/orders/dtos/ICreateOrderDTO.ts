export default interface ICreateOrderDTO {
  date: Date;
  supplier_id: string;
  form_payment?: string;
  its_paid?: boolean;
  status?: string;
  note?: string;
}
