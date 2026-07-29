# 🚗 Car Dealership Inventory System

A modern full-stack Car Dealership Inventory Management System built using the **MERN Stack** following **Test-Driven Development (TDD)** principles. The application helps dealerships efficiently manage vehicle inventory, authenticate users, and perform secure inventory operations through a clean and responsive interface.

---

## 📖 About the Project

Managing a car dealership manually can become difficult as the number of vehicles increases. This project provides a centralized platform where dealerships can store, manage, search, update, and monitor their vehicle inventory.

The application supports secure authentication, role-based access, inventory management, filtering, searching, and a modern user-friendly interface.

This project is being developed as part of a **TDD Kata**, meaning every feature is written by first creating tests, then implementing the functionality.

---

## ✨ Features

### Authentication
- User Registration
- User Login
- JWT Authentication
- Password Encryption using bcrypt
- Protected Routes
- Role-based Authorization (Admin/User)

### Vehicle Management
- Add New Vehicle
- Update Vehicle Details
- Delete Vehicle
- View All Vehicles
- View Vehicle by ID
- Search Vehicles
- Filter Vehicles
- Vehicle Availability Status

### Dashboard
- Total Vehicles
- Available Vehicles
- Sold Vehicles
- Inventory Statistics

### Frontend
- Responsive Design
- Modern UI
- Dark Theme
- Smooth Animations
- Mobile Friendly
- Search & Filter
- Loading States
- Error Handling

### Backend
- REST APIs
- Express.js
- MongoDB
- Mongoose ODM
- JWT Authentication
- Input Validation
- Centralized Error Handling

### Testing
- Jest
- Supertest
- Unit Testing
- Integration Testing
- TDD Workflow

---

# 🛠️ Tech Stack

## Frontend

- React
- React Router DOM
- Tailwind CSS
- Axios
- Lucide Icons

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- dotenv

---

## Testing

- Jest
- Supertest

---

## Development Tools

- Git
- GitHub
- VS Code
- Postman
- Nodemon

---

# 📂 Project Structure

```
car-dealership-inventory
│
├── backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   ├── services
│   │   ├── tests
│   │   ├── utils
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── package.json
│   └── .env
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── context
│   │   ├── hooks
│   │   ├── layouts
│   │   ├── pages
│   │   ├── services
│   │   ├── utils
│   │   └── App.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/yourusername/car-dealership-inventory.git
```

```bash
cd car-dealership-inventory
```

---

# Backend Setup

Go to backend folder

```bash
cd backend
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_secret_key

MONGO_TEST_URI=your_test_database
```

Run the backend

```bash
npm run dev
```

Backend runs on

```
http://localhost:5000
```

---

# Frontend Setup

Go to frontend folder

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Run frontend

```bash
npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

# Running Tests

Backend Tests

```bash
npm test
```

Run specific test

```bash
npm test auth.test.js
```

---

# API Endpoints

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/auth/register | Register User |
| POST | /api/auth/login | Login User |

---

## Vehicles

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /api/vehicles | Get All Vehicles |
| GET | /api/vehicles/:id | Get Vehicle |
| POST | /api/vehicles | Add Vehicle |
| PUT | /api/vehicles/:id | Update Vehicle |
| DELETE | /api/vehicles/:id | Delete Vehicle |

---

# Workflow (TDD)

Every feature follows the Red-Green-Refactor cycle.

### 🔴 Red
Write a failing test.

### 🟢 Green
Write the minimum code required to pass the test.

### 🔵 Refactor
Improve the code while keeping all tests passing.

---

# Screenshots

You can add screenshots here after completing the frontend.

```
Home Page

Dashboard

Login Page

Register Page

Vehicle Details

Add Vehicle

Inventory List
```

---

# Future Improvements

- Image Upload
- Multiple Vehicle Images
- Customer Management
- Sales Tracking
- Invoice Generation
- Booking System
- Wishlist
- Analytics Dashboard
- Email Notifications
- Export to Excel/PDF
- Pagination
- Sorting
- Cloudinary Integration
- Docker Support
- CI/CD Pipeline

---

# Learning Outcomes

This project helped in understanding:

- MERN Stack Development
- REST API Design
- Authentication using JWT
- Password Hashing
- MongoDB & Mongoose
- Express Middleware
- Test-Driven Development
- Unit Testing
- Integration Testing
- Clean Code Principles
- Git & GitHub Workflow

---

# Author

**Abhay Mall**

Final Year B.Tech (Computer Science)

Chandigarh University

---

# Contributing

Contributions are welcome.

If you'd like to improve this project:

1. Fork the repository
2. Create a new branch

```bash
git checkout -b feature-name
```

3. Commit your changes

```bash
git commit -m "Add feature"
```

4. Push to your branch

```bash
git push origin feature-name
```

5. Open a Pull Request

---

# License

This project is licensed under the MIT License.

---

## ⭐ If you found this project useful, consider giving it a Star on GitHub!