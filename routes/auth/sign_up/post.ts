import { FastifyReply, FastifyRequest } from 'fastify';
import { User } from '../../../entities/user.entity';
import server from '../../../index';
import { UserType } from '../../../schema';

export const option = {
  schema: {
    response: {
      200: {
        $ref: 'user#',
      },
    },
  },
};

export type RequetType = {
  Body: UserType;
};

export const handler = async (request: FastifyRequest<RequetType>, reply: FastifyReply) => {
  const { name, password } = request.body;

  const user = await server.db.getRepository(User).save({
    name,
    password,
  });

  return user;
};
