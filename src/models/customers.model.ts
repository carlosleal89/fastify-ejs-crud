import { ICustomer, ICustomerModel } from '../interfaces/customer.interface';
import { fastifyPostgres } from '@fastify/postgres';
import { PostgresDb } from '@fastify/postgres';

export default class CustomerModel implements ICustomerModel {
  private postgres: PostgresDb;

  constructor(postgres: PostgresDb) {
    this.postgres = postgres;
  }

  public async getCustomers(): Promise<ICustomer[] | null> {
    try {
      const { rows } = await this.postgres.query('SELECT * FROM customers');
      return rows;
    } catch (err: any) {
      console.error('MODEL: ', err.message);
      throw new Error(`INTERNAL SERVER ERROR: ${err.message}`);
    }
  }

  public async getCustomerById(customerId: number): Promise<ICustomer[] | null> {
    try {
      const { rows } = await this.postgres.query(
        'SELECT * FROM customers WHERE id = $1',
        [customerId]
      );
      return rows;
    } catch (err: any) {
      console.error('MODEL: ', err.message);
      throw new Error(`INTERNAL SERVER ERROR: ${err.message}`);
    }
  }
}