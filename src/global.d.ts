declare global {
  declare namespace Route {
    export type Endpoint = '/api/docs' | '/api' | '/api/pictures/:id' | '/api/pictures/:id/render' | '/api/pictures/array' | '/api/pictures' | '/api/pictures/random' | '/'
  }
}

export {};