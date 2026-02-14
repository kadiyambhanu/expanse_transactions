# Bellcrop Personal Expense Tracker

A full-stack MERN (MongoDB, Express, React, Node.js) application for tracking personal expenses with advanced search, filtering, and analytics features.

## 🚀 Features

### Authentication & Security
- ✅ User registration with validation
- ✅ Secure login with JWT authentication
- ✅ Password hashing with bcrypt
- ✅ Protected routes for authenticated users

### Transaction Management
- ✅ Add new transactions with title, amount, category, date, and notes
- ✅ Edit existing transactions
- ✅ Delete transactions with confirmation
- ✅ View detailed transaction information

### Transaction Explorer
- ✅ Browse large transaction histories with pagination
- ✅ Dynamic data fetching (Load More functionality)
- ✅ Real-time search by transaction title
- ✅ Advanced filtering:
  - Filter by category
  - Filter by date range
  - Filter by amount range
  - Sort by date, amount, or title
  - Sort order (ascending/descending)
- ✅ Maintains UI state during browsing
- ✅ Graceful handling of empty results

### Dashboard
- ✅ Total expenses summary
- ✅ Category-based breakdown with pie chart
- ✅ Monthly trend analysis with bar chart
- ✅ Recent transactions preview
- ✅ Transaction count by category

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library
- **React Router** - Navigation
- **Axios** - HTTP client
- **Recharts** - Data visualization
- **React Icons** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## 📁 Project Structure

```
bellcrop/
├── backend/
│   ├── config/
│   │   └── db.js                 # Database configuration
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   └── transactionController.js  # Transaction CRUD logic
│   ├── middleware/
│   │   ├── auth.js               # JWT authentication middleware
│   │   └── errorHandler.js       # Error handling middleware
│   ├── models/
│   │   ├── User.js               # User schema
│   │   └── Transaction.js        # Transaction schema
│   ├── routes/
│   │   ├── authRoutes.js         # Auth endpoints
│   │   └── transactionRoutes.js  # Transaction endpoints
│   ├── .env                      # Environment variables
│   ├── .env.example              # Environment template
│   ├── package.json              # Backend dependencies
│   └── server.js                 # Entry point
│
├── frontend/
│   ├── public/
│   │   └── index.html            # HTML template
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js         # Navigation bar
│   │   │   ├── Navbar.css
│   │   │   ├── ProtectedRoute.js # Route protection
│   │   │   ├── TransactionModal.js  # Add/Edit modal
│   │   │   └── TransactionModal.css
│   │   ├── context/
│   │   │   ├── AuthContext.js    # Authentication state
│   │   │   └── TransactionContext.js  # Transaction state
│   │   ├── pages/
│   │   │   ├── Login.js          # Login page
│   │   │   ├── Register.js       # Registration page
│   │   │   ├── Dashboard.js      # Dashboard page
│   │   │   ├── Dashboard.css
│   │   │   ├── Transactions.js   # Transaction explorer
│   │   │   ├── Transactions.css
│   │   │   └── Auth.css          # Auth pages styling
│   │   ├── utils/
│   │   │   ├── formatters.js     # Utility functions
│   │   │   └── categories.js     # Category definitions
│   │   ├── App.js                # Main app component
│   │   ├── App.css               # Global styles
│   │   ├── index.js              # Entry point
│   │   └── index.css
│   └── package.json              # Frontend dependencies
│
└── README.md                     # This file
```

## 🚦 Getting Started

### Prerequisites

Make sure you have the following installed:
- **Node.js** (v14 or higher)
- **MongoDB** (v4.4 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   cd bellcrop
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```

3. **Configure Environment Variables**
   
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/bellcrop-expense-tracker
   JWT_SECRET=your_secret_key_here
   NODE_ENV=development
   ```

4. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start MongoDB**
   ```bash
   # Make sure MongoDB is running on your system
   mongod
   ```

2. **Start Backend Server**
   ```bash
   cd backend
   npm run dev
   # Server will run on http://localhost:5000
   ```

3. **Start Frontend Development Server**
   ```bash
   cd frontend
   npm start
   # App will open on http://localhost:3000
   ```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Transactions
- `GET /api/transactions` - Get all transactions with filters (Protected)
- `GET /api/transactions/:id` - Get single transaction (Protected)
- `POST /api/transactions` - Create transaction (Protected)
- `PUT /api/transactions/:id` - Update transaction (Protected)
- `DELETE /api/transactions/:id` - Delete transaction (Protected)
- `GET /api/transactions/dashboard/summary` - Get dashboard summary (Protected)

### Query Parameters for GET /api/transactions
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `search` - Search by title
- `category` - Filter by category
- `startDate` - Filter by start date
- `endDate` - Filter by end date
- `minAmount` - Filter by minimum amount
- `maxAmount` - Filter by maximum amount
- `sortBy` - Sort field (date, amount, title)
- `sortOrder` - Sort order (asc, desc)

## 🎨 Features Showcase

### Dashboard
- **Summary Cards**: Display total expenses, transaction count, and active categories
- **Pie Chart**: Visual breakdown of expenses by category
- **Bar Chart**: Monthly spending trend over the last 6 months
- **Recent Transactions**: Quick view of the 5 most recent transactions

### Transaction Explorer
- **Search**: Real-time search as you type
- **Filters**: Multiple filter options that work together
- **Pagination**: Efficient loading with page navigation
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Empty States**: Helpful messages when no data is found

### Transaction Management
- **Modal Form**: Clean interface for adding/editing transactions
- **Validation**: Client and server-side validation
- **Categories**: 9 predefined categories with icons
- **Notes**: Optional field for additional details

## 🔒 Security Features

- Password hashing with bcrypt (10 salt rounds)
- JWT token-based authentication
- Protected API routes with middleware
- Input validation and sanitization
- Secure HTTP-only practices

## 🎯 Categories

The application supports the following expense categories:
- 🍔 Food
- 🚗 Transport
- 🏠 Rent
- 🎬 Entertainment
- ⚕️ Healthcare
- 🛍️ Shopping
- 💡 Utilities
- 📚 Education
- 📦 Other

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- Desktop computers (1200px+)
- Tablets (768px - 1199px)
- Mobile phones (< 768px)

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check the connection string in `.env`
- Verify MongoDB is accessible on port 27017

### Port Already in Use
- Change the PORT in backend `.env` file
- Kill the process using the port: `npx kill-port 5000`

### CORS Issues
- Backend has CORS enabled for all origins in development
- For production, configure specific origins in `server.js`

## 📝 Future Enhancements

- [ ] Export transactions to CSV/PDF
- [ ] Budget planning and alerts
- [ ] Recurring transactions
- [ ] Multi-currency support
- [ ] Receipt image uploads
- [ ] Dark mode
- [ ] Email notifications
- [ ] Data backup and restore

## 👨‍💻 Development

### Backend Development
```bash
cd backend
npm run dev  # Uses nodemon for auto-restart
```

### Frontend Development
```bash
cd frontend
npm start  # Hot reload enabled
```

### Building for Production

**Frontend:**
```bash
cd frontend
npm run build
```

**Backend:**
```bash
cd backend
npm start
```

## 📄 License

This project is created for the Bellcorp assignment.

## 🤝 Contributing

This is an assignment project. For any questions or issues, please contact the development team.

---

**Built with ❤️ using the MERN Stack**
