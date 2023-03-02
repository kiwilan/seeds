import { Router } from '@kiwilan/fastify-utils'

const metaRoutes = () => {
  return {
    home: Router.route('/api'),
    pictures: Router.route('/api/pictures'),
    docs: Router.route('/api/docs'),
  }
}

export {
  metaRoutes,
}
