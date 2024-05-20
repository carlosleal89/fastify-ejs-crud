import { FastifyInstance } from 'fastify';
import CustomerController from '../controllers/customers.controller';
import { PostgresDb } from '@fastify/postgres';
import { ICustomer } from '../interfaces/customer.interface';

async function customerRoutes(fastify: FastifyInstance) {
  const postgres: PostgresDb = fastify.pg;
  const controller = new CustomerController(postgres);

  fastify.get('/', async (request, reply) => {
    try {
      const data = await controller.getCustomers();
      return reply.view('index.ejs', {
        customers: data
      }
    );
    } catch (err: any) {
      console.error('ROUTE', err.message);
      // refatorar tratativa de erros
    }
  });

  fastify.get<{ Params: { id: string } }>('/edit/:id', async (request, reply) => {
    // tipagem do get necessaria para o TS entender o tipo que esta sendo recebido em Params
    try {
      const { id } =  request.params;
      
      const data = await controller.getCustomerById(Number(id));
      // tratar o caso de não existir o id no banco. Mostrar um mensagem no template caso não exista.  
      
      return reply.view('customers/editForm.ejs', { customer: data }, { layout: 'layout'});
    } catch (err: any) {
      console.error('ROUTE', err.message);
      // refatorar tratativa de erros
    }
  });

  fastify.post<{ Params: { id: string }, Body: ICustomer }>('/update/:id', async (request, reply) => {
    try {
      const { id } =  request.params;
      const data = request.body;

      await controller.updateCustomer(Number(id), data)

      return reply.redirect('/');
    } catch (err: any) {
      console.error('ROUTE', err.message);
      // refatorar tratativa de erros
    }
  })
}

export default customerRoutes;