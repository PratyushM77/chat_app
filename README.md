# 🧩 Real-Time Chat App (MERN + Socket.IO)

A fully functional real-time chat application developed using the MERN stack with Socket.IO integration for seamless two-way communication. The app offers real-time updates, online/offline user indicators, and a clean user interface.

---


## 🚀 Features

* 🔐 **JWT Authentication** - Secure login system with protected routes
* 💬 **Real-time Messaging** - Used Socket.IO
* 🟢 **Online/Offline User Status**
* 📜 **Chat History** - Fetch previous messages using REST APIs
* 🖼️ **Modern UI** - Built with Tailwind CSS and React
* 🔧 **Modular Structure** - Frontend and backend organized separately

---

## 🛠️ Tech Stack

**Frontend**:

* React.js
* Tailwind CSS

**Backend**:

* Node.js
* Express.js
* MongoDB
* Socket.IO
* JWT (Authentication)

---

## 📁 Folder Structure

```
chat_app/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── index.js
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── ...
├── .gitignore
└── README.md
```

---

## 🔧 Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/yourusername/chat_app.git
cd chat_app
```

### 2. Backend Setup

```bash
cd backend
npm install

# Create a .env file with the following:
PORT=3000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_jwt_secret

node --watch server.js
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### 4. Access the App

Visit `http://localhost:5173`

---


## 🙋‍♂️ Author

Made with ❤️ by **Pratyush Mishra**

* GitHub: [@PratyushM77](https://github.com/PratyushM77)

---




> *"Built during my internship phase to dive deep into real-time app architecture and WebSocket integration."*
