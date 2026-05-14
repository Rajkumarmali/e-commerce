# Authentication APIs

This document provides comprehensive documentation for the authentication APIs in the e-commerce application.

## Overview

The authentication system provides secure user registration and login functionality using JWT (JSON Web Tokens) for stateless authentication. The API follows RESTful conventions and integrates with Spring Security for robust security implementation.

## Base URL

```
http://localhost:8080/auth
```

## Security Features

- **JWT Token Authentication**: Stateless authentication using JWT tokens
- **Password Encryption**: BCrypt password hashing
- **Email Validation**: Unique email verification during registration
- **Spring Security Integration**: Comprehensive security framework
- **Custom User Details Service**: User authentication and authorization

## API Endpoints

### 1. User Registration (Sign Up)

**Endpoint:** `POST /auth/signup`

**Description:** Creates a new user account and returns a JWT token for immediate authentication.

**Request Body:**

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

**Request Fields:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| firstName | String | Yes | User's first name |
| lastName | String | Yes | User's last name |
| email | String | Yes | Unique email address |
| password | String | Yes | Plain text password (will be encrypted) |

**Success Response (201 Created):**

```json
{
  "jwt": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2huLmRvZUBleGFtcGxlLmNvbSIsImlhdCI6MTY0NjI0MjAwMCwiZXhwIjoxNjQ2MzI4NDAwfQ.signature",
  "message": "SignUp successfully"
}
```

**Error Responses:**

**400 Bad Request** - Email already exists:

```json
{
  "timestamp": "2024-01-01T12:00:00.000+00:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Email is Already used Another Account",
  "path": "/auth/signup"
}
```

**422 Unprocessable Entity** - Validation errors:

```json
{
  "timestamp": "2024-01-01T12:00:00.000+00:00",
  "status": 422,
  "error": "Unprocessable Entity",
  "message": "Validation failed for object='user'. Error count: 1",
  "errors": [
    {
      "field": "email",
      "message": "Email should be valid"
    }
  ]
}
```

### 2. User Login (Sign In)

**Endpoint:** `POST /auth/signin`

**Description:** Authenticates a user and returns a JWT token for subsequent API calls.

**Request Body:**

```json
{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

**Request Fields:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| email | String | Yes | Registered email address |
| password | String | Yes | User password |

**Success Response (201 Created):**

```json
{
  "jwt": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2huLmRvZUBleGFtcGxlLmNvbSIsImlhdCI6MTY0NjI0MjAwMCwiZXhwIjoxNjQ2MzI4NDAwfQ.signature",
  "message": "SingIn successfully"
}
```

**Error Responses:**

**401 Unauthorized** - Invalid credentials:

```json
{
  "timestamp": "2024-01-01T12:00:00.000+00:00",
  "status": 401,
  "error": "Unauthorized",
  "message": "Invalid username or password",
  "path": "/auth/signin"
}
```

**404 Not Found** - User not found:

```json
{
  "timestamp": "2024-01-01T12:00:00.000+00:00",
  "status": 404,
  "error": "Not Found",
  "message": "user not found with email",
  "path": "/auth/signin"
}
```

## JWT Token Usage

### Header Format

Include the JWT token in the Authorization header for all protected API calls:

```
Authorization: Bearer <JWT_TOKEN>
```

**Example:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2huLmRvZUBleGFtcGxlLmNvbSIsImlhdCI6MTY0NjI0MjAwMCwiZXhwIjoxNjQ2MzI4NDAwfQ.signature
```

### Token Expiration

- **Duration**: 846,000,000 milliseconds (~9.8 days)
- **Automatic Renewal**: Client should handle token refresh before expiration

## Architecture Components

### 1. AuthController

**Main REST controller** handling authentication endpoints.

**Responsibilities:**

- User registration (`/signup`)
- User authentication (`/signin`)
- JWT token generation
- Input validation
- Error handling

### 2. CustomeUserServiceImplementation

**Custom UserDetailsService** implementation for Spring Security.

**Responsibilities:**

- Load user by email
- Provide user details for authentication
- Integrate with Spring Security framework

### 3. JWT Provider

**Token management service** (located in config package).

**Responsibilities:**

- Generate JWT tokens
- Parse and validate tokens
- Extract user claims

### 4. Password Encoder

**BCrypt password encoder** bean (configured in AppConfig).

**Responsibilities:**

- Encrypt passwords during registration
- Verify passwords during login
- Secure password storage

## Data Transfer Objects (DTOs)

### LoginRequest

**Request DTO** for user login.

```java
public class LoginRequest {
    private String email;
    private String password;
}
```

### AuthResponse

**Response DTO** for authentication operations.

