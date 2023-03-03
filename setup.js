import { Compiler } from '@kiwilan/fastify-utils/compiler'

Compiler.make({
  external: ['sharp'],
  useNativeNodeModules: true,
})
