import fastifyPlugin from 'fastify-plugin';
import qs, { ParsedQs} from 'qs';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { ICustomer } from '../interfaces/customer.interface';

async function urlEncondedParser (fastify: FastifyInstance, options: any) {
  fastify.addContentTypeParser('application/x-www-form-urlencoded', { parseAs: 'string' }, (req: FastifyRequest, body: string, done: (err?: any, value?: ICustomer) => void) => {
    try {
      const parsed: Record<string, string | string[] | ParsedQs | ParsedQs[] | undefined> = qs.parse(body);
      
      const [name, email, cpf, phone]: string[] = parsed['input-name'] as string[];
      const status: string = parsed['status-select'] as string;      

      const consumer: ICustomer = {
        name,
        email,
        cpf,
        phone,
        status
      };

      done(null, consumer);
    } catch (err) {
      done(err);
    }
  });
}

export default fastifyPlugin(urlEncondedParser);