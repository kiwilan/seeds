declare global {
  declare namespace Route {
    export type Endpoint = '/api/docs' | '/api' | '/api/pictures/:id' | '/api/pictures/:id/render' | '/api/pictures' | '/'
  }
}

export {};