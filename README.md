# DidiS (Direkt demokrati i Sverige)
## Digital Democracy Platform for Sweden

DidiS is an open-source digital democracy platform designed specifically for the Swedish context, integrating with existing digital infrastructure and democratic traditions while enabling new forms of civic participation.

### Vision
To create a secure, accessible, and effective platform for direct democratic participation in Sweden, building on existing democratic strengths while enabling new forms of civic engagement.

### Core Features
- 🔐 Secure authentication via BankID
- 📝 Citizen proposal system
- 🗳️ Multiple voting methods
- 💬 Structured deliberation tools
- 🤝 Municipal integration
- 📊 Transparent decision tracking
- 🌐 Multilingual support (Swedish-first)
- ♿ Accessibility focus
- ✍️ Rich text editing
- 👤 User profiles and settings
- 🔔 Notification system
- 📱 Responsive design

### Technical Stack
- Frontend: React/Next.js
- Backend: Node.js/Express
- Database: PostgreSQL
- Authentication: BankID integration
- Infrastructure: Kubernetes
- CI/CD: GitHub Actions

### Getting Started

#### Prerequisites
- Node.js (v18 or later)
- Docker
- PostgreSQL
- BankID test certificates

#### Installation
```bash
# Clone the repository
git clone https://github.com/DidiS/DidiS.git

# Install dependencies
cd DidiS
npm install

# Set up environment variables
cp .env.example .env

# Start development environment
npm run dev
```

### Project Structure
```
DidiS/
├── apps/          # Application components
├── packages/      # Shared packages
├── services/      # Microservices
├── docs/          # Documentation
└── infrastructure/# Infrastructure code
.
├── apps
│   ├── api
│   │   ├── controllers
│   │   ├── middleware
│   │   └── routes
│   ├── mobile
│   └── web
│       ├── components
│       ├── pages
│       └── public
├── CHANGELOG.md
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── docker
│   ├── backend.dockerfile
│   ├── frontend.dockerfile
│   ├── start-backend.sh
│   └── wait-for-it.sh
├── docker-compose.yml
├── docs
|   ├── planning/         # Project plans and phases
|   ├── architecture/     # System architecture
|   ├── development/      # Development setup and guidelines
│   │   ├── README.md
│   │   └── SETUP.md
|   ├── api/              # API documentation
│   │   └── README.md
|   ├── deployment/       # Deployment procedures
│   │   └── README.md
│   ├── initial-analysis.md
|   ├── governance/       # Project governance and processes
│   │   ├── DECISION_MAKING.md
│   │   ├── PROCESSES.md
│   │   ├── README.md
│   │   └── ROLES.md
|   ├── standards/        # Development standards and guidelines
│   │   ├── CODE_STANDARDS.md
│   │   ├── DOCUMENTATION_STANDARDS.md
│   │   ├── README.md
│   │   ├── SECURITY_STANDARDS.md
│   │   └── TESTING_STANDARDS.md
|   └── communication/    # Communication strategy and plans
│   │   ├── ENGAGEMENT_PLAN.md
│   │   ├── MESSAGING_FRAMEWORK.md
│   │   ├── README.md
│   │   └── STAKEHOLDER_ANALYSIS.md
│   ├── planning          # Project planning
│   │   ├── detailed-specs-phase-0.md
│   │   ├── detailed-specs-phase-1.md
│   │   ├── detailed-specs-phase-2.md
│   │   ├── detailed-specs-phase-3.md
│   │   ├── detailed-specs-phase-4.md
│   │   ├── detailed-specs-phase-5.md
│   │   ├── project-plan.md
│   │   └── version-strategy.md
│   └── user
├── infrastructure
│   ├── kubernetes
│   └── terraform
├── LICENSE
├── packages
│   ├── core
│   │   ├── auth
│   │   ├── deliberation
│   │   ├── proposals
│   │   └── voting
│   ├── ui
│   └── utils
├── README.md
├── scripts
│   ├── deploy
│   ├── setup
│   └── test
├── SECURITY.md
├── services
│   ├── analytics
│   ├── integration
│   └── notification
├── src
│   ├── backend
│   │   ├── knexfile.ts
│   │   ├── migrations
│   │   │   └── 20241102_initial_schema.ts
│   │   ├── package.json
│   │   ├── package-lock.json
│   │   ├── src
│   │   │   ├── config
│   │   │   │   └── database.ts
│   │   │   ├── controllers
│   │   │   ├── index.ts
│   │   │   ├── middleware
│   │   │   ├── models
│   │   │   ├── routes
│   │   │   │   ├── index.ts
│   │   │   │   └── test.ts
│   │   │   ├── services
│   │   │   ├── types
│   │   │   └── utils
│   │   └── tsconfig.json
│   └── frontend
│       ├── app
│       │   ├── design
│       │   │   └── page.tsx
│       │   ├── favicon.ico
│       │   ├── fonts
│       │   │   ├── GeistMonoVF.woff
│       │   │   └── GeistVF.woff
│       │   ├── globals.css
│       │   ├── layout.tsx
│       │   └── page.tsx
│       ├── components
│       │   ├── auth
│       │   ├── common
│       │   ├── layout
│       │   │   ├── footer.tsx
│       │   │   ├── header.tsx
│       │   │   └── main-layout.tsx
│       │   └── ui
│       │       ├── button.tsx
│       │       ├── card.tsx
│       │       └── input.tsx
│       ├── contexts
│       ├── features
│       ├── hooks
│       │   └── useTranslations.ts
│       ├── lib
│       │   ├── language.ts
│       │   └── utils.ts
│       ├── next.config.ts
│       ├── next-env.d.ts
│       ├── package.json
│       ├── package-lock.json
│       ├── postcss.config.mjs
│       ├── public
│       │   ├── file.svg
│       │   ├── globe.svg
│       │   ├── next.svg
│       │   ├── vercel.svg
│       │   └── window.svg
│       ├── README.md
│       ├── services
│       ├── styles
│       │   ├── theme.ts
│       │   └── tokens.ts
│       ├── tailwind.config.ts
│       ├── translations
│       │   └── sv.ts
│       ├── tsconfig.json
│       ├── types
│       └── utils
│           └── cn.ts
├── tests
│   ├── e2e
│   ├── integration
│   └── unit
└── tools
    ├── analyzers
    └── generators

```

