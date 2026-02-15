# Deployment Guide - Bellcrop Expense Tracker

This guide will help you deploy the Bellcrop Expense Tracker to production.

## 🚀 Quick Fix for Netlify "Page Not Found" Error

The error you're seeing is because Netlify doesn't know how to handle React Router's client-side routing.

### ✅ Solution Applied

I've created two files to fix this:

1. **`frontend/public/_redirects`** - Tells Netlify to redirect all routes to index.html
2. **`frontend/netlify.toml`** - Netlify configuration file

### Next Steps

1. **Commit the new files:**
   ```bash
   git add frontend/public/_redirects frontend/netlify.toml
   git commit -m "Add Netlify configuration for React Router"
   git push
   ```

2. **Redeploy on Netlify:**
   - Netlify will automatically redeploy
   - OR manually trigger a redeploy in Netlify dashboard

3. **The error should be fixed!** ✅

---

## 📦 Complete Deployment Guide

### Option 1: Deploy Frontend to Netlify

#### Step 1: Prepare Your Repository

```bash
cd bellcrop
git init
git add .
git commit -m "Initial commit"
```

#### Step 2: Push to GitHub

```bash
# Create a new repository on GitHub first
git remote add origin https://github.com/yourusername/bellcrop-expense-tracker.git
git branch -M main
git push -u origin main
```

#### Step 3: Deploy to Netlify

1. Go to [Netlify](https://app.netlify.com/)
2. Click "Add new site" → "Import an existing project"
3. Choose GitHub and select your repository
4. Configure build settings:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/build`
5. Click "Deploy site"

#### Step 4: Configure Environment Variables

In Netlify dashboard:
1. Go to Site settings → Environment variables
2. Add your backend API URL:
   - Key: `REACT_APP_API_URL`
   - Value: `https://your-backend-url.com/api`

---

### Option 2: Deploy Backend to Heroku

#### Step 1: Install Heroku CLI

Download from: https://devcenter.heroku.com/articles/heroku-cli

#### Step 2: Login to Heroku

```bash
heroku login
```

#### Step 3: Create Heroku App

```bash
cd backend
heroku create bellcrop-expense-tracker-api
```

#### Step 4: Add MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string
4. Add it to Heroku:

```bash
heroku config:set MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/bellcrop"
heroku config:set JWT_SECRET="your-super-secret-jwt-key"
heroku config:set NODE_ENV="production"
```

#### Step 5: Create Procfile

```bash
echo "web: node server.js" > Procfile
```

#### Step 6: Deploy to Heroku

```bash
git add .
git commit -m "Prepare for Heroku deployment"
git push heroku main
```

#### Step 7: Open Your App

```bash
heroku open
```

---

### Option 3: Deploy Backend to Railway

#### Step 1: Go to Railway

1. Visit [Railway.app](https://railway.app/)
2. Sign up with GitHub

#### Step 2: Deploy Backend

1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your repository
4. Select the `backend` folder as root

#### Step 3: Add Environment Variables

In Railway dashboard:
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: Your secret key
- `NODE_ENV`: production
- `PORT`: 5000

#### Step 4: Get Your Backend URL

Railway will provide a URL like: `https://bellcrop-api.up.railway.app`

---

### Option 4: Deploy Backend to Render

#### Step 1: Go to Render

1. Visit [Render.com](https://render.com/)
2. Sign up with GitHub

#### Step 2: Create Web Service

1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name**: bellcrop-api
   - **Root Directory**: backend
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

#### Step 3: Add Environment Variables

- `MONGODB_URI`
- `JWT_SECRET`
- `NODE_ENV=production`

---

## 🔧 Troubleshooting Netlify Issues

### Issue 1: Page Not Found (404)

**Cause**: React Router routes not configured for Netlify

**Solution**: ✅ Already fixed with `_redirects` file

### Issue 2: API Calls Failing

**Cause**: Frontend trying to call localhost API

**Solution**: 
1. Deploy backend first
2. Set `REACT_APP_API_URL` in Netlify environment variables
3. Redeploy frontend

### Issue 3: CORS Errors

**Cause**: Backend not allowing frontend domain

**Solution**: Update backend CORS settings

```javascript
// In backend/server.js
app.use(cors({
  origin: ['https://your-netlify-app.netlify.app'],
  credentials: true
}));
```

### Issue 4: Build Fails

**Cause**: Missing dependencies or build errors

**Solution**:
1. Check build logs in Netlify
2. Ensure all dependencies are in `package.json`
3. Test build locally: `npm run build`

---

## 📋 Pre-Deployment Checklist

### Backend
- [ ] MongoDB Atlas cluster created
- [ ] Environment variables configured
- [ ] CORS settings updated for production
- [ ] Backend deployed and accessible
- [ ] API endpoints tested

### Frontend
- [ ] `_redirects` file in `public/` folder
- [ ] `netlify.toml` configured
- [ ] `REACT_APP_API_URL` environment variable set
- [ ] Build tested locally
- [ ] Frontend deployed

### Testing
- [ ] Can register new user
- [ ] Can login
- [ ] Can add transaction
- [ ] Can edit transaction
- [ ] Can delete transaction
- [ ] Dashboard loads correctly
- [ ] All routes work (no 404s)

---

## 🌐 Full Stack Deployment Combinations

### Recommended: Netlify + Railway

**Frontend**: Netlify (Free)
- Fast CDN
- Automatic deployments
- Custom domains

**Backend**: Railway (Free tier available)
- Easy setup
- Built-in database support
- Good performance

### Alternative: Vercel + Heroku

**Frontend**: Vercel
**Backend**: Heroku

### Budget Option: Netlify + Render

Both have generous free tiers!

---

## 📝 Post-Deployment Steps

### 1. Update Frontend Environment

In Netlify:
```
REACT_APP_API_URL=https://your-backend.railway.app/api
```

### 2. Update Backend CORS

```javascript
const allowedOrigins = [
  'http://localhost:3000',
  'https://your-app.netlify.app'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
```

### 3. Test All Features

- Registration
- Login
- CRUD operations
- Search and filters
- Dashboard charts

### 4. Monitor Performance

- Check Netlify analytics
- Monitor backend logs
- Set up error tracking (optional: Sentry)

---

## 🆘 Quick Fixes

### Fix 1: 404 on Refresh
✅ Already fixed with `_redirects` file

### Fix 2: Can't Connect to Backend
```bash
# In Netlify, add environment variable:
REACT_APP_API_URL=https://your-backend-url.com/api
```

### Fix 3: CORS Error
Update backend CORS to allow your Netlify domain

### Fix 4: MongoDB Connection Error
Check your MongoDB Atlas:
- IP whitelist (allow all: 0.0.0.0/0)
- Correct connection string
- Database user permissions

---

## 📞 Need Help?

### Common Issues

1. **Build fails**: Check Node version compatibility
2. **API not working**: Verify environment variables
3. **404 errors**: Ensure `_redirects` file is in `public/` folder
4. **CORS errors**: Update backend allowed origins

### Resources

- [Netlify Docs](https://docs.netlify.com/)
- [Railway Docs](https://docs.railway.app/)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)

---

## ✅ Your Current Fix

For your immediate "Page not found" error:

1. ✅ `_redirects` file created
2. ✅ `netlify.toml` file created
3. **Next**: Commit and push these files
4. **Then**: Netlify will auto-redeploy
5. **Result**: No more 404 errors! 🎉

```bash
# Run these commands:
git add .
git commit -m "Fix Netlify routing with _redirects and netlify.toml"
git push
```

That's it! Your app should work now! 🚀

---

**Last Updated**: February 14, 2026
