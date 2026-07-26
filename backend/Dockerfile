FROM node:18-alpine

WORKDIR /app

# Install build tools
RUN apk add --no-cache python3 make g++

COPY package.json package-lock.json ./

RUN npm ci --only=production

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]
