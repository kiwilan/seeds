import type { FastifyPluginAsync } from 'fastify'
import { Router } from '@kiwilan/fastify-utils'
import { FsPath } from '@kiwilan/filesystem'
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

      const picturePath = FsPath.root(`src/public/${picture.pathFilename}`)
      const path = picturePath.replace('/large/', `/${queryParams.size}/`)
      // const size: Size = (queryParams.size as Size) || 'medium'
      // const sharp = SharpService.make(picture.pathFilename, size)

      // return reply.sendFile(path)
      return {
        path
      }
    },
  })
}

export default route
