# API Documentation

## Base URL
```
Development: http://localhost:5000/api/v1
Production: https://api.primetrade.ai/api/v1
```

## Interactive Documentation
Swagger UI available at: `http://localhost:5000/api-docs`

---

## Authentication

### Register User
**POST** `/auth/register`

Creates a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "MyPass123"
}
```

**Validation Rules:**
- `name`: Min 2 characters
- `email`: Valid email format
- `password`: Min 6 characters, must contain uppercase, lowercase, and number

**Success Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "email": "john@example.com",
      "name": "John Doe",
      "role": "USER"
    }
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "User with this email already exists"
}
```

---

### Register Admin User
**POST** `/auth/register-admin`

Creates a new admin user account (requires admin secret).

**Request Body:**
```json
{
  "name": "Admin User",
  "email": "admin@primetrade.com",
  "password": "Admin123",
  "adminSecret": "primetrade-admin-secret-2026"
}
```

**Validation Rules:**
- `name`: Min 2 characters
- `email`: Valid email format
- `password`: Min 6 characters, must contain uppercase, lowercase, and number
- `adminSecret`: Must match `ADMIN_SECRET` environment variable

**Success Response (201):**
```json
{
  "success": true,
  "message": "Admin user registered successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "email": "admin@primetrade.com",
      "name": "Admin User",
      "role": "ADMIN"
    }
  }
}
```

**Error Response (403):**
```json
{
  "success": false,
  "message": "Invalid admin secret key"
}
```

**Security Note:** The admin secret prevents unauthorized admin account creation. Store `ADMIN_SECRET` securely in environment variables.

---

### Login User
**POST** `/auth/login`

Authenticates user and returns JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "MyPass123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "email": "john@example.com",
      "name": "John Doe",
      "role": "USER"
    }
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

---

### Get Current User
**GET** `/auth/me`

Returns currently authenticated user's profile.

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "email": "john@example.com",
      "name": "John Doe",
      "role": "USER",
      "createdAt": "2026-02-12T18:00:00.000Z"
    }
  }
}
```

---

## Tasks

All task endpoints require authentication.

### Create Task
**POST** `/tasks`

Creates a new task.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Complete project documentation",
  "description": "Write comprehensive API docs and README",
  "status": "TODO",
  "priority": "HIGH"
}
```

**Field Options:**
- `status`: `TODO`, `IN_PROGRESS`, `DONE`
- `priority`: `LOW`, `MEDIUM`, `HIGH`

**Success Response (201):**
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "task": {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Complete project documentation",
      "description": "Write comprehensive API docs and README",
      "status": "TODO",
      "priority": "HIGH",
      "userId": "507f1f77bcf86cd799439012",
      "createdAt": "2026-02-12T18:00:00.000Z",
      "updatedAt": "2026-02-12T18:00:00.000Z"
    }
  }
}
```

---

### Get All Tasks
**GET** `/tasks`

Retrieves tasks based on user role:
- **USER**: Only sees own tasks
- **ADMIN**: Sees all tasks

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `status` (optional): Filter by status (`TODO`, `IN_PROGRESS`, `DONE`)
- `priority` (optional): Filter by priority (`LOW`, `MEDIUM`, `HIGH`)
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Example Request:**
```
GET /tasks?status=TODO&priority=HIGH&page=1&limit=10
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "tasks": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "title": "Complete project documentation",
        "description": "Write comprehensive API docs and README",
        "status": "TODO",
        "priority": "HIGH",
        "userId": {
          "_id": "507f1f77bcf86cd799439012",
          "name": "John Doe",
          "email": "john@example.com"
        },
        "createdAt": "2026-02-12T18:00:00.000Z",
        "updatedAt": "2026-02-12T18:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 25,
      "pages": 3
    }
  }
}
```

---

### Get Single Task
**GET** `/tasks/:id`

Retrieves a specific task by ID.

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "task": {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Complete project documentation",
      "description": "Write comprehensive API docs and README",
      "status": "TODO",
      "priority": "HIGH",
      "userId": {
        "_id": "507f1f77bcf86cd799439012",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "createdAt": "2026-02-12T18:00:00.000Z",
      "updatedAt": "2026-02-12T18:00:00.000Z"
    }
  }
}
```

**Error Response (403):**
```json
{
  "success": false,
  "message": "Not authorized to view this task"
}
```

---

### Update Task
**PUT** `/tasks/:id`

Updates a task. Only task owner or admin can update.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Complete project documentation (Updated)",
  "status": "IN_PROGRESS",
  "priority": "MEDIUM"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Task updated successfully",
  "data": {
    "task": {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Complete project documentation (Updated)",
      "status": "IN_PROGRESS",
      "priority": "MEDIUM",
      "updatedAt": "2026-02-12T19:00:00.000Z"
    }
  }
}
```

---

### Delete Task
**DELETE** `/tasks/:id`

Deletes a task. Only task owner or admin can delete.

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

---

## Error Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created successfully |
| 400 | Bad request / Validation error |
| 401 | Unauthorized / Invalid token |
| 403 | Forbidden / Insufficient permissions |
| 404 | Resource not found |
| 429 | Too many requests (rate limited) |
| 500 | Internal server error |

---

## Authentication Flow

1. **Register** or **Login** to receive JWT token
2. **Store token** in localStorage/sessionStorage
3. **Include token** in `Authorization` header for all protected requests:
   ```
   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
4. Token expires after 7 days (configurable)
5. **Logout** by removing token from storage

---

## Rate Limiting

**Limits:**
- 100 requests per 15 minutes per IP address
- Applies to all `/api/` endpoints

**Rate Limit Headers:**
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1676242800
```

**Exceeded Response (429):**
```json
{
  "success": false,
  "message": "Too many requests from this IP, please try again later"
}
```

---

## Postman Collection

Import the Swagger JSON from `http://localhost:5000/api-docs` into Postman for testing.

**Quick Postman Setup:**
1. Create new environment with variable `base_url` = `http://localhost:5000/api/v1`
2. Create environment variable `token` for storing JWT
3. Set Authorization header globally: `Bearer {{token}}`

---

## Code Examples

### JavaScript/Axios
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
  headers: { 'Content-Type': 'application/json' }
});

// Register
const { data } = await api.post('/auth/register', {
  name: 'John Doe',
  email: 'john@example.com',
  password: 'MyPass123'
});

// Store token
localStorage.setItem('token', data.data.token);

// Set token for future requests
api.defaults.headers.common['Authorization'] = `Bearer ${data.data.token}`;

// Create task
await api.post('/tasks', {
  title: 'My Task',
  priority: 'HIGH'
});
```

### cURL
```bash
# Register
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"MyPass123"}'

# Login
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"MyPass123"}'

# Get tasks (with token)
curl -X GET http://localhost:5000/api/v1/tasks \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## Support

For API issues or questions:
- Check Swagger docs: `http://localhost:5000/api-docs`
- Review examples in this documentation
- Contact: joydip@primetrade.ai
