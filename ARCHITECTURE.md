# Bellcrop Expense Tracker - Architecture Documentation

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                         │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Browser    │  │    Mobile    │  │    Tablet    │     │
│  │  (Chrome,    │  │   (Safari,   │  │   (iPad,     │     │
│  │   Firefox)   │  │   Chrome)    │  │   Android)   │     │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘     │
│         │                  │                  │              │
│         └──────────────────┴──────────────────┘              │
│                            │                                 │
└────────────────────────────┼─────────────────────────────────┘
                             │
                             │ HTTP/HTTPS
                             │
┌────────────────────────────┼─────────────────────────────────┐
│                  FRONTEND (React.js)                         │
│                            │                                 │
│  ┌─────────────────────────▼──────────────────────────────┐ │
│  │                    React Router                         │ │
│  │  /login  /register  /dashboard  /transactions          │ │
│  └─────────────────────────┬──────────────────────────────┘ │
│                            │                                 │
│  ┌─────────────────────────▼──────────────────────────────┐ │
│  │                  Context Providers                      │ │
│  │  ┌──────────────┐    ┌──────────────────────────┐     │ │
│  │  │ AuthContext  │    │  TransactionContext       │     │ │
│  │  │ - user       │    │  - transactions           │     │ │
│  │  │ - login()    │    │  - fetchTransactions()    │     │ │
│  │  │ - logout()   │    │  - createTransaction()    │     │ │
│  │  └──────────────┘    └──────────────────────────┘     │ │
│  └─────────────────────────┬──────────────────────────────┘ │
│                            │                                 │
│  ┌─────────────────────────▼──────────────────────────────┐ │
│  │                       Pages                             │ │
│  │  ┌────────┐ ┌──────────┐ ┌───────────┐ ┌────────────┐ │ │
│  │  │ Login  │ │ Register │ │ Dashboard │ │Transactions│ │ │
│  │  └────────┘ └──────────┘ └───────────┘ └────────────┘ │ │
│  └─────────────────────────┬──────────────────────────────┘ │
│                            │                                 │
│  ┌─────────────────────────▼──────────────────────────────┐ │
│  │                    Components                           │ │
│  │  ┌────────┐ ┌──────────────┐ ┌────────────────────┐   │ │
│  │  │ Navbar │ │ProtectedRoute│ │ TransactionModal   │   │ │
│  │  └────────┘ └──────────────┘ └────────────────────┘   │ │
│  └─────────────────────────┬──────────────────────────────┘ │
│                            │                                 │
│  ┌─────────────────────────▼──────────────────────────────┐ │
│  │                  Axios HTTP Client                      │ │
│  │              (API calls to backend)                     │ │
│  └─────────────────────────┬──────────────────────────────┘ │
└────────────────────────────┼─────────────────────────────────┘
                             │
                             │ REST API
                             │ (JSON)
