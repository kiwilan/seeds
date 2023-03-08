# 🌱 Seeds

[![pipeline][pipeline-actions-src]][pipeline-actions-href]

[![fastify][fastify-src]][fastify-src]
[![typescript][typescript-src]][typescript-src]
[![nodejs][nodejs-src]][nodejs-src]
[![github][github-actions-src]][github-actions-href]
[![License][license-src]][license-href]

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
docker-compose up
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

## License

[MIT](./LICENSE)

<!-- Badges -->

[github-actions-src]: https://img.shields.io/github/actions/workflow/status/kiwilan/seeds/eslint.yml?branch=main&style=flat-square&colorA=18181B&colorB=A855F7&label=Lint
[github-actions-href]: https://github.com/kiwilan/seeds/actions
[pipeline-actions-src]: https://gitlab.com/kiwilan/seeds/badges/main/pipeline.svg?style=flat-square
[pipeline-actions-href]: https://gitlab.com/kiwilan/seeds
[codecov-src]: https://img.shields.io/codecov/c/gh/unjs/unstorage/main?style=flat-square&colorA=18181B&colorB=A855F7
[codecov-href]: https://codecov.io/gh/unjs/unstorage
[license-src]: https://img.shields.io/github/license/unjs/unstorage.svg?style=flat-square&label=License&colorA=18181B&colorB=A855F7
[license-href]: https://github.com/kiwilan/seeds/blob/main/LICENSE
[fastify-src]: https://img.shields.io/static/v1?label=Fastify&message=v4.x&color=000000&style=flat-square&logo=fastify&logoColor=ffffff&colorA=18181B&colorB=A855F7
[fastify-href]: https://www.fastify.io
[typescript-src]: https://img.shields.io/static/v1?label=TypeScript&message=v4.9&color=3178C6&style=flat-square&logo=typescript&logoColor=ffffff&colorA=18181B&colorB=A855F7
[typescript-href]: https://www.typescriptlang.org
[nodejs-src]: https://img.shields.io/static/v1?label=Node.js&message=v18.x&color=339933&style=flat-square&logo=node.js&logoColor=ffffff&colorA=18181B&colorB=A855F7
[nodejs-href]: https://nodejs.org/en
