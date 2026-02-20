# Books Management System

A full-stack web application for managing books with user authentication, built using Node.js, Express, MongoDB, and React.

---

## 🚀 Features

- User Authentication (Register & Login) with JWT
- Full CRUD operations for books
- Pagination & Search functionality
- Protected routes
- Clean MVC architecture

---

## 🛠️ Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (JSON Web Token)
- Bcryptjs

### Frontend
- React
- React Router
- Axios
- Context API

---

## 📋 Prerequisites

- Node.js v16+
- MongoDB (Local or MongoDB Atlas)
- Git

---

## ⚡ Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/RaajPratap/books-management-system.git
cd books-management-system
```

### 2. Backend Setup

```bash
# Install backend dependencies
npm install

# Seed the database (run once)
npm run seed
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
MONGO_URL=mongodb://localhost:27017/bookdb
PORT=8800
JWT_SECRET=your-secret-key
```

### 4. Start the Backend Server

```bash
npm start
```

Server will run on `http://localhost:8800`

### 5. Start the Frontend

```bash
cd client
npm install
npm start
```

Frontend will run on `http://localhost:3000`

---

## 🔐 Default Credentials

After seeding, you can login with:

- **Email**: dev@raj.codes
- **Password**: password1223

---

## � API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login user |
| GET | /api/auth/me | Get current user |

### Books (Protected)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/books | Get all books (with pagination & search) |
| GET | /api/books/:id | Get single book |
| POST | /api/books | Create new book |
| PUT | /api/books/:id | Update book |
| DELETE | /api/books/:id | Delete book |

### Query Parameters
- `?page=1` - Page number
- `?limit=5` - Items per page
- `?search=keyword` - Search by title or author

---

## 📁 Project Structure

```
books-management-system/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/        # AuthContext
│   │   ├── pages/         # Login, Register, Books
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── controllers/            # Business logic
├── middleware/            # Auth middleware
├── models/                # Mongoose schemas
├── routes/                # API routes
├── seed.js               # Database seeder
├── server.js             # Express server
├── package.json
└── .env
```

---

## 🧪 Testing with Postman

1. Register or login to get a JWT token
2. Copy the token from response
3. For protected routes, add header:
   - Key: `Authorization`
   - Value: `Bearer YOUR_TOKEN`

---

## 📝 License

MIT License
