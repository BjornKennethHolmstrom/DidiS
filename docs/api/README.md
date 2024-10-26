# API Documentation

## Overview

### API Design Principles
- RESTful architecture
- JSON responses
- Versioned endpoints
- Authentication required
- Rate limiting
- Comprehensive error handling

## Authentication

### BankID Authentication
```http
POST /api/v1/auth/bankid/init
POST /api/v1/auth/bankid/complete
```

### Session Management
```http
POST /api/v1/auth/refresh
DELETE /api/v1/auth/logout
```

## Core Endpoints

### Proposals
```http
GET /api/v1/proposals
POST /api/v1/proposals
GET /api/v1/proposals/{id}
PUT /api/v1/proposals/{id}
DELETE /api/v1/proposals/{id}
```

### Voting
```http
GET /api/v1/votes
POST /api/v1/votes
GET /api/v1/votes/{id}
```

### Discussion
```http
GET /api/v1/discussions
POST /api/v1/discussions
GET /api/v1/discussions/{id}
POST /api/v1/discussions/{id}/comments
```

## Response Formats

### Success Response
```json
{
  "success": true,
  "data": {},
  "meta": {}
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description"
  }
}
```

## Error Codes

- `AUTH_REQUIRED`: Authentication required
- `INVALID_INPUT`: Invalid input data
- `NOT_FOUND`: Resource not found
- `FORBIDDEN`: Access denied
- `INTERNAL_ERROR`: Server error

## Rate Limiting

- 100 requests per minute per IP
- 1000 requests per hour per user
- Custom limits for specific endpoints

## Versioning

- Current version: v1
- Version in URL path
- Deprecation notices
- Migration guides

## Development Guidelines

### API Changes
- Maintain backwards compatibility
- Version major changes
- Document all changes
- Update tests

### Testing
- Integration tests required
- Performance testing
- Security testing
- Documentation testing