### Docker Development Environment

We use Docker for consistent development environments and easier deployment.

#### Prerequisites
- Docker
- Docker Compose
- Git

#### Quick Start with Docker
```bash
# Clone the repository
git clone https://github.com/DidiS/DidiS.git
cd DidiS

# Copy environment file
cp .env.example .env

# Start the development environment
docker compose up --build

# The following services will be available:
# - Frontend: http://localhost:3000
# - Backend API: http://localhost:4000
# - PostgreSQL: localhost:5435
```

#### Common Docker Commands
```bash
# Start all services
docker compose up

# Start services in background
docker compose up -d

# View logs
docker compose logs -f

# Stop all services
docker compose down

# Rebuild containers
docker compose up --build

# Access PostgreSQL
docker compose exec db psql -U didis -d didis_dev

# Access service shell
docker compose exec frontend sh
docker compose exec backend sh
```

#### Volumes and Persistence
The development environment uses Docker volumes for:
- PostgreSQL data
- Node modules
- Next.js build cache

#### Known Issues
- If you encounter permission issues with .next folder, run: `sudo rm -rf src/frontend/.next`
- PostgreSQL port 5432 might be in use locally; we use 5435 by default

### Project Governance
The project is currently maintained by a single developer with AI assistance. See our [Governance Documentation](docs/governance/README.md) for details about:
- Project roles and responsibilities
- Decision-making processes
- Development workflows
- Quality assurance procedures

### Contributing
We welcome contributions! Please see our [Contributing Guidelines](docs/CONTRIBUTING.md) for details on:
- Code of Conduct
- Development process
- Pull request procedure
- Coding standards

### Development Status
🚧 **Current Status**: Early Development (v0.0.7)
- ✅ Frontend foundation with component library
- ✅ User dashboard and profile management
- ✅ Settings and notification system
- ✅ Rich text editing capabilities
- 🚧 Authentication system (in progress)
- 🚧 Proposal system (planned)
- 🚧 Voting system (planned)

See our [Project Board](https://github.com/DidiS/DidiS/projects/1) for current progress and planned features.

### Testing
```bash
# Run all tests
npm test

# Run specific test suites
npm run test:unit
npm run test:integration
npm run test:e2e
```

### Deployment
See our [Deployment Guide](docs/deployment/README.md) for detailed instructions on:
- Production setup
- Infrastructure requirements
- Security considerations
- Monitoring setup

### Related Projects
- [Municipal Integration Examples](https://github.com/DidiS/municipal-examples)
- [BankID Integration Module](https://github.com/DidiS/bankid-auth)
- [Democracy Pattern Library](https://github.com/DidiS/democracy-patterns)

### Support and Community
- [Documentation](https://docs.DidiS.se)
- [Discussions](https://github.com/DidiS/DidiS/discussions)
- [Issue Tracker](https://github.com/DidiS/DidiS/issues)
- [Matrix Chat](https://matrix.to/#/#DidiS:matrix.org)

### License
This project is licensed under the AGPL-3.0 License - see the [LICENSE](LICENSE) file for details.

### Acknowledgments
- Inspired by [Decidim](https://decidim.org) and other open democracy projects
- Built with support from Swedish municipalities and civic tech community
- Developed in consultation with democracy researchers and practitioners

