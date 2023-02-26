import { FileUtilsPromises } from '@kiwilan/fastify-utils'
import { Picture } from './picture/Picture'

export interface QueryParams {
  category?: string
  count?: number
}

enum PictureCategory {
  animal = 'animal',
  building = 'building',
  city = 'city',
  cultural = 'cultural',
  decoration = 'decoration',
  food = 'food',
  monument = 'monument',
  nature = 'nature',
  people = 'people',
  relationship = 'relationship',
  space = 'space',
  technology = 'technology',
  // global
  all = 'all',
  architecture = 'architecture', // building, city, decoration, monument
  human = 'human', // cultural, people, relationship
  wildlife = 'wildlife', // animal, nature, space
}

export class PictureService {
  protected constructor(
    protected readonly path: string = 'src/public',
    protected query: QueryParams = {},
    protected category: PictureCategory = PictureCategory.all,
    protected categoriesAllowed: string[] = [],
    protected files: Picture[] = [],
    protected pictures: Picture[] = []
  ) {}

  public static async make(query?: QueryParams): Promise<PictureService> {
    const self = new PictureService()
    query = query || { category: 'all', count: 10 }

    self.query = query
    self.category = PictureCategory[query.category as keyof typeof PictureCategory]
    self.categoriesAllowed = self.setCategoriesAllowed()

    self.files = await self.setFiles()
    self.pictures = self.setPictures()

    return self
  }

  public static async find(id: string): Promise<Picture> {
    const self = await PictureService.make()
    const picture = self.files.find(picture => picture.id === id)

    if (!picture)
      throw new Error('Picture not found')

    return picture
  }

  private setPictures(): Picture[] {
    const originalList: Picture[] = []
    const finalList: Picture[] = []

    this.files.forEach(picture => {
      if (picture.category && this.categoriesAllowed.includes(picture.category))
        originalList.push(picture)
    })

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

    return finalList
  }

  private async setFiles(): Promise<Picture[]> {
    const list = await FileUtilsPromises.readDirRecursively(this.path, ['.jpg'])

    const pictures: Picture[] = []
    list.forEach(el => {
      pictures.push(Picture.make(el))
    })

    return pictures
  }

  private setCategoriesAllowed(): string[] {
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

    let categoriesAllowed: string[] = []
    const current: PictureCategory = this.category || [PictureCategory.all]
    // @ts-expect-error - TS doesn't know that current is a key of categories
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
    return this.shuffle<Picture>(this.pictures)
  }
}
