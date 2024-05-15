import { FastifyInstance } from 'fastify';
import CustomerController from '../controllers/customers.controller';
import { PostgresDb } from '@fastify/postgres';

async function customerRoutes(fastify: FastifyInstance) {
  const postgres: PostgresDb = fastify.pg;
  const controller = new CustomerController(postgres);

  fastify.get('/', async (request, reply) => {
    try {
      const data = await controller.getCustomers();
      reply.send(data);
    } catch (error: any) {
      console.error('ROUTE', error.message);
    }
  });
}

export default customerRoutes;