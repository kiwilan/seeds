import type { FastifyPluginAsync } from 'fastify'
import { Router } from '@kiwilan/fastify-utils'
import { PictureService } from '~/services/PictureService'
import { metaRoutes } from '~/services'

const route: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.route({
    method: 'GET',
    url: Router.setRoute('/api/pictures/array'),
    async handler() {
      const service = await PictureService.make({
        size: 'medium',
        max: 'true',
      })
      const pictures = service.getPictures()

      const urls: string[] = []
      pictures.forEach(picture => {
        urls.push(picture.links?.render ?? '')
      })

      return {
        data: urls,
        meta: metaRoutes(),
      }
    },
  })
}

export default route
