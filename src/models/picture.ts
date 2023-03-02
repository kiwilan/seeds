import { statSync } from 'fs'
import { Environment } from '@kiwilan/fastify-utils'
import type { Size } from '~/types'

export class Picture {
  protected constructor(
    public readonly filename: string,
    public readonly extension?: string,
    public readonly sizeRender?: Size,
    public pathFilename?: string,
    public id?: string,
    public category?: string,
    public size?: number,
    public sizeHuman?: string,
    public date?: Date,
    public credits?: {
      provider?: string
      author?: string
      url?: string
    },
    public links?: {
      show?: string
      render?: string
      renderSmall?: string
      download?: string
    }
  ) {}

  public static make(path: string, sizeRender: Size): Picture {
    const env = Environment.make()
    const url = env.system.API_URL
    const splitted = path.split('/')

    const file = splitted[splitted.length - 1] || 'unknown'
    const fname = file.split('.')
    const extension = fname.pop() || 'unknown'
    const filename = fname.pop() || 'unknown'

    const splitCredits = filename.split('-')
    const author = `${splitCredits.shift()} ${splitCredits.shift()}`.trim()
    const token = splitCredits.shift()

    const self = new Picture(filename, extension, sizeRender)
    // self.id = Math.random().toString(36).slice(2, 16)
    // self.id = token
    self.id = self.slugify(filename)
    self.category = splitted[splitted.length - 2] || 'unknown'
    self.size = self.setSize(path)
    self.sizeHuman = self.setSizeHuman(path)
    self.date = self.setDate(path)

    const renderName = path.split('public/')
    self.pathFilename = renderName[1]

    const showLink = `${url}/api/pictures/${self.id}`
    self.links = {
      show: `${showLink}?size=${sizeRender}`,
      render: `${showLink}/render?size=${sizeRender}`,
    }

    self.credits = {
      provider: 'unsplash.com',
      author,
      url: `https://unsplash.com/photos/${token}`
    }

    return self
  }

  private slugify(text: string) {
    return text
      .toString()
      .normalize('NFD')
      .replace(/[\u0300-\u036F]/g, '')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
  }

  private setDate(path: string): Date {
    const stats = statSync(path)
    const mtime = stats.mtime

    return mtime
  }

  private setSize(path: string): number {
    const stats = statSync(path)
    const fileSizeInBytes = stats.size
    return fileSizeInBytes
  }

  private setSizeHuman(path: string) {
    const size = this.setSize(path)
    const i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024))
    const res = (size / 1024 ** i).toFixed(2)
    return `${Number(res) * 1} ${['B', 'kB', 'MB', 'GB', 'TB'][i]}`
  }
}
