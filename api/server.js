require('dotenv').config();
const express = require("express");
const app = express();

// Middleware to parse JSON request bodies and  URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Hello" });
});

// Routes
const authRouter = require('./src/routes/auth')
const customerRouter = require('./src/routes/customer')
app.use('/v1/auth', authRouter)
app.use('/v1/customer', customerRouter)

// Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log('Server started on port 3000') })