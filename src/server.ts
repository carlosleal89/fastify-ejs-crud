import Fastify from 'fastify';
import favicon from '@wwa/fastify-favicon';
import fastifyPostgres from '@fastify/postgres';
import customerRoutes from './routes/customer.routes';
import fastifyView from '@fastify/view';
import ejs from 'ejs';
import fastifyStatic from '@fastify/static';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename); //configuração necessaria, pois o __dirname não é disponivel quando se usa ES module

const fastify = Fastify({
  logger: {
    transport: {
      target: 'pino-pretty'
    }
  },
});

fastify.register(fastifyPostgres, {
  connectionString: 'postgres://postgres:123456@localhost/customersmanagement'
});

fastify.register(fastifyView, {
  engine: {
      ejs: ejs,
  },
  root: path.join(__dirname, 'views'), // configura o diretorio padrão dos templates, o que evita ter que especificar o caminho completo na rota.
  viewExt: 'ejs'
});

fastify.register(fastifyStatic, {
  root: path.join(__dirname, 'public'),
  prefix: '/public/',
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