import type { FastifyPluginAsync } from 'fastify'
import { Router } from '@kiwilan/fastify-utils'
import { PictureService } from '~/services/pictureService'
import type { Size } from '~/types'
import { SharpService } from '~/services/sharpService'

const route: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.route({
    method: 'GET',
    url: Router.setRoute('/api/pictures/:id/render'),
    async handler(request, reply) {
      const params = request.params as { id: string }
      const query = request.query as { size?: Size; download?: boolean }
      const picture = await PictureService.find(params.id)

      if (!picture.pathFilename) {
        reply.code(404)
        return reply.send({ message: 'Picture not found' })
      }

      const originalPath = picture.pathFilename
      const sharp = SharpService.make(originalPath, query.size || 'large')

      if (query.size && query.size !== 'large')
        sharp.resize()

      if (query.download)
        return reply.download(sharp.getNewPathOrigin())

      return reply.sendFile(sharp.getNewPathOrigin())
    },
  })
}

export default route
