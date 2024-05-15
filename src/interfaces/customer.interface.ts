export interface ICustomer {
  id?: number;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  status: string;
}

export interface ICustomerModel {
  getCustomers(): Promise<ICustomer[] | null>
}