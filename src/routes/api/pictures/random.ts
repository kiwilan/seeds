import type { FastifyPluginAsync } from 'fastify'
import { Router } from '@kiwilan/fastify-utils'
import { PictureService } from '~/services/PictureService'

const route: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.route({
    method: 'GET',
    url: Router.setRoute('/api/pictures/random'),
    async handler(request, reply) {
      const service = await PictureService.make({
        size: 'medium'
      })
      const pictures = service.getPictures()
      const picture = pictures[Math.floor(Math.random() * pictures.length)]
      const path = picture.pathFilename?.replace('large', 'medium')

      return reply.sendFile(path || '')
    },
  })
}

export default route
