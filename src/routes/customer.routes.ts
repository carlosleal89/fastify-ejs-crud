import { FastifyInstance } from 'fastify';
import CustomerController from '../controllers/customers.controller.js';
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
      return reply.status(500).send({ error: err.message });
    }
  });

  fastify.get<{ Params: { id: string } }>('/edit/:id', async (request, reply) => {
    // tipagem do get necessaria para o TS entender o tipo que esta sendo recebido em Params
    try {
      const { id } =  request.params;
      
      const data = await controller.getCustomerById(Number(id));
      
      return reply.view('customers/editForm.ejs', { customer: data }, { layout: 'layout'});
    } catch (err: any) {
      console.error('ROUTE', err.message);
      return reply.status(500).send({ error: err.message });
    }
  });

  fastify.post<{ Params: { id: string }, Body: ICustomer }>('/update/:id', async (request, reply) => {
    try {
      const { id } =  request.params;
      
      const data = request.body;    

      await controller.updateCustomer(Number(id), data)

      return reply.view('alerts/sucessAlert.ejs', { criado: true, alertText: 'atualizado' });
    } catch (err: any) {
      console.error('ROUTE', err.message);
      return reply.view('alerts/errorAlert.ejs', { errorMessage: err.message });
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

      return reply.view('alerts/sucessAlert.ejs', { criado: true, alertText: 'criado' });
    } catch (err: any) {
      console.error('ROUTE', err.message);      
      return reply.view('alerts/errorAlert.ejs', { errorMessage: err.message });
    }
  });

  fastify.post<{ Params: { id: string }}>('/delete-customer/:id', async (request, reply) => {
    try {
      const { id } = request.params;

      await controller.deleteCustomer(Number(id));

      return reply.view('alerts/sucessAlert.ejs', { criado: true, alertText: 'excluido' });
    } catch (err: any) {
      console.error('ROUTE', err.message);
      return reply.status(500).send({ error: err.message });
    }
  })
}

export default customerRoutes;