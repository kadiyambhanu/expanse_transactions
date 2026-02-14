# Quick Start Guide - Bellcrop Expense Tracker

Get up and running in 5 minutes!

## Prerequisites Check

Before starting, ensure you have:
- ✅ Node.js (v14+) installed
- ✅ MongoDB running locally OR MongoDB Atlas account
- ✅ Terminal/Command Prompt access

## 🚀 Quick Setup (5 Steps)

### Step 1: Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 2: Configure Backend
Create `backend/.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bellcrop-expense-tracker
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

### Step 3: Start Backend
```bash
npm run dev
```
✅ Backend should be running on http://localhost:5000

### Step 4: Install Frontend Dependencies
Open a new terminal:
```bash
cd frontend
npm install
```

### Step 5: Start Frontend
```bash
npm start
```
✅ Frontend should open automatically at http://localhost:3000

## 🎉 You're Ready!

1. **Register** a new account
2. **Login** with your credentials
3. **Add** your first transaction
4. **Explore** the dashboard and features

## 📱 Quick Test

### Test the API (Optional)
```bash
# Health check
curl http://localhost:5000/api/health
```

Expected response:
```json
{"success":true,"message":"Server is running"}
```

## 🔧 Troubleshooting

### MongoDB Not Running?
```bash
# Start MongoDB
mongod

# Or use MongoDB Atlas (cloud)
# Update MONGODB_URI in .env with your Atlas connection string
```

### Port Already in Use?
```bash
# Change PORT in backend/.env to 5001 or any available port
```

### Can't Access Frontend?
- Check if backend is running on port 5000
- Verify `proxy` in frontend/package.json points to backend

## 📚 Next Steps

- Read [README.md](README.md) for full documentation
- Check [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed setup
- Review [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for API details
- See [FEATURES.md](FEATURES.md) for complete feature list

## 🎯 Default Test Credentials

You'll need to register your own account. There are no default credentials.

**Sample Transaction Data:**
- Title: Grocery Shopping
- Amount: 54.20
- Category: Food
- Date: Today
- Notes: Weekly groceries

## ⚡ Pro Tips

1. **Use nodemon**: Backend auto-restarts on changes (already configured)
2. **Hot Reload**: Frontend auto-refreshes on changes (built-in)
3. **DevTools**: Use React DevTools browser extension for debugging
4. **MongoDB Compass**: GUI tool for viewing database (optional)

## 📞 Need Help?

1. Check the error message in terminal
2. Review the troubleshooting section in SETUP_GUIDE.md
3. Verify all environment variables are set
4. Ensure MongoDB is running

---

**Happy Tracking! 💰**
