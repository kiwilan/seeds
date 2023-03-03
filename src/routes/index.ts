import { Router } from '@kiwilan/fastify-utils'
import { metaRoutes } from '../services'

export default Router.newRoute({
  endpoint: '/',
  action: async () => {
    return {
      title: 'Seeds API',
      description: 'A simple API to get random pictures for seeds and fake data.',
      meta: await metaRoutes()
    }
  }
})
