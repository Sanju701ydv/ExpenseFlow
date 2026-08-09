import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiCreditCard,
  FiUser,
  FiLogOut,
  FiPlus,
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiX,
} from "react-icons/fi";
import api from "../services/api";

interface Expense {
  id: number;
  title: string;
  amount: number;
  category: string;
  description: string;
  receipt: string | null;
  createdAt: string;
}

interface ExpenseForm {
  title: string;
  amount: string;
  category: string;
  description: string;
}

function Expenses() {
  const navigate = useNavigate();

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState<ExpenseForm>({
    title: "",
    amount: "",
    category: "",
    description: "",
  });

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const fetchExpenses = async () => {
    try {
      const response = await api.get("/expenses");

      setExpenses(response.data.expenses || []);
    } catch (error) {
      console.error("Failed to load expenses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const categories = useMemo(() => {
    const unique = Array.from(
      new Set(expenses.map((expense) => expense.category))
    );

    return ["All", ...unique];
  }, [expenses]);

  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      const matchesSearch =
        expense.title.toLowerCase().includes(search.toLowerCase()) ||
        expense.category.toLowerCase().includes(search.toLowerCase()) ||
        expense.description.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        categoryFilter === "All" ||
        expense.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [expenses, search, categoryFilter]);

  const totalAmount = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0
  );

  const filteredAmount = filteredExpenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0
  );

  const openAddModal = () => {
    setEditingId(null);

    setForm({
      title: "",
      amount: "",
      category: "",
      description: "",
    });

    setShowModal(true);
  };

  const openEditModal = (expense: Expense) => {
    setEditingId(expense.id);

    setForm({
      title: expense.title,
      amount: String(expense.amount),
      category: expense.category,
      description: expense.description || "",
    });

    setShowModal(true);
  };

  const closeModal = () => {
    if (saving) return;

    setShowModal(false);
    setEditingId(null);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.amount || !form.category) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        title: form.title,
        amount: Number(form.amount),
        category: form.category,
        description: form.description,
      };

      if (editingId) {
        await api.put(`/expenses/${editingId}`, payload);
        alert("Expense updated successfully!");
      } else {
        await api.post("/expenses", payload);
        alert("Expense added successfully!");
      }

      closeModal();
      await fetchExpenses();
    } catch (error: any) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  const deleteExpense = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this expense?"
    );

    if (!confirmed) return;

    try {
      await api.delete(`/expenses/${id}`);

      setExpenses((current) =>
        current.filter((expense) => expense.id !== id)
      );

      alert("Expense deleted successfully!");
    } catch (error: any) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to delete expense."
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Sidebar */}

      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r hidden lg:block">

        <div className="p-6">

          <h1 className="text-2xl font-bold text-blue-600">
            ExpenseFlow
          </h1>

          <p className="text-xs text-slate-400 mt-1">
            Expense Management
          </p>

        </div>

        <nav className="px-4 space-y-2">

          <Link
            to="/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-100"
          >
            <FiHome />
            Dashboard
          </Link>

          <Link
            to="/expenses"
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-50 text-blue-600 font-medium"
          >
            <FiCreditCard />
            Expenses
          </Link>

          <Link
            to="/profile"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-100"
          >
            <FiUser />
            Profile
          </Link>

        </nav>

        <div className="absolute bottom-6 left-4 right-4">

          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50"
          >
            <FiLogOut />
            Logout
          </button>

        </div>

      </aside>

      {/* Main */}

      <main className="lg:ml-64 p-5 lg:p-8">

        {/* Header */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

          <div>

            <h1 className="text-3xl font-bold text-slate-800">
              Expenses
            </h1>

            <p className="text-slate-500 mt-1">
              Manage and track all your expenses.
            </p>

          </div>

          <button
            onClick={openAddModal}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold shadow-sm"
          >
            <FiPlus />
            Add Expense
          </button>

        </div>

        {/* Summary Cards */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

          <div className="bg-white border rounded-2xl p-6 shadow-sm">

            <p className="text-sm text-slate-500">
              Total Expenses
            </p>

            <h2 className="text-3xl font-bold text-slate-800 mt-2">
              {expenses.length}
            </h2>

          </div>

          <div className="bg-white border rounded-2xl p-6 shadow-sm">

            <p className="text-sm text-slate-500">
              Total Spending
            </p>

            <h2 className="text-3xl font-bold text-slate-800 mt-2">
              ₹{totalAmount.toLocaleString("en-IN")}
            </h2>

          </div>

          <div className="bg-white border rounded-2xl p-6 shadow-sm">

            <p className="text-sm text-slate-500">
              Showing
            </p>

            <h2 className="text-3xl font-bold text-blue-600 mt-2">
              ₹{filteredAmount.toLocaleString("en-IN")}
            </h2>

            <p className="text-xs text-slate-400 mt-1">
              Based on current filters
            </p>

          </div>

        </div>

        {/* Search / Filter */}

        <div className="bg-white border rounded-2xl p-5 shadow-sm mb-6">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <div className="md:col-span-2 relative">

              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search expenses..."
                className="w-full border border-slate-200 rounded-xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >

              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "All"
                    ? "All Categories"
                    : category}
                </option>
              ))}

            </select>

          </div>

        </div>

        {/* Expense Table */}

        <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">

          <div className="p-6 border-b">

            <h2 className="text-lg font-semibold text-slate-800">
              All Expenses
            </h2>

            <p className="text-sm text-slate-400 mt-1">
              {filteredExpenses.length} expense
              {filteredExpenses.length !== 1 ? "s" : ""} found
            </p>

          </div>

          {loading ? (

            <div className="p-10 text-center text-slate-500">
              Loading expenses...
            </div>

          ) : filteredExpenses.length === 0 ? (

            <div className="p-12 text-center">

              <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400 text-2xl">
                <FiCreditCard />
              </div>

              <h3 className="font-semibold text-slate-700 mt-4">
                No expenses found
              </h3>

              <p className="text-sm text-slate-400 mt-1">
                Try changing your search or add a new expense.
              </p>

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-slate-50">

                  <tr className="text-left text-xs uppercase tracking-wide text-slate-400">

                    <th className="px-6 py-4">
                      Expense
                    </th>

                    <th className="px-6 py-4">
                      Category
                    </th>

                    <th className="px-6 py-4">
                      Date
                    </th>

                    <th className="px-6 py-4 text-right">
                      Amount
                    </th>

                    <th className="px-6 py-4 text-right">
                      Actions
                    </th>

                  </tr>

                </thead>

                <tbody className="divide-y">

                  {filteredExpenses.map((expense) => (

                    <tr
                      key={expense.id}
                      className="hover:bg-slate-50"
                    >

                      <td className="px-6 py-5">

                        <div className="flex items-center gap-3">

                          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                            <FiCreditCard />
                          </div>

                          <div>

                            <p className="font-semibold text-slate-700">
                              {expense.title}
                            </p>

                            <p className="text-xs text-slate-400 max-w-xs truncate">
                              {expense.description || "No description"}
                            </p>

                          </div>

                        </div>

                      </td>

                      <td className="px-6 py-5">

                        <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold">
                          {expense.category}
                        </span>

                      </td>

                      <td className="px-6 py-5 text-sm text-slate-500">
                        {new Date(
                          expense.createdAt
                        ).toLocaleDateString("en-IN")}
                      </td>

                      <td className="px-6 py-5 text-right">

                        <span className="font-bold text-slate-700">
                          ₹
                          {Number(expense.amount).toLocaleString(
                            "en-IN"
                          )}
                        </span>

                      </td>

                      <td className="px-6 py-5">

                        <div className="flex justify-end gap-2">

                          <button
                            onClick={() =>
                              openEditModal(expense)
                            }
                            className="p-2 rounded-lg text-blue-600 hover:bg-blue-50"
                            title="Edit"
                          >
                            <FiEdit2 />
                          </button>

                          <button
                            onClick={() =>
                              deleteExpense(expense.id)
                            }
                            className="p-2 rounded-lg text-red-500 hover:bg-red-50"
                            title="Delete"
                          >
                            <FiTrash2 />
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </main>

      {/* Add/Edit Modal */}

      {showModal && (

        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">

          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">

            {/* Modal Header */}

            <div className="flex items-center justify-between p-6 border-b">

              <div>

                <h2 className="text-xl font-bold text-slate-800">
                  {editingId
                    ? "Edit Expense"
                    : "Add Expense"}
                </h2>

                <p className="text-sm text-slate-400 mt-1">
                  {editingId
                    ? "Update your expense details."
                    : "Enter the details of your expense."}
                </p>

              </div>

              <button
                onClick={closeModal}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"
              >
                <FiX />
              </button>

            </div>

            {/* Form */}

            <form
              onSubmit={handleSubmit}
              className="p-6 space-y-5"
            >

              <div>

                <label className="block text-sm font-medium text-slate-600 mb-2">
                  Title *
                </label>

                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. Grocery Shopping"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />

              </div>

              <div className="grid grid-cols-2 gap-4">

                <div>

                  <label className="block text-sm font-medium text-slate-600 mb-2">
                    Amount *
                  </label>

                  <input
                    name="amount"
                    type="number"
                    min="0"
                    value={form.amount}
                    onChange={handleChange}
                    placeholder="2500"
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />

                </div>

                <div>

                  <label className="block text-sm font-medium text-slate-600 mb-2">
                    Category *
                  </label>

                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    required
                  >

                    <option value="">
                      Select
                    </option>

                    <option value="Food">
                      Food
                    </option>

                    <option value="Electronics">
                      Electronics
                    </option>

                    <option value="Travel">
                      Travel
                    </option>

                    <option value="Shopping">
                      Shopping
                    </option>

                    <option value="Bills">
                      Bills
                    </option>

                    <option value="Health">
                      Health
                    </option>

                    <option value="Education">
                      Education
                    </option>

                    <option value="Other">
                      Other
                    </option>

                  </select>

                </div>

              </div>

              <div>

                <label className="block text-sm font-medium text-slate-600 mb-2">
                  Description
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Add some details..."
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />

              </div>

              <div className="flex gap-3 pt-2">

                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 border border-slate-200 text-slate-600 py-3 rounded-xl font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-60"
                >
                  {saving
                    ? "Saving..."
                    : editingId
                    ? "Update Expense"
                    : "Add Expense"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default Expenses;