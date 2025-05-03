# JEC-SPACE

JEC-SPACE is a **mini project for the 6th semester at Jorhat Engineering College**. It is a common college space where resources can be shared efficiently among users. The platform allows students to connect, share, and access resources, making campus life more collaborative and convenient.

---

## 🌟 Features

- **User Authentication:** Secure signup, login, and OTP verification.
- **Resource Sharing:** Users can post, browse, and interact with resources.
- **Contact & Support:** Contact form for queries and complaints.
- **Admin Panel:** Manage users, products, and contact responses.
- **Responsive UI:** Modern, mobile-friendly interface using Ant Design.

---

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [React](https://react.dev/)
- [Express](https://expressjs.com/)
- [Ant Design (AntD)](https://ant.design/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/jec-space.git
   cd jec-space
   ```

2. **Install dependencies:**
   
   - Backend:
     ```bash
     cd server
     npm i
     npm run dev
     ```
   - Frontend:
     ```bash
     cd ../client
     npm i
     npm run dev
     ```

4. **Environment Variables:**

   Create a `.env` file in the `server` directory with the following:

   ```
   MAIL_USER=your_email@gmail.com
   MAIL_PASS=your_mail_api_password
   DATABASE_URL=your_mongodb_connection_string 
   JWT_SECRET=your_jwt_secret
   PORT=5000
   CLOUD_NAME=your_cloudinary_cloud_name
   API_KEY=your_cloudinary_api_key
   API_SECRET=your_cloudinary_api_secret
   FOLDER_NAME=profilepicture
   ```

5. **Run the application:**
   - Backend:
     ```bash
     cd server
     npm start
     ```
   - Frontend:
     ```bash
     cd ../client
     npm run dev
     ```

6. **Access the app:**  
   Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📁 Project Structure

```
client/
  ├── src/
  │   ├── pages/
  │   ├── components/
  │   ├── apicalls/
  │   ├── redux/
  │   ├── assets/
  │   └── App.jsx
server/
  ├── config/
  ├── controllers/
  ├── mail/
  ├── middleware/
  ├── models/
  ├── routes/
  ├── uploads/
  ├── utils/
  └── ...
```

---

## 📱 Future Work

- **Mobile App:**  
  Plans to develop a native app using React Native for seamless mobile access.

---

## 📄 License

This project is for educational purposes as part of the 6th semester mini project at Jorhat Engineering College.

---

**JEC-SPACE — A common space for JECians to connect and share resources!**
