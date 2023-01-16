import fastify, { FastifyInstance } from 'fastify';
import { TodoType, UserType } from 'schema';
import fp from './db';
import { User } from './entities/user.entity';
import { Todo } from './entities/todo.entity';
import fastifySwagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { writeFileSync } from 'fs';

const server = fastify({ logger: true });
server.register(fp);

server.register(fastifySwagger, {
  swagger: {
    info: {
      title: 'Fastify todo api',
      description: 'Fastify todo api Swagger',
      version: '1.0.0',
    },
    host: 'localhost:8080',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    securityDefinitions: {
      apiKey: {
        type: 'apiKey',
        name: 'Cookie',
        in: '_fastify-todo_access-token',
      },
    },
  },
  openapi: {
    info: {
      title: 'Fastify todo api',
      description: 'Fastify todo api Swagger',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'localhost:8080',
      },
    ],
  },
});

server.register(swaggerUi, {
  routePrefix: '/docs',
  staticCSP: true,
});

const helloRoutes = async (server: FastifyInstance): Promise<void> => {
  server.get(
    '/hello',
    {
      schema: {
        summary: 'sample api',
        response: {
          200: { type: 'string' },
        },
      },
    },
    async (_request, _reply) => {
      return 'hello\n';
    },
  );
};

server.addSchema({
  $id: 'user',
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
  },
});
server.addSchema({
  $id: 'todo',
  type: 'object',
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    describe: { type: 'string' },
    userId: { type: 'string' },
    user: { $ref: 'user#' },
  },
});
const todoRoutes = async (server: FastifyInstance): Promise<void> => {
  server.get(
    '/todo',
    {
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
    },
    async (_request, _reply) => {
      const todos = await server.db.getRepository(Todo).find();

      return todos;
    },
  );
  server.post<{ Body: TodoType }>(
    '/todo',
    {
      schema: {
        response: {
          200: {
            $ref: 'todo#',
          },
        },
      },
    },
    async (request, _reply) => {
      const { title, describe } = request.body;

      const user = await server.db
        .getRepository(User)
        .findOne({ where: { id: '21ac668b-b761-4214-9b98-10d3ad1e1a1a' } });

      const todo = await server.db.getRepository(Todo).save({
        title,
        describe,
        user,
      });

      return todo;
    },
  );
};
const authRoutes = async (server: FastifyInstance): Promise<void> => {
  server.post<{ Body: UserType }>(
    '/sign_up',
    {
      schema: {
        response: {
          200: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
            },
          },
        },
      },
    },
    async (request, _reply) => {
      const { name, password } = request.body;

      const user = await server.db.getRepository(User).save({
        name,
        password,
      });

      return user;
    },
  );
};

server.register(helloRoutes);
server.register(todoRoutes);
server.register(authRoutes);

const setYml = async () => {
  // generate sjon
  const responseJson = await server.inject('/docs/yaml');
  writeFileSync('docs/openapi.yml', responseJson.payload);
};

setYml();

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
