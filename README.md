# DiDiS (Direct Democracy in Sweden)
## Digital Democracy Platform for Sweden

DiDiS is an open-source digital democracy platform designed specifically for the Swedish context, integrating with existing digital infrastructure and democratic traditions while enabling new forms of civic participation.

### Vision
To create a secure, accessible, and effective platform for direct democratic participation in Sweden, building on existing democratic strengths while enabling new forms of civic engagement.

### Core Features
- 🔐 Secure authentication via BankID
- 📝 Citizen proposal system
- 🗳️ Multiple voting methods
- 💬 Structured deliberation tools
- 🤝 Municipal integration
- 📊 Transparent decision tracking
- 🌐 Multilingual support
- ♿ Accessibility focus

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
git clone https://github.com/DiDiS/DiDiS.git

# Install dependencies
cd DiDiS
npm install

# Set up environment variables
cp .env.example .env

# Start development environment
npm run dev
```

### Project Structure
```
DiDiS/
├── apps/          # Application components
├── packages/      # Shared packages
├── services/      # Microservices
├── docs/          # Documentation
|   ├── planning/         # Project plans and phases
|   ├── architecture/     # System architecture
|   ├── development/      # Development setup and guidelines
|   ├── api/              # API documentation
|   ├── deployment/       # Deployment procedures
|   ├── governance/       # Project governance and processes
|   ├── standards/        # Development standards and guidelines
|   └── communication/    # Communication strategy and plans
└── infrastructure/# Infrastructure code
```

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
🚧 **Current Status**: Early Development

See our [Project Board](https://github.com/DiDiS/DiDiS/projects/1) for current progress and planned features.

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
- [Municipal Integration Examples](https://github.com/DiDiS/municipal-examples)
- [BankID Integration Module](https://github.com/DiDiS/bankid-auth)
- [Democracy Pattern Library](https://github.com/DiDiS/democracy-patterns)

### Support and Community
- [Documentation](https://docs.DiDiS.se)
- [Discussions](https://github.com/DiDiS/DiDiS/discussions)
- [Issue Tracker](https://github.com/DiDiS/DiDiS/issues)
- [Matrix Chat](https://matrix.to/#/#DiDiS:matrix.org)

### License
This project is licensed under the AGPL-3.0 License - see the [LICENSE](LICENSE) file for details.

### Acknowledgments
- Inspired by [Decidim](https://decidim.org) and other open democracy projects
- Built with support from Swedish municipalities and civic tech community
- Developed in consultation with democracy researchers and practitioners

