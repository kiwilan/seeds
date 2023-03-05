import { createWriteStream } from 'fs'
import archiver from 'archiver'
import { FsFile, FsPath } from '@kiwilan/filesystem'
import { PictureService } from './pictureService'
import { SharpService } from './sharpService'
import type { Size } from '~/types'

export class ZipService {
  protected constructor(
    protected paths: Size[] = [
      'medium',
      'small',
      'tiny',
    ],
    protected pictures?: PictureService,
  ) {}

  public static async make(): Promise<ZipService> {
    const self = new ZipService()

    self.pictures = await self.getPictures()

    return self
  }

  public static async convert() {
    const self = await ZipService.make()

    await Promise.all(self.paths.map(async (path) => {
      await self.resizePictures(path)
    }))

    return self
  }

  public static async zip() {
    const self = await ZipService.make()

    await self.createZip()

    return FsPath.root('/seeds-pictures/target.zip')
  }

  private async resizePictures(size: Size) {
    const pictures = this.pictures?.getFiles()

    if (!pictures)
      throw new Error('No pictures found')

    const path = FsPath.root(`src/public/seeds-pictures/${size}`)
    const exists = await FsFile.exists(path)

    let fileLength = 0
    if (!exists)
      await FsFile.makeDirectory(path, true)

    const files = await FsFile.allFiles(path)
    fileLength = files.length

    console.error(`size: ${size}, converted pictures: ${fileLength}`)
    if (pictures.length !== fileLength) {
      const path = FsPath.root(`src/public/seeds-pictures/${size}`)
      await FsFile.cleanDirectory(path)

      await Promise.all(pictures.map(async (picture) => {
        if (picture.pathFilename) {
          const sharp = SharpService.make(picture.pathFilename, size)
          await sharp.resize()
        }
      }))
    }
    const newFiles = await FsFile.allFiles(path)
    console.error(`size: ${size}, converted pictures: ${newFiles.length}`)
  }

  private async getPictures(): Promise<PictureService> {
    const pictures = PictureService.make()

    return pictures
  }

  private async createZip() {
    const path = FsPath.root('src/public/seeds-pictures/target.zip')
    const exists = await FsFile.exists(path)
    if (exists)
      return

    await FsFile.delete(path)

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

    const pictures = FsPath.root('src/public/seeds-pictures')
    archive.directory(pictures, false)

    archive.finalize()
  }
}
