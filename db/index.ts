import fp from "fastify-plugin";
import typeOrmDatabaseSource from './ormconfig';

export default fp(async (server) => {

  const db = await typeOrmDatabaseSource.initialize();
  
  server.decorate('db', db);
});