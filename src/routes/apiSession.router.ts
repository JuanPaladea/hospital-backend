import { Router } from "express";

import { registerUser, loginUser, deleteUser, logOut } from "../controllers/sessionController";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.delete("/logout", logOut);
router.delete("/:userId", deleteUser);

export default router;