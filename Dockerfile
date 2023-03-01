# FROM node:lts-alpine

# # Set working directory
# WORKDIR /app

# # Install PM2 globally
# RUN npm install pm2 pnpm -g

# # Credential for real time monitoring PM2 Plus
# # ENV PM2_PUBLIC_KEY xxxxx
# # ENV PM2_SECRET_KEY xxxxx
# ENV PORT 3000

# # Copy "package.json" and "package-lock.json" before other files
# # Utilise Docker cache to save re-installing dependencies if unchanged
# COPY ./package.json ./pnpm-lock.yaml ./

# # # Install dependencies
# RUN pnpm i --ignore-scripts

# # Copy all files
# COPY . /app/

# # Build app
# RUN pnpm i && pnpm build

# # Expose the listening port
# # EXPOSE 3000

# # Launch app with PM2
# CMD [ "pm2-runtime", "start", "npm", "--", "start" ]
# # RUN pnpm start

# # CMD [ "node", "./build/index.mjs" ]

# FROM node:lts-alpine
# WORKDIR /app
# COPY . /app
# RUN npm install pm2 pnpm -g
# RUN pnpm i && pnpm build
# EXPOSE 80
# ENV PORT 80
# CMD ["node", "build/index.mjs"]

FROM node:lts-alpine as builder

LABEL version="3.0.0"
LABEL description="Example Fastify (Node.js) webapp Docker Image"
LABEL maintainer="Sandro Martini <sandro.martini@gmail.com>"

# update packages, to reduce risk of vulnerabilities
RUN apk update && apk upgrade
# RUN apk cache clean

# set a non privileged user to use when running this image
# RUN addgroup -S nodejs && adduser -S nodejs -G nodejs
# USER nodejs
# set right (secure) folder permissions
# RUN mkdir -p /home/nodejs/app/node_modules && chown -R nodejs:nodejs /home/nodejs/app

WORKDIR /home/nodejs/app

# set default node env
# to be able to run tests (for example in CI), do not set production as environment
# ENV NODE_ENV=production

ENV NPM_CONFIG_LOGLEVEL=warn

# copy project definition/dependencies files, for better reuse of layers
COPY --chown=nodejs:nodejs package.json pnpm-lock.yaml ./

# copy stuff required by prepublish (postinstall)
# COPY .snyk ./

RUN npm install pm2 pnpm -g

# install dependencies here, for better reuse of layers
RUN pnpm install --ignore-scripts

# copy all sources in the container (exclusions in .dockerignore file)
COPY . .

RUN pnpm install && pnpm build

EXPOSE 8000

# add an healthcheck, useful
# healthcheck by calling the additional script exposed by the plugin
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s CMD npm run healthcheck-manual

# ENTRYPOINT [ "npm" ]
# CMD [ "npm", "start" ]
CMD [ "node", "./build/index.mjs" ]
