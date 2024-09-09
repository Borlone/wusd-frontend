FROM node:lts-alpine

ARG X_TAG
WORKDIR /opt/app

ARG NEXT_PUBLIC_APP_ENV
ARG NEXT_PUBLIC_BASE_URL

COPY . .
COPY package.json package-lock.json ./

ENV NEXT_PUBLIC_THIRDWEB_CLIENT_ID=4049190f7610dcd1eff6ee46cc165c2d

RUN npm install
RUN npm run build

CMD ["node_modules/.bin/next", "start"]
