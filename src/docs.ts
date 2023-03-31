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
  extras: {
    large: '1920px',
    medium: '1280px',
    small: '640px',
    tiny: '340px',
  }
}

export function picturesDocs() {
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
          'corporate',
          'cultural',
          'decoration',
          'food',
          'house',
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
          'mainstream',
        ],
        extras: {
          all: 'all categories (default)',
          architecture: '`building`, `city`, `decoration`, `house`, `monument`',
          human: '`artist`, `corporate`, `cultural`, `people`, `relationship`, `sport`',
          wildlife: '`animal`, `flower`, `nature`, `space`',
          entertainment: '`tvshow`',
          mainstream: '`building`, `city`, `corporate`, `decoration`, `food`, `house`, `monument`, `nature`, `people`, `technology`',
        }
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

export function picturesIdDocs() {
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
