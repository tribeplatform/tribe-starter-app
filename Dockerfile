# Build App
FROM node:14.15.0-alpine as Builder
WORKDIR /tribe/app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn webpack:build

FROM node:14.15.0-alpine AS Runner
WORKDIR /tribe/app

ENV NODE_ENV production
ENV PORT 3000

RUN addgroup -g 1001 -S nodejs
RUN adduser -S tribe -u 1001

RUN chown -R tribe:nodejs /tribe/app

COPY --from=Builder /tribe/app/node_modules /tribe/app/node_modules
COPY --from=Builder /tribe/app/dist /tribe/app/dist
COPY --from=Builder /tribe/app/public /tribe/app/public
COPY --from=Builder /tribe/app/package.json /tribe/app

EXPOSE 3000
CMD ["yarn", "start"]
