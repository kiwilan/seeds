'use strict'

import { parentPort } from 'worker_threads'
import { DotenvLoader } from '@kiwilan/fastify-utils'
import { ZipService } from '@/src/services/zipService'

// const worker = async ({ a, b }: { a: number; b: number }) => {
//   console.log('Worker called')
//   // return a + b
// }

// export default worker

const loader = await DotenvLoader.make()
const env = await loader.get()

globalThis.dotenv = env

await ZipService.convert()

const message = 'Intensive CPU task is done !'

parentPort?.postMessage(message)
