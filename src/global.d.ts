declare global {
  declare namespace Route {
    export type Endpoint = '/api/docs' | '/api' | '/api/pictures/:id' | '/api/pictures/:id/render' | '/api/pictures' | '/api/pictures/zip' | '/'
  }
  declare namespace Environment {
    export type Key = 'CUSTOM_ENV'
  }
}

export {};