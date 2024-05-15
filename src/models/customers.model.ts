import { ICustomer, ICustomerModel } from '../interfaces/customer.interface';
import { fastifyPostgres } from '@fastify/postgres';
import { PostgresDb } from '@fastify/postgres';

export default class CustomerModel implements ICustomerModel {
  private postgres: PostgresDb;

  constructor(postgres: PostgresDb) {
    this.postgres = postgres;
  }

  public async getCustomers(): Promise<ICustomer | null | any> {
    // refatorar o retorno da função
    try {
      const { rows } = await this.postgres.query('SELECT * FROM customers');
      return rows;
    } catch (error: any) {
      console.error('MODEL: ', error.message);
      return null;
    }
  }
}