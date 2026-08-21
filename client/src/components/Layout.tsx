import { useState, type ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiCreditCard,
  FiUser,
  FiLogOut,
  FiMenu,
  FiX,
  FiDollarSign,
} from "react-icons/fi";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);

  const navigation = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: FiHome,
    },
    {
      name: "Expenses",
      path: "/expenses",
      icon: FiCreditCard,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: FiUser,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#f7f9fc]">

      {/* =====================================================
          DESKTOP SIDEBAR
      ===================================================== */}

      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-[280px] bg-white border-r border-slate-200 flex-col z-50">

        {/* Logo */}

        <div className="px-8 pt-8 pb-7">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-200">
              <FiDollarSign className="text-white text-xl" />
            </div>

            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
                ExpenseFlow
              </h1>

              <p className="text-[11px] text-slate-400 mt-0.5">
                Smart Expense Management
              </p>
            </div>

          </div>

        </div>

        {/* Navigation */}

        <nav className="px-5 flex-1">

          <p className="px-3 mb-3 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">
            Menu
          </p>

          <div className="space-y-1.5">

            {navigation.map((item) => {

              const Icon = item.icon;

              const active =
                location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    active
                      ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-200"
                      : "text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                  }`}
                >

                  <Icon
                    className={`text-[20px] ${
                      active
                        ? "text-white"
                        : "text-slate-400 group-hover:text-indigo-600"
                    }`}
                  />

                  <span className="font-semibold text-sm">
                    {item.name}
                  </span>

                </Link>
              );

            })}

          </div>

        </nav>

        {/* Logout */}

        <div className="p-5">

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border border-red-100 bg-red-50 text-red-500 hover:bg-red-100 transition"
          >

            <FiLogOut className="text-lg" />

            <span className="font-semibold text-sm">
              Logout
            </span>

          </button>

        </div>

      </aside>

      {/* =====================================================
          MOBILE HEADER
      ===================================================== */}

      <header className="lg:hidden sticky top-0 z-50 bg-white border-b border-slate-200">

        <div className="h-[70px] px-5 flex items-center justify-between">

          <div className="flex items-center gap-2.5">

            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center">
              <FiDollarSign className="text-white" />
            </div>

            <span className="font-extrabold text-lg text-slate-900">
              ExpenseFlow
            </span>

          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600"
          >
            {mobileOpen ? <FiX /> : <FiMenu />}
          </button>

        </div>

        {mobileOpen && (

          <div className="border-t border-slate-100 bg-white px-4 py-4">

            <div className="space-y-1">

              {navigation.map((item) => {

                const Icon = item.icon;

                const active =
                  location.pathname === item.path;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl ${
                      active
                        ? "bg-indigo-600 text-white"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >

                    <Icon />

                    <span className="font-medium">
                      {item.name}
                    </span>

                  </Link>
                );

              })}

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50"
              >

                <FiLogOut />

                Logout

              </button>

            </div>

          </div>

        )}

      </header>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main className="lg:ml-[280px] min-h-screen">

        <div className="w-full max-w-[1500px] mx-auto px-5 sm:px-7 lg:px-10 py-7 lg:py-9">

          {children}

        </div>

      </main>

    </div>
  );
}

export default Layout;