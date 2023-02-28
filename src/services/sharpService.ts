import { FileUtilsPromises, PathUtils } from '@kiwilan/fastify-utils'
import type { Sharp } from 'sharp'
import sharp from 'sharp'

export class SharpService {
  protected constructor(
    protected path: string,
    protected newPath: string,
    protected sharp?: Sharp
  ) {}

  public static make(path: string, newPath: string): SharpService {
    path = PathUtils.getFromRoot(`src/public/${path}`)
    newPath = PathUtils.getFromRoot(`src/public/${newPath}`)
    const self = new SharpService(path, newPath)

    self.sharp = sharp(path)

    return self
  }

  public async resize(size: number): Promise<void> {
    if (await this.fileExists())
      return

    const img = await this.sharp!
      .resize(size)
      .jpeg({ mozjpeg: true })
      .toBuffer()

    await this.save(img)
  }

  private async fileExists(): Promise<boolean> {
    return await FileUtilsPromises.checkIfFileExists(this.newPath)
  }

  private async save(b: Buffer) {
    await FileUtilsPromises.createFile(this.newPath, b)
  }
}
