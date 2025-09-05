// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const Category=require("../models/category") // ✅ Corrected model name

// ✅ GET ALL PRODUCTS
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().populate("category", "name image"); 
    res.status(200).json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ✅ CREATE PRODUCT
router.post("/add", async (req, res) => {
  try {
    const { name, image, price, category } = req.body;
    const product = await Product.create({ name, image, price, category });
    res.status(201).json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ✅ UPDATE PRODUCT
router.put("/update/:id", async (req, res) => {
  try {
    const { image, name, price, item } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { image, name, price, item },
      { new: true }
    );
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });
    res.status(200).json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ✅ DELETE PRODUCT
router.delete("/delete/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
