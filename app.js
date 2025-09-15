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

// CORS configuration for both local development and Vercel production
const allowedOrigins = [
  "http://localhost:5173", // Local development
  "http://localhost:3000", // Alternative local port
  process.env.FRONTEND_URL, // Your Vercel app URL
];

app.use(cors({ 
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));
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
