import { FileUtilsPromises } from '@kiwilan/fastify-utils'
import { Picture } from '~/models/picture'
import { PictureCategory } from '~/types'
import type { Size } from '~/types'

export interface QueryParamsRaw {
  category?: string
  count?: string
  size?: string
  shuffle?: string
}

export interface QueryParams {
  category?: PictureCategory
  count?: number
  size?: Size
  shuffle?: boolean
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

    self.query = {
      category: categoryQuery,
      count: countQuery,
      size: sizeQuery,
      shuffle: shuffleQuery,
    }
    self.category = self.query.category as PictureCategory
    self.categoriesAllowed = self.setCategoriesAllowed()

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
      if (this.query.count < originalList.length) {
        const count = this.query.count
        const pictures = originalList.slice(0, count)
        finalList.push(...pictures)
      }

      if (this.query.count > originalList.length) {
        for (let i = 0; i < this.query.count; i++)
          finalList.push(originalList[i % originalList.length])
      }
    }
    else {
      finalList.push(...originalList)
    }

    return finalList
  }

  private async setFiles(): Promise<Picture[]> {
    const list = await FileUtilsPromises.readDirRecursively(this.path, ['.jpg'])

    const pictures: Picture[] = []
    list.forEach(el => {
      pictures.push(Picture.make(el, this.query.size!))
    })

    return pictures
  }

  private setCategoriesAllowed(): string[] {
    if (!this.category)
      this.category = PictureCategory.all

    const categories = {
      all: [
        PictureCategory.animal,
        PictureCategory.building,
        PictureCategory.city,
        PictureCategory.cultural,
        PictureCategory.decoration,
        PictureCategory.food,
        PictureCategory.monument,
        PictureCategory.nature,
        PictureCategory.people,
        PictureCategory.relationship,
        PictureCategory.space,
        PictureCategory.technology,
      ],
      architecture: [
        PictureCategory.building,
        PictureCategory.city,
        PictureCategory.decoration,
        PictureCategory.monument,
      ],
      human: [
        PictureCategory.cultural,
        PictureCategory.people,
        PictureCategory.relationship,
      ],
      wildlife: [
        PictureCategory.animal,
        PictureCategory.nature,
        PictureCategory.space,
      ],
    }

    if (
      this.category !== PictureCategory.all
      && this.category !== PictureCategory.architecture
      && this.category !== PictureCategory.human
      && this.category !== PictureCategory.wildlife
    )
      return [this.category]

    let categoriesAllowed: string[] = []
    const current: PictureCategory = this.category || [PictureCategory.all]
    categoriesAllowed = categories[current]

    return categoriesAllowed
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
