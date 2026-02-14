# Bellcrop Expense Tracker - Complete Setup Guide

This guide will walk you through setting up the Bellcrop Personal Expense Tracker from scratch.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [MongoDB Setup](#mongodb-setup)
3. [Backend Setup](#backend-setup)
4. [Frontend Setup](#frontend-setup)
5. [Testing the Application](#testing-the-application)
6. [Common Issues](#common-issues)

## Prerequisites

### Required Software

1. **Node.js and npm**
   - Download from: https://nodejs.org/
   - Recommended version: v14.x or higher
   - Verify installation:
     ```bash
     node --version
     npm --version
     ```

2. **MongoDB**
   - Download from: https://www.mongodb.com/try/download/community
   - Recommended version: v4.4 or higher
   - Verify installation:
     ```bash
     mongod --version
     ```

3. **Git** (Optional, for version control)
   - Download from: https://git-scm.com/

## MongoDB Setup

### Option 1: Local MongoDB Installation

1. **Install MongoDB Community Edition**
   - Follow the installation guide for your OS: https://docs.mongodb.com/manual/installation/

2. **Start MongoDB Service**
   
   **Windows:**
   ```bash
   # Start as a service (if installed as service)
   net start MongoDB
   
   # Or run directly
   mongod
   ```

   **macOS:**
   ```bash
   brew services start mongodb-community
   ```

   **Linux:**
   ```bash
   sudo systemctl start mongod
   ```

3. **Verify MongoDB is Running**
   ```bash
   mongo
   # You should see MongoDB shell prompt
   ```

### Option 2: MongoDB Atlas (Cloud)

1. **Create Free Account**
   - Go to: https://www.mongodb.com/cloud/atlas
   - Sign up for free tier

2. **Create a Cluster**
   - Choose free tier (M0)
   - Select your preferred region
   - Create cluster

3. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

4. **Update Backend .env**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bellcrop?retryWrites=true&w=majority
   ```

## Backend Setup

### Step 1: Navigate to Backend Directory
```bash
cd bellcrop/backend
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install:
- express
- mongoose
- bcryptjs
- jsonwebtoken
- cors
- dotenv
- express-validator
- nodemon (dev dependency)

### Step 3: Configure Environment Variables

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bellcrop-expense-tracker
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

**Important Notes:**
- Change `JWT_SECRET` to a random, secure string in production
- If using MongoDB Atlas, update `MONGODB_URI` with your connection string
- Never commit `.env` file to version control

### Step 4: Test Backend

Start the development server:
```bash
npm run dev
```

You should see:
```
Server running in development mode on port 5000
MongoDB Connected: localhost
```

### Step 5: Test API Health Check

Open browser or use curl:
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2026-02-14T..."
}
```

## Frontend Setup

### Step 1: Navigate to Frontend Directory
```bash
cd ../frontend
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install:
- react
- react-dom
- react-router-dom
- axios
- react-icons
- recharts
- react-scripts

### Step 3: Start Development Server
```bash
npm start
```

The application should automatically open in your browser at:
```
http://localhost:3000
```

## Testing the Application

### 1. Register a New User

1. Navigate to `http://localhost:3000`
2. Click "Register here"
3. Fill in the registration form:
   - Full Name: Test User
   - Email: test@example.com
   - Password: password123
   - Confirm Password: password123
4. Click "Register"

### 2. Login

If registration is successful, you'll be automatically logged in and redirected to the dashboard.

### 3. Add a Transaction

1. Click "Add Transaction" button
2. Fill in the form:
   - Title: Grocery Shopping
   - Amount: 54.20
   - Category: Food
   - Date: Select today's date
   - Notes: Weekly groceries
3. Click "Add Transaction"

### 4. Explore Features

**Dashboard:**
- View total expenses
- See category breakdown chart
- Check monthly trends
- View recent transactions

**Transaction Explorer:**
- Search for transactions
- Apply filters (category, date range, amount)
- Edit transactions
- Delete transactions
- Navigate through pages

## Common Issues

### Issue 1: MongoDB Connection Failed

**Error:**
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution:**
- Ensure MongoDB is running: `mongod`
- Check if MongoDB is using default port 27017
- Verify `MONGODB_URI` in `.env` file

### Issue 2: Port Already in Use

**Error:**
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:5000 | xargs kill -9

# Or change PORT in .env file
```

### Issue 3: npm install Fails

**Error:**
```
npm ERR! code EACCES
```

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Try again
npm install

# If still fails, try with sudo (macOS/Linux)
sudo npm install
```

### Issue 4: React App Won't Start

**Error:**
```
Error: ENOSPC: System limit for number of file watchers reached
```

**Solution (Linux):**
```bash
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

### Issue 5: CORS Error in Browser

**Error:**
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution:**
- Ensure backend is running on port 5000
- Check `proxy` setting in `frontend/package.json`
- Verify CORS is enabled in `backend/server.js`

### Issue 6: JWT Token Invalid

**Error:**
```
Not authorized, token failed
```

**Solution:**
- Clear browser localStorage
- Login again
- Ensure `JWT_SECRET` is set in backend `.env`

## Running Both Servers Simultaneously

### Option 1: Two Terminal Windows

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm start
```

### Option 2: Using Concurrently (Optional)

1. Install concurrently in root:
   ```bash
   npm install -g concurrently
   ```

2. Create a script in root `package.json`:
   ```json
   {
     "scripts": {
       "dev": "concurrently \"cd backend && npm run dev\" \"cd frontend && npm start\""
     }
   }
   ```

3. Run both:
   ```bash
   npm run dev
   ```

## Production Deployment

### Backend

1. Set environment to production:
   ```env
   NODE_ENV=production
   ```

2. Use a process manager like PM2:
   ```bash
   npm install -g pm2
   pm2 start server.js --name bellcrop-backend
   ```

### Frontend

1. Build the production bundle:
   ```bash
   cd frontend
   npm run build
   ```

2. Serve the build folder using a static server or deploy to:
   - Netlify
   - Vercel
   - AWS S3 + CloudFront
   - Heroku

## Next Steps

1. **Customize Categories**: Edit `frontend/src/utils/categories.js`
2. **Add More Features**: Refer to the main README for enhancement ideas
3. **Secure the App**: Change JWT_SECRET, use HTTPS, add rate limiting
4. **Monitor Performance**: Add logging, error tracking (Sentry)

## Support

For issues or questions:
1. Check the main README.md
2. Review the code comments
3. Check MongoDB and Node.js logs
4. Verify all environment variables are set correctly

---

**Happy Coding! 🚀**
