import { FastifyInstance, RouteShorthandOptions } from 'fastify';
import * as todoGet from './get';
import * as todoPost from './post';

export default async (fastify: FastifyInstance, opts: RouteShorthandOptions): Promise<void> => {
  fastify.get('/', todoGet.option, todoGet.handler);
  fastify.post('/', todoPost.option, todoPost.handler);
};
