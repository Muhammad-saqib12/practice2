// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");


const JWT_SECRET = "alamaiqbal"; // use env variable in production

// ✅ CREATE USER (SIGNUP)
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({ username, email, password: hashedPassword });

    res.status(201).json({ success: true, message: "Signup successful", user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ✅ LOGIN USER
router.post("/login", 
  async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ success: false, message: "Invalid credentials" });

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });

    res.status(200).json({ success: true, message: "Login successful", token, user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ✅ READ ALL USERS
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ✅ UPDATE USER
router.put("/update/:id", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const updateData = { username, email };
    if (password) updateData.password = await bcrypt.hash(password, 10);

    const user = await User.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    res.status(200).json({ success: true, message: "User updated", user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ✅ DELETE USER
router.delete("/delete/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    res.status(200).json({ success: true, message: "User deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
