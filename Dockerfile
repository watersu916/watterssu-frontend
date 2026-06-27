# --- Build Stage ---
FROM node:20-alpine AS build

WORKDIR /app

# Copy package info and install dependencies
COPY package*.json ./
RUN npm ci

# Copy code and build production bundle
COPY . .
RUN npm run build

# --- Production Stage ---
FROM nginx:1.25-alpine

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build artifacts to nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
