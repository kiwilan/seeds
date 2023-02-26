import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { Server } from '@kiwilan/fastify-utils'
import { fastifyStatic } from '@fastify/static'

const server = Server.make()

server.start({
  callback: (fastify) => {
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = dirname(__filename)

    fastify.register(fastifyStatic, {
      root: join(__dirname, 'public'),
      prefix: '/public',
    })

    fastify.get('/another/path', (req, reply) => {
      return reply.sendFile('animal/ahmed-badawy-R4-DtoeKcHA-unsplash.jpg')
      // return reply.download('animal/aj-robbie-BuQ1RZckYW4-unsplash.jpg')

      return {
        data: 'hello world',
      }
    })
  },
})
