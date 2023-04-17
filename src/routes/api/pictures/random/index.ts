import type { FastifyPluginAsync } from 'fastify'
import { Router } from '@kiwilan/fastify-utils'
import { PictureService } from '~/services/PictureService'
import { metaRoutes } from '~/services'

const route: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.route({
    method: 'GET',
    url: Router.setRoute('/api/pictures/random'),
    async handler(request, reply) {
      const queryParams = request.query as {
        category?: string
        size?: string
        render?: string
      }
      const service = await PictureService.make({
        size: queryParams.size || 'medium',
      })
      let pictures = service.getPictures()
      if (queryParams.category)
        pictures = pictures.filter(picture => picture.category === queryParams.category)
      const picture = pictures[Math.floor(Math.random() * pictures.length)]

      if (queryParams.render === 'true') {
        let path = picture.pathFilename as string
        path = path.replace('large', queryParams.size || 'medium')
        return reply.sendFile(path)
      }

      return {
        data: picture,
        meta: metaRoutes(),
      }
    },
  })
}

export default route
