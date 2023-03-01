# Seeds

[![fastify](https://img.shields.io/static/v1?label=Fastify&message=v4.x&color=000000&style=flat-square&logo=fastify&logoColor=ffffff)](https://www.fastify.io)
[![typescript](https://img.shields.io/static/v1?label=TypeScript&message=v4.9&color=3178C6&style=flat-square&logo=typescript&logoColor=ffffff)](https://www.typescriptlang.org)
[![node.js](https://img.shields.io/static/v1?label=Node.js&message=v18.x&color=339933&style=flat-square&logo=node.js&logoColor=ffffff)](https://nodejs.org/en)
[![pnpm](https://img.shields.io/static/v1?label=pnpm&message=v7.x&color=F69220&style=flat-square&logo=pnpm&logoColor=ffffff)](https://pnpm.io)

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

## Docker

```bash
docker-compose up -d --build
```

## Pictures

### Example

You could use pictures from [this repo](https://gitlab.com/kiwilan/seeds-pictures).

```bash
git clone https://gitlab.com/kiwilan/seeds-pictures ./src/public/seeds-pictures
```

### Your own pictures

You could use your own pictures. You just need to put them in `./src/public/seeds-pictures` and respect the following structure:

```bash
src/public/seeds-pictures
├── large
│   ├── category-1
│   │   ├── img-1.jpg
│   │   └── img-2.jpg
│   └── category-2
│       ├── img-1.jpg
│       └── img-2.jpg
├── medium # let empty
├── small # let empty
└── tiny # let empty
```

All extra sizes (`medium`, `small`, `tiny`) will be generated automatically with `sharp`.

## Build

```bash
LOG_LEVEL=error      # debug | error | fatal  | info | trace | warn | silent

PORT=3000 # pm2 port
BASE_URL=domain.com
HTTPS=true
```

```bash
pnpm build
```
