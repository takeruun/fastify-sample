import { FastifyReply, FastifyRequest } from 'fastify';
import { Todo } from '../../entities/todo.entity';
import { User } from '../../entities/user.entity';
import server from '../../index';
import { TodoType } from '../../schema';

export const option = {
  schema: {
    tags: ['todo'],
    response: {
      200: {
        $ref: 'todo#',
      },
    },
  },
};

export type RequetType = { Body: TodoType };

export const handler = async (request: FastifyRequest<RequetType>, reply: FastifyReply) => {
  const { title, describe } = request.body;

  const user = await server.db.getRepository(User).findOne({ where: { id: '21ac668b-b761-4214-9b98-10d3ad1e1a1a' } });

  const todo = await server.db.getRepository(Todo).save({
    title,
    describe,
    user,
  });

  return todo;
};
