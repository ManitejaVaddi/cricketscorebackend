import express from "express";
import {
  register,
  login,
  profile,
  showUsers,
  updateProfile,
  deleteUser
} from "../controllers/userController.js";
import auth from "../middleware/auth.js"; 

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);

router.get("/:id", auth, profile); // Get user profile by ID
router.put("/update/:id", auth, updateProfile); // Update user info
router.delete("/:id", auth, deleteUser); // Delete user
router.get("/", auth, showUsers); // Get all users (with pagination)

export default router;
