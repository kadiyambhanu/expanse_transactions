# Bellcrop Expense Tracker - API Documentation

Base URL: `http://localhost:5000/api`

## Table of Contents
1. [Authentication](#authentication)
2. [Transactions](#transactions)
3. [Error Handling](#error-handling)
4. [Response Format](#response-format)

---

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

### Register User

**Endpoint:** `POST /auth/register`

**Description:** Register a new user account

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Validation:**
- `name`: Required, string
- `email`: Required, valid email format, unique
- `password`: Required, minimum 6 characters

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "User already exists with this email"
}
```

---

### Login User

**Endpoint:** `POST /auth/login`

**Description:** Login with existing credentials

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

### Get Current User

**Endpoint:** `GET /auth/me`

**Description:** Get currently logged-in user information

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

## Transactions

### Get All Transactions

**Endpoint:** `GET /transactions`

**Description:** Get all transactions for the authenticated user with pagination, search, and filters

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| page | number | 1 | Page number |
| limit | number | 10 | Items per page |
| search | string | "" | Search by title |
| category | string | "" | Filter by category |
| startDate | date | "" | Filter by start date (YYYY-MM-DD) |
| endDate | date | "" | Filter by end date (YYYY-MM-DD) |
| minAmount | number | "" | Minimum amount |
| maxAmount | number | "" | Maximum amount |
| sortBy | string | "date" | Sort field (date, amount, title) |
| sortOrder | string | "desc" | Sort order (asc, desc) |

**Example Request:**
```
GET /transactions?page=1&limit=10&category=Food&sortBy=date&sortOrder=desc
```

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "userId": "507f191e810c19729de860ea",
      "title": "Grocery Shopping",
      "amount": 54.20,
      "category": "Food",
      "date": "2026-02-14T00:00:00.000Z",
      "notes": "Weekly groceries",
      "createdAt": "2026-02-14T10:30:00.000Z",
      "updatedAt": "2026-02-14T10:30:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "pages": 5
  }
}
```

---

### Get Single Transaction

**Endpoint:** `GET /transactions/:id`

**Description:** Get details of a specific transaction

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "userId": "507f191e810c19729de860ea",
    "title": "Grocery Shopping",
    "amount": 54.20,
    "category": "Food",
    "date": "2026-02-14T00:00:00.000Z",
    "notes": "Weekly groceries",
    "createdAt": "2026-02-14T10:30:00.000Z",
    "updatedAt": "2026-02-14T10:30:00.000Z"
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Transaction not found"
}
```

---

### Create Transaction

**Endpoint:** `POST /transactions`

**Description:** Create a new transaction

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Grocery Shopping",
  "amount": 54.20,
  "category": "Food",
  "date": "2026-02-14",
  "notes": "Weekly groceries"
}
```

**Validation:**
- `title`: Required, string
- `amount`: Required, number, minimum 0
- `category`: Required, one of: Food, Transport, Rent, Entertainment, Healthcare, Shopping, Utilities, Education, Other
- `date`: Required, valid date
- `notes`: Optional, string, max 500 characters

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "userId": "507f191e810c19729de860ea",
    "title": "Grocery Shopping",
    "amount": 54.20,
    "category": "Food",
    "date": "2026-02-14T00:00:00.000Z",
    "notes": "Weekly groceries",
    "createdAt": "2026-02-14T10:30:00.000Z",
    "updatedAt": "2026-02-14T10:30:00.000Z"
  }
}
```

---

### Update Transaction

**Endpoint:** `PUT /transactions/:id`

**Description:** Update an existing transaction

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Updated Grocery Shopping",
  "amount": 60.50,
  "category": "Food",
  "date": "2026-02-14",
  "notes": "Updated notes"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "userId": "507f191e810c19729de860ea",
    "title": "Updated Grocery Shopping",
    "amount": 60.50,
    "category": "Food",
    "date": "2026-02-14T00:00:00.000Z",
    "notes": "Updated notes",
    "createdAt": "2026-02-14T10:30:00.000Z",
    "updatedAt": "2026-02-14T11:00:00.000Z"
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Not authorized to update this transaction"
}
```

---

### Delete Transaction

**Endpoint:** `DELETE /transactions/:id`

**Description:** Delete a transaction

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {},
  "message": "Transaction deleted successfully"
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Transaction not found"
}
```

---

### Get Dashboard Summary

**Endpoint:** `GET /transactions/dashboard/summary`

**Description:** Get comprehensive dashboard data including totals, category breakdown, and recent transactions

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "totalExpenses": 1250.75,
    "categoryBreakdown": [
      {
        "_id": "Food",
        "total": 450.50,
        "count": 15
      },
      {
        "_id": "Transport",
        "total": 300.25,
        "count": 8
      }
    ],
    "recentTransactions": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "title": "Grocery Shopping",
        "amount": 54.20,
        "category": "Food",
        "date": "2026-02-14T00:00:00.000Z"
      }
    ],
    "monthlyTrend": [
      {
        "_id": {
          "year": 2026,
          "month": 1
        },
        "total": 850.50,
        "count": 25
      },
      {
        "_id": {
          "year": 2026,
          "month": 2
        },
        "total": 400.25,
        "count": 12
      }
    ]
  }
}
```

---

## Error Handling

### Error Response Format

All errors follow this format:

```json
{
  "success": false,
  "message": "Error description"
}
```

### HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (validation error) |
| 401 | Unauthorized (invalid/missing token) |
| 404 | Not Found |
| 500 | Internal Server Error |

### Common Error Messages

**Authentication Errors:**
- "Not authorized, no token"
- "Not authorized, token failed"
- "User not found"
- "Invalid credentials"

**Validation Errors:**
- "Please provide all required fields"
- "Please provide email and password"
- "Password must be at least 6 characters"
- "User already exists with this email"

**Transaction Errors:**
- "Transaction not found"
- "Not authorized to access this transaction"
- "Please provide title, amount, and category"

---

## Response Format

### Success Response

```json
{
  "success": true,
  "data": { /* response data */ }
}
```

### Success Response with Pagination

```json
{
  "success": true,
  "data": [ /* array of items */ ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "pages": 5
  }
}
```

### Error Response

```json
{
  "success": false,
  "message": "Error description"
}
```

---

## Example Usage with cURL

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

### Get Transactions
```bash
curl -X GET "http://localhost:5000/api/transactions?page=1&limit=10" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Create Transaction
```bash
curl -X POST http://localhost:5000/api/transactions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"title":"Lunch","amount":15.50,"category":"Food","date":"2026-02-14"}'
```

---

## Rate Limiting

Currently, there is no rate limiting implemented. For production, consider adding rate limiting middleware.

## Versioning

Current API version: v1 (no version prefix in URL)

---

**Last Updated:** February 14, 2026
