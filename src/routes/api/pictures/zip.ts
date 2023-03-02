import type { FastifyPluginAsync } from 'fastify'
import { Router } from '@kiwilan/fastify-utils'
import { metaRoutes } from '~/services'
import { ZipService } from '~/services/zipService'

const route: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.route({
    method: 'GET',
    url: Router.setRoute('/api/pictures/zip'),
    async handler(request) {
      const zip = await ZipService.make()
      // const queryParams = request.query as QueryParamsRaw
      // const service = await PictureService.make(queryParams)

      return {
        // data: service.getPictures(),
        // count: service.getPictures().length,
        // docs: picturesDocs(),
        meta: metaRoutes(),
      }
    },
  })
}

export default route
