import { Dotenv, Router } from '@kiwilan/fastify-utils'

const config = Dotenv.make()

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
