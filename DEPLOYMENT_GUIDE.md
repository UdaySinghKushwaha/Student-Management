## DEPLOYMENT GUIDE

### Prerequisites
- MongoDB Atlas account (for database)
- Render account (for backend)
- Vercel account (for frontend)
- Git repository

### Backend Deployment on Render

1. **Prepare Repository**
   - Push your backend code to GitHub
   - Ensure all dependencies are in `package.json`
   - Add `render.yaml` file (already included)

2. **Create Render Service**
   - Go to [render.com](https://render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: student-auth-backend
     - **Runtime**: Node
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`

3. **Set Environment Variables**
   - In Render dashboard, go to your service
   - Click "Environment" tab
   - Add the following variables:
     ```
     MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/student_auth
     JWT_SECRET=your_secret_key_here_use_strong_random_string
     NODE_ENV=production
     PORT=5000
     ```

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Copy the service URL (e.g., https://student-auth-backend.onrender.com)

### Frontend Deployment on Vercel

1. **Update Backend URL**
   - In `frontend/.env.production`:
     ```
     REACT_APP_API_URL=https://student-auth-backend.onrender.com/api
     ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Configure:
     - **Framework**: Create React App
     - **Root Directory**: frontend
     - **Build Command**: `npm run build`
     - **Output Directory**: build

3. **Set Environment Variables**
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add:
     ```
     REACT_APP_API_URL=https://student-auth-backend.onrender.com/api
     ```

4. **Deploy**
   - Click "Deploy"
   - Your frontend will be live at the Vercel URL

### MongoDB Atlas Setup

1. Create a cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a database user with credentials
3. Whitelist your Render IP address in Network Access
4. Use the connection string in `MONGODB_URI`

### Testing the Deployment

1. Visit your Vercel frontend URL
2. Register a new student account
3. Login with the credentials
4. Update password and course
5. Logout and login again to verify

### Troubleshooting

- **Backend Connection Error**: Check MONGODB_URI and network whitelist
- **CORS Error**: Verify backend is allowing requests from frontend URL
- **JWT Error**: Ensure JWT_SECRET is set correctly in environment variables
- **Token Issues**: Clear browser localStorage and try again
