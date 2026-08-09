import { Response } from "express";
import ExpenseService from "../services/expense.service";

// Create Expense
export const createExpense = async (req: any, res: Response) => {
  try {
    const expense = await ExpenseService.createExpense(
      req.user.id,
      req.body
    );

    res.status(201).json({
      success: true,
      expense,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Expenses
export const getExpenses = async (req: any, res: Response) => {
  try {
    const expenses = await ExpenseService.getExpenses(req.user.id);

    res.status(200).json({
      success: true,
      count: expenses.length,
      expenses,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Expense By ID
export const getExpenseById = async (req: any, res: Response) => {
  try {
    const expense = await ExpenseService.getExpenseById(
      req.user.id,
      Number(req.params.id)
    );

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    res.json({
      success: true,
      expense,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Expense
export const updateExpense = async (req: any, res: Response) => {
  try {
    const expense = await ExpenseService.updateExpense(
      req.user.id,
      Number(req.params.id),
      req.body
    );

    res.json({
      success: true,
      expense,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Expense
export const deleteExpense = async (req: any, res:Response) => {
  try {
    await ExpenseService.deleteExpense(
      req.user.id,
      Number(req.params.id)
    );

    res.json({
      success: true,
      message: "Expense deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Get Expense Summary
export const getExpenseSummary = async (
  req: any,
  res: Response
) => {
  try {

    const summary = await ExpenseService.getExpenseSummary(
      req.user.id
    );

    res.json({
      success: true,
      data: summary,
    });

  } catch (error: any) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};