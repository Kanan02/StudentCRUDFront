# Use the official Node.js image as the base image
FROM node:latest AS build

# Set the working directory in the container
WORKDIR /app

# Copy the application files to the container
COPY ./ /app/

# Install the dependencies
RUN npm install

# Build the Angular application
RUN npm run build

# Use a lightweight server to serve the Angular application
RUN npm install -g http-server

# Set the command to run the server when the container starts
CMD ["http-server", "/app/dist/student-crudfront", "-p", "4200"]

# Expose port 4200
EXPOSE 4200