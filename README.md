# 🚀 E-Commerce Backend API

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)

A robust, fully functional RESTful API built for a modern e-commerce application. This project demonstrates backend architecture best practices including secure authentication, database modeling, secure routing, and email integrations.

## ✨ Features

- **🔐 Secure Authentication**: Full user signup and login flow with encrypted passwords using `bcrypt`.
- **🎟️ JWT Authorization**: Token-based protected routes ensuring only authorized users can access specific endpoints.
- **📧 Password Recovery System**: Integrated with `nodemailer` to send secure password reset links directly to user emails.
- **🛒 Cart Management**: Seamless add to cart, update quantity, and remove item functionality, tied to individual users.
- **📦 Product Management**: Full CRUD operations for products with advanced querying (Search, Category filtering, Price Range filtering).
- **🖼️ Image Uploads**: Handles image file uploads using `multer`.
- **🔒 Security First**: Environment variables configured securely via `dotenv` with Cross-Origin Resource Sharing (`cors`) enabled.

## 🛠️ Tech Stack

- **Runtime Environment:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB & Mongoose
- **Authentication:** JSON Web Tokens (JWT) & Bcrypt
- **File Uploads:** Multer
- **Mailing Service:** Nodemailer

## 📂 Project Structure

```text
├── db/                 # Database connection & Mongoose schemas (User, Product, Cart)
├── middlewares/        # Custom middlewares (e.g., JWT auth validation)
├── routes/             # API route definitions
│   ├── cartRoutes.js   # Cart management & checkout
│   ├── imageRoutes.js  # File upload endpoints
│   ├── productRoutes.js# Product listing, creation, and filtering
│   └── userRoutes.js   # Auth (Signup, Login, Password Reset)
├── utils/              # Helper functions (Mailer configuration)
├── public/             # Static file serving for uploaded assets
└── server.js           # Express app entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- MongoDB URI (Local or Atlas)
- Email credentials for Nodemailer

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/aswinns369/mern-mini-backend.git
   cd mern-mini-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory based on `.env.example`:
   ```env
   PORT=8000
   MONGO_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   JWT_EXPIRE=7d
   BCRYPT_SALT_ROUNDS=10
   # Email config for Nodemailer
   EMAIL_USER=<your-email>
   EMAIL_PASS=<your-app-password>
   CLIENT_URL=http://localhost:3000
   ```

4. **Run the server**
   ```bash
   # Development mode with Nodemon
   npm run dev
   ```
   The API will be available at `http://localhost:8000`.

## 🌐 API Endpoints Overview

### Users & Authentication
- `POST /users/signup` - Register a new user
- `POST /users/login` - Authenticate user & get token
- `POST /users/forgot-password` - Send password reset email
- `POST /users/reset-password` - Reset password securely

### Products
- `GET /product` - Fetch all products (Supports search, category, minPrice, maxPrice filtering)
- `GET /product/:id` - Fetch single product details
- `POST /product` - Create a new product (Protected)
- `PATCH /product/:id` - Update a product (Protected, Owner only)
- `DELETE /product/:id` - Delete a product (Protected, Owner only)

### Cart
- `GET /cart` - Get user's active cart
- `POST /cart/add` - Add item to cart
- `PATCH /cart/item/:productId` - Update item quantity
- `DELETE /cart/item/:productId` - Remove item from cart
- `POST /cart/checkout` - Process checkout and clear cart

## 👨‍💻 Author

Aswin N S  
GitHub: https://github.com/aswinns369
