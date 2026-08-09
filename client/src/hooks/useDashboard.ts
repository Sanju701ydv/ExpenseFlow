import { useEffect, useState } from "react";
import api from "../services/api";

export interface Expense {
  id: number;
  title: string;
  amount: number;
  category: string;
  description: string;
  createdAt: string;
}

interface Summary {
  totalExpenses: number;
  totalAmount: number;
}

function useDashboard() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [summary, setSummary] = useState<Summary>({
    totalExpenses: 0,
    totalAmount: 0,
  });

  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const summaryRes = await api.get("/expenses/summary");
      const expensesRes = await api.get("/expenses");

      console.log("Summary:", summaryRes.data);
      console.log("Expenses:", expensesRes.data);

      setSummary(summaryRes.data.data);
      setExpenses(expensesRes.data.expenses);
    } catch (error: any) {
      console.log("Dashboard Error");
      console.log(error.response?.status);
      console.log(error.response?.data);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return {
    loading,
    summary,
    expenses,
    refreshDashboard: fetchDashboard,
  };
}

export default useDashboard;