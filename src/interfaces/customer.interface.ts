export interface ICustomer {
  id?: number;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  status: string;
}

export interface ICustomerModel {
  getCustomers(): Promise<ICustomer[] | null>;
  getCustomerById(customerId: number): Promise<ICustomer[] | null>;
  updateCustomer(customerId: Number, customerData: ICustomer): Promise<void>;
}