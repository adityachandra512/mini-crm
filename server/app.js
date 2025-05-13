const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db.config');
const passport = require('./src/services/auth.service');
const session = require('express-session');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Allow only your frontend's origin
  credentials: true // Enable credentials
}));
app.use(express.json());
app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
    })
  );
app.use(passport.initialize());
app.use(passport.session());
  
// Connect to MongoDB
connectDB();

// Define routes
app.use('/api/auth', require('./src/routes/auth.routes'));
app.use('/api/customers', require('./src/routes/customer.routes'));
app.use('/api/orders', require('./src/routes/order.routes'));
app.use('/api/campaigns', require('./src/routes/campaign.routes'));
app.use('/api/auth', require('./src/routes/auth.routes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));