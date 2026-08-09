import { Router } from "express";

import * as ExpenseController from "../controllers/expense.controller";

import authenticate from "../middleware/auth.middleware";

console.log("ExpenseController:", ExpenseController);
console.log("authenticate:", authenticate);

const router = Router();

// Create Expense
router.post(
  "/",
  authenticate,
  ExpenseController.createExpense
);

// Get All Expenses
router.get(
  "/",
  authenticate,
  ExpenseController.getExpenses
);

// Get Expense Summary
router.get(
  "/summary",
  authenticate,
  ExpenseController.getExpenseSummary
);

// Get Expense By ID
router.get(
  "/:id",
  authenticate,
  ExpenseController.getExpenseById
);

// Update Expense
router.put(
  "/:id",
  authenticate,
  ExpenseController.updateExpense
);

// Delete Expense
router.delete(
  "/:id",
  authenticate,
  ExpenseController.deleteExpense
);

export default router;