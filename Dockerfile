FROM node:lts-alpine3.16
WORKDIR /app
COPY package*.json ./
RUN npm install
EXPOSE 3000
COPY . .
CMD ["npm", "run", "dev"]
