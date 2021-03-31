FROM --platform=$BUILDPLATFORM node:14-alpine as build
WORKDIR /build
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .
RUN npm run build

FROM node:14-alpine as final
WORKDIR /app
COPY --from=build /build/dist .
COPY --from=build /build/node_modules ./node_modules
ENTRYPOINT [ "node" ]
CMD [ "Application.js" ]
