import { FsFile, FsPath } from '@kiwilan/filesystem'
import type { Sharp } from 'sharp'
import sharp from 'sharp'
import type { Size } from '~/types'
import { SizeConvert } from '~/types'

export class SharpService {
  protected constructor(
    protected origin: string,
    protected originalPath: string,
    protected newPath: string,
    protected newPathOrigin?: string,
    protected sharp?: Sharp,
    protected size?: number,
  ) {}

  public static make(origin: string, size: Size): SharpService {
    const sizeQuery: string = SizeConvert[size as keyof typeof SizeConvert] as string
    const sizeWidth: number = parseInt(sizeQuery)

    const originalPath = FsPath.root(`src/public/${origin}`)
    let newPath = originalPath
    newPath = originalPath.replace('/large/', `/${size}/`)

    const self = new SharpService(origin, originalPath, newPath)

    self.size = sizeWidth
    self.sharp = sharp(originalPath)
    self.newPathOrigin = newPath.replace(FsPath.root('src/public'), '')

    return self
  }

  public getOrigin(): string {
    return this.origin
  }

  public getOriginalPath(): string {
    return this.originalPath
  }

  public getNewPath(): string {
    return this.newPath
  }

  public getNewPathOrigin(): string {
    return this.newPathOrigin!
  }

  public async resize(): Promise<void> {
    if (await this.fileExists())
      return

    const img = await this.sharp!
      .resize(this.size)
      .jpeg({ mozjpeg: true })
      .toBuffer()

    await this.save(img)
  }

  private async fileExists(): Promise<boolean> {
    return await FsFile.exists(this.newPath)
  }

  private async save(b: Buffer) {
    await FsFile.put(this.newPath, b)
  }
}
