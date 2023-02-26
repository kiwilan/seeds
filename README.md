# Seeds

[![fastify](https://img.shields.io/static/v1?label=Fastify&message=v4.x&color=000000&style=flat-square&logo=fastify&logoColor=ffffff)](https://www.fastify.io)
[![typescript](https://img.shields.io/static/v1?label=TypeScript&message=v4.9&color=3178C6&style=flat-square&logo=php&logoColor=ffffff)](https://www.typescriptlang.org)
[![node.js](https://img.shields.io/static/v1?label=Node.js&message=v18.x&color=339933&style=flat-square&logo=php&logoColor=ffffff)](https://nodejs.org/en)
[![pnpm](https://img.shields.io/static/v1?label=pnpm&message=v7.x&color=2C8EBB&style=flat-square&logo=php&logoColor=ffffff)](https://pnpm.io)

![pipeline](https://gitlab.com/kiwilan/seeds/badges/main/pipeline.svg)

API for seeds pictures. You could use pictures from [this repo](https://gitlab.com/kiwilan/seeds-pictures).

## Setup

```bash
pnpm i
```

```bash
cp .env.example .env
```

```bash
pnpm dev
```

### Example

```bash
git clone https://gitlab.com/kiwilan/seeds-pictures ./src/public
```

## Build

In `.env` set `NODE_ENV=production`.

```bash
LOG_LEVEL=error      # debug | error | fatal  | info | trace | warn | silent

PORT=3000 # pm2 port
BASE_URL=domain.com
HTTPS=true
```

```bash
pnpm build
```
