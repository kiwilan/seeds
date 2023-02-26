import type { FastifyPluginAsync } from 'fastify'
import { Router } from '@kiwilan/fastify-utils'
import { PictureService } from '~/services/picture-service'

const route: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.route({
    method: 'GET',
    url: Router.setRoute('/render/:id'),
    async handler(request, reply) {
      const params = request.params as { id: string }
      const picture = await PictureService.find(params.id)

      return reply.sendFile(picture.pathFilename || '')
    },
  })
}

export default route
