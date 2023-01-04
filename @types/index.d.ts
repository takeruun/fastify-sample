import { DataSource } from "typeorm"

declare module 'fastify' {
  export interface FastifyInstance {
    db: DataSource
  }
}