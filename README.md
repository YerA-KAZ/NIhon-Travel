# 🗾 Nihon Travel — Full-Stack Japan Tourism Website

A complete, production-ready travel website built with **Node.js + Express + PostgreSQL** backend and **HTML5/CSS3/Vanilla JS** frontend.

---

## 📁 Project Structure

```
japan-travel/
├── backend/
│   ├── server.js              # Express app entry point
│   ├── package.json
│   ├── .env.example           # → copy to .env and fill in
│   ├── db/
│   │   ├── pool.js            # PostgreSQL connection pool
│   │   └── schema.sql         # Database schema + seed data
│   ├── middleware/
│   │   └── auth.js            # JWT auth & admin middleware
│   └── routes/
│       ├── auth.js            # POST /api/auth/register, /login, GET /me
│       ├── destinations.js    # GET /api/destinations, /:id
│       ├── favorites.js       # GET/POST /api/favorites, DELETE /:id
│       ├── history.js         # GET/POST/DELETE /api/history
│       ├── messages.js        # POST /api/messages, GET /my
│       ├── admin.js           # Admin CRUD routes
│       └── users.js           # PUT /api/users/profile, /password
└── frontend/
    ├── index.html             # Main page (all sections)
    ├── css/
    │   ├── style.css          # Main stylesheet (Japanese aesthetic)
    │   └── profile.css        # Profile & admin pages
    ├── js/
    │   └── main.js            # All frontend logic + Fetch API calls
    └── pages/
        ├── profile.html       # User dashboard (favorites, history, messages)
        └── admin.html         # Admin panel (destination CRUD, stats)
```

---

## 🚀 Quick Start

### 1. PostgreSQL Setup

```bash
# Create database
psql -U postgres
CREATE DATABASE japan_travel;
\q

# Run schema & seed
psql -U postgres -d japan_travel -f backend/db/schema.sql
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your DB credentials and JWT secret

# Start development server
npm run dev

# Or production
npm start
```

### 3. Access the Site

Open your browser: **http://localhost:5000**

---

## 🔌 REST API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | ❌ | Register new user |
| POST | `/api/auth/login` | ❌ | Login, returns JWT |
| GET | `/api/auth/me` | ✅ | Get current user |
| GET | `/api/destinations` | ❌ | List all (filter, search, paginate) |
| GET | `/api/destinations/:id` | ❌ | Get single destination |
| GET | `/api/favorites` | ✅ | Get user favorites |
| POST | `/api/favorites` | ✅ | Toggle favorite |
| DELETE | `/api/favorites/:id` | ✅ | Remove favorite |
| GET | `/api/history` | ✅ | Get viewed history |
| POST | `/api/history` | ✅ | Record a view |
| DELETE | `/api/history` | ✅ | Clear all history |
| POST | `/api/messages` | ❌ | Send contact message |
| GET | `/api/messages/my` | ✅ | Get own messages |
| PUT | `/api/users/profile` | ✅ | Update profile |
| PUT | `/api/users/password` | ✅ | Change password |
| GET | `/api/admin/stats` | 🛡️ | Dashboard stats |
| GET | `/api/admin/destinations` | 🛡️ | All destinations |
| POST | `/api/admin/destinations` | 🛡️ | Create destination |
| PUT | `/api/admin/destinations/:id` | 🛡️ | Update destination |
| DELETE | `/api/admin/destinations/:id` | 🛡️ | Delete destination |
| GET | `/api/admin/messages` | 🛡️ | All messages |
| GET | `/api/admin/users` | 🛡️ | All users |

> ✅ = JWT required | 🛡️ = Admin JWT required

---

## 🎨 Features

### Frontend
- ✅ Parallax scrolling Hero section
- ✅ AOS (Animate on Scroll) throughout
- ✅ Responsive design (mobile/tablet/desktop)
- ✅ Japanese minimalist UI with custom typography
- ✅ Dynamic destination cards with filter tabs
- ✅ Gallery with lightbox viewer
- ✅ Contact form
- ✅ Login/Register modals with JWT
- ✅ User Profile Dashboard
- ✅ Admin Panel with full CRUD

### Backend
- ✅ Node.js + Express REST API
- ✅ PostgreSQL with proper relations
- ✅ bcrypt password hashing
- ✅ JWT authentication
- ✅ Role-based access (user / admin)
- ✅ Error handling middleware

---

## 🔐 Create Admin User

After running the schema, create an admin manually:

```sql
-- In psql, after registering a user via the site:
UPDATE users SET role = 'admin' WHERE email = 'your@email.com';
```

Or hash a password and insert directly:
```bash
node -e "const b=require('bcrypt');b.hash('yourpassword',10).then(h=>console.log(h))"
```

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js 18+ |
| Framework | Express 4 |
| Database | PostgreSQL 14+ |
| Auth | JWT + bcrypt |
| Frontend | HTML5 + CSS3 + Vanilla JS |
| Animations | AOS library |
| Fonts | Shippori Mincho + Inter |
| Images | Unsplash (free) |
