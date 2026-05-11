# Configuration Package

This package contains the core security and JWT configuration classes for the e-commerce application.

## Overview

The config package provides essential security configurations including JWT token management, password encoding, CORS setup, and security filter chains for Spring Boot application.

## Classes

### 1. AppConfig.java
**Main configuration class** that sets up security filters and application-wide beans.

**Key Features:**
- **Security Filter Chain**: Configures HTTP security with stateless session management
- **JWT Validation**: Integrates `JwtValidator` filter before basic authentication
- **CORS Configuration**: Allows cross-origin requests from specified origins
- **Password Encoding**: Provides BCrypt password encoder bean

**Security Configuration:**
- All `/api/**` endpoints require authentication
- Other endpoints are publicly accessible
- CSRF protection is disabled for API endpoints
- Session management is stateless (suitable for JWT)

**CORS Settings:**
- Allowed Origins: `http://localhost:3000`, `http://localhost:4200`
- Allowed Methods: All methods (`*`)
- Credentials: Enabled
- Exposed Headers: `Authorization`

### 2. JwtProvider.java
**JWT token generation and parsing service**.

**Responsibilities:**
- **Token Generation**: Creates JWT tokens with user email claims
- **Token Parsing**: Extracts email information from JWT tokens
- **Token Validation**: Validates token signature and expiration

**Token Specifications:**
- Algorithm: HMAC-SHA
- Secret Key: Defined in `JwtConstant.SECRATE_KEY`
- Expiration: 846,000,000 milliseconds (~9.8 days)
- Claims: Contains user email

### 3. JwtValidator.java
**JWT validation filter** that extends `OncePerRequestFilter`.

**Functionality:**
- **Token Extraction**: Extracts JWT from `Authorization` header
- **Token Validation**: Validates token signature and claims
- **Authentication Setup**: Sets up Spring Security context
- **Error Handling**: Throws `BadCredentialsException` for invalid tokens

**Filter Process:**
1. Extracts JWT from request header
2. Validates token signature using secret key
3. Extracts user email and authorities from claims
4. Sets up authentication in SecurityContext
5. Continues filter chain

### 4. JwtConstant.java
**Constants class** for JWT-related configuration.

**Constants:**
- `SECRATE_KEY`: Secret key for JWT signing and validation
- `JWT_HEADER`: HTTP header name for JWT token (`Authorization`)

## Security Flow

1. **Authentication**: User authenticates via login endpoint
2. **Token Generation**: `JwtProvider` generates JWT with user claims
3. **Token Storage**: Client stores JWT (typically in localStorage/httpOnly cookie)
4. **Request Validation**: `JwtValidator` filter validates JWT on each API request
5. **Authorization**: Spring Security handles authorization based on user roles

## Dependencies

- **Spring Security**: Core security framework
- **JWT (io.jsonwebtoken)**: JWT token handling
- **Spring Web**: Servlet and HTTP request handling
- **BCrypt**: Password encryption

## Usage Examples

### Generating JWT Token
```java
@Autowired
private JwtProvider jwtProvider;

// After successful authentication
Authentication auth = ...; // Your authentication object
String token = jwtProvider.generateToken(auth);
```

### Validating JWT Token
The `JwtValidator` automatically handles token validation for all requests to `/api/**` endpoints.

### Password Encoding
```java
@Autowired
private PasswordEncoder passwordEncoder;

// Encoding password
String encodedPassword = passwordEncoder.encode(rawPassword);
```

## Security Considerations

⚠️ **Important Security Notes:**

1. **Secret Key**: The current secret key in `JwtConstant` should be replaced with a more secure, environment-specific key
2. **Token Expiration**: Consider shorter expiration times for production environments
3. **HTTPS**: Always use HTTPS in production to prevent token interception
4. **Token Storage**: Consider using httpOnly cookies for token storage to prevent XSS attacks

## Configuration for Different Environments

### Development
- Current configuration is suitable for local development
- CORS allows localhost origins (3000, 4200)

### Production
- Update CORS origins to production domains
- Use environment variables for secret keys
- Consider implementing token refresh mechanism
- Enable CSRF protection if needed

## Error Handling

The configuration handles:
- Invalid JWT tokens → `BadCredentialsException`
- Missing tokens → Request proceeds without authentication
- Expired tokens → Automatic rejection by JWT parser

## Integration

This config package integrates with:
- **Authentication Controllers**: For user login and token generation
- **User Service**: For user authentication and authorization
- **API Controllers**: Protected endpoints requiring authentication
- **Frontend Applications**: For token-based API communication
