require('dotenv').config();
const express = require("express");
const app = express();
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const specs = require('./src/utils/swaggerDef.js');

// Serve Swagger UI at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Middleware to parse JSON request bodies and  URL-encoded request bodies
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get("/v1", (req, res) => {
  res.json({ data: "success" });
});

// Routes
const authRouter = require('./src/routes/auth')
const customerRouter = require('./src/routes/customers')
const transactionsRouter = require('./src/routes/transactions')
app.use('/v1/auth', authRouter)
app.use('/v1/customers', customerRouter)
app.use('/v1/transactions', transactionsRouter)

// Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log('Server started on port 3000') })