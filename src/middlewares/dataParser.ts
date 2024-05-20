import fastifyPlugin from 'fastify-plugin';
import qs from 'qs';

async function urlEncondedParser (fastify: any, options: any) {
  fastify.addContentTypeParser('application/x-www-form-urlencoded', { parseAs: 'string' }, (req: any, body: any, done: any) => {
    try {
      const parsed = qs.parse(body);

      const inputs: any = parsed['input-name'];
      
      const [name, email, cpf, phone] = inputs;

      const consumer = {
        name,
        email,
        cpf,
        phone,
        status: parsed['status-select']
      };

      done(null, consumer);
    } catch (err) {
      done(err);
    }
  });
}

export default fastifyPlugin(urlEncondedParser);