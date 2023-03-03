import { fastifyStatic } from '@fastify/static'
import { Environment, LocalServer } from '@kiwilan/fastify-utils'
import { FsFile, FsPath } from '@kiwilan/filesystem'

LocalServer.run({
  apiKeyProtect: '/api',
  register: async (fastify) => {
    fastify.register(fastifyStatic, {
      root: FsPath.root('src/public'),
      prefix: '/public',
    })

    const env = await Environment.make()
    if (!env.system.IS_DEV) {
      const root = FsPath.root('src/public')
      const symLinkPath = root.replace('src', 'build')
      await FsFile.deleteDirectory(symLinkPath)
      await FsFile.link(root, symLinkPath)
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
