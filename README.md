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

Clone the Repository
git clone https://github.com/Sanju701ydv/ExpenseFlow.git
cd ExpenseFlow

Backend Setup

Open a terminal:

cd server
npm install

Create a .env file inside the server folder:

DATABASE_URL="your_postgresql_connection_string"
JWT_SECRET="your_jwt_secret"
PORT=5000

Generate Prisma Client:

npx prisma generate

Run database migrations:

npx prisma migrate dev

Start the backend:

npm run dev

Backend:

http://localhost:5000
3. Frontend Setup

Open another terminal:

cd client
npm install
npm run dev

The frontend will run on the Vite development URL shown in the terminal.

4. Run the Application

Make sure both servers are running:

Frontend → React + Vite
Backend  → Node.js + Express
Database → PostgreSQL

Open the frontend URL in your browser and register/login to use ExpenseFlow.

🔐 Environment Variables

Sensitive credentials are stored using environment variables and are not included in the repository.

Required variables:

DATABASE_URL="your_postgresql_connection_string"
JWT_SECRET="your_jwt_secret"
PORT=5000

Never commit your .env file or expose your PostgreSQL password or JWT secret.

📌 API Endpoints
Method	Endpoint	Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Login
GET	/api/dashboard	Get dashboard data
GET	/api/expenses	Get expenses
GET	/api/expenses/:id	Get a specific expense
POST	/api/expenses	Create expense
PUT	/api/expenses/:id	Update expense
DELETE	/api/expenses/:id	Delete expense
GET	/api/user/profile	Get user profile
🔒 Security

ExpenseFlow uses JWT authentication to protect user-specific routes and data.

Sensitive information such as:

PostgreSQL credentials
Database connection strings
JWT secrets

is stored in environment variables and excluded from Git.

👩‍💻 Author

Samjhana Yadav

GitHub: https://github.com/Sanju701ydv

📄 License

This project was developed for learning, portfolio, and demonstration purposes.


After replacing your current README, run:

```powershell
git add README.md
git commit -m "Add complete project README"
git push
