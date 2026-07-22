# 📝 MERN Todo App

A full-stack Todo application built with the MERN Stack (MongoDB, Express.js, React.js, Node.js). The application includes user authentication with JWT, OTP email verification, and user-specific task management.

## 🚀 Features

- 🔐 User Signup & Login
- 📧 Email OTP Verification
- 🔄 Resend OTP with 60-second countdown
- 🔑 JWT Authentication
- 🍪 HTTP-Only Cookie Authentication
- ✅ Add Tasks
- ✏️ Update Tasks
- 🗑️ Delete Tasks
- 👤 Each user can only access their own tasks
- ⚡ React + Vite Frontend
- 🌐 REST API using Express.js
- 🗄️ MongoDB Database


## 📧 OTP Verification Flow

1. User signs up with name, email, and password.
2. A 6-digit OTP is generated and sent to the user's email.
3. The user enters the OTP to verify their email.
4. If the OTP expires or is not received, the user can resend a new OTP.
5. Resend OTP is available after a 60-second countdown.
6. After successful verification, the user is authenticated using JWT and an HTTP-only cookie.

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- Axios
- React Router DOM
- Tailwind CSS
- React Icons

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Nodemailer
- Cookie Parser
- CORS

---

## 📂 Project Structure

```
to-do-app/
│
├── frontend/
│
├── backend/
│
└── README.md
```

---

## ⚙️ Installation

### 1. Clone Repository

```bash
git clone https://github.com/ajmal53229/to-do-app
```

### 2. Install Frontend

```bash
cd frontend
npm install
```

### 3. Install Backend

```bash
cd ../backend
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file inside the `backend` folder.

```env
JWT_SECRET=your_secret_key
PORT=7000
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

---

## ▶️ Run Backend

```bash
cd backend
npm run dev
```

---

## ▶️ Run Frontend

```bash
cd frontend
npm run dev
```

---


## 📌 API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /user | Register User |
| POST | /login | Login |
| POST | /ResendOTP | Resend OTP to User Email |
| POST | /varifyOTP | Verify OTP |
| GET | /Check_auth | Check Authentication |
| GET | /Data | Get User Tasks |
| POST | /task | Add Task |
| POST | /update | Update Task |
| POST | /delete | Delete Task |

---

## 👨‍💻 Author

**Ajmal Hussain**

GitHub: https://github.com/ajmal53229

LinkedIn: www.linkedin.com/in/ajmal-hussain-9284593ba

---