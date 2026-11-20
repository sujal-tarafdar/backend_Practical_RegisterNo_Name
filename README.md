## Project Structure

```text
backend_Practical_RegisterNo_Name/
├── file/
│   ├── task1.js       # Task 1: Library Book Management REST API
│   └── task2.js       # Task 2: Student Portal with Auth & Protected Routes
├── outputs/
│   ├── task1.png      # Task 1: API test & MongoDB document screenshot
│   ├── task2.png      # Task 2: Auth, profile & RBAC test screenshot
│   ├── task1/         # Task 1 test results (POST, GET, MongoDB)
│   └── task2/         # Task 2 test results (Registration, Login, RBAC)
├── .gitignore         # Excludes node_modules/ and local files
├── package.json       # Project dependencies & scripts
└── README.md          # Project documentation
```

---

## Setup & Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Ensure MongoDB is running locally** on port `27017` (`mongodb://127.0.0.1:27017`).

---

## Task 1: Library Book Management API (`file/task1.js`)

A REST API for managing college library books built using Node.js, Express, and Mongoose. Includes request logging and centralized error handling middleware.

- **Port:** `3000`
- **Database:** `library_db`

### Run Command:
```bash
node file/task1.js
# Or with nodemon:
npm run dev:task1
```

### Endpoints:
- `POST /books` — Create a new book (`201 Created` / `400 Bad Request` on invalid data)
- `GET /books` — Retrieve all books (`200 OK`)
- `GET /books/:id` — Retrieve a single book by ID (`200 OK` / `404 Not Found`)
- `PUT /books/:id` — Update book details (`200 OK` / `400` / `404 Not Found`)
- `DELETE /books/:id` — Delete a book (`200 OK` / `404 Not Found`)

---

## Task 2: Student Portal with Auth & Protected Routes (`file/task2.js`)

A secure student portal featuring input validation, bcrypt password hashing, 1-hour JWT session tokens, role-based access control (RBAC), and web security headers.

- **Port:** `5000`
- **Database:** `student_portal_db`
- **Security:** `helmet`, `cors`, and `express-rate-limit` (100 requests per 15 minutes)

### Run Command:
```bash
node file/task2.js
# Or with nodemon:
npm run dev:task2
```

### Endpoints:
- `POST /register` — Register student or admin with email/password validation (`201 Created` / `400`)
- `POST /login` — Verify credentials and return JWT token (`200 OK` / `400`)
- `GET /profile` — Protected route requiring `Authorization: Bearer <token>` (`200 OK` / `401 Unauthorized`)
- `GET /students` — Admin-only route (`200 OK` for admin / `403 Forbidden` for student)

---

## Output Screenshots & API Test Results

All testing screenshots are saved inside the `outputs/` folder:
- **`outputs/task1.png`**: Thunder Client requests & MongoDB database view for Task 1.
- **`outputs/task2.png`**: Thunder Client authentication, profile, and role-based access tests for Task 2.
- **`outputs/task1/`**: Detailed Task 1 test captures:
  - `adding_item_to_db(post).png`
  - `get.png`
  - `task1db.png`
- **`outputs/task2/`**: Detailed Task 2 test captures:
  - `task2.png`
