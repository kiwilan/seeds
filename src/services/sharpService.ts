import { FileUtilsPromises, PathUtils } from '@kiwilan/fastify-utils'
import sharp from 'sharp'

export class SharpService {
  protected constructor(
    protected path: string,
    protected newPath: string,
  ) {}

  public static make(path: string, newPath: string): SharpService {
    path = PathUtils.getFromRoot(`src/public/${path}`)
    newPath = PathUtils.getFromRoot(`src/public/${newPath}`)
    const self = new SharpService(path, newPath)

    return self
  }

  public async resize(size: number): Promise<Buffer | true> {
    if (await this.fileExists())
      return true

    const img = await sharp(this.path)
      .rotate()
      .resize(size)
      .jpeg({ mozjpeg: true })
      .toBuffer()

    await this.save(img)

    return img
  }

  private async fileExists(): Promise<boolean> {
    return await FileUtilsPromises.checkIfFileExists(this.newPath)
  }

  private async save(b: Buffer) {
    await FileUtilsPromises.createFile(this.newPath, b)
  }
}
