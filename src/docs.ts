import { Router } from '@kiwilan/fastify-utils'

const size = {
  description: 'The size of the picture',
  type: 'string',
  required: false,
  default: 'large',
  enum: [
    'large',
    'medium',
    'small',
    'tiny',
  ],
  extras: '`large` equals to `1920` pixels width. `medium` equals to `1280` pixels width. `small` equals to `640` pixels width. `tiny` equals to `320` pixels width.'
}

export const picturesDocs = () => {
  return {
    route: Router.route('/api/pictures'),
    query: {
      category: {
        description: 'The category of the picture',
        type: 'string',
        required: false,
        default: 'all',
        enum: [
          'animal',
          'building',
          'city',
          'cultural',
          'decoration',
          'food',
          'monument',
          'nature',
          'people',
          'relationship',
          'space',
          'technology',
          'tvshow',
          'all',
          'architecture',
          'human',
          'wildlife',
          'entertainment',
        ],
        extras: '`all` is the default value. `architecture` is a combination of `building`, `city`, `decoration` and `monument`. `human` is a combination of `artist`, `cultural`, `people`, `relationship` and `sport`. `wildlife` is a combination of `animal`, `flower`, `nature` and `space`. `entertainment` is a combination of `tvshow`.'
      },
      count: {
        description: 'The number of pictures to return',
        type: 'number',
        required: false,
        default: 10,
        extras: 'If the `count` is greater than the number of pictures available, some pictures will be returned more than once.',
      },
      size,
    }
  }
}

export const picturesIdDocs = () => {
  return {
    route: Router.route('/api/pictures/:id'),
    query: {
      size,
      download: {
        description: 'Download the picture',
        type: 'boolean',
        required: false,
        extras: 'If `true`, the picture will be downloaded instead of being displayed.',
      },
    }
  }
}
