import { FastifyInstance, RouteShorthandOptions } from 'fastify';
import * as helloGet from './get';

export default async (fastify: FastifyInstance, opts: RouteShorthandOptions): Promise<void> => {
  fastify.get('/', helloGet.option, helloGet.handler);
};
