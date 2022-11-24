require('dotenv').config();
require('express-async-errors');
const notFound = require('./middleware/404');
const errorHandlerMiddleware = require('./middleware/error-handler');
const connectDB = require('./db/connect');
const productRouter = require('./routes/products');
const express = require('express');
const app = express();

// Routes
app.get('/', (req, res) => {
  res.send(
    '<h2>Store App   </h2> <a href="/api/v1/products">Products Route</a>'
  );
});

// Products Route
app.use('/api/v1/products', productRouter);

// Middleware
app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.port || 3000;

// Start
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is running on port: ${port}`));
  } catch (err) {
    console.log(err);
  }
};

start();
