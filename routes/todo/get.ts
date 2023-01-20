import { FastifyReply, FastifyRequest } from 'fastify';
import { Todo } from '../../entities/todo.entity';
import server from '../../index';

export const option = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: {
          $ref: 'todo#',
        },
      },
    },
  },
};

export const handler = async (request: FastifyRequest, reply: FastifyReply) => {
  const todos = await server.db.getRepository(Todo).find();

  return todos;
};
