<div align="center">

# 💰 ExpenseFlow

### Smart Expense Management Dashboard

A full-stack expense management application built with **React, Node.js, Express, Prisma, and PostgreSQL**.

Track expenses • Analyze spending • Manage your profile • Stay organized

<br/>

![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-Blue?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Green?style=for-the-badge&logo=node.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma&logoColor=white)

<br/>

**🔐 Secure Authentication &nbsp; • &nbsp; 📊 Interactive Dashboard &nbsp; • &nbsp; 💳 Expense Management**

</div>

---

## 📌 About

**ExpenseFlow** is a full-stack web application designed to make personal expense tracking simple and visual.

Users can create an account, securely log in, add and manage expenses, view spending summaries, analyze expenses by category, and manage their profile from one dashboard.

---

## ✨ What You Can Do

| Feature | Description |
|---|---|
| 🔐 **Authentication** | Register and login with JWT-based authentication |
| 📊 **Dashboard** | View total spending, average expense, and category summaries |
| 💳 **Expenses** | Add, view, edit, and delete expenses |
| 🏷️ **Categories** | Organize expenses by category |
| 👤 **Profile** | View and manage user information |
| 🛡️ **Protected Routes** | User-specific data is protected through authentication |
| 📱 **Responsive UI** | Clean interface designed for different screen sizes |

---

## 🖥️ Application Preview

### 📊 Dashboard

> Add your dashboard screenshot here.

```text
┌──────────────────────────────────────────────────────────┐
│ ExpenseFlow                              + Add Expense    │
├───────────────┬──────────────────────────────────────────┤
│ Dashboard     │  Total Spending     Average Expense      │
│ Expenses      │     ₹77,000             ₹12,833          │
│ Profile       │                                          │
│               │  Recent Expenses     Spending by Category│
│               │  ───────────────     ──────────────────  │
│               │  Laptop ₹65,000          Electronics     │
│               │  Food   ₹2,500           Food            │
└───────────────┴──────────────────────────────────────────┘
```

### 🔑 Authentication

The application includes dedicated **Login** and **Register** pages with protected dashboard access.

### 👤 Profile

Users can access their profile and manage their account information.

---

## 🧰 Tech Stack

### Frontend

- ⚛️ React
- 📘 TypeScript
- ⚡ Vite
- 🔄 Axios
- 🧭 React Router
- 🎨 CSS

### Backend

- 🟢 Node.js
- 🚂 Express.js
- 📘 TypeScript
- 🔐 JWT Authentication

### Database

- 🐘 PostgreSQL
- 🔷 Prisma ORM

---

## 🏗️ Architecture

```text
                         ┌─────────────────┐
                         │      USER       │
                         └────────┬────────┘
                                  │
                                  ▼
                    ┌─────────────────────────┐
                    │    React + TypeScript   │
                    │         Frontend        │
                    └────────────┬────────────┘
                                 │
                              Axios
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │     Express REST API    │
                    └────────────┬────────────┘
                                 │
                         JWT Authentication
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │ Controllers / Services  │
                    └────────────┬────────────┘
                                 │
                              Prisma
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │       PostgreSQL        │
                    └─────────────────────────┘
```

---

## 📂 Project Structure

```text
ExpenseFlow/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── routes/
│   │   └── services/
│   └── package.json
│
├── server/
│   ├── prisma/
│   │   ├── migrations/
│   │   └── schema.prisma
│   │
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   └── services/
│   │
│   └── package.json
│
├── .gitignore
└── README.md
```

---

# 🚀 Getting Started

<details>
<summary><b>1️⃣ Prerequisites</b></summary>

<br/>

Install the following before starting:

- Node.js
- npm
- PostgreSQL
- Git

Check Node.js and npm:

```bash
node --version
npm --version
```

Make sure PostgreSQL is installed and running.

</details>

<details>
<summary><b>2️⃣ Clone the Repository</b></summary>

<br/>

```bash
git clone https://github.com/Sanju701ydv/ExpenseFlow.git
cd ExpenseFlow
```

</details>

