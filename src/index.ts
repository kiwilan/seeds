import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { symlink } from 'fs/promises'
import { Environment, FileUtilsPromises, LocalServer, PathUtils } from '@kiwilan/fastify-utils'
import { fastifyStatic } from '@fastify/static'

const server = LocalServer.make()

console.log(process.env.BASE_URL, process.env.PORT)

server.start({
  apiKeyProtect: '/api',
  register: async (fastify) => {
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = dirname(__filename)

    fastify.register(fastifyStatic, {
      root: join(__dirname, 'public'),
      prefix: '/public',
    })

    const env = Environment.make()
    if (!env.system.IS_DEV) {
      const root = PathUtils.getFromRoot('src/public')
      const symLinkPath = root.replace('src', 'build')
      await FileUtilsPromises.removeDirectory(symLinkPath)
      await symlink(root, symLinkPath)
    }
  },
  // autoMiddleware: (query) => [
  //   {
  //     endpoint: '/api/pictures',
  //     condition: query?.url === undefined,
  //     abort: true,
  //     code: 500,
  //     message: '`url` query is required.',
  //   }
  // ],
})
