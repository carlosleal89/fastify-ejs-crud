import { FastifyInstance } from 'fastify';
import CustomerController from '../controllers/customers.controller';
import { PostgresDb } from '@fastify/postgres';

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
    } catch (error: any) {
      console.error('ROUTE', error.message);
    }
  });

  fastify.get('/edit', async (request, reply) => {
    try {
      return reply.view('customers/editForm.ejs', {}, { layout: 'layout'});
    } catch (error: any) {
      console.error('ROUTE', error.message);
    }
  })
}

export default customerRoutes;