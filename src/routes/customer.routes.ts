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

      return reply.redirect('/customers/');
    } catch (err: any) {
      console.error('ROUTE', err.message);
      return reply.redirect('/customers/');
    }
  });

  fastify.get('/new-customer', async (request, reply) => {
    try {
      return reply.view('customers/newCustomerForm.ejs', {}, { layout: 'layout'});
    } catch (err: any) {
      console.error('ROUTE', err.message);
      return reply.redirect('/customers/');
    }
  });

  fastify.post<{ Body: ICustomer }>('/new-customer', async (request, reply) => {
    try {
      const data = request.body;    

      await controller.createCustomer(data);

      // return reply.redirect('/customers/');
      return reply.view('alerts/createdCustomer.ejs', { criado: true });
    } catch (err: any) {
      console.error('ROUTE', err.message);      
      return reply.view('alerts/errorAlert.ejs', { errorMessage: err.message });
    }
  });
}

export default customerRoutes;