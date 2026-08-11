# ExpenseFlow 💰

> A full-stack expense and invoice management application with authentication, expense tracking, dashboard analytics, and profile management.

ExpenseFlow is a full-stack web application designed to help users manage and monitor their expenses through a clean, interactive dashboard.

The project uses **React + TypeScript** for the frontend and **Node.js + Express + Prisma + PostgreSQL** for the backend, with JWT-based authentication for securing user-specific data.

---

## 🚀 Live Project

🔗 **GitHub Repository:**  
https://github.com/Sanju701ydv/ExpenseFlow

---

## 📌 Project Overview

ExpenseFlow provides a centralized interface for managing personal expenses.

Users can:

- Register and log in securely
- View their expense dashboard
- Track total expenses
- Monitor total spending amount
- View individual expense records
- Add, update, and delete expenses
- Organize expenses by category
- View profile information
- Edit profile details
- Log out securely
- Access protected routes using JWT authentication

The application follows a client-server architecture where the React frontend communicates with a REST API built using Node.js and Express.

---

## ✨ Key Features

### 🔐 Authentication

- User registration
- User login
- JWT-based authentication
- Protected API routes
- Token-based authorization
- Secure logout
- User-specific expense access

### 📊 Dashboard

The dashboard provides an overview of the user's financial activity.

It displays:

- Total number of expenses
- Total amount spent
- Recent expenses
- Expense categories
- Interactive dashboard interface

### 💳 Expense Management

Users can manage their expenses through:

- Add expense
- View expenses
- Update expense
- Delete expense
- Expense title
- Amount
- Category
- Description
- Creation date

### 👤 Profile Management

Users can:

- View their profile
- View account information
- Update profile details
- Access their profile through the application navigation

### 📱 Responsive UI

The frontend includes:

- Responsive dashboard
- Sidebar navigation
- Mobile-friendly layout
- Interactive navigation
- Clean cards and sections
- Login/Register interfaces

---

## 🛠️ Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Axios
- React Router
- CSS

### Backend

- Node.js
- Express.js
- TypeScript
- JWT
- REST API

### Database

- PostgreSQL
- Prisma ORM

### Development Tools

- VS Code
- Git
- GitHub
- npm

---

## 🏗️ Project Architecture

```text
ExpenseFlow/
│
├── client/
│   ├── public/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   └── Layout.tsx
│   │   │
│   │   ├── hooks/
│   │   │   └── useDashboard.ts
│   │   │
│   │   ├── pages/
│   │   │   ├── Analytics.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Expenses.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Profile.tsx
│   │   │   └── Register.tsx
│   │   │
│   │   ├── routes/
│   │   │   └── AppRoutes.tsx
│   │   │
│   │   ├── services/
│   │   │   └── api.ts
│   │   │
│   │   ├── App.tsx
│   │   ├── App.css
│   │   └── main.tsx
│   │
│   ├── package.json
│   └── vite.config.ts
│
├── server/
│   ├── prisma/
│   │   ├── migrations/
│   │   └── schema.prisma
│   │
│   ├── src/
│   │   ├── config/
│   │   │   └── prisma.ts
│   │   │
│   │   ├── controllers/
│   │   │   ├── auth.controller.ts
│   │   │   ├── dashboard.controller.ts
│   │   │   ├── expense.controller.ts
│   │   │   └── user.controller.ts
│   │   │
│   │   ├── middleware/
│   │   │   └── auth.middleware.ts
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.routes.ts
│   │   │   ├── dashboard.routes.ts
│   │   │   ├── expense.routes.ts
│   │   │   └── user.routes.ts
│   │   │
│   │   ├── services/
│   │   │   ├── auth.service.ts
│   │   │   ├── dashboard.service.ts
│   │   │   └── expense.service.ts
│   │   │
│   │   ├── app.ts
│   │   └── server.ts
│   │
│   ├── package.json
│   └── tsconfig.json
│
├── .gitignore
└── README.md

Setup and Installation

Prerequisites

Make sure the following are installed:

Node.js and npm

PostgreSQL

Git

Check Node.js and npm:

node --version
npm --version

1. Clone the Repository

git clone https://github.com/Sanju701ydv/ExpenseFlow.git
cd ExpenseFlow

2. Backend Setup

Open a terminal and run:

cd server
npm install

Create a file named .env inside the server folder:

DATABASE_URL="your_postgresql_connection_string"
JWT_SECRET="your_jwt_secret"
PORT=5000

Generate Prisma Client:

npx prisma generate

Run the database migration:

npx prisma migrate dev

Start the backend:

npm run dev

The backend runs on:

http://localhost:5000

3. Frontend Setup

Open a second terminal:

cd client
npm install
npm run dev

Vite will display the frontend URL in the terminal.

Open that URL in your browser.

4. Run the Application

Keep both terminals running:

Terminal 1 → Backend  → Node.js + Express
Terminal 2 → Frontend → React + Vite
Database   → PostgreSQL

Register a new account or log in to start using ExpenseFlow.

Environment Variables

The backend requires these environment variables:

Variable         Purpose

DATABASE_URL   PostgreSQL database connectionJWT_SECRET     Secret used for JWT authenticationPORT           Backend server port

Example:

DATABASE_URL="postgresql://username:password@localhost:5432/expenseflow"
JWT_SECRET="your_secure_secret"
PORT=5000

Important: Never commit .env to GitHub. Keep your PostgreSQLpassword, database credentials, and JWT secret private.

API Endpoints

Authentication

Method   Endpoint               Description

POST     /api/auth/register   Register a userPOST     /api/auth/login      Login

Dashboard

Method   Endpoint           Description

GET      /api/dashboard   Get dashboard data

Expenses

Method   Endpoint              Description

GET      /api/expenses       Get all expensesGET      /api/expenses/:id   Get an expensePOST     /api/expenses       Create an expensePUT      /api/expenses/:id   Update an expenseDELETE   /api/expenses/:id   Delete an expense

User

Method   Endpoint              Description

GET      /api/user/profile   Get user profile

Authentication

ExpenseFlow uses JWT authentication to protect user-specific API routes.

Authenticated requests use:

Authorization: Bearer <JWT_TOKEN>

Application Flow

User
  ↓
React + Vite
  ↓
Axios
  ↓
Express REST API
  ↓
JWT Authentication
  ↓
Controllers / Services
  ↓
Prisma ORM
  ↓
PostgreSQL

Future Improvements

Advanced analytics

Budget tracking

Receipt uploads

CSV/PDF export

Recurring expenses

Cloud deployment

Author

Samjhana Yadav

GitHub: https://github.com/Sanju701ydv

License

This project was developed for learning, portfolio, and demonstrationpurposes.
