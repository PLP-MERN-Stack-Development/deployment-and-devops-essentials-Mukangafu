MERN Bug Tracker

A full-stack Bug Tracking System built using the MERN stack (MongoDB, Express, React, Node.js).
It allows users to report bugs, manage tasks, update statuses, and provides admin tools for oversight.

Live Deployment:
🔗 Frontend (Vercel): https://bug-eight-rho.vercel.app/

🔗 Backend (Render): https://testing-and-debugging-ensuring-mern-app-7n6u.onrender.com

📌 Features
👤 Authentication

User registration & login

JWT-based authentication

Role-based access (User, Admin)

🐞 Bug Management

Create, update, and delete bug reports

Attach priority, status, and description

Filter & sort bugs

Users only see their own bugs

🛠 Admin Features

View all users

View all bugs

Update any bug (status, assignment, notes)

Delete any bug

⚙️ Technology Stack

Frontend

React 19

Vite

Axios

TailwindCSS

React Router

Context API

Backend

Node.js / Express

MongoDB

Mongoose

JWT Authentication

Deployment

Frontend: Vercel

Backend: Render

Database: MongoDB Atlas

🧱 Project Structure
MERN-BUG-TRACKER/
│
├── client/               # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/
│   │   ├── layout/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── api.js        # Axios API client
│   │   ├── main.jsx
│   │   └── ...
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── server/               # Backend (Node + Express)
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js         # Entry point
│   ├── .env
│   └── package.json
│
└── README.md

🚀 Installation & Setup (Local Development)
1. Clone the Repository
git clone <your-repo-url>
cd MERN-BUG-TRACKER

2. Install Dependencies
Backend:
cd server
npm install

Frontend:
cd ../client
npm install

⚙️ Environment Variables
Backend (server/.env)
MONGO_URL=mongodb+srv://<your-mongo-url>
JWT_SECRET=<your-secret>
PORT=5000

Frontend (client/.env)
VITE_API_URL=http://localhost:5000

▶️ Running the App Locally

From the project root:

npm run dev


This runs both backend and frontend using concurrently.

Frontend: http://localhost:5173

Backend: http://localhost:5000

📡 API Endpoints Overview
Auth

POST /api/auth/register

POST /api/auth/login

POST /api/auth/change-password

PUT /api/auth/update/:id

DELETE /api/auth/delete/:id

User Bug Routes

GET /api/bugs

POST /api/bugs

PUT /api/bugs/:id

DELETE /api/bugs/:id

Admin

GET /api/admin/stats

GET /api/admin/bugs

GET /api/admin/users

PUT /api/admin/bugs/:id

DELETE /api/admin/bugs/:id

🖼 Screenshots

You can place images inside screenshots/ and embed them like below:

Login Page

Dashboard

Bug List

🎯 Future Improvements

File uploads for bug reports

Notifications system

Activity logs

Assign bugs to specific developers

Tags / Labels

Dark Mode

👨‍💻 Author

Daniel Muturi
If you want me to help refine this project, extend features, or build documentation — just ask!

⭐ Contributions

Feel free to open issues or submit pull requests.

📄 License

MIT License.
