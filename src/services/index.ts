import { Router } from '@kiwilan/fastify-utils'

function metaRoutes() {
  return {
    home: Router.route('/api'),
    pictures: Router.route('/api/pictures'),
    picturesRandom: Router.route('/api/pictures/random'),
    docs: Router.route('/api/docs'),
  }
}

export {
  metaRoutes,
}
