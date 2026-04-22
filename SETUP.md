# Setup Instructions

## Quick Start

### 1. Backend Setup (Node.js + Express + MongoDB)

```bash
cd backend
npm install
```

Create `.env` file in `backend/` directory:
```
MONGODB_URI=mongodb+srv://your_username:your_password@cluster0.mongodb.net/student_auth
JWT_SECRET=your_secret_key_here
PORT=5000
NODE_ENV=development
```

Start backend:
```bash
npm start
# or with auto-reload
npm run dev
```

Backend will run on `http://localhost:5000`

### 2. Frontend Setup (React)

```bash
cd frontend
npm install
```

Create `.env` file in `frontend/` directory:
```
REACT_APP_API_URL=http://localhost:5000/api
```

Start frontend:
```bash
npm start
```

Frontend will open at `http://localhost:3000`

### 3. MongoDB Setup

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create database user
4. Whitelist your IP address
5. Copy connection string to `.env`

## Testing the Application

1. **Register**: 
   - Navigate to `/register`
   - Fill in all fields
   - Click Register

2. **Login**:
   - Navigate to `/login`
   - Enter credentials
   - Click Login

3. **Dashboard**:
   - View your student information
   - Update password
   - Change course
   - Click Logout

## Deployment

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for Render & Vercel deployment instructions.

## Project Marks Breakdown

### Part A: Backend Development (6 Marks)
✅ MongoDB Student Model with all required fields
✅ REST APIs: Register, Login, Update Password, Update Course
✅ bcrypt for password hashing
✅ JWT for authentication

### Part B: Frontend Development (6 Marks)
✅ Registration Form with all fields
✅ Login Form
✅ Protected Dashboard
✅ Update Password Form
✅ Change Course Option
✅ Logout button
✅ Axios API integration

### Part C: Integration & Functionality (3 Marks)
✅ Route protection with authentication middleware
✅ Access control for dashboard and updates
✅ Comprehensive error handling
✅ Logout functionality
✅ Professional CSS styling

## File Structure

```
Student/
├── backend/              # Node.js + Express Server
│   ├── models/          # MongoDB schemas
│   ├── controllers/     # Business logic
│   ├── routes/          # API routes
│   ├── middleware/      # Authentication middleware
│   ├── server.js        # Main server file
│   ├── package.json
│   ├── .env            # Environment variables
│   └── render.yaml     # Render deployment config
│
├── frontend/            # React Application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/      # Page components
│   │   ├── services/   # API service
│   │   ├── styles/     # CSS files
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   ├── package.json
│   ├── .env            # Development config
│   ├── .env.production # Production config
│   └── vercel.json     # Vercel deployment config
│
├── README.md
├── DEPLOYMENT_GUIDE.md
└── SETUP.md
```

## Technologies Used

- **Backend**: Node.js, Express, MongoDB, Mongoose, bcrypt, JWT
- **Frontend**: React, React Router, Axios
- **Styling**: CSS3 with gradients and animations
- **Deployment**: Render (Backend), Vercel (Frontend)

## Key Features

✅ Secure password hashing with bcrypt
✅ JWT-based authentication with 7-day expiration
✅ Protected routes and middleware
✅ Form validation and error handling
✅ Responsive mobile-friendly design
✅ Modern gradient UI design
✅ localStorage-based token management
✅ Password update with verification
✅ Course management
✅ Production-ready code

---

Start with `npm install` in both directories, then follow the Quick Start guide above!
