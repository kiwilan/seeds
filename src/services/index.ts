import { Dotenv, Router } from '@kiwilan/fastify-utils'

const config = Dotenv.make()

const metaRoutes = () => {
  return {
    home: Router.route('/'),
    posts: Router.route('/posts'),
  }
}

export {
  metaRoutes,
}
