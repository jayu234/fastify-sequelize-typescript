import fastify from 'fastify'
import userRoutes from './routes/user.route'
import sequelize from './models'

const startServer = async () => {
  try {
    const server = fastify()
    server.get('/', async (_, reply) => {
      reply.code(200).send('Hello world!')
    })
    server.setErrorHandler(function (error, _, reply) {
      reply.send({
        success: false,
        data: [],
        message: error.message
      })
    })
    server.register(userRoutes, { prefix: '/user' })
    await sequelize.sync().then(() => {
      console.log('Connected to database successfully!')
    })
    server.listen({ port: 3000, host: '127.0.0.1' }, (_, address) => {
      console.log(`Server listning on ${address}`)
    })
  } catch (error) {
    console.log(error)
  }
}

startServer()
