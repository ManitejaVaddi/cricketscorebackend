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


router.post("/register", register);
router.post("/login", login);

router.get("/:id", auth, profile); 
router.put("/update/:id", auth, updateProfile); 
router.delete("/:id", auth, deleteUser);
router.get("/", auth, showUsers); 

export default router;
