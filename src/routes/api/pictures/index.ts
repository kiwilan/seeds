import type { FastifyPluginAsync } from 'fastify'
import { Router } from '@kiwilan/fastify-utils'
import type { QueryParamsRaw } from '~/services/pictureService'
import { PictureService } from '~/services/pictureService'
import { metaRoutes } from '~/services'

const route: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.route({
    method: 'GET',
    url: Router.setRoute('/api/pictures'),
    async handler(request) {
      const queryParams = request.query as QueryParamsRaw
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
