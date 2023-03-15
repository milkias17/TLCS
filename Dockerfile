FROM node:lts-alpine3.16
WORKDIR /app
RUN npm install -g pnpm
COPY package*.json ./
COPY pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install
EXPOSE 3000
COPY . .
CMD ["npm", "run", "dev"]
