import { ICustomer, ICustomerModel } from '../interfaces/customer.interface';
import CustomerModel from '../models/customers.model';
import { PostgresDb } from '@fastify/postgres';

export default class CustomerController {
  private customerModel: ICustomerModel;

  constructor(postgres: PostgresDb) {
    this.customerModel = new CustomerModel(postgres);
  }

  async getCustomers(): Promise<ICustomer[] | null> {
    try {
      const customerList = await this.customerModel.getCustomers();
      return customerList;
    } catch (error: any) {
      console.error('CONTROLLER', error.message);
      throw new error('INTERNAL SERVER ERROR: ', error.message);
    }
  }
}