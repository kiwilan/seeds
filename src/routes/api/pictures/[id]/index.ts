import type { FastifyPluginAsync } from 'fastify'
import { Router } from '@kiwilan/fastify-utils'
import { PictureService } from '~/services/pictureService'
import { metaRoutes } from '~/services'
import type { Size } from '~/types'
import { picturesIdDocs } from '~/docs'

const route: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.route({
    method: 'GET',
    url: Router.setRoute('/api/pictures/:id'),
    async handler(request) {
      const query = request.query as { size?: Size }
      const params = request.params as { id: string }
      const picture = await PictureService.find(params.id, query)

      return {
        data: picture,
        docs: picturesIdDocs(),
        meta: metaRoutes(),
      }
    },
  })
}

export default route
