import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
  FiArrowUpRight,
  FiCreditCard,
  FiPlus,
  FiTrendingUp,
  FiShoppingBag,
  FiShoppingCart,
  FiFileText,
} from "react-icons/fi";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import api from "../services/api";

interface Expense {
  id: number;
  title: string;
  amount: number;
  category: string;
  description: string;
  createdAt: string;
}

function Dashboard() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const response = await api.get("/expenses");

        setExpenses(
          response.data.expenses || []
        );
      } catch (error) {
        console.error(
          "Dashboard error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadExpenses();
  }, []);

  /* =====================================================
     CALCULATIONS
  ===================================================== */

  const totalAmount = expenses.reduce(
    (total, expense) =>
      total + Number(expense.amount),
    0
  );

  const averageAmount =
    expenses.length > 0
      ? Math.round(
          totalAmount / expenses.length
        )
      : 0;

  /* =====================================================
     CATEGORY DATA
  ===================================================== */

  const categoryData = useMemo(() => {
    const categories: Record<
      string,
      number
    > = {};

    expenses.forEach((expense) => {
      categories[expense.category] =
        (categories[expense.category] || 0) +
        Number(expense.amount);
    });

    return Object.entries(categories).map(
      ([name, value]) => ({
        name,
        value,
      })
    );
  }, [expenses]);

  /* =====================================================
     COLORS
  ===================================================== */

  const chartColors = [
    "#4f46e5",
    "#14b8a6",
    "#f59e0b",
    "#ec4899",
    "#8b5cf6",
    "#06b6d4",
  ];

  /* =====================================================
     CATEGORY ICON
  ===================================================== */

  const getCategoryIcon = (
    category: string
  ) => {
    const value =
      category.toLowerCase();

    if (
      value.includes("food") ||
      value.includes("grocery")
    ) {
      return <FiShoppingCart />;
    }

    if (
      value.includes("electronic") ||
      value.includes("shopping")
    ) {
      return <FiShoppingBag />;
    }

    if (
      value.includes("bill") ||
      value.includes("utility")
    ) {
      return <FiFileText />;
    }

    return <FiCreditCard />;
  };

  /* =====================================================
     RECENT EXPENSES
  ===================================================== */

  const recentExpenses =
    expenses.slice(0, 5);

  /* =====================================================
     FORMAT CURRENCY
  ===================================================== */

  const formatMoney = (amount: number) => {
    return `₹${amount.toLocaleString(
      "en-IN"
    )}`;
  };

  /* =====================================================
     UI
  ===================================================== */

  return (
    <div>

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-8">

        <div>

          <p className="text-sm font-semibold text-indigo-600 mb-1">
            Welcome back 👋
          </p>

          <h1 className="text-3xl lg:text-[34px] font-extrabold tracking-tight text-slate-900">
            Dashboard
          </h1>

          <p className="text-sm lg:text-base text-slate-500 mt-2">
            Here's your expense overview.
          </p>

        </div>

        <Link
          to="/expenses"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold shadow-lg shadow-indigo-200 hover:shadow-xl hover:-translate-y-0.5 transition-all"
        >

          <FiPlus className="text-lg" />

          Add Expense

        </Link>

      </div>

      {/* =================================================
          STAT CARDS
      ================================================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mb-7">

        {/* Total Expenses */}

        <div className="dashboard-card">

          <div className="flex items-start justify-between">

            <div className="stat-icon bg-indigo-50 text-indigo-600">
              <FiCreditCard />
            </div>

            <span className="stat-label">
              ALL TIME
            </span>

          </div>

          <p className="stat-title">
            Total Expenses
          </p>

          <h2 className="stat-value">

            {loading
              ? "..."
              : expenses.length}

          </h2>

          <p className="stat-subtitle text-indigo-500">
            Transactions recorded
          </p>

        </div>

        {/* Total Spending */}

        <div className="dashboard-card">

          <div className="flex items-start justify-between">

            <div className="stat-icon bg-teal-50 text-teal-600">
              <FiTrendingUp />
            </div>

            <span className="stat-label">
              TOTAL
            </span>

          </div>

          <p className="stat-title">
            Total Spending
          </p>

          <h2 className="stat-value">

            {loading
              ? "..."
              : formatMoney(totalAmount)}

          </h2>

          <p className="stat-subtitle text-teal-500">
            All recorded expenses
          </p>

        </div>

        {/* Average */}

        <div className="dashboard-card">

          <div className="flex items-start justify-between">

            <div className="stat-icon bg-violet-50 text-violet-600">
              <FiArrowUpRight />
            </div>

            <span className="stat-label">
              AVERAGE
            </span>

          </div>

          <p className="stat-title">
            Average Expense
          </p>

          <h2 className="stat-value">

            {loading
              ? "..."
              : formatMoney(
                  averageAmount
                )}

          </h2>

          <p className="stat-subtitle text-violet-500">
            Per transaction
          </p>

        </div>

      </div>

      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <div className="grid grid-cols-1 xl:grid-cols-[1.55fr_1fr] gap-6">

        {/* =================================================
            RECENT EXPENSES
        ================================================= */}

        <div className="dashboard-card p-0 overflow-hidden">

          {/* Header */}

          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">

            <div>

              <h2 className="text-lg font-bold text-slate-900">
                Recent Expenses
              </h2>

              <p className="text-sm text-slate-400 mt-1">
                Your latest transactions
              </p>

            </div>

            <Link
              to="/expenses"
              className="text-sm font-bold text-indigo-600 hover:text-indigo-700"
            >
              View all
            </Link>

          </div>

          {/* Expense List */}

          {recentExpenses.length === 0 ? (

            <div className="py-16 text-center">

              <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
                <FiCreditCard className="text-2xl" />
              </div>

              <p className="mt-4 font-semibold text-slate-600">
                No expenses yet
              </p>

              <p className="text-sm text-slate-400 mt-1">
                Add your first expense to get started.
              </p>

            </div>

          ) : (

            <div>

              {recentExpenses.map(
                (expense, index) => (

                  <div
                    key={expense.id}
                    className={`flex items-center justify-between gap-4 px-6 py-4 hover:bg-slate-50 transition ${
                      index !==
                      recentExpenses.length - 1
                        ? "border-b border-slate-100"
                        : ""
                    }`}
                  >

                    <div className="flex items-center gap-4 min-w-0">

                      <div className="w-11 h-11 shrink-0 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-lg">
                        {getCategoryIcon(
                          expense.category
                        )}
                      </div>

                      <div className="min-w-0">

                        <p className="font-bold text-slate-800 truncate">
                          {expense.title}
                        </p>

                        <p className="text-xs text-slate-400 mt-1">

                          {expense.category}

                          {" • "}

                          {new Date(
                            expense.createdAt
                          ).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )}

                        </p>

                      </div>

                    </div>

                    <p className="font-bold text-slate-800 whitespace-nowrap">
                      {formatMoney(
                        Number(
                          expense.amount
                        )
                      )}
                    </p>

                  </div>

                )
              )}

            </div>

          )}

          {/* Bottom */}

          {recentExpenses.length > 0 && (

            <div className="border-t border-slate-100 px-6 py-4">

              <Link
                to="/expenses"
                className="flex items-center justify-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700"
              >
                View all expenses
                <FiArrowUpRight />
              </Link>

            </div>

          )}

        </div>

        {/* =================================================
            CATEGORY CHART
        ================================================= */}

        <div className="dashboard-card">

          <div>

            <h2 className="text-lg font-bold text-slate-900">
              Spending by Category
            </h2>

            <p className="text-sm text-slate-400 mt-1">
              Where your money goes
            </p>

          </div>

          {/* Chart */}

          <div className="h-[260px] mt-3">

            {categoryData.length === 0 ? (

              <div className="h-full flex items-center justify-center text-slate-400">
                No category data
              </div>

            ) : (

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <PieChart>

                  <Pie
                    data={categoryData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={95}
                    paddingAngle={2}
                  >

                    {categoryData.map(
                      (_, index) => (

                        <Cell
                          key={`cell-${index}`}
                          fill={
                            chartColors[
                              index %
                                chartColors.length
                            ]
                          }
                        />

                      )
                    )}

                  </Pie>

                  <Tooltip
                    formatter={(value) =>
                      formatMoney(
                        Number(value)
                      )
                    }
                  />

                </PieChart>

              </ResponsiveContainer>

            )}

          </div>

          {/* Center total */}

          {categoryData.length > 0 && (

            <div className="relative -mt-[180px] mb-[140px] pointer-events-none text-center">

              <p className="text-xl font-extrabold text-slate-800">
                {formatMoney(
                  totalAmount
                )}
              </p>

              <p className="text-xs text-slate-400">
                Total
              </p>

            </div>

          )}

          {/* Legend */}

          <div className="space-y-3">

            {categoryData.map(
              (item, index) => {

                const percentage =
                  totalAmount > 0
                    ? (
                        (item.value /
                          totalAmount) *
                        100
                      ).toFixed(1)
                    : "0";

                return (

                  <div
                    key={item.name}
                    className="flex items-center justify-between gap-3"
                  >

                    <div className="flex items-center gap-2 min-w-0">

                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{
                          backgroundColor:
                            chartColors[
                              index %
                                chartColors.length
                            ],
                        }}
                      />

                      <span className="text-sm font-medium text-slate-600 truncate">
                        {item.name}
                      </span>

                    </div>

                    <div className="flex items-center gap-3">

                      <span className="text-sm font-bold text-slate-700">
                        {formatMoney(
                          item.value
                        )}
                      </span>

                      <span className="text-xs text-slate-400 w-10 text-right">
                        {percentage}%
                      </span>

                    </div>

                  </div>

                );
              }
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;