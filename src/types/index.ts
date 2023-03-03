export type Size = 'large' | 'medium' | 'small' | 'tiny'

export enum SizeConvert {
  large = '1920',
  medium = '1280',
  small = '640',
  tiny = '340',
}

export enum PictureCategory {
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

// export declare namespace Route {
//   export type Endpoint = '/api/docs' | '/api' | '/api/pictures/:id' | '/api/pictures/:id/render' | '/api/pictures' | '/api/pictures/zip' | '/'
// }
