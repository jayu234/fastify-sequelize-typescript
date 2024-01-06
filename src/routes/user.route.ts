import { type FastifyInstance } from 'fastify'
import { login, register } from '../controllers/user.controller'

async function userRoutes (fastify: FastifyInstance) {
  fastify.post('/register', register)
  fastify.post('/login', login)
}

export default userRoutes
