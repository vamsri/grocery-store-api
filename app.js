const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
const tenantRoutes = require('./routes/tenantRoutes'); // Adjust the path as necessary
const userRoutes = require('./routes/userRoutes'); 
const productRoutes = require('./routes/productRoutes'); // adjust the path as necessary
const orderRoutes = require('./routes/orderRoutes'); // adjust the path as necessary
const categoryRoutes = require('./routes/categoryRoutes'); // Adjust the path as necessary
const swaggerUi = require('swagger-ui-express');

// const sendMail = require('./utils/sendMail');
// const forgotPassword = require('./utils/forgotPassword');
// const resetPassword = require('./utils/resetPassword');
const authRoutes = require('./routes/authRoutes');
const swaggerDocs = require('./swagger');

const app = express();
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
};
// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/store-dev')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

app.use(limiter);
app.use(helmet());
app.use(cors({}));

// Swagger setup
app.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api', authRoutes);

// User registration
app.use('/api', tenantRoutes);
app.use('/api', userRoutes);
app.use('/api', productRoutes);
app.use('/api', orderRoutes);
app.use('/api', categoryRoutes);

// app.use(sendMail);
// app.use(forgotPassword);
// app.use(resetPassword);

const port = process.env.PORT || 4002;
app.listen(port, () => console.log(`Listening on port ${port}...`));
