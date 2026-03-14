import dotenv from 'dotenv'
import path from 'path'
import { defineConfig, env } from 'prisma/config';

dotenv.config({
  path: path.resolve(path.dirname(__filename), '../../.env')
})

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx prisma/seed.ts'
  },
  datasource: {
    url: env('DATABASE_URL'),
  },
});