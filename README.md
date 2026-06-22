# 📚 Library Management System

A full-stack web application for managing a library — built with React on the frontend and Node.js + Express on the backend, using MySQL as the database.

---

## 🚀 Features

### Admin
- Secure login with JWT authentication
- Dashboard with real-time stats (total students, books, assigned books)
- Full CRUD for Books (Add, Edit, Delete, View)
- Full CRUD for Students (Edit, Delete, View)
- Assign and unassign books to students
- Role-based access — admin routes are protected

### Student
- Self-registration via signup page
- Personal dashboard showing borrowed books
- Browse all library books with availability status
- Profile page with account information
- Role-based access — student routes are protected

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite |
| Styling | Tailwind CSS, Material UI |
| Backend | Node.js, Express.js |
| Database | MySQL |
| ORM | Sequelize |
| Authentication | JWT (JSON Web Tokens) |
| HTTP Client | Axios |

---

## 📁 Project Structure

```
Library_Management/
├── Frontend/
│   └── src/
│       ├── api/
│       │   ├── AdminApi.js
│       │   ├── BookApi.js
│       │   └── StudentApi.js
│       ├── components/
│       │   ├── Admin/
│       │   │   ├── Dashboard.jsx
│       │   │   └── AssignBook.jsx
│       │   ├── Auth/
│       │   │   └── AuthPage.jsx
│       │   ├── Book/
│       │   │   ├── BookDashboard.jsx
│       │   │   ├── AddBook.jsx
│       │   │   ├── EditBook.jsx
│       │   │   └── ReadBook.jsx
│       │   ├── Student/
│       │   │   ├── StudentDashboard.jsx
│       │   │   ├── EditStudent.jsx
│       │   │   └── ReadStudent.jsx
│       │   ├── StudentPortal/
│       │   │   ├── StudentHome.jsx
│       │   │   ├── BrowseBooks.jsx
│       │   │   └── StudentProfile.jsx
│       │   └── ui/
│       │       ├── Sidebar.jsx
│       │       ├── Topbar.jsx
│       │       ├── StudentSidebar.jsx
│       │       ├── StudentTopbar.jsx
│       │       └── ProtectedRoute.jsx
│       ├── layout/
│       │   ├── AppLayout.jsx
│       │   └── StudentLayout.jsx
│       ├── App.jsx
│       └── main.jsx
│
└── Backend/
    ├── controllers/
    │   ├── studentController.js
    │   └── bookController.js
    ├── models/
    │   ├── index.js
    │   ├── init-models.js
    │   ├── students.js
    │   ├── books.js
    │   ├── role.js
    │   └── seeders.js
    ├── routers/
    │   └── routes.js
    └── app.js
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js v18+
- MySQL
- XAMPP (or any MySQL server)

---

### 1. Clone the repository

```bash
git clone https://github.com/Tayyab0505/library-management.git
cd library-management-system
```

---

### 2. Backend Setup

```bash
cd Backend
npm install
```

Start the backend server:

```bash
nodemon app.js
```

---

### 3. Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

Open your browser and go to:
```
http://localhost:5173
```

---

### 4. Database Setup

Create a MySQL database named `library_management`. Tables will be created automatically by Sequelize on server start.

Roles are seeded automatically — no manual SQL needed.

Insert the admin manually (only once):

```sql
INSERT INTO students (name, email, password, rollNo, roleId, status)
VALUES ('Admin', 'admin@gmail.com', 'admin123', 'ADMIN-01', 1, 1);
```

---

## 🔐 How Authentication Works

1. User visits the app and sees the login/signup page
2. On login, backend checks credentials and returns a **JWT token** with the user's role
3. Token is stored in `localStorage`
4. Every API request automatically attaches the token via an **Axios interceptor**
5. `ProtectedRoute` checks the token and role before rendering any page
6. Wrong role = redirected to correct dashboard
7. No token = redirected to login

---

## 👥 User Roles

| Role | Access |
|---|---|
| Admin | Dashboard, Students, Books, Assign Books |
| Student | My Books, Browse Books, Profile |

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/loginAdmin` | Login for both admin and student |

### Students
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/addStudent` | Register new student |
| GET | `/api/findAllStudents` | Get all active students |
| GET | `/api/findByID/:id` | Get student by ID |
| PUT | `/api/updateStudents/:id` | Update student |
| DELETE | `/api/deleteStudent/:id` | Soft delete student |
| GET | `/api/stats` | Get dashboard stats |

### Books
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/addBook` | Add new book |
| GET | `/api/findAllBooks` | Get all active books |
| GET | `/api/findByIdBook/:id` | Get book by ID |
| PUT | `/api/updateBook/:id` | Update book |
| DELETE | `/api/deleteBook/:id` | Soft delete book |
| PUT | `/api/assign` | Assign book to student |
| PUT | `/api/unAssign` | Unassign book from student |

---

## 🗄️ Database Schema

### `role` table
| Column | Type |
|---|---|
| roleId | INT (PK) |
| Name | VARCHAR |

### `students` table
| Column | Type |
|---|---|
| id | INT (PK, Auto Increment) |
| name | VARCHAR |
| email | VARCHAR (Unique) |
| password | VARCHAR |
| rollNo | VARCHAR (Unique) |
| roleId | INT (FK → role.roleId) |
| status | TINYINT (1=active, 0=deleted) |

### `books` table
| Column | Type |
|---|---|
| id | INT (PK, Auto Increment) |
| title | VARCHAR |
| author | VARCHAR |
| genre | VARCHAR |
| publishedAt | DATEONLY |
| isActive | BOOLEAN |
| assignedTo | INT (FK → students.id) |

---

## 🔮 Future Improvements

- Password hashing with bcrypt
- Book request system (student requests → admin approves)
- Due dates and overdue notifications
- Pagination on large tables
- Refresh tokens for better session management
- Search and filter improvements

---

## 👨‍💻 Author

**Your Name**
- GitHub: [Tayyab0505](https://github.com/Tayyab0505)

---
