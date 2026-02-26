const express = require('express');
const cors = require('cors');
require('dotenv').config();


require('./db');

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// routes
const userRoutes = require('./routes/userRoutes');
app.use(userRoutes);
const cartRoutes = require('./routes/cartRoutes');
app.use(cartRoutes);

const imageRoutes = require('./routes/imageRoutes');
app.use(imageRoutes);

const productRoutes = require('./routes/productRoutes');
app.use(productRoutes)

app.listen(8000, () => {
  console.log('App is running');
});
