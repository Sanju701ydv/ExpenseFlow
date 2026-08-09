import { Router } from "express";
import authenticate from "../middleware/auth.middleware";

import {
  getSummary,
  getCategoryData,
  getMonthlyData,
} from "../controllers/dashboard.controller";

const router = Router();

router.get("/summary", authenticate, getSummary);

router.get("/category", authenticate, getCategoryData);

router.get("/monthly", authenticate, getMonthlyData);

export default router;