┌────────────────────────────┼─────────────────────────────────┐
│                 BACKEND (Node.js/Express)                    │
│                            │                                 │
│  ┌─────────────────────────▼──────────────────────────────┐ │
│  │                    Express Server                       │ │
│  │                   (Port 5000)                           │ │
│  └─────────────────────────┬──────────────────────────────┘ │
│                            │                                 │
│  ┌─────────────────────────▼──────────────────────────────┐ │
│  │                     Middleware                          │ │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────────────┐     │ │
│  │  │   CORS   │  │   Auth   │  │  Error Handler   │     │ │
│  │  └──────────┘  └──────────┘  └──────────────────┘     │ │
│  └─────────────────────────┬──────────────────────────────┘ │
│                            │                                 │
│  ┌─────────────────────────▼──────────────────────────────┐ │
│  │                       Routes                            │ │
│  │  ┌─────────────────┐    ┌──────────────────────┐       │ │
│  │  │  /api/auth      │    │  /api/transactions   │       │ │
│  │  │  - register     │    │  - GET (list)        │       │ │
│  │  │  - login        │    │  - POST (create)     │       │ │
│  │  │  - me           │    │  - PUT (update)      │       │ │
│  │  └─────────────────┘    │  - DELETE (delete)   │       │ │
│  │                         │  - dashboard/summary │       │ │
│  │                         └──────────────────────┘       │ │
│  └─────────────────────────┬──────────────────────────────┘ │
│                            │                                 │
│  ┌─────────────────────────▼──────────────────────────────┐ │
│  │                    Controllers                          │ │
│  │  ┌─────────────────┐    ┌──────────────────────┐       │ │
│  │  │ authController  │    │transactionController │       │ │
│  │  │ - register()    │    │ - getTransactions()  │       │ │
│  │  │ - login()       │    │ - createTransaction()│       │ │
│  │  │ - getMe()       │    │ - updateTransaction()│       │ │
│  │  └─────────────────┘    │ - deleteTransaction()│       │ │
│  │                         │ - getDashboardSummary│       │ │
│  │                         └──────────────────────┘       │ │
│  └─────────────────────────┬──────────────────────────────┘ │
│                            │                                 │
│  ┌─────────────────────────▼──────────────────────────────┐ │
│  │                  Mongoose Models                        │ │
│  │  ┌─────────────────┐    ┌──────────────────────┐       │ │
│  │  │   User Model    │    │  Transaction Model   │       │ │
│  │  │  - name         │    │  - userId (ref)      │       │ │
│  │  │  - email        │    │  - title             │       │ │
│  │  │  - password     │    │  - amount            │       │ │
│  │  │  - createdAt    │    │  - category          │       │ │
│  │  └─────────────────┘    │  - date              │       │ │
│  │                         │  - notes             │       │ │
│  │                         │  - timestamps        │       │ │
│  │                         └──────────────────────┘       │ │
│  └─────────────────────────┬──────────────────────────────┘ │
└────────────────────────────┼─────────────────────────────────┘
                             │
                             │ MongoDB Protocol
                             │
┌────────────────────────────▼─────────────────────────────────┐
│                   DATABASE (MongoDB)                         │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                    Collections                        │   │
│  │  ┌─────────────────┐    ┌──────────────────────┐     │   │
│  │  │     users       │    │    transactions      │     │   │
│  │  │  - _id          │    │  - _id               │     │   │
│  │  │  - name         │    │  - userId            │     │   │
│  │  │  - email        │    │  - title             │     │   │
│  │  │  - password     │    │  - amount            │     │   │
│  │  │  - createdAt    │    │  - category          │     │   │
│  │  └─────────────────┘    │  - date              │     │   │
│  │                         │  - notes             │     │   │
│  │                         │  - createdAt         │     │   │
│  │                         │  - updatedAt         │     │   │
│  │                         └──────────────────────┘     │   │
│  │                                                       │   │
│  │  Indexes:                                            │   │
│  │  - users.email (unique)                              │   │
│  │  - transactions.userId                               │   │
│  │  - transactions.date                                 │   │
│  │  - transactions.category                             │   │
│  └──────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────┘
```

## Data Flow Diagrams

### Authentication Flow

```
┌──────────┐         ┌──────────┐         ┌──────────┐         ┌──────────┐
│  User    │         │ Frontend │         │ Backend  │         │ Database │
└────┬─────┘         └────┬─────┘         └────┬─────┘         └────┬─────┘
     │                    │                    │                    │
     │ 1. Enter Credentials                   │                    │
     ├───────────────────>│                    │                    │
     │                    │                    │                    │
     │                    │ 2. POST /api/auth/login                │
     │                    ├───────────────────>│                    │
     │                    │                    │                    │
     │                    │                    │ 3. Find User       │
     │                    │                    ├───────────────────>│
     │                    │                    │                    │
     │                    │                    │ 4. User Data       │
     │                    │                    │<───────────────────┤
     │                    │                    │                    │
     │                    │                    │ 5. Verify Password │
     │                    │                    │ (bcrypt.compare)   │
     │                    │                    │                    │
     │                    │                    │ 6. Generate JWT    │
     │                    │                    │ (jwt.sign)         │
     │                    │                    │                    │
     │                    │ 7. Return Token    │                    │
     │                    │<───────────────────┤                    │
     │                    │                    │                    │
     │                    │ 8. Store Token     │                    │
     │                    │ (localStorage)     │                    │
     │                    │                    │                    │
     │ 9. Redirect to Dashboard               │                    │
     │<───────────────────┤                    │                    │
     │                    │                    │                    │
