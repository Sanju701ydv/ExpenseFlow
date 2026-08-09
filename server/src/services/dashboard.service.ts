import prisma from "../config/prisma";

class DashboardService {

  // Dashboard Summary
  async getSummary(userId: number) {

    const expenses = await prisma.expense.findMany({
      where: {
        userId,
      },
    });

    const totalExpenses = expenses.length;

    const totalAmount = expenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );

    return {
      totalExpenses,
      totalAmount,
    };
  }

  // Category Analytics
  async getCategoryData(userId: number) {

    const expenses = await prisma.expense.findMany({
      where: {
        userId,
      },
    });

    const categoryMap: Record<string, number> = {};

    expenses.forEach((expense) => {
      if (categoryMap[expense.category]) {
        categoryMap[expense.category] += expense.amount;
      } else {
        categoryMap[expense.category] = expense.amount;
      }
    });

    return Object.keys(categoryMap).map((category) => ({
      category,
      total: categoryMap[category],
    }));
  }

  // Monthly Analytics
  async getMonthlyData(userId: number) {

    const expenses = await prisma.expense.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    const monthMap: Record<string, number> = {};

    expenses.forEach((expense) => {

      const month = expense.createdAt.toLocaleString("default", {
        month: "short",
      });

      if (monthMap[month]) {
        monthMap[month] += expense.amount;
      } else {
        monthMap[month] = expense.amount;
      }

    });

    return Object.keys(monthMap).map((month) => ({
      month,
      total: monthMap[month],
    }));
  }

}

export default new DashboardService();