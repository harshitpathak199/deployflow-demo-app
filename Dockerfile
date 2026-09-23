FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY src ./src

ARG GIT_SHA=unknown

ENV GIT_SHA=${GIT_SHA}

ENV NODE_ENV=production

ENV PORT=3000

USER node

EXPOSE 3000

CMD ["node", "src/app.js"]
