import { Router } from "express";
import Users from "../models/Users.js";
import { getUser, getUsersById } from "../controllers/users.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/getUsers", getUser);
router.get("/getUsersById", getUsersById);

export default router;

