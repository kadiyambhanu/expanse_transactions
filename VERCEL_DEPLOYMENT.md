# 🚀 Vercel Deployment Guide - Bellcrop Expense Tracker

## ✅ Quick Checklist

- [x] ✅ package.json exists in frontend folder
- [x] ✅ vercel.json configuration created
- [x] ✅ _redirects file for routing
- [ ] 🔄 Set Root Directory in Vercel (if needed)
- [ ] 🔄 Push changes to GitHub
- [ ] 🔄 Deploy/Redeploy on Vercel

---

## 📁 Project Structure Confirmed

```
bellcrop/
├── frontend/
│   ├── package.json ✅ (EXISTS)
│   ├── vercel.json ✅ (CREATED)
│   ├── public/
│   │   └── _redirects ✅ (CREATED)
│   └── src/
├── backend/
│   └── package.json ✅ (EXISTS)
└── vercel.json ✅ (CREATED - ROOT)
```

---

## 🎯 Deployment Options

### Option 1: Deploy Frontend Only (Recommended)

If you're deploying just the frontend to Vercel:

#### Step 1: Configure Vercel Project

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your GitHub repository
4. **IMPORTANT**: Set these settings:

```
Framework Preset: Create React App
Root Directory: frontend
Build Command: npm run build
Output Directory: build
Install Command: npm install
```

#### Step 2: Environment Variables

Add in Vercel dashboard → Settings → Environment Variables:

```
REACT_APP_API_URL=https://your-backend-url.com/api
```

#### Step 3: Deploy

Click "Deploy" and wait for build to complete!

---

### Option 2: Deploy from Root Directory

If you want to deploy from the root:

#### Step 1: Vercel Configuration

The `vercel.json` file in the root is already configured to:
- Build from the `frontend` folder
- Output to `frontend/build`
- Handle React Router routing

#### Step 2: Deploy

```bash
# Install Vercel CLI (optional)
npm i -g vercel

# Deploy from root
cd bellcrop
vercel
```

---

## 🔧 Configuration Files Explained

### 1. Root `vercel.json`

```json
{
  "buildCommand": "cd frontend && npm install && npm run build",
  "outputDirectory": "frontend/build",
  "installCommand": "cd frontend && npm install"
}
```

**Purpose**: Tells Vercel to build from the frontend folder

### 2. Frontend `vercel.json`

```json
{
  "routes": [
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
```

**Purpose**: Handles React Router client-side routing

### 3. `_redirects` File

```
/*    /index.html   200
```

**Purpose**: Backup routing configuration

---

## 🚀 Step-by-Step Deployment

### Step 1: Commit New Files

```bash
cd bellcrop

# Check what's new
git status

# Add all files
git add .

# Commit
git commit -m "Add Vercel configuration for deployment"

# Push to GitHub
git push origin main
```

### Step 2: Configure Vercel

**Option A: Deploy Frontend Folder**

1. Go to Vercel Dashboard
2. Import your repository
3. **Set Root Directory**: `frontend`
4. Framework: Create React App
5. Build Command: `npm run build`
6. Output Directory: `build`
7. Click Deploy

**Option B: Deploy from Root**

1. Go to Vercel Dashboard
2. Import your repository
3. **Leave Root Directory empty** (uses root vercel.json)
4. Vercel will auto-detect settings
5. Click Deploy

### Step 3: Add Environment Variables

In Vercel Dashboard:
1. Go to your project
2. Settings → Environment Variables
3. Add:
   - Name: `REACT_APP_API_URL`
   - Value: `https://your-backend-api.com/api`
4. Apply to: Production, Preview, Development

### Step 4: Redeploy

After adding environment variables:
1. Go to Deployments tab
2. Click "..." on latest deployment
3. Click "Redeploy"

---

## ✅ Verification Checklist

After deployment, test these:

- [ ] Homepage loads: `https://your-app.vercel.app/`
- [ ] Dashboard loads: `https://your-app.vercel.app/dashboard`
- [ ] Transactions page: `https://your-app.vercel.app/transactions`
- [ ] Refresh any page (should NOT 404)
- [ ] Register new user works
- [ ] Login works
- [ ] Add transaction works

---

## 🐛 Troubleshooting

### Issue 1: Build Fails - "package.json not found"

**Solution**: Set Root Directory to `frontend` in Vercel settings

1. Project Settings → General
2. Root Directory: `frontend`
3. Save and redeploy

### Issue 2: 404 on Routes

**Solution**: Ensure routing is configured

✅ Already fixed with:
- `vercel.json` routes configuration
- `_redirects` file

If still not working:
1. Check Vercel build logs
2. Verify `vercel.json` is in the correct location
3. Redeploy

### Issue 3: API Calls Fail

**Solution**: Check environment variables

1. Verify `REACT_APP_API_URL` is set in Vercel
2. Check browser console for errors
3. Verify backend CORS allows your Vercel domain

### Issue 4: Build Succeeds but Site is Blank

**Solution**: Check build output

1. Check Vercel build logs
2. Look for JavaScript errors in browser console
3. Verify all dependencies are in `package.json`

---

## 📋 Vercel Settings Reference

### Recommended Settings

```
Framework Preset: Create React App
Root Directory: frontend (or leave empty if using root vercel.json)
Build Command: npm run build
Output Directory: build
Install Command: npm install
Node Version: 18.x (or latest LTS)
```

### Environment Variables

```
REACT_APP_API_URL=https://your-backend.herokuapp.com/api
```

---

## 🔄 Redeployment

### Automatic Redeployment

Vercel automatically redeploys when you push to GitHub:

```bash
git add .
git commit -m "Update frontend"
git push
```

### Manual Redeployment

1. Go to Vercel Dashboard
2. Select your project
3. Deployments tab
4. Click "..." → "Redeploy"

---

## 🌐 Custom Domain (Optional)

### Add Custom Domain

1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records as instructed
4. Wait for SSL certificate (automatic)

---

## 📊 Deployment Status

### Current Configuration

- ✅ Frontend package.json exists
- ✅ Vercel configuration files created
- ✅ React Router routing configured
- ✅ Build commands set up
- 🔄 Ready to push and deploy!

### Next Actions

1. **Commit files**:
   ```bash
   git add .
   git commit -m "Add Vercel deployment configuration"
   git push
   ```

2. **Configure Vercel**:
   - Set Root Directory (if needed)
   - Add environment variables
   - Deploy!

3. **Test deployment**:
   - Visit all routes
   - Test functionality
   - Check API connections

---

## 🎉 Quick Deploy Commands

```bash
# 1. Commit all changes
git add .
git commit -m "Configure for Vercel deployment"

# 2. Push to GitHub
git push origin main

# 3. Vercel will auto-deploy!
# Or manually deploy:
vercel --prod
```

---

## 📞 Need Help?

### Common Commands

```bash
# Check git status
git status

# View remote repository
git remote -v

# Check current branch
git branch

# Push to GitHub
git push origin main
```

### Useful Links

- [Vercel Documentation](https://vercel.com/docs)
- [Create React App on Vercel](https://vercel.com/guides/deploying-react-with-vercel)
- [Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

---

## ✨ Summary

**What's Been Done:**
- ✅ Created `vercel.json` (root and frontend)
- ✅ Verified `package.json` exists
- ✅ Configured React Router routing
- ✅ Set up build commands

**What You Need to Do:**
1. ✅ Commit and push changes
2. ✅ Configure Root Directory in Vercel (if needed)
3. ✅ Add environment variables
4. ✅ Deploy!

**Your app will be live at**: `https://your-project.vercel.app`

---

**Last Updated**: February 14, 2026
