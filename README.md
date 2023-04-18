# 🌱 Seeds

[![node][node-version-src]][node-version-href]
[![fastify][fastify-version-src]][fastify-version-href]
[![license][license-src]][license-href]

[![tests][tests-src]][tests-href]
[![pipeline][pipeline-actions-src]][pipeline-actions-href]

API to use random pictures with seeders. You could use pictures from [this repo](https://gitlab.com/kiwilan/seeds-pictures).

## Setup

```bash
pnpm i
```

```bash
cp .env.example .env
```

You could use pictures from [this repo](https://gitlab.com/kiwilan/seeds-pictures).

```bash
git clone https://gitlab.com/kiwilan/seeds-pictures.git ./src/public/seeds-pictures
```

```bash
pnpm dev
```

## Docker

```bash
docker-compose up
```

## Pictures

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

[node-version-src]: https://img.shields.io/static/v1?style=flat-square&label=Node.js&message=v18.x&color=A855F7&logo=node.js&logoColor=ffffff&labelColor=18181b
[node-version-href]: https://www.php.net/
[license-src]: https://img.shields.io/github/license/kiwilan/seeds.svg?style=flat-square&colorA=18181B&colorB=A855F7
[license-href]: https://github.com/kiwilan/seeds/blob/main/README.md
[tests-src]: https://img.shields.io/github/actions/workflow/status/kiwilan/seeds/eslint.yml?branch=main&label=tests&style=flat-square&colorA=18181B
[tests-href]: https://packagist.org/packages/kiwilan/seeds
[fastify-version-src]: https://img.shields.io/static/v1?style=flat-square&label=Fastify&message=v4.x&color=A855F7&logo=fastify&logoColor=ffffff&labelColor=18181b
[fastify-version-href]: https://www.fastify.io/
[pipeline-actions-src]: https://gitlab.com/kiwilan/seeds/badges/main/pipeline.svg?style=flat-square
[pipeline-actions-href]: https://gitlab.com/kiwilan/seeds
