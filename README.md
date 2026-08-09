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
