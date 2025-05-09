# JWT Project

This is a simple Node.js application demonstrating JWT-based user authentication using Express and MongoDB. The app includes basic user registration, login, and protected user data retrieval routes.

## 🔧 Technologies Used

- Node.js
- Express.js
- MongoDB + Mongoose
- JSON Web Token (JWT)
- bcrypt for password hashing
- dotenv for environment configuration
- Jade template engine

## 📁 Project Structure

```
JWT Interview/
├── app.js               # Main application file
├── bin/www              # Entry point for the server
├── routes/              # Express route modules
├── controller/          # Controller logic
├── middleware/          # JWT middleware
├── model/               # Mongoose models
├── views/               # Jade templates
├── public/              # Static assets
├── .env                 # Environment variables (not included)
└── package.json         # Dependencies and scripts
```

## 🚀 Setup Instructions

1. **Clone the repository**

```bash
git clone <repo-url>
cd JWT\ Interview
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory with the following:

```
JWT_SECRET=your_jwt_secret
MONGODB_URL=your_mongodb_connection_string
```

4. **Run the application**

```bash
npm start
```

The server will run on `http://localhost:3000` by default.

## 🧪 API Endpoints

### Public Routes

- `POST /user/regi` — Register a new user.
  
### Protected Routes

- `GET /user/get` — Get all users (requires JWT).
- `GET /user/get/:user_id` — Get user by ID (requires JWT).

## 🔒 JWT Authentication

All protected routes require the `Authorization` header:

```
Authorization: Bearer <your_token_here>
```

