# 🏥 Bhargav Clinic — Hospital Management System

A full-stack Hospital Management System built for Bhargav Clinic, Bihta, Patna. It supports role-based access for Admins, Doctors, Receptionists, and Patients.

---

## Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | React 19, Vite, Tailwind CSS v4     |
| Backend   | Node.js, Express 5                  |
| Database  | MongoDB (Mongoose)                  |
| Auth      | JWT (JSON Web Tokens)               |

---

## Project Structure

```
HMS/
├── backend/          # Express REST API
│   └── src/
│       ├── controllers/
│       ├── models/
│       ├── routes/
│       ├── services/
│       ├── repositories/
│       ├── middleware/
│       ├── validations/
│       └── utils/
└── frontend/         # React + Vite app
    └── src/
        ├── pages/
        ├── components/
        ├── context/
        ├── layouts/
        ├── routes/
        └── services/
```

---

## Roles

- **Admin** — Manage doctors, receptionists, and patients
- **Doctor** — View and update appointments, patient records
- **Receptionist** — Book and manage appointments and patients
- **Patient** — Book appointments, view history

---

## Getting Started

### Prerequisites

- Node.js >= 18
- MongoDB cluster
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:



Start the backend:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in `frontend/`:


Start the frontend:

```bash
npm run dev
```


## Available Scripts

### Backend

| Command       | Description              |
|---------------|--------------------------|
| `npm run dev` | Start with nodemon       |
| `npm start`   | Start in production mode |

### Frontend

| Command         | Description            |
|-----------------|------------------------|
| `npm run dev`   | Start Vite dev server  |
| `npm run build` | Build for production   |
| `npm run preview` | Preview production build |

---


