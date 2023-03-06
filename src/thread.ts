import { Worker, workerData } from 'node:worker_threads'

/**
* Use a worker via Worker Threads module to make intensive CPU task
*/
export const useWorker = (filepath: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const worker = new Worker(filepath)

    worker.on('online', () => {
      console.error('Launching intensive CPU task')
    })
    workerData.on('message', (messageFromWorker: any) => {
      console.error(messageFromWorker)

      return resolve
    })

    worker.on('error', reject)
    worker.on('exit', code => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`))
    })
  })
}
