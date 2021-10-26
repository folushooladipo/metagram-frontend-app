## Build
FROM beevelop/ionic:latest AS ionic

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
RUN npm ci

# Bundle app source
COPY . .
ARG API_DOMAIN=$API_DOMAIN
RUN npm run generate-env-files
RUN ionic build

## Run 
FROM nginx:alpine
# COPY www /usr/share/nginx/html
COPY --from=ionic  /usr/src/app/www /usr/share/nginx/html
