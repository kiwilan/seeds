import { createWriteStream } from 'fs'
import archiver from 'archiver'
import { FileUtilsPromises, PathUtils } from '@kiwilan/fastify-utils'
import { PictureService } from './pictureService'
import { SharpService } from './sharpService'
import type { Size } from '~/types'

export class ZipService {
  protected constructor(
    protected pictures?: PictureService,
  ) {}

  public static async make(): Promise<ZipService> {
    const self = new ZipService()

    const paths: Size[] = [
      'medium',
      'small',
      'tiny',
    ]

    self.pictures = await self.getPictures()

    await Promise.all(paths.map(async (path) => {
      self.resizePictures(path)
    }))

    console.log('ready')

    // await self.createZip()

    return self
  }

  private async resizePictures(size: Size) {
    const pictures = this.pictures?.getFiles()
    if (!pictures)
      return

    const files = await FileUtilsPromises.readDirRecursively(
      PathUtils.getFromRoot(`src/public/seeds-pictures/${size}`)
    )

    if (pictures.length !== files.length) {
      const path = PathUtils.getFromRoot(`src/public/seeds-pictures/${size}`)
      await FileUtilsPromises.clearDirectory(path)

      Promise.all(pictures.map(async (picture) => {
        if (picture.pathFilename) {
          const sharp = SharpService.make(picture.pathFilename, size)
          await sharp.resize()
        }
      }))
    }
  }

  private async getPictures(): Promise<PictureService> {
    const pictures = PictureService.make()

    return pictures
  }

  private async createZip() {
    const path = PathUtils.getFromRoot('src/public/target.zip')
    await FileUtilsPromises.removeDirectory(path)

    const output = createWriteStream(path)
    const archive = archiver('zip')

    output.on('close', () => {
      console.error(`${archive.pointer()} total bytes`)
      console.error('archiver has been finalized and the output file descriptor has closed.')
    })

    archive.on('error', (err) => {
      throw err
    })

    archive.pipe(output)

    const pictures = PathUtils.getFromRoot('src/public/seeds-pictures')
    archive.directory(pictures, false)

    archive.finalize()
  }
}
