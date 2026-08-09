import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Expenses from "../pages/Expenses";
import Profile from "../pages/Profile";

import Layout from "../components/Layout";

function AppRoutes() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Authentication pages */}

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Application pages */}

        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />

        <Route
          path="/expenses"
          element={
            <Layout>
              <Expenses />
            </Layout>
          }
        />

        <Route
          path="/profile"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default AppRoutes;