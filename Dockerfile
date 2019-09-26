FROM node:lts-slim as build

WORKDIR /usr/src/app
COPY . .

RUN npm install && npm run compile
FROM build as prod

COPY --from=build /usr/src/app/dist/ /usr/src/app/dist
COPY --from=build /usr/src/app/package.json /usr/src/app/package.json

RUN npm install pm2 -g
RUN npm install --production
