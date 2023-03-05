import type { FastifyPluginAsync } from 'fastify'
import { Router } from '@kiwilan/fastify-utils'
import { metaRoutes } from '~/services'

const route: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.route({
    method: 'GET',
    url: Router.setRoute('/api/pictures/zip'),
    async handler() {
      // const zip = await ZipService.make()

      return {
        meta: metaRoutes(),
      }
    },
  })
}

export default route
