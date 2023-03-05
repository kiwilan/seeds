FROM node:16

WORKDIR /app

RUN npm install -g pnpm npm pm2

COPY . .

RUN pnpm install
RUN pnpm docker:build

ENV NPM_CONFIG_LOGLEVEL=warn
ENV LOG_LEVEL=debug
ENV BASE_URL=localhost:3000
ENV HOST=0.0.0.0
ENV PORT=3000
ENV HTTPS=false
ENV API_KEY=

EXPOSE 3000

CMD [ "pnpm", "start" ]
# CMD [ "pm2-runtime", "start", "npm", "--", "start" ]