```

### Transaction Creation Flow

```
┌──────────┐         ┌──────────┐         ┌──────────┐         ┌──────────┐
│  User    │         │ Frontend │         │ Backend  │         │ Database │
└────┬─────┘         └────┬─────┘         └────┬─────┘         └────┬─────┘
     │                    │                    │                    │
     │ 1. Click Add Transaction               │                    │
     ├───────────────────>│                    │                    │
     │                    │                    │                    │
     │                    │ 2. Show Modal      │                    │
     │<───────────────────┤                    │                    │
     │                    │                    │                    │
     │ 3. Fill Form       │                    │                    │
     ├───────────────────>│                    │                    │
     │                    │                    │                    │
     │                    │ 4. Validate Input  │                    │
     │                    │                    │                    │
     │                    │ 5. POST /api/transactions              │
     │                    │    (with JWT token)                    │
     │                    ├───────────────────>│                    │
     │                    │                    │                    │
     │                    │                    │ 6. Verify Token    │
     │                    │                    │ (JWT middleware)   │
     │                    │                    │                    │
     │                    │                    │ 7. Validate Data   │
     │                    │                    │                    │
     │                    │                    │ 8. Create Document │
     │                    │                    ├───────────────────>│
     │                    │                    │                    │
     │                    │                    │ 9. Saved Document  │
     │                    │                    │<───────────────────┤
     │                    │                    │                    │
     │                    │ 10. Return Success │                    │
     │                    │<───────────────────┤                    │
     │                    │                    │                    │
     │                    │ 11. Update UI      │                    │
     │                    │ 12. Close Modal    │                    │
     │                    │                    │                    │
     │ 13. Show Success Message               │                    │
     │<───────────────────┤                    │                    │
     │                    │                    │                    │
```

### Transaction Search & Filter Flow

```
┌──────────┐         ┌──────────┐         ┌──────────┐         ┌──────────┐
│  User    │         │ Frontend │         │ Backend  │         │ Database │
└────┬─────┘         └────┬─────┘         └────┬─────┘         └────┬─────┘
     │                    │                    │                    │
     │ 1. Enter Search Term / Apply Filters   │                    │
     ├───────────────────>│                    │                    │
     │                    │                    │                    │
     │                    │ 2. Update State    │                    │
     │                    │ (filters object)   │                    │
     │                    │                    │                    │
     │                    │ 3. GET /api/transactions?              │
     │                    │    search=grocery&category=Food        │
     │                    │    &startDate=2026-01-01               │
     │                    ├───────────────────>│                    │
     │                    │                    │                    │
     │                    │                    │ 4. Build Query     │
     │                    │                    │ { userId: X,       │
     │                    │                    │   title: /grocery/i│
     │                    │                    │   category: 'Food' │
     │                    │                    │   date: {$gte: ..}}│
     │                    │                    │                    │
     │                    │                    │ 5. Execute Query   │
     │                    │                    │    with pagination │
     │                    │                    ├───────────────────>│
     │                    │                    │                    │
     │                    │                    │ 6. Results         │
     │                    │                    │<───────────────────┤
     │                    │                    │                    │
     │                    │ 7. Return Data     │                    │
     │                    │    + Pagination    │                    │
     │                    │<───────────────────┤                    │
     │                    │                    │                    │
     │                    │ 8. Update UI       │                    │
     │                    │ 9. Render Results  │                    │
     │                    │                    │                    │
     │ 10. View Filtered Results              │                    │
     │<───────────────────┤                    │                    │
     │                    │                    │                    │
