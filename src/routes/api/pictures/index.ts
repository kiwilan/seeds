import type { FastifyPluginAsync } from 'fastify'
import { Router } from '@kiwilan/fastify-utils'
import type { QueryParams } from '~/services/picture-service'
import { PictureService } from '~/services/picture-service'
import { metaRoutes } from '~/services'

const route: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.route({
    method: 'GET',
    url: Router.setRoute('/api/pictures'),
    async handler(request, reply) {
      const queryParams = request.query as QueryParams
      const service = await PictureService.make(queryParams)

      return {
        data: service.getPictures(),
        count: service.getPictures().length,
        meta: metaRoutes()
      }
    },
  })
}

export default route
