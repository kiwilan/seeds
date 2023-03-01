FROM node:16

WORKDIR /app

RUN npm install -g pnpm npm pm2

COPY . .

RUN pnpm install
RUN pnpm docker:build

# ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV LOG_LEVEL=error
ENV PORT=3000
ENV NPM_CONFIG_LOGLEVEL=warn

EXPOSE 3000

CMD [ "pm2-runtime", "start", "npm", "--", "start" ]
