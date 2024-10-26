# SweDD (Swedish Direct Democracy)
## Digital Democracy Platform for Sweden

SweDD is an open-source digital democracy platform designed specifically for the Swedish context, integrating with existing digital infrastructure and democratic traditions while enabling new forms of civic participation.

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
git clone https://github.com/swedd/swedd.git

# Install dependencies
cd swedd
npm install

# Set up environment variables
cp .env.example .env

# Start development environment
npm run dev
```

### Project Structure
```
swedd/
├── apps/          # Application components
├── packages/      # Shared packages
├── services/      # Microservices
├── docs/          # Documentation
└── infrastructure/# Infrastructure code
```

### Contributing
We welcome contributions! Please see our [Contributing Guidelines](docs/CONTRIBUTING.md) for details on:
- Code of Conduct
- Development process
- Pull request procedure
- Coding standards

### Development Status
🚧 **Current Status**: Early Development

See our [Project Board](https://github.com/swedd/swedd/projects/1) for current progress and planned features.

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
- [Municipal Integration Examples](https://github.com/swedd/municipal-examples)
- [BankID Integration Module](https://github.com/swedd/bankid-auth)
- [Democracy Pattern Library](https://github.com/swedd/democracy-patterns)

### Support and Community
- [Documentation](https://docs.swedd.se)
- [Discussions](https://github.com/swedd/swedd/discussions)
- [Issue Tracker](https://github.com/swedd/swedd/issues)
- [Matrix Chat](https://matrix.to/#/#swedd:matrix.org)

### License
This project is licensed under the AGPL-3.0 License - see the [LICENSE](LICENSE) file for details.

### Acknowledgments
- Inspired by [Decidim](https://decidim.org) and other open democracy projects
- Built with support from Swedish municipalities and civic tech community
- Developed in consultation with democracy researchers and practitioners

