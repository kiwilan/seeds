import { Router } from '@kiwilan/fastify-utils'

const metaRoutes = async () => {
  return {
    home: await Router.route('/api'),
    pictures: await Router.route('/api/pictures'),
    docs: await Router.route('/api/docs'),
  }
}

export {
  metaRoutes,
}
