# Use the official Node.js image for building the React app
FROM node:18 AS build
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application
COPY . .
RUN npm run build

# Use an NGINX image to serve the React app
FROM nginx:alpine AS runtime
WORKDIR /usr/share/nginx/html
COPY --from=build /app/build ./

# Expose port 80 to serve the app
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
