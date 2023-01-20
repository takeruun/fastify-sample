import fastify from 'fastify';
import fp from './db';
import fastifySwagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { writeFileSync } from 'fs';
import { setRoute } from './routes';

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
  refResolver: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    buildLocalReference(json, _baseUri, _fragment, _i) {
      return `${json.$id}`;
    },
  },
});

server.register(swaggerUi, {
  routePrefix: '/docs',
  staticCSP: true,
});

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

setRoute(server);

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

export default server;
