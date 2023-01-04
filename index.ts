import fastify from 'fastify'
import { TodoType, UserType } from 'schema';
import fp from './db'
import { User } from './entities/user.entity';
import { Todo } from './entities/todo.entity';

const server = fastify({logger: true})
server.register(fp);

server.get('/hello', async (request, reply) => {
  return 'hello\n'
})

server.post<{ Body: UserType }>('/sign_up', async (request, reply)=>{
  const {name, password} = request.body;

  const user = await server.db.getRepository(User).save({
    name,
    password
  });

  return user;
})

server.get('/todo', async (request, reply) => {
  const todos = await server.db.getRepository(Todo).find();

  return todos;
})

server.post<{ Body: TodoType }>('/todo', async (request, reply) => {
  const { title, describe } = request.body;

  const user = await server.db.getRepository(User).findOne({where: {id: '21ac668b-b761-4214-9b98-10d3ad1e1a1a'}})

  const todo = await server.db.getRepository(Todo).save({
    title,
    describe,
    user
  });

  return todo;
})

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})