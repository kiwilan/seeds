import { Dotenv, Router } from '@kiwilan/fastify-utils'

const config = Dotenv.make()

const metaRoutes = () => {
  return {
    home: Router.route('/'),
    pictures: Router.route('/pictures'),
    docs: Router.route('/docs'),
  }
}

export {
  metaRoutes,
}
