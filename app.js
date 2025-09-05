const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const categoryRouter = require("./routes/categoryRouter")

const userRouter = require("./routes/userRouter");
const productRouter = require("./routes/productRouter");
const productsRouter = require("./routes/productsRouter");
// const inventoryRouter =require("./routes/inventoryRouter");
// const stocksRouter =require ("./routes/stocksRouter")

dotenv.config(); 

const app = express();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/category",categoryRouter);

app.use("/users", userRouter);
app.use("/products", productsRouter);
app.use("/product",productRouter)



app.get("/", function (req, res) {
  res.send("raja palo khan");
});

// ✅ Show which port and DB are being used
app.listen(process.env.PORT || 3500, () => {
  console.log(`🚀 Server running on http://localhost:${process.env.PORT || 3500}`);
  console.log(`📦 Mongo URI: ${process.env.MONGO_URI}`);
});
