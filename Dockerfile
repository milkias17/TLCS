FROM node:lts-alpine3.16
WORKDIR /app
COPY package*.json ./
COPY pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install
EXPOSE 3000
COPY . .
RUN pnpx prisma generate
CMD ["npm", "run", "dev"]
