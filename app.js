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


// app.use(cors({ origin: "http://localhost:5173", credentials: true }));
const allowedOrigins = [
  "http://localhost:3000",         // local dev
  "https://my-react-app-psi-pink.vercel.app", // production frontend
];

app.use(cors({
  origin: function (origin, callback) {
    console.log("🔍 CORS request from origin:", origin);
    console.log("📋 Allowed origins:", allowedOrigins);
    
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      console.log("✅ Allowing request with no origin (likely server-to-server)");
      return callback(null, true);
    }
    
    if (allowedOrigins.indexOf(origin) === -1) {
      console.log("❌ CORS blocked origin:", origin);
      console.log("📋 Allowed origins:", allowedOrigins);
      return callback(new Error("Not allowed by CORS"), false);
    }
    
    console.log("✅ Origin allowed:", origin);
    return callback(null, true);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
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

// CORS test endpoint
app.get("/cors-test", function (req, res) {
  res.json({ 
    message: "CORS is working!", 
    origin: req.headers.origin,
    userAgent: req.headers['user-agent'],
    timestamp: new Date().toISOString(),
    allowedOrigins: allowedOrigins
  });
});

// ✅ Show which port and DB are being used
app.listen(process.env.PORT || 3500, () => {
  console.log(`🚀 Server running on http://localhost:${process.env.PORT || 3500}`);
  console.log(`📦 Mongo URI: ${process.env.MONGO_URI}`);
});
