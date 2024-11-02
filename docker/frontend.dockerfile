FROM node:18-alpine

# Create app directory
WORKDIR /app

# Copy package files from frontend directory
COPY src/frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy source code from frontend directory
COPY src/frontend/ .

# Expose port
EXPOSE 3000

# Start development server
CMD ["npm", "run", "dev"]
