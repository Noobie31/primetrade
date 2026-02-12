# PrimeTrade - Backend Developer Intern Assignment

A full-stack task management application with **JWT authentication**, **role-based access control**, and a modern **MERN** stack architecture.

![Node.js](https://img.shields.io/badge/Node.js-v18+-green) ![MongoDB](https://img.shields.io/badge/MongoDB-Database-green) ![Express](https://img.shields.io/badge/Express-Backend-blue) ![Next.js](https://img.shields.io/badge/Next.js-14-black) ![TypeScript](https://img.shields.io/badge/TypeScript-Language-blue)

## 🚀 Features

### Backend
- ✅ **User Authentication** - Secure registration and login with JWT tokens
- ✅ **Password Hashing** - bcryptjs for secure password storage
- ✅ **Role-Based Access Control** - USER and ADMIN roles with different permissions
- ✅ **Task CRUD Operations** - Create, Read, Update, Delete tasks
- ✅ **API Versioning** - `/api/v1` endpoint structure
- ✅ **Input Validation** - express-validator for request validation
- ✅ **Error Handling** - Comprehensive error handling middleware
- ✅ **API Documentation** - Interactive Swagger/OpenAPI docs
- ✅ **Logging** - Winston logger with file and console output
- ✅ **Security** - Helmet, CORS, rate limiting

### Frontend
- ✅ **Modern UI** - Beautiful glassmorphic design with Tailwind CSS
- ✅ **Authentication Pages** - Register and Login with validation
- ✅ **Protected Dashboard** - JWT-protected task management interface
- ✅ **Task Management** - Full CRUD operations with status and priority
- ✅ **Filtering** - Filter tasks by status and priority
- ✅ **Responsive Design** - Works on all device sizes
- ✅ **Role Display** - Shows user/admin badges

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Backend** | Node.js (v18+), Express.js, TypeScript |
| **Database** | MongoDB with Mongoose ODM |
| **Authentication** | JWT (jsonwebtoken), bcryptjs |
| **Validation** | express-validator |
| **Documentation** | Swagger/OpenAPI |
| **Frontend** | Next.js 14, React 18, TypeScript |
| **Styling** | Tailwind CSS |
| **State Management** | Zustand |
| **HTTP Client** | Axios |
| **Icons** | Lucide React |

## 📁 Project Structure

```
primetrade/
├── backend/
│   ├── src/
│   │   ├── config/          # Database & Swagger configuration
│   │   ├── controllers/     # Route controllers (auth, task)
│   │   ├── middleware/      # Auth, RBAC, validation, error handling
│   │   ├── models/          # Mongoose models (User, Task)
│   │   ├── routes/          # API routes
│   │   ├── utils/           # JWT & logger utilities
│   │   └── index.ts         # Express server entry point
│   ├── logs/                # Application logs
│   ├── .env                 # Environment variables
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── app/             # Next.js pages (landing, login, register, dashboard)
│   │   ├── components/      # React components (TaskCard, TaskForm)
│   │   ├── lib/             # API client & auth utilities
│   │   └── store/           # Zustand state management
│   ├── .env.local           # Frontend environment variables
│   └── package.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js v18 or higher
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables** (`.env`):
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/primetrade
   JWT_SECRET=your-super-secret-jwt-key-change-this
   JWT_EXPIRE=7d
   FRONTEND_URL=http://localhost:3000
   ```

4. **Start MongoDB** (if running locally):
   ```bash
   mongod
   ```

5. **Run the backend server**:
   ```bash
   npm run dev
   ```

   The API will be available at `http://localhost:5000`

6. **Access API Documentation**:
   Open `http://localhost:5000/api-docs` in your browser

### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables** (`.env.local`):
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
   ```

4. **Run the frontend**:
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:3000`

## 📚 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/register-admin` - Register admin user (requires ADMIN_SECRET)
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/me` - Get current user (protected)

### Tasks
- `POST /api/v1/tasks` - Create task (protected)
- `GET /api/v1/tasks` - Get all tasks (protected, filtered by role)
- `GET /api/v1/tasks/:id` - Get single task (protected)
- `PUT /api/v1/tasks/:id` - Update task (protected, owner/admin only)
- `DELETE /api/v1/tasks/:id` - Delete task (protected, owner/admin only)

**Full API documentation available at:** `http://localhost:5000/api-docs`

## 🔐 Security Features

- **Password Hashing**: bcryptjs with salt rounds
- **JWT Authentication**: Secure token-based auth
- **Role-Based Access Control**: USER and ADMIN roles
- **Input Validation**: express-validator for all inputs
- **Input Sanitization**: XSS protection
- **Rate Limiting**: Prevents brute force attacks
- **CORS**: Configured for frontend origin
- **Helmet**: Security headers
- **Error Handling**: No sensitive data exposure

## 📈 Scalability

See [SCALABILITY.md](./SCALABILITY.md) for detailed scalability strategies including:
- Horizontal scaling with load balancers
- Microservices architecture migration
- Redis caching implementation
- Database sharding and replication
- CDN integration
- Monitoring and logging

## 🐳 Docker Deployment

```bash
docker-compose up -d
```

## 🧪 Testing

### Backend
```bash
cd backend
npm run test
```

### Frontend
```bash
cd frontend
npm run test
```

## 📝 User Roles

| Role | Permissions |
|------|------------|
| **USER** | Create, read, update, delete own tasks |
| **ADMIN** | All USER permissions + view/manage all tasks + see task creators |

**Creating Admin Users:**
Use the `/api/v1/auth/register-admin` endpoint with `ADMIN_SECRET` environment variable.
See [ADMIN_SETUP.md](./ADMIN_SETUP.md) for detailed instructions.

## 🎨 Features Showcase

### Landing Page
- Modern gradient design with animated blob backgrounds
- Feature cards with glassmorphism effects
- Call-to-action buttons

### Authentication
- Beautiful login/register forms
- Real-time validation
- Error/success notifications

### Dashboard
- Task statistics overview
- Status and priority filters
- CRUD operations with modal forms
- Role badges (User/Admin)
- **Admin View**: See all tasks with creator information (name & email)
- Responsive grid layout

## 📧 Contact

For questions about this assignment:
- **Email**: joydip@primetrade.ai, hello@primetrade.ai, chetan@primetrade.ai, sonika@primetrade.ai
- **Subject**: <Your Name> Backend Developer Task

## 📄 License

This project is created as part of the Backend Developer Intern assignment for PrimeTrade.

---

**Built with ❤️ using MERN Stack**
