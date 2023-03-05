import type { FastifyPluginAsync } from 'fastify'
import { Router } from '@kiwilan/fastify-utils'
import { picturesDocs, picturesIdDocs } from '~/docs'
import { metaRoutes } from '~/services'

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
