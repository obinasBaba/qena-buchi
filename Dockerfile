FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Next.js application
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "run", "start"]
