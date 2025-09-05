// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const Products = require("../models/products"); // ✅ Corrected model name

// ✅ GET ALL PRODUCTS
router.get("/", async (req, res) => {
  try {
    const products = await Products.find();
    res.status(200).json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ✅ CREATE PRODUCT
router.post("/add", async (req, res) => {
  try {
    const { image, name, price, item } = req.body;
    const product = await Products.create({ image, name, price, item });
    res.status(201).json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ✅ UPDATE PRODUCT
router.put("/update/:id", async (req, res) => {
  try {
    const { image, name, price, item } = req.body;
    const product = await Products.findByIdAndUpdate(
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
    const product = await Products.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
