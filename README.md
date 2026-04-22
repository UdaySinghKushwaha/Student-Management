# Student Authentication System - MERN Stack

A complete student authentication and management system built with MongoDB, Express, React, and Node.js.

## Features

✅ **User Authentication**
- Student Registration with email verification
- Secure Login with JWT tokens
- Password hashing using bcrypt

✅ **Protected Dashboard**
- View student profile information
- Update password with old password verification
- Change enrolled course
- Secure logout functionality

✅ **Security Features**
- JWT-based authentication
- Protected routes with middleware
- Password hashing with bcrypt
- Input validation and error handling
- CORS enabled for secure cross-origin requests

✅ **Responsive Design**
- Modern UI with gradient backgrounds
- Mobile-friendly interface
- Smooth transitions and animations

## Project Structure

```
Student/
├── backend/
│   ├── models/
│   │   └── Student.js          # MongoDB Student schema
│   ├── controllers/
│   │   └── authController.js   # Authentication logic
│   ├── routes/
│   │   └── authRoutes.js       # API routes
│   ├── middleware/
│   │   └── authMiddleware.js   # JWT verification
│   ├── server.js               # Express server
│   ├── package.json
│   ├── .env                    # Environment variables
│   └── render.yaml             # Render deployment config
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── ProtectedRoute.js    # Route protection
│   │   ├── pages/
│   │   │   ├── Register.js          # Registration page
│   │   │   ├── Login.js             # Login page
│   │   │   └── Dashboard.js         # Protected dashboard
│   │   ├── services/
│   │   │   └── api.js               # Axios API calls
│   │   ├── styles/
│   │   │   ├── App.css
│   │   │   ├── AuthForms.css
│   │   │   ├── Dashboard.css
│   │   │   └── index.css
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   ├── .env
│   └── vercel.json
│
├── DEPLOYMENT_GUIDE.md
└── README.md
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- Git

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/student_auth
   JWT_SECRET=your_jwt_secret_key_change_in_production
   PORT=5000
   NODE_ENV=development
   ```

4. **Start the server**
   ```bash
   npm start
   # or for development with auto-reload
   npm run dev
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file**
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

The application will open at `http://localhost:3000`

## API Endpoints

### Public Routes

- **POST** `/api/register` - Register a new student
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "course": "Computer Science"
  }
  ```

- **POST** `/api/login` - Login student
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

### Protected Routes (Requires JWT Token)

- **GET** `/api/student` - Get current student details
  - Header: `Authorization: Bearer {token}`

- **PUT** `/api/update-password` - Update password
  ```json
  {
    "oldPassword": "password123",
    "newPassword": "newpassword456"
  }
  ```

- **PUT** `/api/update-course` - Update course
  ```json
  {
    "course": "Information Technology"
  }
  ```

## Available Courses

- Computer Science
- Information Technology
- Engineering
- Business
- Arts
- Science

## Authentication Flow

1. **Registration**: Student provides name, email, password, and course
2. **Password Hashing**: Password is hashed using bcrypt before storing
3. **Login**: Student provides email and password
4. **JWT Generation**: On successful login, JWT token is generated
5. **Token Storage**: Token is stored in localStorage
6. **Protected Routes**: Dashboard requires valid JWT token
7. **Token Validation**: Middleware verifies JWT on protected routes
8. **Logout**: Clears token from localStorage

## Error Handling

The system handles various error cases:

- ❌ Duplicate email registration
- ❌ Invalid login credentials
- ❌ Unauthorized access (missing/invalid token)
- ❌ Old password mismatch
- ❌ Missing required fields
- ❌ Invalid email format

## Security Measures

✅ **Password Security**
- Bcrypt hashing with salt rounds
- Minimum 6 character requirement
- Old password verification for changes

✅ **Authentication**
- JWT with 7-day expiration
- Bearer token in Authorization header
- Middleware validation on protected routes

✅ **Data Validation**
- Email uniqueness check
- Email format validation
- Required field validation

✅ **CORS Protection**
- Configured for secure cross-origin requests
- Environment-specific URLs

## Deployment

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed deployment instructions.

### Quick Deploy Links

- **Backend**: Render (Node.js + Express + MongoDB)
- **Frontend**: Vercel (React)

## Technologies Used

### Backend
- **Express.js** - Web framework
- **MongoDB & Mongoose** - Database
- **bcrypt** - Password hashing
- **jsonwebtoken** - JWT authentication
- **CORS** - Cross-origin requests
- **dotenv** - Environment variables

### Frontend
- **React 18** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **CSS3** - Styling with gradients and animations

## Usage Example

### Register
1. Click "Register here" on login page
2. Fill in name, email, password, and select course
3. Click Register
4. Automatically redirected to dashboard

### Login
1. Enter email and password
2. Click Login
3. Dashboard loads with your information

### Update Password
1. Click "Update Password" tab
2. Enter current password
3. Enter new password
4. Click "Update Password"

### Change Course
1. Click "Change Course" tab
2. Select new course from dropdown
3. Click "Update Course"

### Logout
1. Click "Logout" button in dashboard header
2. Redirected to login page

## License

This project is open source and available for educational purposes.

## Support

For issues or questions, please create an issue in the repository.

---

**Happy Coding! 🚀**
