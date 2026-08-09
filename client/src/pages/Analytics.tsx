import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { FiArrowLeft, FiRefreshCw } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

interface Expense {
  id: number;
  title: string;
  amount: number;
  category: string;
  createdAt: string;
}

function Analytics() {
  const navigate = useNavigate();

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchExpenses = async () => {
    try {
      setLoading(true);

      const response = await api.get("/expenses");

      setExpenses(response.data.expenses);
    } catch (error) {
      console.log("Failed to load analytics", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const categoryData = expenses.reduce(
    (result: { name: string; value: number }[], expense) => {
      const existing = result.find(
        (item) => item.name === expense.category
      );

      if (existing) {
        existing.value += Number(expense.amount);
      } else {
        result.push({
          name: expense.category,
          value: Number(expense.amount),
        });
      }

      return result;
    },
    []
  );

  const monthlyData = expenses.reduce(
    (result: { month: string; amount: number }[], expense) => {
      const date = new Date(expense.createdAt);

      const month = date.toLocaleString("en-US", {
        month: "short",
      });

      const existing = result.find(
        (item) => item.month === month
      );

      if (existing) {
        existing.amount += Number(expense.amount);
      } else {
        result.push({
          month,
          amount: Number(expense.amount),
        });
      }

      return result;
    },
    []
  );

  const total = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0
  );

  const highestExpense =
    expenses.length > 0
      ? Math.max(
          ...expenses.map((expense) =>
            Number(expense.amount)
          )
        )
      : 0;

  const COLORS = [
    "#2563eb",
    "#16a34a",
    "#9333ea",
    "#ea580c",
    "#dc2626",
    "#0891b2",
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold">
          Loading Analytics...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10">

      {/* Header */}

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

        <div>
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-3"
          >
            <FiArrowLeft />
            Back to Dashboard
          </button>

          <h1 className="text-3xl font-bold text-gray-800">
            Analytics
          </h1>

          <p className="text-gray-500 mt-1">
            Understand where your money is going.
          </p>
        </div>

        <button
          onClick={fetchExpenses}
          className="flex items-center gap-2 bg-white border px-4 py-2 rounded-lg hover:bg-gray-50"
        >
          <FiRefreshCw />
          Refresh
        </button>

      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <p className="text-gray-500">
            Total Spending
          </p>

          <h2 className="text-3xl font-bold mt-2">
            ₹{total.toLocaleString()}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <p className="text-gray-500">
            Number of Expenses
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {expenses.length}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <p className="text-gray-500">
            Highest Expense
          </p>

          <h2 className="text-3xl font-bold mt-2">
            ₹{highestExpense.toLocaleString()}
          </h2>
        </div>

      </div>

      {/* Charts */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

        {/* Pie */}

        <div className="bg-white rounded-2xl p-6 shadow-sm">

          <h2 className="text-xl font-semibold">
            Spending by Category
          </h2>

          <div className="h-80 mt-4">

            {categoryData.length > 0 ? (
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
                    outerRadius={100}
                    label
                  >
                    {categoryData.map(
                      (_, index) => (
                        <Cell
                          key={index}
                          fill={
                            COLORS[
                              index %
                                COLORS.length
                            ]
                          }
                        />
                      )
                    )}
                  </Pie>

                  <Tooltip
                    formatter={(value) =>
                      `₹${Number(value).toLocaleString()}`
                    }
                  />

                  <Legend />

                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                No expense data available
              </div>
            )}

          </div>

        </div>

        {/* Bar */}

        <div className="bg-white rounded-2xl p-6 shadow-sm">

          <h2 className="text-xl font-semibold">
            Spending Overview
          </h2>

          <div className="h-80 mt-4">

            {monthlyData.length > 0 ? (
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <BarChart data={monthlyData}>

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="month" />

                  <YAxis />

                  <Tooltip
                    formatter={(value) =>
                      `₹${Number(value).toLocaleString()}`
                    }
                  />

                  <Bar
                    dataKey="amount"
                    fill="#2563eb"
                    radius={[6, 6, 0, 0]}
                  />

                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                No data available
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Category Breakdown */}

      <div className="bg-white rounded-2xl shadow-sm mt-8 overflow-hidden">

        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">
            Category Breakdown
          </h2>
        </div>

        <div className="divide-y">

          {categoryData.map((category) => {

            const percentage =
              total > 0
                ? (category.value / total) * 100
                : 0;

            return (
              <div
                key={category.name}
                className="p-5"
              >

                <div className="flex justify-between mb-2">

                  <span className="font-medium">
                    {category.name}
                  </span>

                  <span className="font-semibold">
                    ₹{category.value.toLocaleString()}
                  </span>

                </div>

                <div className="w-full bg-gray-200 rounded-full h-2">

                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{
                      width: `${percentage}%`,
                    }}
                  />

                </div>

                <p className="text-sm text-gray-500 mt-1">
                  {percentage.toFixed(1)}% of total spending
                </p>

              </div>
            );
          })}

        </div>

      </div>

    </div>
  );
}

export default Analytics;