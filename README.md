# HighwayDelite

# 🚀 HighwayDelite Project

This project includes a **frontend** built with `React + Vite` and a **backend** built with `Node.js + Express`. It features OTP-based login, Google OAuth authentication, and MongoDB integration.

---

## 📁 Project Structure

root/
│
├── backend/ # Express server + MongoDB
│ └── ...
│
├── frontend/ # React frontend with Vite
│ └── ...
│
└── README.md # You're here!


---

## ⚙️ Prerequisites

Ensure the following are installed on your machine:

- **Node.js** (v16 or later)
- **npm** or **yarn**
- **MongoDB** (cloud/local)
- A **Google OAuth Client** (for Google Login)

---

## 🖥️ Frontend Setup

1. **Navigate to the frontend folder**

  bash
  cd frontend


2.Install dependencies
  npm install
  # or
  yarn

3.Set up environment variables

Create a .env file in the frontend/ directory:

VITE_BACKEND_URL=http://localhost:5000
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here

4.Run the development server
  npm run dev
  # or
  yarn dev

The frontend will be running at http://localhost:5173


🛠️ Backend Setup
1.Navigate to the backend folder
  cd backend

2. Install Dependencies
  npm install
  # or
  yarn
  
3.Set up environment variables
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FRONTEND_URL=http://localhost:5173

4. Run the server 

npm run dev
# or
yarn dev


🌐 Deployment Notes
Frontend
Deployed via Netlify or Vercel

Make sure to update VITE_BACKEND_URL in your Netlify/Vercel environment settings.

Backend
Deployed via Render, Railway, or Heroku

Update FRONTEND_URL in backend .env with your deployed frontend domain.


Google OAuth Configuration
Go to Google Cloud Console

Create OAuth credentials

Set:

Authorized JavaScript origins:

arduino
Copy
Edit
http://localhost:5173
https://your-frontend.netlify.app
Authorized redirect URIs:

bash
Copy
Edit
http://localhost:5000/api/auth/google/callback
https://your-backend.render.com/api/auth/google/callback


✅ Features
OTP-based authentication

Google OAuth login

MongoDB data storage

Environment-based config

Token-based user sessions

Notes creation and deletion



