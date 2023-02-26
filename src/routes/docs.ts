import type { FastifyPluginAsync } from 'fastify'
import { Router } from '@kiwilan/fastify-utils'
import { metaRoutes } from '~/services'

const route: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.route({
    method: 'GET',
    url: Router.setRoute('/docs'),
    async handler() {
      return {
        pictures: {
          route: Router.route('/pictures'),
          query: {
            category: {
              description: 'The category of the picture',
              type: 'string',
              required: false,
              default: 'all',
              enum: [
                'animal',
                'building',
                'city',
                'cultural',
                'decoration',
                'food',
                'monument',
                'nature',
                'people',
                'relationship',
                'space',
                'technology',
                'all',
                'architecture',
                'human',
                'wildlife',
              ],
              extras: '`all` is the default value. `architecture` is a combination of `building`, `city`, `decoration` and `monument`. `human` is a combination of `cultural`, `people` and `relationship`. `wildlife` is a combination of `animal`, `nature` and `space`.'
            },
            count: {
              description: 'The number of pictures to return',
              type: 'number',
              required: false,
              default: 10,
              extras: 'If the `count` is greater than the number of pictures available, some pictures will be returned more than once.',
            },
          }
        },
        meta: metaRoutes()
      }
    },
  })
}

export default route
