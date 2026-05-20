# Implement Authentication System with Redux State Management

## Summary

This PR implements a complete authentication system for the e-commerce application, including UI components and Redux state management for user registration, login, and user profile management.

## Changes Made

### Auth Components (`client/src/auth/`)

- **AuthModal.jsx**: Modal component that dynamically renders either Login or Register form based on the current route
- **LoginForm.jsx**: Login form with email and password fields, integrates with Redux for authentication
- **RegisterForm.jsx**: Registration form with first name, last name, email, and password fields, handles user registration and JWT token storage

### State Management (`client/src/state/`)

- **store.js**: Redux store configuration with auth reducer and thunk middleware
- **auth/ActionType.js**: Action type constants for authentication operations (REGISTER, LOGIN, GET_USER, LOG_OUT)
- **auth/Action.js**: Async action creators using Redux Thunk:
  - `register()`: Handles user registration via API
  - `login()`: Handles user login via API
  - `getUser()`: Fetches user profile using JWT token
  - `logOut()`: Clears user session and local storage
- **auth/Reducer.js**: Auth reducer managing user state, loading status, error handling, and JWT token

## Redux Architecture Explanation

### What is Redux?

Redux is a predictable state container for JavaScript applications that helps manage application state in a centralized store. It follows the unidirectional data flow pattern, making state changes predictable and easier to debug.

### Core Redux Concepts

#### 1. **Store**

The store is the single source of truth for the entire application state. In this implementation:

- Located in `client/src/state/store.js`
- Created using `legacy_createStore` with combined reducers
- Configured with Redux Thunk middleware for async operations
- Holds the complete application state tree

```javascript
const rootReducer = combineReducers({
  auth: authReducer,
});
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
```

#### 2. **Actions**

Actions are plain JavaScript objects that represent an intention to change the state. They must have a `type` property and can optionally carry a `payload`.

**Action Types** (`client/src/state/auth/ActionType.js`):

- Constants defining all possible action types
- Prevents typos and provides type safety
- Includes: REGISTER_REQUEST/SUCCESS/FAILER, LOGIN_REQUEST/SUCCESS/FAILER, GET_USER_REQUEST/SUCCESS/FAILER, LOG_OUT

**Action Creators** (`client/src/state/auth/Action.js`):

- Functions that create and return action objects
- Both synchronous and asynchronous (using Redux Thunk)
- Async actions handle API calls and dispatch multiple actions

#### 3. **Reducers**

Reducers are pure functions that take the current state and an action, then return a new state. They specify how the application's state changes in response to actions.

**Auth Reducer** (`client/src/state/auth/Reducer.js`):

- Manages authentication-specific state
- Handles loading states, error states, user data, and JWT token
- Uses switch statement to handle different action types
- Returns new state objects (immutable updates)

```javascript
const initialState = {
  user: null,
  isLoading: false,
  error: null,
  jwt: null,
};
```

#### 4. **Redux Thunk Middleware**

Redux Thunk is a middleware that allows writing action creators that return a function instead of an action object. This function receives `dispatch` and `getState` as arguments, enabling:

- Asynchronous API calls
- Conditional dispatching
- Complex logic before dispatching actions

**Example Flow** (Login Action):

1. Component dispatches `login(userData)` action
2. Thunk middleware intercepts the function
3. Function executes: dispatches LOGIN_REQUEST → makes API call → dispatches LOGIN_SUCCESS or LOGIN_FAILER
4. Reducer updates state based on action type
5. Component re-renders with new state

### Data Flow in This Implementation

```
User Action (Form Submit)
    ↓
Component (LoginForm/RegisterForm)
    ↓
dispatch(actionCreator(userData))
    ↓
Redux Thunk Middleware
    ↓
Async API Call (Axios)
    ↓
dispatch(success/error action)
    ↓
Reducer processes action
    ↓
State updated in Store
    ↓
Component re-renders with useSelector
```

### State Structure

The application state is organized as:

```javascript
{
    auth: {
        user: null,           // User profile data
        isLoading: false,     // Loading indicator
        error: null,          // Error message
        jwt: null            // JWT authentication token
    }
}
```

### Integration with React Components

**useDispatch Hook**: Used to dispatch actions to the Redux store

```javascript
const dispatch = useDispatch();
dispatch(login(userData));
```

**useSelector Hook**: Used to subscribe to store updates and select state

```javascript
const { auth } = useSelector((store) => store);
```

### Benefits of This Redux Implementation

1. **Centralized State**: All authentication state is managed in one place
2. **Predictable Updates**: State changes follow a strict unidirectional flow
3. **Debugging**: Redux DevTools can track every state change
4. **Testability**: Pure reducers and action creators are easy to test
5. **Separation of Concerns**: UI components are decoupled from business logic
6. **Scalability**: Easy to add new features and state slices

## Features

- User registration with form validation
- User login with JWT token authentication
- Automatic JWT token storage in localStorage
- User profile fetching with authenticated requests
- Loading and error state management
- Logout functionality
- Responsive modal-based UI using Material-UI

## Technical Details

- Uses Redux for state management
- Redux Thunk for async actions
- Axios for API calls
- Material-UI components for UI
- React Router for navigation
- JWT token-based authentication

## Files Added

```
client/src/auth/AuthModal.jsx
client/src/auth/LoginForm.jsx
client/src/auth/RegisterForm.jsx
client/src/state/store.js
client/src/state/auth/Action.js
client/src/state/auth/ActionType.js
client/src/state/auth/Reducer.js
```

## Testing

- Test user registration flow
- Test user login flow
- Verify JWT token storage
- Test user profile retrieval
- Test logout functionality
- Verify error handling for failed authentication attempts

## Related Issues

Closes #[issue-number]
