import Fastify from 'fastify';
import favicon from '@wwa/fastify-favicon';
import fastifyPostgres from '@fastify/postgres';
import customerRoutes from './routes/customer.routes';

const fastify = Fastify({
  logger: true,
});

fastify.register(fastifyPostgres, {
  connectionString: 'postgres://postgres:123456@localhost/customersmanagement'
});

fastify.register(favicon); // plugin para o erro da requisição ao favicon

fastify.register(customerRoutes, {
  prefix: '/customers'
});

fastify.listen({ port: 5000, host: '0.0.0.0' }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});

export default fastify;