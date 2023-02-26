import type { FastifyPluginAsync } from 'fastify'
import { Router } from '@kiwilan/fastify-utils'
import { PictureService } from '~/services/picture-service'
import { metaRoutes } from '~/services'

const route: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.route({
    method: 'GET',
    url: Router.setRoute('/pictures/:id'),
    async handler(request) {
      const params = request.params as { id: string }
      const picture = await PictureService.find(params.id)

      return {
        data: picture,
        meta: metaRoutes(),
      }
    },
  })
}

export default route
