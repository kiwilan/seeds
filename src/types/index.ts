export type Size = 'large' | 'medium' | 'small' | 'tiny'

export enum SizeConvert {
  large = '1920',
  medium = '1280',
  small = '640',
  tiny = '340',
}

export enum PictureCategory {
  animal = 'animal',
  artist = 'artist',
  building = 'building',
  city = 'city',
  cultural = 'cultural',
  decoration = 'decoration',
  flower = 'flower',
  food = 'food',
  monument = 'monument',
  nature = 'nature',
  people = 'people',
  relationship = 'relationship',
  space = 'space',
  sport = 'sport',
  technology = 'technology',
  // global
  all = 'all',
  architecture = 'architecture', // building, city, decoration, monument
  human = 'human', // artist, cultural, people, relationship, sport
  wildlife = 'wildlife', // animal, flower, nature, space
}

export const filterCategories = (category?: PictureCategory): string[] => {
  if (!category)
    category = PictureCategory.all

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
      PictureCategory.artist,
      PictureCategory.cultural,
      PictureCategory.people,
      PictureCategory.relationship,
      PictureCategory.sport,
    ],
    wildlife: [
      PictureCategory.animal,
      PictureCategory.flower,
      PictureCategory.nature,
      PictureCategory.space,
    ],
  }

  if (
    category !== PictureCategory.all
    && category !== PictureCategory.architecture
    && category !== PictureCategory.human
    && category !== PictureCategory.wildlife
  )
    return [category]

  let categoriesAllowed: string[] = []
  const current: PictureCategory = category || [PictureCategory.all]
  categoriesAllowed = categories[current]

  return categoriesAllowed
}

// export declare namespace Route {
//   export type Endpoint = '/api/docs' | '/api' | '/api/pictures/:id' | '/api/pictures/:id/render' | '/api/pictures' | '/api/pictures/zip' | '/'
// }
