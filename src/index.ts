import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { symlink } from 'fs/promises'
import { Dotenv, PathUtils, Server } from '@kiwilan/fastify-utils'
import { fastifyStatic } from '@fastify/static'

const server = Server.make()

server.start({
  callback: async (fastify) => {
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = dirname(__filename)

    fastify.register(fastifyStatic, {
      root: join(__dirname, 'public'),
      prefix: '/public',
    })

    const dotenv = Dotenv.make()
    if (!dotenv.system.IS_DEV) {
      const root = PathUtils.getFromRoot('src/public')
      await symlink(root, root.replace('src', 'build'))
    }
  },
})
