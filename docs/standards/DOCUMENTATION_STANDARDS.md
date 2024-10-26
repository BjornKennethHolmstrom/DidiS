# Documentation Standards
## DidiS Documentation Guidelines

### Code Documentation

#### JSDoc Comments
```typescript
/**
 * Authenticates a user with BankID
 * @param {string} personalNumber - 12-digit personal number
 * @returns {Promise<IAuthResult>} Authentication result
 * @throws {AuthError} If authentication fails
 */
```

#### Component Documentation
```typescript
/**
 * UserProfile component displays and manages user information
 * @component
 * @example
 * <UserProfile userId="123" onUpdate={handleUpdate} />
 */
```

#### API Documentation
```typescript
/**
 * @api {post} /api/v1/auth/bankid Authenticate with BankID
 * @apiName BankIDAuth
 * @apiGroup Authentication
 * @apiVersion 1.0.0
 */
```

### Markdown Documentation

#### File Structure
```markdown
# Title
## Overview
### Section 1
- Point 1
- Point 2

### Section 2
1. Step 1
2. Step 2
```

#### Content Guidelines
- Clear and concise language
- Active voice
- Code examples where appropriate
- Links to related documentation
- Regular updates
- Version tracking

### Commit Messages
```
type(scope): subject

body

footer
```
