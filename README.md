# Seeds

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
