FROM node:21-alpine as app
WORKDIR /opt/app/
# copy from local build due to some error in buildx
COPY node_modules/ ./node_modules
COPY dist/handlers ./dist/handlers
COPY dist/main.js ./dist/main.js
COPY public/ ./dist/public
COPY script/ ./script/
COPY style/ ./style
COPY views/ ./views 
COPY package*.json tsconfig*.json ./

EXPOSE 3000

ENTRYPOINT ["node", "dist/main.js"]