export {}

type NodeEnv = 'development' | 'production'
type LogLevel = 'debug' | 'error' | 'fatal' | 'info' | 'trace' | 'warn' | 'silent'

interface Dotenv {
  LOG_LEVEL: LogLevel,
  PORT: number,
  BASE_URL: string,
  HTTPS: boolean,
  API_KEY: string | false,
  NODE_ENV: NodeEnv,
  IS_DEV: boolean,
  HOST: string,
  API_URL: string,
  API_DOMAINS: string[],
  API_DOMAINS_PARSED: string[],
  API_DOMAINS_ALL: boolean,
  ORIGIN: string,
}

declare global {
  interface IDotenv extends Dotenv {}
  var dotenv: Dotenv
}
