import type { FastifyPluginAsync } from 'fastify'
import { Router } from '@kiwilan/fastify-utils'
import { PictureService } from '~/services/PictureService'

const route: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.route({
    method: 'GET',
    url: Router.setRoute('/api/pictures/random/:number'),
    async handler(request, reply) {
      const queryParams = request.query as {
        category?: string
        size?: string
      }
      const service = await PictureService.make({
        size: queryParams.size || 'medium',
        category: queryParams.category || 'all',
      })
      const pictures = service.getPictures()
      const picture = pictures[Math.floor(Math.random() * (pictures.length - 1))]

      const path = picture.pathFilename.replace('/large/', `/${queryParams.size}/`)
      // const size: Size = (queryParams.size as Size) || 'medium'
      // const sharp = SharpService.make(picture.pathFilename, size)

      return reply.sendFile(path)
    },
  })
}

export default route
