import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff, FiArrowRight, FiLock } from "react-icons/fi";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await api.post("/auth/login", form);

      localStorage.setItem("token", response.data.token);

      // Store basic user information for quick UI access
      if (response.data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(response.data.user)
        );
      }

      navigate("/dashboard");

    } catch (error: any) {
      alert(
        error.response?.data?.message ||
        "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">

      {/* Background decoration */}

      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl" />

      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl" />

      <div className="relative w-full max-w-md">

        {/* Logo */}

        <div className="text-center mb-8">

          <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-600 rounded-2xl shadow-lg shadow-blue-600/30 mb-4">

            <FiLock
              size={26}
              className="text-white"
            />

          </div>

          <h1 className="text-3xl font-bold text-white">
            ExpenseFlow
          </h1>

          <p className="text-slate-400 mt-2">
            Smart expense management
          </p>

        </div>

        {/* Login Card */}

        <div className="bg-white rounded-3xl shadow-2xl p-8">

          <div className="mb-7">

            <h2 className="text-2xl font-bold text-slate-900">
              Welcome back 👋
            </h2>

            <p className="text-slate-500 mt-1">
              Sign in to manage your expenses.
            </p>

          </div>

          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >

            {/* Email */}

            <div>

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email address
              </label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition"
                required
              />

            </div>

            {/* Password */}

            <div>

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>

              <div className="relative">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 pr-12 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition"
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  {showPassword ? (
                    <FiEyeOff />
                  ) : (
                    <FiEye />
                  )}
                </button>

              </div>

            </div>

            {/* Login */}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition shadow-lg shadow-blue-600/20"
            >

              {loading
                ? "Signing in..."
                : "Sign In"}

              {!loading && (
                <FiArrowRight />
              )}

            </button>

          </form>

          {/* Register */}

          <div className="text-center mt-7 pt-6 border-t border-slate-100">

            <p className="text-slate-500 text-sm">
              Don't have an account?
            </p>

            <Link
              to="/register"
              className="inline-block mt-2 text-blue-600 font-semibold hover:text-blue-700"
            >
              Create an account
            </Link>

          </div>

        </div>

        <p className="text-center text-slate-500 text-xs mt-6">
          © 2026 ExpenseFlow. All rights reserved.
        </p>

      </div>

    </div>
  );
}

export default Login;