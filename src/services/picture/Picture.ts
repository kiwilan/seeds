import { statSync } from 'fs'
import { Dotenv } from '@kiwilan/fastify-utils'

export class Picture {
  protected constructor(
    public readonly path: string,
    public readonly filename: string,
    public readonly extension?: string,
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
      download?: string
    }
  ) {}

  public static make(path: string): Picture {
    const dotenv = Dotenv.make()
    const url = dotenv.system.API_URL
    const splitted = path.split('/')

    const file = splitted[splitted.length - 1] || 'unknown'
    const fname = file.split('.')
    const extension = fname.pop() || 'unknown'
    const filename = fname.pop() || 'unknown'

    const splitCredits = filename.split('-')
    const author = `${splitCredits.shift()} ${splitCredits.shift()}`.trim()
    const token = splitCredits.shift()

    const self = new Picture(path, filename, extension)
    // self.id = Math.random().toString(36).slice(2, 16)
    // self.id = token
    self.id = self.slugify(filename)
    self.category = splitted[splitted.length - 2] || 'unknown'
    self.size = self.setSize()
    self.sizeHuman = self.setSizeHuman()
    self.date = self.setDate()

    const renderName = self.path.split('public/')
    self.pathFilename = renderName[1]
    self.links = {
      show: `${url}/pictures/${self.id}`,
      render: `${url}/render/${self.id}`,
      download: `${url}/download/${self.id}`
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

  private setDate(): Date {
    const stats = statSync(this.path)
    const mtime = stats.mtime

    return mtime
  }

  private setSize(): number {
    const stats = statSync(this.path)
    const fileSizeInBytes = stats.size
    return fileSizeInBytes
  }

  private setSizeHuman() {
    const size = this.setSize()
    const i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024))
    const res = (size / 1024 ** i).toFixed(2)
    return `${Number(res) * 1} ${['B', 'kB', 'MB', 'GB', 'TB'][i]}`
  }
}
