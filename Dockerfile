# Build App
FROM node:16.13.0-alpine as Builder
WORKDIR /tribe/app

COPY . .
RUN yarn install
RUN yarn workspace server build 

FROM node:16.13.0-alpine AS Runner
WORKDIR /tribe/app

ENV NODE_ENV production
ENV PORT 3000

RUN addgroup -g 1001 -S nodejs
RUN adduser -S tribe -u 1001

RUN chown -R tribe:nodejs /tribe/app

COPY --from=Builder /tribe/app /tribe/app

EXPOSE 3000
CMD ["yarn", "workspace", "server", "start:prod"]