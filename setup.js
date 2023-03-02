import { Compiler } from '@kiwilan/fastify-utils'

Compiler.make({
  external: ['sharp'],
  useNativeNodeModules: true,
})
