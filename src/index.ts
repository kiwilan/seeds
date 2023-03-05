import { Worker } from 'worker_threads'
import { LocalServer } from '@kiwilan/fastify-utils'
import fastifyStatic from '@fastify/static'
import { FsFile, FsPath } from '@kiwilan/filesystem'

/**
* Use a worker via Worker Threads module to make intensive CPU task
* @param filepath string relative path to the file containing intensive CPU task code
* @return {Promise(mixed)} a promise that contains result from intensive CPU task
*/
const _useWorker = (filepath: string) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker(filepath)

    worker.on('online', () => {
      console.log('Launching intensive CPU task')
    })
    worker.on('message', messageFromWorker => {
      console.log(messageFromWorker)

      return resolve
    })

    worker.on('error', reject)
    worker.on('exit', code => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`))
    })
  })
}

LocalServer.run({
  apiKeyProtect: '/api',
  register: async (fastify) => {
    fastify.register(fastifyStatic, {
      root: FsPath.root('src/public'),
      prefix: '/public',
    })

    if (!dotenv.IS_DEV) {
      const root = FsPath.root('src/public')
      const symLinkPath = root.replace('src', 'build')
      await FsFile.deleteDirectory(symLinkPath)
      await FsFile.link(root, symLinkPath)
    }
  },
  afterStart: async () => {
    // const path = dotenv.IS_DEV
    //   ? FsPath.root('src/worker.ts')
    //   : FsPath.root('build/worker.mjs')
    // await _useWorker(path)
  },
})
