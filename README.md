# Project Name: Node.js Backend API

## Description

This project is a Node.js backend API built with Express.js. It includes authentication using JSON Web Tokens (JWT), MongoDB for the database with Mongoose as the ODM, and various other tools and libraries to enhance the application's functionality and security.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Project Structure](#project-structure)
3. [Installation](#installation)
4. [Running the Application](#running-the-application)
5. [Environment Variables](#environment-variables)
6. [Usage](#usage)
   - [Authentication](#authentication)
   - [File Uploads](#file-uploads)
   - [Email Sending](#email-sending)
7. [Swagger Documentation](#swagger-documentation)
8. [Contributing](#contributing)
9. [License](#license)

## Getting Started

Follow the instructions below to set up and run the project on your local machine for development and testing purposes.

## Project Structure

```
root/
├── config/
│   ├── cloudinaryConfig.js
│   ├── db.js
│   ├── nodemailerConfig.js
│   ├── swagger.js
│── controllers/
│   ├── authController.js
│   ├── userController.js
│── middlewares/
│   ├── auth.js
│   ├── errorHandler.js
│── models/
│   ├── User.js
│── routes/
│   ├── authRoutes.js
│   ├── userRoutes.js
│── uploads/
│── utils/
│   ├── generateToken.js
│── .env
│── .gitignore
│── app.js
│── package.json
│── README.md
```

## Installation

1. **Clone the repository:**
   ```
   git clone https://github.com/your-username/nodejs-backend-api.git
   cd nodejs-backend-api
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

## Running the Application

1. **Start the development server:**
   ```
   npm start
   ```
   This will start the application on `http://localhost:3000/`.

## Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```
PORT=3000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
EMAIL_HOST=your_email_host
EMAIL_PORT=your_email_port
EMAIL_USER=your_email_user
EMAIL_PASS=your_email_pass
```

## Usage

### Authentication

- **Register a new user:**
  ```http
  POST /api/auth/register
  ```

- **Login a user:**
  ```http
  POST /api/auth/login
  ```

- **Protected route example:**
  ```javascript
  const express = require('express');
  const router = express.Router();
  const auth = require('../middlewares/auth');

  router.get('/protected', auth, (req, res) => {
    res.status(200).json({ message: 'You have accessed a protected route!' });
  });

  module.exports = router;
  ```

### File Uploads

- **Upload a file using Multer and Cloudinary:**
  ```http
  POST /api/upload
  ```

### Email Sending

- **Send an email using Nodemailer:**
  ```javascript
  const nodemailer = require('nodemailer');
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: 'your_email@example.com',
    to: 'recipient_email@example.com',
    subject: 'Subject of your email',
    text: 'Content of your email',
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  ```

## Swagger Documentation

- **Setup Swagger documentation:**
  ```javascript
  const swaggerUi = require('swagger-ui-express');
  const swaggerJsDoc = require('swagger-jsdoc');
  const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Node.js Backend API',
        version: '1.0.0',
        description: 'API documentation for the Node.js backend project',
      },
      servers: [
        {
          url: 'http://localhost:3000',
        },
      ],
    },
    apis: ['./routes/*.js'],
  };

  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  ```

  Access the API documentation at `http://localhost:3000/api-docs`.

## Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to modify this README to fit the specific needs and context of your project.
