import { FastifyReply, FastifyRequest } from 'fastify';

export const option = {
  schema: {
    summary: 'sample api',
    response: {
      200: { type: 'string' },
    },
  },
};

export const handler = async (request: FastifyRequest, reply: FastifyReply) => {
  return 'hello\n';
};
