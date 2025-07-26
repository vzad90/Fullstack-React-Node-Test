# Fullstack Task Manager Application

A modern, full-stack task management application built with React, TypeScript, Node.js, Express, and PostgreSQL. Features user authentication, task CRUD operations, and a beautiful responsive UI.

## 🚀 Features

### Backend Features
- **User Authentication**: JWT-based authentication with bcrypt password hashing
- **User Management**: Create, read, update, delete users
- **Task Management**: Full CRUD operations for tasks with status tracking
- **Database**: PostgreSQL with Prisma ORM
- **API Security**: Protected routes with middleware
- **Error Handling**: Comprehensive error handling and validation
- **Testing**: Jest test suite with coverage reporting

### Frontend Features
- **Modern UI**: Beautiful, responsive design with Tailwind CSS
- **User Authentication**: Login/Register/Logout functionality
- **Task Management**: Create, edit, delete, and toggle task status
- **Real-time Updates**: Immediate UI updates with toast notifications
- **Form Validation**: Client-side validation with error handling
- **State Management**: Zustand for global state management
- **Routing**: React Router for navigation
- **Testing**: Jest and React Testing Library

## 🏗️ Architecture

```
├── backend/                 # Node.js + Express + TypeScript
│   ├── src/
│   │   ├── controllers/     # Business logic
│   │   ├── middleware/      # Authentication middleware
│   │   ├── models/          # Data models
│   │   ├── routes/          # API routes
│   │   └── utils/           # Utility functions
│   ├── prisma/              # Database schema and migrations
│   └── __tests__/           # Test files
├── frontend/                # React + TypeScript + Vite
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── features/        # Feature-based components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── layouts/         # Layout components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   └── store/           # State management
│   └── public/              # Static assets
└── docker-compose.yml       # Docker orchestration
```

## 📋 API Routes

### Authentication Routes (`/auth`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/login` | User login | No |

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "user@example.com"
  }
}
```

### User Routes (`/users`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/users/create` | Create new user | No |
| GET | `/users` | Get all users | Yes |
| GET | `/users/get-user-data` | Get current user data | Yes |
| PUT | `/users/:user_id` | Update user | Yes |
| DELETE | `/users/:user_id` | Delete user | Yes |

**Create User Request Body:**
```json
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "password123"
}
```

### Task Routes (`/tasks`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/tasks/create` | Create new task | Yes |
| GET | `/tasks` | Get all tasks | Yes |
| GET | `/tasks/user` | Get user's tasks | Yes |
| GET | `/tasks/:task_id` | Get specific task | Yes |
| PUT | `/tasks/:task_id` | Update task | Yes |
| DELETE | `/tasks/:task_id` | Delete task | Yes |

**Create Task Request Body:**
```json
{
  "title": "Complete project",
  "description": "Finish the task manager application"
}
```

**Update Task Request Body:**
```json
{
  "title": "Updated title",
  "description": "Updated description",
  "status": "DONE"
}
```

## 🛠️ Installation

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (v15 or higher)
- Docker (optional, for containerized setup)

### Option 1: Docker Setup (Recommended)

1. **Clone the repository:**
```bash
git clone <repository-url>
cd Fullstack-React-Node-Test
```

2. **Start all services:**
```bash
# For production
docker-compose up --build

# For development (with hot reloading)
docker-compose -f docker-compose.dev.yml up --build
```

3. **Access the application:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- Database: localhost:5432

### Option 2: Manual Setup

#### Backend Setup

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
Create a `.env` file in the backend directory:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/taskmanager"
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="1d"
NODE_ENV="development"
```

4. **Set up database:**
```bash
# Install Prisma CLI globally (if not already installed)
npm install -g prisma

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed database (optional)
npx prisma db seed
```

5. **Start the development server:**
```bash
npm run dev
```

#### Frontend Setup

1. **Navigate to frontend directory:**
```bash
cd frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the development server:**
```bash
npm run dev
```

## 🧪 Testing

### Backend Testing

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Run tests:**
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

**Test Files:**
- `__tests__/auth.test.ts` - Authentication tests
- `__tests__/user.test.ts` - User management tests
- `__tests__/task.test.ts` - Task management tests
- `__tests__/middleware.test.ts` - Middleware tests
- `__tests__/integration.test.ts` - Integration tests

### Frontend Testing

1. **Navigate to frontend directory:**
```bash
cd frontend
```

2. **Run tests:**
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

**Test Files:**
- `components/ui/Button.test.tsx` - Button component tests
- `components/ui/Card.test.tsx` - Card component tests
- `components/ui/Input.test.tsx` - Input component tests
- `components/ui/LoadingSpinner.test.tsx` - LoadingSpinner tests

## 📊 Database Schema

### User Model
```prisma
model User {
  id       Int    @id @default(autoincrement())
  name     String
  email    String @unique
  password String
  tasks    Task[]
}
```

### Task Model
```prisma
model Task {
  id          Int    @id @default(autoincrement())
  title       String
  description String
  status      Status @default(IN_PROGRESS)
  User        User   @relation(fields: [userId], references: [id])
  userId      Int
}

enum Status {
  IN_PROGRESS
  DONE
}
```

## 🔧 Available Scripts

### Backend Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm test             # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage
```

### Frontend Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm test             # Run tests
npm run test:watch   # Run tests in watch mode
```

## 🎨 UI Components

The application includes a comprehensive UI component library:

### Core Components
- **Button**: Multiple variants (primary, secondary, danger, success, warning)
- **Input**: Form inputs with validation and error states
- **Card**: Container component with customizable padding and shadows
- **LoadingSpinner**: Loading indicator with different sizes

### Layout Components
- **Header**: Navigation header with authentication state
- **Layout**: Main layout wrapper with header and content area

### Feature Components
- **TaskManager**: Main task management interface
- **CreateTaskForm**: Form for creating new tasks
- **TasksList**: List of user tasks with actions
- **EditTaskModal**: Modal for editing tasks

## 🔐 Authentication Flow

1. **Registration**: User creates account with name, email, and password
2. **Login**: User authenticates with email and password
3. **JWT Token**: Server returns JWT token for authenticated requests
4. **Protected Routes**: All task operations require valid JWT token
5. **Logout**: User logs out and token is cleared

## 🌐 API Error Handling

The API returns consistent error responses:

```json
{
  "error": "Error message",
  "status": 400,
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

## 🚀 Deployment

### Production Build

1. **Backend:**
```bash
cd backend
npm run build
npm start
```

2. **Frontend:**
```bash
cd frontend
npm run build
```

3. **Docker Production:**
```bash
docker-compose up --build
```

### Environment Variables

**Backend (.env):**
```env
DATABASE_URL="postgresql://username:password@host:port/database"
JWT_SECRET="your-secure-secret-key"
JWT_EXPIRES_IN="1d"
NODE_ENV="production"
```

**Frontend (.env):**
```env
VITE_API_URL="http://your-api-domain.com"
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

