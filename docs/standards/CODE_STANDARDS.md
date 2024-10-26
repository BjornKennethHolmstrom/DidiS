# Code Standards
## DidiS Development Guidelines

### JavaScript/TypeScript Standards

#### File Organization
```javascript
// File structure
import statements
type definitions
constants
interfaces
main code
exports
```

#### Naming Conventions
- **Files**: kebab-case (e.g., `user-authentication.ts`)
- **Classes**: PascalCase (e.g., `UserAuthentication`)
- **Functions**: camelCase (e.g., `validateUser`)
- **Variables**: camelCase (e.g., `userCount`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_LOGIN_ATTEMPTS`)
- **Interfaces**: PascalCase with 'I' prefix (e.g., `IUserProfile`)
- **Types**: PascalCase (e.g., `UserType`)

#### Code Formatting
- Indentation: 2 spaces
- Max line length: 80 characters
- Semicolons required
- Single quotes for strings
- Trailing commas in multiline
- No unused variables
- No console.log in production

#### TypeScript Specifics
- Strict mode enabled
- Explicit return types
- Interface over type when possible
- Readonly where applicable
- No any type unless necessary
- Generics when appropriate

#### React Components
- Functional components
- Props interface defined
- Default exports
- Component organization:
  1. Imports
  2. Types/Interfaces
  3. Component
  4. Styles
  5. Export

### Example Component
```typescript
import React from 'react';
import { useEffect, useState } from 'react';

interface IUserProfileProps {
  userId: string;
  onUpdate?: (data: IUserData) => void;
}

interface IUserData {
  name: string;
  email: string;
}

const UserProfile: React.FC<IUserProfileProps> = ({
  userId,
  onUpdate
}) => {
  const [userData, setUserData] = useState<IUserData | null>(null);

  useEffect(() => {
    // Implementation
  }, [userId]);

  return (
    <div>
      {/* Component JSX */}
    </div>
  );
};

export default UserProfile;
```

### API Endpoints
```typescript
// Consistent endpoint structure
/api/v1/resource-name

// HTTP methods
GET    /api/v1/users      // List
POST   /api/v1/users      // Create
GET    /api/v1/users/:id  // Read
PUT    /api/v1/users/:id  // Update
DELETE /api/v1/users/:id  // Delete
```
