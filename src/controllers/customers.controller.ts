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
    } catch (err: any) {
      console.error('CONTROLLER', err.message);
      throw new Error(err.message);
    }
  }

  public async getCustomerById(customerId: number): Promise<ICustomer[] | null> {
    try {
      const isCustomer = await this.customerModel.getCustomerById(customerId);
      return isCustomer;
    } catch (err: any) {
      console.error('CONTROLLER', err.message);
      throw new Error(err.message);
    }
  }

  public async updateCustomer(customerId: number, customerData: ICustomer): Promise<void> {
    try {
      const data = customerData;
      await this.customerModel.updateCustomer(customerId, customerData);
    } catch (err: any) {
      console.error('CONTROLLER', err.message);
      throw new Error(err.message);
    }
  }

  public async createCustomer(customerData: ICustomer): Promise<void> {
    try {
      const data = customerData;
      await this.customerModel.createCustomer(customerData);
    } catch (err: any) {
      console.error('CONTROLLER', err.message);
      throw new Error(err.message);
    }
  }

  public async deleteCustomer(customerId: number): Promise<void> {
    try {
      await this.customerModel.deleteCustomer(customerId);
    } catch (err: any) {
      console.error('CONTROLLER', err.message);
      throw new Error(err.message);
    }
  }

}