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
  corporate = 'corporate',
  cultural = 'cultural',
  decoration = 'decoration',
  flower = 'flower',
  food = 'food',
  house = 'house',
  monument = 'monument',
  nature = 'nature',
  people = 'people',
  relationship = 'relationship',
  space = 'space',
  sport = 'sport',
  technology = 'technology',
  tvshow = 'tvshow',
  // global
  all = 'all',
  architecture = 'architecture', // building, city, decoration, house, monument
  human = 'human', // artist, corporate, cultural, people, relationship, sport
  wildlife = 'wildlife', // animal, flower, nature, space
  entertainment = 'entertainment', // tvshow
  mainstream = 'mainstream', // building, city, corporate, decoration, food, house, monument, nature, people, technology
}

export function filterCategories(category?: PictureCategory): string[] {
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
      PictureCategory.house,
      PictureCategory.monument,
    ],
    human: [
      PictureCategory.artist,
      PictureCategory.corporate,
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
    entertainment: [
      PictureCategory.tvshow,
    ],
    mainstream: [
      PictureCategory.building,
      PictureCategory.city,
      PictureCategory.corporate,
      PictureCategory.decoration,
      PictureCategory.food,
      PictureCategory.house,
      PictureCategory.monument,
      PictureCategory.nature,
      PictureCategory.people,
      PictureCategory.technology,
    ],
  }

  if (
    category !== PictureCategory.all
    && category !== PictureCategory.architecture
    && category !== PictureCategory.human
    && category !== PictureCategory.wildlife
    && category !== PictureCategory.entertainment
  )
    return [category]

  let categoriesAllowed: string[] = []
  const current: PictureCategory = category || [PictureCategory.all]
  categoriesAllowed = categories[current]

  return categoriesAllowed
}
