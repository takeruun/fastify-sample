import { FastifyInstance } from 'fastify';
import helloRoutes from './hello/route';
import todoRoutes from './todo/route';
import authRoutes from './auth/route';

export const setRoute = (server: FastifyInstance) => {
  server.register(authRoutes);
  server.register(helloRoutes, { prefix: '/hello' });
  server.register(todoRoutes, { prefix: '/todo' });
};
