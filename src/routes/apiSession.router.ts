import { Router } from "express";

import {
  registerUser,
  loginUser,
  deleteUser,
  logOut,
  getMe,
} from "../controllers/sessionController";

const router = Router();

router.get("/me", getMe);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logOut);
router.delete("/:userId", deleteUser);

export default router;