```

## Component Hierarchy

```
App
├── AuthProvider
│   └── TransactionProvider
│       ├── Navbar
│       │   ├── Logo
│       │   ├── Navigation Links
│       │   └── User Menu
│       │
│       └── Router
│           ├── /login
│           │   └── Login
│           │       └── Auth Form
│           │
│           ├── /register
│           │   └── Register
│           │       └── Auth Form
│           │
│           ├── /dashboard (Protected)
│           │   └── Dashboard
│           │       ├── Summary Cards
│           │       ├── Pie Chart
│           │       ├── Bar Chart
│           │       └── Recent Transactions List
│           │
│           └── /transactions (Protected)
│               └── Transactions
│                   ├── Search Bar
│                   ├── Filter Panel
│                   ├── Transaction Grid
│                   │   └── Transaction Card[]
│                   ├── Pagination
│                   └── Transaction Modal
│                       └── Transaction Form
```

## Security Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Security Layers                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Layer 1: Frontend Security                                 │
│  ┌────────────────────────────────────────────────────┐     │
│  │ - Input Validation                                 │     │
│  │ - XSS Prevention (React auto-escaping)            │     │
│  │ - Secure Token Storage (localStorage)             │     │
│  │ - HTTPS Only (production)                         │     │
│  └────────────────────────────────────────────────────┘     │
│                                                              │
│  Layer 2: API Security                                      │
│  ┌────────────────────────────────────────────────────┐     │
│  │ - CORS Configuration                               │     │
│  │ - JWT Token Verification                           │     │
│  │ - Request Validation                               │     │
│  │ - Rate Limiting (recommended)                      │     │
│  └────────────────────────────────────────────────────┘     │
│                                                              │
│  Layer 3: Business Logic Security                           │
│  ┌────────────────────────────────────────────────────┐     │
│  │ - Authorization Checks                             │     │
│  │ - Resource Ownership Verification                  │     │
│  │ - Input Sanitization                               │     │
│  │ - Error Message Sanitization                       │     │
│  └────────────────────────────────────────────────────┘     │
│                                                              │
│  Layer 4: Data Security                                     │
│  ┌────────────────────────────────────────────────────┐     │
│  │ - Password Hashing (bcrypt)                        │     │
│  │ - Mongoose Schema Validation                       │     │
│  │ - NoSQL Injection Prevention                       │     │
│  │ - Secure Database Connection                       │     │
│  └────────────────────────────────────────────────────┘     │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## State Management Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    React Context API                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  AuthContext                    TransactionContext          │
│  ┌──────────────────┐          ┌──────────────────┐         │
│  │ State:           │          │ State:           │         │
│  │ - user           │          │ - transactions[] │         │
│  │ - loading        │          │ - loading        │         │
│  │ - error          │          │ - error          │         │
│  │                  │          │ - pagination     │         │
│  │ Actions:         │          │                  │         │
│  │ - register()     │          │ Actions:         │         │
│  │ - login()        │          │ - fetch()        │         │
│  │ - logout()       │          │ - create()       │         │
│  │ - fetchUser()    │          │ - update()       │         │
│  └──────────────────┘          │ - delete()       │         │
│                                │ - getSummary()   │         │
│                                └──────────────────┘         │
│                                                              │
│  Components consume context via hooks:                      │
│  - useAuth()                                                │
│  - useTransactions()                                        │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Database Schema Relationships

```
┌─────────────────────────────────────────────────────────────┐
│                     MongoDB Collections                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  users Collection                                           │
│  ┌────────────────────────────────────────────┐             │
│  │ _id: ObjectId (Primary Key)                │             │
│  │ name: String                                │             │
│  │ email: String (Unique Index)               │             │
│  │ password: String (Hashed)                  │             │
│  │ createdAt: Date                            │             │
│  └────────────────────────────────────────────┘             │
│                        │                                     │
│                        │ One-to-Many                         │
│                        │                                     │
│  transactions Collection                                    │
│  ┌────────────────────────────────────────────┐             │
│  │ _id: ObjectId (Primary Key)                │             │
│  │ userId: ObjectId (Foreign Key) ────────────┘             │
│  │ title: String                                            │
│  │ amount: Number                                           │
│  │ category: String (Enum)                                  │
│  │ date: Date (Index)                                       │
│  │ notes: String (Optional)                                 │
│  │ createdAt: Date                                          │
│  │ updatedAt: Date                                          │
│  └──────────────────────────────────────────────────────────┘
│                                                              │
│  Indexes:                                                   │
│  - users: { email: 1 } (unique)                            │
│  - transactions: { userId: 1, date: -1 }                   │
│  - transactions: { userId: 1, category: 1 }                │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

**This architecture ensures:**
- ✅ Scalability
- ✅ Maintainability
- ✅ Security
- ✅ Performance
- ✅ Separation of Concerns
- ✅ Clean Code Structure
