FROM node:alpine as base
WORKDIR /clinic-backend
COPY package.json ./
RUN rm -rf node_modules && npm install
COPY . .
EXPOSE 5000
CMD ["node", "index.js"]