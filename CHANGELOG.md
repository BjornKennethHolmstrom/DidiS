# Changelog
All notable changes to the DidiS project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.10] - 2024-01-04
### Added
- Voting System Foundation
  - Database schema for multiple voting types
  - Yes/No voting implementation
  - Ranked choice voting implementation
  - Multiple choice voting implementation
  - Approval voting implementation
  - Weighted voting implementation
  - Point distribution system
  - Vote status tracking
  - Abstain functionality
  - Comprehensive validation system

- Voting Components
  - Base voting card component
  - Type-specific voting interfaces
  - Real-time validation
  - Progress visualization
  - Point distribution interface
  - Vote confirmation displays

- Internationalization
  - Swedish and English support for voting system
  - Comprehensive voting-related translations
  - Contextual help text
  - Error messages in multiple languages

### Enhanced
- Component Architecture
  - Modular voting component design
  - Shared voting card base
  - Consistent voting interface patterns
  - Reusable validation logic

### Fixed
- Point calculation precision
- Vote validation feedback
- Component styling consistency
- Translation structure

## [0.0.9] - 2024-12-07
### Added
- Proposal System Foundation
  - Basic proposal creation interface with rich text editing
  - Proposal viewing and listing pages
  - Category and subcategory system
  - Comprehensive status tracking system
  - Category-based filtering and search
  - Breadcrumb navigation

### Enhanced
- Navigation System
  - Added breadcrumb component for better navigation
  - Improved proposal discovery flow
  - Enhanced page organization

### Fixed
- Component styling issues
- Navigation structure
- Utility function imports

## [0.0.8] - 2024-11-30
### Added
- Core Pages
  - "Om oss" (About Us) page with comprehensive content
  - Initial "Kom igång" (Get Started) page with step-by-step guide
  - Structured documentation of platform features
  - Example use cases and FAQ section

- Language Support
  - Language switching functionality
  - Language state management
  - Context-based translation system
  - Swedish and English support

### Enhanced
- Component Architecture
  - Extracted header into separate component
  - Improved layout organization
  - Proper component separation
  - Consistent component usage

### Fixed
- Docker development issues
  - Component update detection
  - File watching improvements
  - Cache-related issues
- Layout organization issues
  - Header component structure
  - Component import paths
  - Layout hierarchy

## [0.0.7] - 2024-11-09
### Added
- Complex UI Components
  - Rich text editor with formatting tools
  - Custom SVG-based activity chart
  - Data table component
  - Modal dialog system
  - Toggle switch component
  - Notification system
  - Interest tag component

- User Dashboard Features
  - Profile page with personal information management
  - Settings page with notification preferences
  - Activity tracking and visualization
  - Interest management system

### Enhanced
- Main Layout System
  - Consistent navigation across pages
  - User menu integration
  - Proper routing setup
  - Responsive container system

### Fixed
- React 19 compatibility issues
  - Custom implementation for charts (replacing recharts)
  - Native form handling (replacing react-hook-form)
  - Dependency-free component solutions

### Updated
- Frontend Architecture
  - Enhanced component organization
  - Feature-based folder structure
  - Improved type definitions
  - Better state management

## [0.0.6] - 2024-11-02
### Added
- Frontend foundation
  - Basic design system with Swedish styling
  - Component library with essential components
  - Internationalization support
  - Typography and color system
  - Responsive layout structure

### Updated
- Development environment
  - Docker configuration for frontend and backend
  - Database setup with initial schema
  - Development tools (ESLint, Prettier, TypeScript)

### Fixed
- Docker volume mounting issues
- Component styling and accessibility
- Translation system implementation

## [0.0.5] - 2024-01-20
### Added
- Communication strategy documentation
  - docs/communication/README.md with strategy overview
  - docs/communication/STAKEHOLDER_ANALYSIS.md with stakeholder mapping
  - docs/communication/ENGAGEMENT_PLAN.md with outreach strategy
  - docs/communication/MESSAGING_FRAMEWORK.md with communication guidelines

### Updated
- README.md with communication documentation reference
- Cross-references in existing documentation
- Governance documentation with communication references
- Development and deployment guides with communication links

### Documented
- Current "silent development" phase strategy
- Stakeholder analysis and engagement plans
- Future communication channels
- Messaging framework and guidelines
- Strategic considerations for project visibility

## [0.0.4] - 2024-01-20
### Added
- Comprehensive development standards
  - docs/standards/README.md with standards overview
  - docs/standards/CODE_STANDARDS.md with coding guidelines
  - docs/standards/DOCUMENTATION_STANDARDS.md with documentation requirements
  - docs/standards/TESTING_STANDARDS.md with testing procedures
  - docs/standards/SECURITY_STANDARDS.md with security requirements

### Updated
- README.md with standards documentation reference
- Cross-references in existing documentation
- Development setup guidelines
- API documentation with standards references

### Documented
- Coding conventions and practices
- Documentation requirements
- Testing procedures
- Security standards
- Implementation guidelines

## [0.0.3] - 2024-01-20
### Added
- Project governance documentation
  - docs/governance/README.md with governance overview
  - docs/governance/ROLES.md defining project roles
  - docs/governance/DECISION_MAKING.md outlining decision processes
  - docs/governance/PROCESSES.md detailing development workflows

### Updated
- README.md with governance information
- Documentation cross-references
- Project structure documentation

### Documented
- Single-developer workflow
- AI assistance integration
- Decision-making processes
- Quality assurance procedures

## [0.0.2] - 2024-10-26
### Added
- Core documentation structure
  - CONTRIBUTING.md with initial contribution guidelines
  - CODE_OF_CONDUCT.md defining community standards
  - SECURITY.md outlining security policies and procedures
  
- Technical Documentation
  - docs/architecture/README.md with system architecture overview
  - docs/development/SETUP.md with development environment setup
  - docs/api/README.md with API specification and guidelines
  - docs/deployment/README.md with deployment procedures
  
- Planning Documentation
  - Detailed project phases (0-5)
  - Version strategy and guidelines
  - Implementation timelines
  - Development roadmap

### Enhanced
- README.md with comprehensive project information
- Project structure and organization
- Documentation standards and templates

### Fixed
- Documentation formatting consistency
- Directory structure organization
- Technical specification clarity

## [0.0.1] - 2024-10-26
### Added
- Initial project structure
- Basic README.md
- LICENSE (AGPL-3.0)
- Initial directory layout

## [0.0.0] - 2024-10-26
### Added
- Repository initialization
- Initial commit

## Types of Changes
- `Added` for new features
- `Changed` for changes in existing functionality
- `Deprecated` for soon-to-be removed features
- `Removed` for now removed features
- `Fixed` for any bug fixes
- `Security` in case of vulnerabilities

## Commit Convention
We use the following commit message format:
```
type(scope): subject

body

footer
```

Types:
- feat: A new feature
- fix: A bug fix
- docs: Documentation only changes
- style: Changes that don't affect the meaning of the code
- refactor: A code change that neither fixes a bug nor adds a feature
- perf: A code change that improves performance
- test: Adding missing tests
- chore: Changes to the build process or auxiliary tools

