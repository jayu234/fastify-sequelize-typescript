import { type FastifyReply, type FastifyRequest } from 'fastify'
import bcrypt from 'bcryptjs'
import User from '../models/user.model'
import jwt from 'jsonwebtoken'

interface IRequestBody {
  email: string
  password: string
}

interface IUser {
  id: number
  email: string
  password: string
  createdAt: Date
  updatedAt: Date
}

export const login = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  const { email, password } = request.body as IRequestBody
  if (!email || !password) {
    reply.code(400).send(new Error('Please provide all credentials!'))
  }
  const user = await User.findOne({ where: { email } }) as IUser
  if (!user) {
    reply.code(401).send(new Error('Invalid credentials!'))
  }
  const isPasswordMatched = await bcrypt.compare(password, user.password)
  if (!isPasswordMatched) {
    reply.code(401).send(new Error('Invalid credentials!'))
  }
  const token = jwt.sign({ id: user.id }, 'JWT_SECRET', { expiresIn: '4d' })
  reply.header('token', token)
  reply.code(200).send({
    success: true,
    data: user,
    message: 'Logged in successfully!'
  })
}

export const register = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  const { email, password } = request.body as IUser
  if (!email || !password) {
    reply.code(400).send(new Error('Please provide all credentials!'))
  }
  const user = await User.create(request.body as IUser)
  if (!user) {
    reply.code(500).send(new Error('Failed to register user. Try again!'))
  }
  reply.code(201).send({
    success: true,
    data: user,
    message: 'Registered successfully!'
  })
}
