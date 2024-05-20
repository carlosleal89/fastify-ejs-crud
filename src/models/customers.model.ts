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
      // refatorar tratativa de erros
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
      // refatorar tratativa de erros
    }
  }

  public async updateCustomer(customerId: Number, customerData: ICustomer): Promise<void> {
    try {
      const { name, email, cpf, phone, status } = customerData;
      const tst = await this.postgres.query(
        'UPDATE customers SET name = $1, email = $2, cpf = $3, phone = $4, status = $5 WHERE id = $6',
        [ name, email, cpf, phone, status, customerId ]
      );

      console.log('TESTE', tst);
      
    } catch (err: any) {
      console.error('MODEL: ', err.message);
      throw new Error(`INTERNAL SERVER ERROR: ${err.message}`);
      // refatorar tratativa de erros
    }
  }
}