import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "something";

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPwd = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      firstName,
      lastName,
      email,
      password: hashedPwd,
    });

    res.status(201).json(user);
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid password" });

    const payload = {
      id: user._id,
      firstName: user.firstName,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(payload, SECRET, { expiresIn: "1h" });

    res.status(200).json({ ...payload, token });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const profile = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id).select("-password");
    if (!user)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    console.error("Profile Error:", err);
    res.status(400).json({ message: "Something went wrong" });
  }
};

const showUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;
    const skip = (page - 1) * limit;
    const regex = new RegExp(search, "i");

    const count = await userModel.countDocuments({ firstName: { $regex: regex } });
    const total = Math.ceil(count / limit);

    const users = await userModel
      .find({ firstName: { $regex: regex } })
      .skip(skip)
      .limit(Number(limit))
      .sort({ updatedAt: -1 })
      .select("-password");

    res.status(200).json({ users, total });
  } catch (err) {
    console.error("ShowUsers Error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;

    if (body.password) {
      body.password = await bcrypt.hash(body.password, 10);
    }

    const updatedUser = await userModel
      .findByIdAndUpdate(id, body, { new: true })
      .select("-password");

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("UpdateProfile Error:", err);
    res.status(400).json({ message: "Something went wrong" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await userModel.findByIdAndDelete(id);
    res.status(200).json(result);
  } catch (err) {
    console.error("Delete Error:", err);
    res.status(400).json({ message: "Something went wrong" });
  }
};

export  {
  register,
  login,
  profile,
  showUsers,
  updateProfile,
  deleteUser,
};
