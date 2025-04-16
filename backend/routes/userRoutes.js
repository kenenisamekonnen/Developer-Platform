import { Router } from "express";
import Users from "../models/Users.js";
import { register, login } from "../controllers/auth.controller.js";
import { getUser, getUsersById } from "../controllers/users.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/users", getUser);
router.get("/user", protect ,getUsersById);


export default router;