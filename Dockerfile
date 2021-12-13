FROM node:14.16.1-alpine3.12 As builder

WORKDIR /usr/src/app

COPY package*.json ./

# Let's install all dependencies cause NestJS depends on the some prod dependencies
RUN npm i

COPY . .

RUN npm run build

FROM node:14.16.1-alpine3.12 as production

ARG NODE_ENV=production

WORKDIR /usr/src/app

COPY package*.json ./

# Actually we do not need --only=production cause we already set NODE_ENV to "production"
RUN npm install --only=production

COPY . .

COPY --from=builder /usr/src/app/dist ./dist
# Bind to all network interfaces so that it can be mapped to the host OS
ENV HOST=0.0.0.0 PORT=8080 DEBUG_PORT=5858
EXPOSE ${PORT} ${DEBUG_PORT}

CMD ["node", "dist/main.js"]
