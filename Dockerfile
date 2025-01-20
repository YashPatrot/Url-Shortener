FROM node:lts-alpine3.19

# Set build argument for environment variables
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

# Create and set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps




# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN npm run build

# Expose port and start the application
EXPOSE 3000
CMD [ "node", "dist/main.js" ]
# Generate Prisma client
RUN npx prisma generate