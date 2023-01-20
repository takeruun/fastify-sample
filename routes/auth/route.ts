import { FastifyInstance, RouteShorthandOptions } from 'fastify';
import * as signUpPost from './sign_up/post';

export default async (fastify: FastifyInstance, opts: RouteShorthandOptions): Promise<void> => {
  fastify.post('/sign_up', signUpPost.option, signUpPost.handler);
};
