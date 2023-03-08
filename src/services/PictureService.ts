import { FsFile } from '@kiwilan/filesystem'
import { Picture } from '~/models/picture'
import { PictureCategory, filterCategories } from '~/types'
import type { Size } from '~/types'

export interface QueryParamsRaw {
  category?: string
  count?: string
  size?: string
  shuffle?: string
  max?: string
}

export interface QueryParams {
  category?: PictureCategory
  count?: number
  size?: Size
  shuffle?: boolean
  max?: boolean
}

export class PictureService {
  protected constructor(
    protected path: string = 'src/public/seeds-pictures/large',
    protected query: QueryParams = {},
    protected category: PictureCategory = PictureCategory.all,
    protected categoriesAllowed: string[] = [],
    protected files: Picture[] = [],
    protected pictures: Picture[] = []
  ) {}

  public static async make(query?: QueryParamsRaw): Promise<PictureService> {
    const self = new PictureService()

    const defaultQuery = { category: PictureCategory.all, count: 10, size: 'large', shuffle: true }

    const categoryQuery: PictureCategory = query?.category ? PictureCategory[query?.category as keyof typeof PictureCategory] : defaultQuery.category
    const countQuery: number = query?.count ? parseInt(query?.count) : defaultQuery.count
    const sizeQuery: Size = query?.size ? query?.size as Size : defaultQuery.size as Size
    const shuffleQuery: boolean = query?.shuffle !== undefined ? JSON.parse(`${query?.shuffle}`) : defaultQuery.shuffle
    const maxQuery: boolean = query?.max !== undefined ? JSON.parse(`${query?.max}`) : false

    self.query = {
      category: categoryQuery,
      count: countQuery,
      size: sizeQuery,
      shuffle: shuffleQuery,
      max: maxQuery,
    }
    self.category = self.query.category as PictureCategory
    self.categoriesAllowed = filterCategories(self.category)

    self.files = await self.setFiles()
    self.pictures = self.setPictures()

    return self
  }

  public static async find(id: string, query?: QueryParamsRaw): Promise<Picture> {
    const self = await PictureService.make(query)
    const picture = self.files.find(picture => picture.id === id)

    if (!picture)
      throw new Error('Picture not found')

    return picture
  }

  private setPictures(): Picture[] {
    let originalList: Picture[] = []
    const finalList: Picture[] = []

    this.files.forEach(picture => {
      if (picture.category && this.categoriesAllowed.includes(picture.category))
        originalList.push(picture)
    })

    if (this.query.shuffle)
      originalList = this.shuffle<Picture>(originalList)

    if (this.query.count) {
      if (!this.query.max && this.query.count <= originalList.length) {
        const count = this.query.count
        const pictures = originalList.slice(0, count)
        finalList.push(...pictures)
      }

      if (!this.query.max && this.query.count > originalList.length) {
        for (let i = 0; i < this.query.count; i++)
          finalList.push(originalList[i % originalList.length])
      }

      if (this.query.max)
        finalList.push(...originalList)
    }
    else {
      finalList.push(...originalList)
    }

    return finalList
  }

  private async setFiles(): Promise<Picture[]> {
    const list = await FsFile.allFilesGlob({
      directory: this.path,
      extensions: ['jpg'],
    })

    const pictures: Picture[] = []
    await Promise.all(list.map(async el => {
      const picture = await Picture.make(el.path, this.query.size!)
      pictures.push(picture)
    }))

    return pictures
  }

  private shuffle<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }

    return array
  }

  public getFiles(): Picture[] {
    return this.files
  }

  public getPictures(): Picture[] {
    return this.pictures
  }
}
