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
      // const path = originalPath
      const path = originalPath.replace('/large/', `/${query.size}/`)

      if (query.size && query.size !== 'large') {
        const sizes = {
          tiny: 340,
          small: 640,
          medium: 1280,
        }

        await SharpService.make(originalPath, path)
          .resize(sizes[query.size])
      }

      if (query.download)
        return reply.download(path)

      return reply.sendFile(path)
    },
  })
}

export default route
