import fastifyPlugin from 'fastify-plugin';
import qs, { ParsedQs} from 'qs';

async function urlEncondedParser (fastify: any, options: any) {
  fastify.addContentTypeParser('application/x-www-form-urlencoded', { parseAs: 'string' }, (req: any, body: any, done: any) => {
    try {
      const parsed: Record<string, string | string[] | ParsedQs | ParsedQs[] | undefined> = qs.parse(body);
      
      const [name, email, cpf, phone]: string[] = parsed['input-name'] as string[];

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