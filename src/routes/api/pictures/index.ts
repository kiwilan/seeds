import type { FastifyPluginAsync } from 'fastify'
import { Router } from '@kiwilan/fastify-utils'
import { metaRoutes } from '~/services'
import { picturesDocs } from '~/docs'
import type { QueryParamsRaw } from '~/services/PictureService'
import { PictureService } from '~/services/PictureService'

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
        docs: picturesDocs(),
        meta: metaRoutes(),
      }
    },
  })
}

export default route
