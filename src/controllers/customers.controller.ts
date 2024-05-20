import { ICustomer, ICustomerModel } from '../interfaces/customer.interface';
import CustomerModel from '../models/customers.model';
import { PostgresDb } from '@fastify/postgres';

export default class CustomerController {
  private customerModel: ICustomerModel;

  constructor(postgres: PostgresDb) {
    this.customerModel = new CustomerModel(postgres);
  }

  public async getCustomers(): Promise<ICustomer[] | null> {
    try {
      const customerList = await this.customerModel.getCustomers();
      return customerList;
    } catch (error: any) {
      console.error('CONTROLLER', error.message);
      throw new error('INTERNAL SERVER ERROR: ', error.message);
      // refatorar tratativa de erros
    }
  }

  public async getCustomerById(customerId: number): Promise<ICustomer[] | null> {
    try {
      const isCustomer = await this.customerModel.getCustomerById(customerId);
      return isCustomer;
    } catch (err: any) {
      console.error('CONTROLLER', err.message);
      throw new Error(`INTERNAL SERVER ERROR: ${err.message}`);
      // refatorar tratativa de erros
    }
  }

  public async updateCustomer(customerId: number, customerData: ICustomer): Promise<void> {
    try {
      await this.customerModel.updateCustomer(customerId, customerData);
    } catch (err: any) {
      console.error('CONTROLLER', err.message);
      throw new Error(`INTERNAL SERVER ERROR: ${err.message}`);
      // refatorar tratativa de erros
    }
  }
}