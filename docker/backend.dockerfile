FROM node:18-alpine

WORKDIR /app

# Install PostgreSQL client
RUN apk add --no-cache postgresql-client

# Copy package files from backend directory
COPY src/backend/package*.json ./

# Install dependencies
RUN npm install

# Copy source code from backend directory
COPY src/backend/ .

# Copy scripts
COPY docker/start-backend.sh /start-backend.sh
RUN chmod +x /start-backend.sh

# Expose port
EXPOSE 4000

# Start using the script
CMD ["/start-backend.sh"]