```java
public class AuthResponse {
    private String jwt;
    private String message;
}
```

## Exception Handling

### UserException

**Custom exception** for user-related errors.

**Thrown When:**

- Email already exists during registration
- User validation fails
- User not found

### BadCredentialsException

**Spring Security exception** for authentication failures.

**Thrown When:**

- Invalid username/email
- Incorrect password
- Account authentication issues

## Security Flow

### Registration Flow

1. Client sends user data to `/auth/signup`
2. Server validates email uniqueness
3. Password is encrypted using BCrypt
4. User is saved to database
5. JWT token is generated
6. Token and success message returned to client

### Login Flow

1. Client sends credentials to `/auth/signin`
2. Server loads user by email
3. Password is verified against encrypted hash
4. Authentication is established in SecurityContext
5. JWT token is generated
6. Token and success message returned to client

### Protected API Flow

1. Client includes JWT token in Authorization header
2. JwtValidator filter intercepts request
3. Token is validated and parsed
4. User authentication is set in SecurityContext
5. Request proceeds to protected endpoint
6. Response returned to client

## Database Schema

### User Table

```sql
CREATE TABLE user (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255), -- BCrypt encrypted
    role VARCHAR(50),
    mobile VARCHAR(20),
    created_at TIMESTAMP
);
```

## Configuration Requirements

### Dependencies

- **Spring Security**: Core security framework
- **JWT (io.jsonwebtoken)**: JWT token handling
- **Spring Web**: REST API support
- **Spring Data JPA**: Database operations
- **Validation**: Input validation

### Security Configuration

```java
@Configuration
public class AppConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) {
        // Configuration for JWT authentication
        // CORS settings
        // API endpoint protection
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
```

## Testing Examples

### Using curl

**Registration:**

```bash
curl -X POST http://localhost:8080/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "password": "securePassword123"
  }'
```

**Login:**

```bash
curl -X POST http://localhost:8080/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "securePassword123"
  }'
```

### Using JavaScript/Fetch

**Registration:**

```javascript
const registerUser = async () => {
  const response = await fetch("http://localhost:8080/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "securePassword123",
    }),
  });

  const data = await response.json();
  localStorage.setItem("token", data.jwt);
};
```

**Login:**

```javascript
const loginUser = async () => {
  const response = await fetch("http://localhost:8080/auth/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: "john.doe@example.com",
      password: "securePassword123",
    }),
  });

  const data = await response.json();
  localStorage.setItem("token", data.jwt);
};
```

## Best Practices

### Security Recommendations

1. **HTTPS**: Always use HTTPS in production
2. **Token Storage**: Store tokens securely (httpOnly cookies recommended)
3. **Password Policy**: Implement strong password requirements
4. **Rate Limiting**: Add rate limiting to prevent brute force attacks
5. **Token Refresh**: Implement token refresh mechanism
6. **Input Validation**: Add comprehensive input validation

### Client-Side Considerations

1. **Token Management**: Handle token expiration gracefully
2. **Error Handling**: Implement proper error handling for auth failures
3. **Loading States**: Show loading indicators during auth operations
4. **Auto-logout**: Logout users on token expiration
5. **Secure Storage**: Use secure storage for tokens

## Common Issues and Solutions

### 1. "Email is Already Used Another Account"

**Cause**: Attempting to register with an existing email
**Solution**: Use login endpoint or different email

### 2. "Invalid username or password"

**Cause**: Incorrect credentials
**Solution**: Verify email and password, check for typos

### 3. "user not found with email"

**Cause**: Email not registered in system
**Solution**: Register the user first

### 4. Token Expired

**Cause**: JWT token has expired
**Solution**: Implement token refresh or re-authenticate

## Integration Points

The Auth API integrates with:

- **Product APIs**: Protected endpoints require authentication
- **User Profile APIs**: User-specific operations
- **Order APIs**: Order management requires authentication
- **Review/Rating APIs**: User-generated content requires auth

## Future Enhancements

### Planned Features

1. **Email Verification**: Email verification during registration
2. **Password Reset**: Forgot password functionality
3. **Two-Factor Authentication**: Enhanced security
4. **Social Login**: OAuth integration (Google, Facebook)
5. **Role-Based Access Control**: Admin/user role management
6. **Account Lockout**: Temporary account lock after failed attempts

### API Versioning

Future versions will include:

- v2: Enhanced security features
- v3: Social login integration
- v4: Advanced user management

## Support

For authentication-related issues:

1. Check server logs for detailed error messages
2. Verify JWT configuration in AppConfig
3. Ensure database connectivity
4. Validate request format and headers
5. Check network connectivity and CORS settings

---

**Last Updated**: January 2024
**Version**: 1.0
**API Version**: v1
