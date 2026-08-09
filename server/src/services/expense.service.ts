import prisma from "../config/prisma";

class ExpenseService {

  // Create Expense
  async createExpense(userId: number, data: any) {
    return await prisma.expense.create({
      data: {
        title: data.title,
        amount: data.amount,
        category: data.category,
        description: data.description,
        userId,
      },
    });
  }

  // Get All Expenses
  async getExpenses(userId: number) {
    return await prisma.expense.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  // Get Expense By ID
  async getExpenseById(userId: number, expenseId: number) {
    return await prisma.expense.findFirst({
      where: {
        id: expenseId,
        userId,
      },
    });
  }

  // Get Expense Summary
  async getExpenseSummary(userId: number) {

    const result = await prisma.expense.aggregate({
      where: {
        userId,
      },
      _count: {
        id: true,
      },
      _sum: {
        amount: true,
      },
    });

    return {
      totalExpenses: result._count.id,
      totalAmount: result._sum.amount || 0,
    };
  }

  // Update Expense
  async updateExpense(
    userId: number,
    expenseId: number,
    data: any
  ) {

    const expense = await prisma.expense.findFirst({
      where: {
        id: expenseId,
        userId,
      },
    });

    if (!expense) {
      throw new Error("Expense not found");
    }

    return await prisma.expense.update({
      where: {
        id: expenseId,
      },
      data: {
        title: data.title,
        amount: data.amount,
        category: data.category,
        description: data.description,
      },
    });
  }

  // Delete Expense
  async deleteExpense(userId: number, expenseId: number) {

    const expense = await prisma.expense.findFirst({
      where: {
        id: expenseId,
        userId,
      },
    });

    if (!expense) {
      throw new Error("Expense not found");
    }

    await prisma.expense.delete({
      where: {
        id: expenseId,
      },
    });

    return true;
  }
}

export default new ExpenseService();