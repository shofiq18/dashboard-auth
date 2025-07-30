# Full-Stack Authentication App

A complete authentication system with Next.js frontend and Node.js backend, featuring JWT authentication, role-based access control, and MongoDB integration.

## 🚀 Features

### Frontend (Next.js)
- TypeScript + Tailwind CSS
- Redux Toolkit (RTK) for state management
- RTK Query for API calls
- Login/Signup forms with validation
- JWT token management with cookies
- Responsive design

### Backend (Node.js/Express)
- TypeScript + Express.js
- MongoDB with Mongoose
- JWT authentication
- Role-based access control (Admin, User, Editor)
- Password hashing with bcryptjs
- Input validation
- CORS configured

## 📋 Prerequisites

1. **Node.js** (v18 or higher)
2. **MongoDB** (Choose one option):
   - MongoDB Atlas (Cloud) - Recommended
   - Local MongoDB installation

## 🛠️ Quick Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Database Setup

Use our interactive setup tool:

```bash
npm run setup
```

Or choose manual setup:

#### Option A: MongoDB Atlas (Cloud) - Recommended
```bash
# 1. Go to https://cloud.mongodb.com
# 2. Create a free account and cluster (M0 Sandbox)
# 3. Create a database user with username and password
# 4. Add 0.0.0.0/0 to IP whitelist (for development)
# 5. Get your connection string
# 6. Update MONGODB_URI in backend/.env
```

#### Option B: Local MongoDB Installation
```bash
# Windows: Download from https://www.mongodb.com/try/download/community
# macOS: brew install mongodb/brew/mongodb-community
# Linux: Follow guide at https://www.mongodb.com/docs/manual/installation/
# Start MongoDB service
# Connection will be: mongodb://localhost:27017/auth_app
```

### 3. Environment Variables

The setup is automatically created, but you can verify:

Frontend (`.env.local`):
```env
NEXT_PUBLIC_URL=http://localhost:5000/api
```

Backend (`backend/.env`):
```env
PORT=5000
MONGODB_URI=your-database-connection-string-here
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### 4. Start Development Servers

#### Start Both (Frontend + Backend):
```bash
npm run dev:full
```

#### Or Start Individually:
```bash
# Frontend only (port 3000)
npm run dev

# Backend only (port 5000)
npm run backend:dev
```

## 🌐 Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/api/health

## 📚 API Endpoints

### Public Routes
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Protected Routes
- `GET /api/auth/me` - Get current user
- `GET /api/auth/users` - Get all users (Admin only)
- `PATCH /api/auth/update-role/:id` - Update user role (Admin only)

## 🏗️ Project Structure

```
├── frontend/
│   ├── src/
│   │   ├── app/              # Next.js app router
│   │   ├── components/       # React components
│   │   ├── features/         # RTK slices and API
│   │   ├── lib/             # Utilities and config
│   │   └── types/           # TypeScript types
│   └── ...
├── backend/
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── middleware/      # Auth middleware
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── utils/          # Utilities
│   │   └── config/         # Database config
│   └── ...

└── README.md               # This file
```

## 🔧 Development Scripts

```bash
# Frontend development
npm run dev                 # Start Next.js dev server
npm run build              # Build for production
npm run start              # Start production server

# Backend development
npm run backend:dev        # Start backend dev server
npm run backend:build      # Build backend
npm run backend:start      # Start backend production

# Full-stack development
npm run dev:full           # Start both frontend and backend
npm run build:full         # Build both frontend and backend
```

## 🛡️ Authentication Flow

1. **Registration**: User creates account with email/password
2. **Login**: User authenticates with credentials
3. **JWT Token**: Server returns JWT token stored in cookies
4. **Protected Routes**: Token validates access to protected endpoints
5. **Role-Based Access**: Different permissions for Admin/User/Editor roles

## 🚨 Troubleshooting

### MongoDB Connection Issues
If you see MongoDB connection errors:

1. **Using Atlas**: Check your connection string and network access
2. **Local MongoDB**: Ensure MongoDB service is running
3. **Need help?**: Run `npm run setup` for interactive database setup

### Port Conflicts
- Frontend runs on port 3000
- Backend runs on port 5000
- MongoDB runs on port 27017 (if using local MongoDB)

Change ports in the respective config files if needed.

### Environment Variables
Make sure both `.env.local` (frontend) and `backend/.env` (backend) files are created with the correct values.

## 📝 Testing the System

1. Start both servers with `npm run dev:full`
2. Visit http://localhost:3000
3. Register a new account
4. Login with the account
5. Navigate to protected areas
6. Test role-based features (if you create an Admin user)

## 🚀 Production Deployment

### Frontend (Vercel/Netlify)
1. Build: `npm run build`
2. Deploy the `.next` folder
3. Set environment variables in your hosting platform

### Backend (Railway/Heroku/AWS)
1. Build: `npm run backend:build`
2. Deploy the `backend/dist` folder
3. Set production environment variables
4. Use MongoDB Atlas for production database

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test the changes
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
