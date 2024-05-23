import Fastify from 'fastify';
import favicon from '@wwa/fastify-favicon';
import fastifyPostgres from '@fastify/postgres';
import customerRoutes from './routes/customer.routes.js';
import fastifyView from '@fastify/view';
import ejs from 'ejs';
import fastifyStatic from '@fastify/static';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import urlEncondedParser from './middlewares/dataParser.js';
import * as dotenv from 'dotenv';

dotenv.config();

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
  connectionString: process.env.DB_URL
});

fastify.register(fastifyView, {
  engine: {
      ejs: ejs,
  },
  root: path.join(__dirname, 'views'), // configura o diretorio padrão dos templates, o que evita ter que especificar o caminho completo na rota.
  viewExt: 'ejs'
});

fastify.register(fastifyStatic, {
  root: path.join(__dirname, '../public'),
  prefix: '/public/',
});

fastify.register(favicon); // plugin para o erro da requisição ao favicon

fastify.register(urlEncondedParser); // plugin criado para o Fastify lidar com o tipo de dados 'application/x-www-form-urlencoded'. Formato enviado por requisições do tipo POST

// fastify.register(customerRoutes, {
//   prefix: '/customers'
// });

fastify.register(customerRoutes);

fastify.listen({ port: 5000, host: '0.0.0.0' }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});

export default fastify;