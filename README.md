## 📌 About

**ExpenseFlow** is a full-stack expense management application built with **React, TypeScript, Node.js, Express, Prisma, and PostgreSQL**.

It helps users track expenses, analyze spending, and manage their profiles through a simple dashboard.

---

## ✨ What You Can Do

- 🔐 Register & Login with JWT authentication
- 💳 Add, edit, and delete expenses
- 📊 View spending summaries
- 🏷️ Analyze expenses by category
- 👤 Manage profile
- 📱 Responsive interface

---

## 🖥️ Application Preview

### 📊 Dashboard
View total expenses, total spending, average expense, recent transactions, and category-wise spending.

### 🔐 Authentication
Secure Login and Register pages with JWT authentication.

### 💳 Expense Management
Create, update, view, and delete expenses.

### 👤 Profile
View and manage user information.

---

## 🧰 Tech Stack

**Frontend:** React • TypeScript • Vite • Axios • React Router • Recharts • Tailwind CSS

**Backend:** Node.js • Express.js • TypeScript • JWT

**Database:** PostgreSQL • Prisma ORM

**Deployment:** Render • GitHub

---

## 🏗️ System Architecture

```text
React + TypeScript
        ↓
      Axios
        ↓
Express REST API
        ↓
JWT Authentication
        ↓
    Prisma ORM
        ↓
   PostgreSQL

📂 Project Structure
ExpenseFlow/
├── client/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── routes/
│       └── services/
│
├── server/
│   ├── prisma/
│   └── src/
│       ├── controllers/
│       ├── middleware/
│       ├── routes/
│       └── services/
│
└── README.md
🚀 Getting Started
Clone
git clone https://github.com/Sanju701ydv/ExpenseFlow.git
cd ExpenseFlow
Backend
cd server
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
Frontend
cd client
npm install
npm run dev
🔐 Environment Variables

Create server/.env:

DATABASE_URL="your_postgresql_connection"
JWT_SECRET="your_secret"
PORT=5000

Never commit .env or expose your credentials.

☁️ Deployment

Frontend:
https://expense-flow-frontend-7jym.onrender.com

Backend:
https://expenseflow-backend-w6i6.onrender.com

Repository:
https://github.com/Sanju701ydv/ExpenseFlow

🔌 API Reference
Authentication
POST /api/auth/register
POST /api/auth/login
Expenses
GET    /api/expenses
GET    /api/expenses/:id
POST   /api/expenses
PUT    /api/expenses/:id
DELETE /api/expenses/:id
Dashboard
GET /api/dashboard
🔒 Authentication Flow
Register / Login
       ↓
    JWT Token
       ↓
Axios Interceptor
       ↓
Protected API
🧪 Main User Flow
Register → Login → Dashboard
                    ↓
          Expenses / Profile / Analytics
🛡️ Security
JWT authentication
Protected API routes
User-specific expense data
Environment-based secrets
.env excluded from Git
📊 Dashboard Analytics
Total expenses
Total spending
Average expense
Recent expenses
Category-wise spending
Interactive pie chart
🧪 Production API

Test the backend:

https://expenseflow-backend-w6i6.onrender.com

Expected response:

{
  "success": true,
  "message": "ExpenseFlow API is Running 🚀"
}
🐙 Git Workflow
git add .
git commit -m "Update ExpenseFlow"
git push origin main
📈 Future Improvements
💰 Budget tracking
📊 Advanced analytics
🔎 Expense filtering
🧾 Receipt uploads
📄 CSV/PDF export
🔐 Forgot password
📱 Improved mobile experience
🎯 Project Highlights
Full-stack development
REST API
JWT authentication
PostgreSQL + Prisma
React + TypeScript
Responsive UI
Cloud deployment with Render
👩‍💻 Author
Samjhana Yadav

🎓 B.Tech — Computer Science / AI & Data Science

🐙 GitHub

🌟 Live Links

🚀 Live Application

⚡ Backend API

🐙 GitHub Repository

<div align="center">
⭐ Built with React • Node.js • PostgreSQL • Prisma

ExpenseFlow — Track • Analyze • Manage

</div> ```