<details>
<summary><b>3️⃣ Backend Setup</b></summary>

<br/>

Navigate to the server:

```bash
cd server
npm install
```

Create:

```text
server/.env
```

Add:

```env
DATABASE_URL="your_postgresql_connection_string"
JWT_SECRET="your_jwt_secret"
PORT=5000
```

Generate Prisma Client:

```bash
npx prisma generate
```

Run migrations:

```bash
npx prisma migrate dev
```

Start the backend:

```bash
npm run dev
```

Backend:

```text
http://localhost:5000
```

</details>

<details>
<summary><b>4️⃣ Frontend Setup</b></summary>

<br/>

Open a **new terminal**:

```bash
cd client
npm install
npm run dev
```

Open the Vite URL displayed in your terminal.

</details>

<details>
<summary><b>5️⃣ Run the Complete Application</b></summary>

<br/>

You need two terminals.

**Terminal 1 — Backend**

```bash
cd server
npm run dev
```

**Terminal 2 — Frontend**

```bash
cd client
npm run dev
```

Then open the frontend URL in your browser.

</details>

---

## 🔐 Environment Variables

The backend uses environment variables for sensitive configuration.

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | JWT signing secret |
| `PORT` | Backend port |

Example:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/expenseflow"
JWT_SECRET="your_secure_secret"
PORT=5000
```

> ⚠️ **Never commit your `.env` file.**
>
> Keep your PostgreSQL password, database credentials, and JWT secret private.

---

# 🔌 API Reference

<details>
<summary><b>🔐 Authentication API</b></summary>

<br/>

| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Login |

</details>

<details>
<summary><b>📊 Dashboard API</b></summary>

<br/>

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/api/dashboard` | Get dashboard information |

</details>

<details>
<summary><b>💳 Expense API</b></summary>

<br/>

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/api/expenses` | Get all expenses |
| `GET` | `/api/expenses/:id` | Get one expense |
| `POST` | `/api/expenses` | Create expense |
| `PUT` | `/api/expenses/:id` | Update expense |
| `DELETE` | `/api/expenses/:id` | Delete expense |

</details>

<details>
<summary><b>👤 User API</b></summary>

<br/>

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/api/user/profile` | Get logged-in user's profile |

</details>

---

## 🔒 Authentication Flow

```text
Register / Login
       │
       ▼
   JWT Token
       │
       ▼
Stored on Client
       │
       ▼
Axios Interceptor
       │
       ▼
Authorization Header
       │
       ▼
Express Auth Middleware
       │
       ▼
Protected API Route
```

Authenticated requests use:

```text
Authorization: Bearer <JWT_TOKEN>
```

---

## 🧪 Main User Flow

```text
        ┌──────────┐
        │ Register │
        └────┬─────┘
             │
             ▼
        ┌──────────┐
        │  Login   │
        └────┬─────┘
             │
             ▼
       ┌─────────────┐
       │  Dashboard  │
       └──────┬──────┘
              │
      ┌───────┼────────┐
      ▼       ▼        ▼
   Expenses Profile  Analytics
      │
      ▼
 Add / Edit / Delete
      │
      ▼
   PostgreSQL
```

---

## 🛡️ Security

ExpenseFlow includes:

- JWT authentication
- Protected API routes
- User-specific expense access
- Environment-based secrets
- PostgreSQL credentials excluded from Git
- `.env` excluded through `.gitignore`

---

## 📈 Future Improvements

- 📊 Advanced analytics
- 💰 Budget tracking
- 🔎 Expense search and filtering
- 🧾 Receipt uploads
- 📄 CSV/PDF export
- 🔁 Recurring expenses
- ☁️ Cloud deployment
- 📱 Improved mobile experience

---

## 👩‍💻 Author

### Samjhana Yadav

🎓 B.Tech — Computer Science / AI & Data Science

🔗 **GitHub:**  
https://github.com/Sanju701ydv

---

<div align="center">

### ⭐ If you find ExpenseFlow useful, consider giving the repository a star!

**Built with React • Node.js • PostgreSQL • Prisma**

</div>
