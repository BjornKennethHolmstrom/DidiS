# Development Environment Setup

For detailed coding standards and requirements, please refer to our [Development Standards](../standards/README.md).

## Prerequisites

### Required Software
- Node.js (v18 or later)
- Docker Desktop
- Git
- Visual Studio Code (recommended)
- PostgreSQL (local or Docker)

### Recommended Extensions
- ESLint
- Prettier
- Docker
- GitLens
- PostgreSQL

## Initial Setup

### 1. Repository Setup
```bash
# Clone the repository
git clone https://github.com/your-username/swedd.git

# Navigate to project directory
cd swedd

# Install dependencies
npm install
```

### 2. Environment Configuration
```bash
# Copy example environment file
cp .env.example .env

# Edit .env with your local settings
nano .env
```

### 3. Docker Setup
```bash
# Start development containers
docker-compose up -d

# Verify containers are running
docker-compose ps
```

### 4. Database Setup
```bash
# Run migrations
npm run migrate

# Seed development data
npm run seed
```

## Development Workflow

### Starting Development Server
```bash
# Start frontend development server
npm run dev

# Start backend development server
npm run dev:api
```

### Running Tests
```bash
# Run all tests
npm test

# Run specific test suites
npm run test:unit
npm run test:integration
npm run test:e2e
```

### Code Quality
```bash
# Lint code
npm run lint

# Format code
npm run format
```

For detailed information about development processes and workflows, see our [Development Processes](../governance/PROCESSES.md) documentation.

For information about how we communicate about development, see our [Communication Strategy](../communication/README.md) and [Messaging Framework](../communication/MESSAGING_FRAMEWORK.md).

## Troubleshooting

### Common Issues
1. Port conflicts
2. Database connection issues
3. Docker memory limits
4. Node version mismatches

### Solutions
Detailed solutions for each common issue...

## Additional Resources
- Project documentation
- API documentation
- Architecture overview
- Deployment guide

