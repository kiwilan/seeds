import { Server } from '@kiwilan/fastify-utils'
import fastifyStatic from '@fastify/static'
import { FsFile, FsPath } from '@kiwilan/filesystem'

Server.run({
  apiKeyProtect: '/api',
  register: async (fastify) => {
    fastify.register(fastifyStatic, {
      root: FsPath.root('src/public'),
      prefix: '/public',
    })

    if (!dotenv.IS_DEV) {
      const root = FsPath.root('src/public')
      const symLinkPath = root.replace('src', 'build')
      await FsFile.deleteDirectory(symLinkPath)
      await FsFile.link(root, symLinkPath)
    }
  },
})
