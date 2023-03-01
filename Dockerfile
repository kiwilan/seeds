FROM node:16
# FROM node:lts-alpine

WORKDIR /app

RUN npm install -g pnpm npm

# COPY package.json pnpm-lock.yaml ./

# RUN pnpm install --ignore-scripts

COPY . .

RUN pnpm install
RUN pnpm build

# RUN npx tsx setup.js

# ENV NODE_ENV=production
ENV BASE_URL=0.0.0.0
ENV LOG_LEVEL=error
ENV PORT=80
ENV NPM_CONFIG_LOGLEVEL=warn

EXPOSE 80

CMD ["npm", "start"]
# CMD ["node", "build/index.mjs"]
