declare global {
  declare namespace Route {
    export type Endpoint = '/api/docs' | '/api' | '/api/pictures/:id' | '/api/pictures/:id/render' | '/api/pictures/all' | '/api/pictures' | '/api/pictures/random/:number' | '/api/pictures/random' | '/'
  }
}

export {};