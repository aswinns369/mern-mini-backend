Community E-Commerce Platform – Backend

This is the backend API for the Community E-Commerce Platform built using Node.js, Express, and MongoDB.
It provides RESTful APIs for authentication, product management, cart operations, and orders.

---

Related Repositories

Frontend:
https://github.com/aswinns369/mern-mini-project

Backend:
https://github.com/aswinns369/mern-mini-backend

---

Features
- User authentication (JWT)
- Product CRUD operations
- Cart management
- Image upload handling
- Secure password hashing
- Email support using Nodemailer

---

Tech Stack
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcrypt
- Nodemailer
- Multer

---

Environment Variables

This project uses environment variables.
Create a .env file using .env.example.

.env.example includes:
- PORT
- MONGO_URI
- JWT_SECRET
- SMTP credentials
- CLIENT_URL

.env is NOT committed for security reasons.

---

Folder Structure

db/
middlewares/
routes/
utils/
public/
server.js
.env.example
package.json

---

Run Locally

npm install  
npm run dev  

---

Author
Aswin N S
