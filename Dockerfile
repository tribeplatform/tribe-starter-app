# Build App
FROM node:17.4.0-alpine as Builder
WORKDIR /tribe/app

COPY package.json yarn.lock ./
COPY client/package.json ./client/package.json
COPY server/package.json ./server/package.json
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

FROM node:17.4.0-alpine AS Runner
WORKDIR /tribe/app

ENV NODE_ENV production
ENV PORT 3000

RUN addgroup -g 1001 -S nodejs
RUN adduser -S tribe -u 1001

RUN chown -R tribe:nodejs /tribe/app

COPY --from=Builder /tribe/app/node_modules /tribe/app/node_modules
COPY --from=Builder /tribe/app/server /tribe/app/server
COPY --from=Builder /tribe/app/client/build /tribe/app/server/dist/public
COPY --from=Builder /tribe/app/package.json /tribe/app

EXPOSE 3000
CMD ["yarn", "start"]
