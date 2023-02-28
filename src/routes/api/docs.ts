import type { FastifyPluginAsync } from 'fastify'
import { Router } from '@kiwilan/fastify-utils'
import { metaRoutes } from '~/services'
import { picturesDocs, picturesIdDocs } from '~/docs'

const route: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.route({
    method: 'GET',
    url: Router.setRoute('/api/docs'),
    async handler() {
      return {
        pictures: picturesDocs(),
        picturesId: picturesIdDocs(),
        meta: metaRoutes()
      }
    },
  })
}

export default route
