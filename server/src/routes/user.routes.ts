import { Router } from "express";

import authenticate from "../middleware/auth.middleware";

import {
  profile,
  updateProfile,
} from "../controllers/user.controller";

const router = Router();

router.get(
  "/profile",
  authenticate,
  profile
);

router.put(
  "/profile",
  authenticate,
  updateProfile
);

export default router;