# 🛒 E-Commerce Platform

A production-ready full-stack e-commerce web application built with **React.js**, **Django REST Framework**, and **PostgreSQL** — designed to demonstrate end-to-end ownership across frontend, backend, and database layers.

---

## 🔍 Overview

This project replicates core functionalities of a real-world e-commerce system, including secure user authentication, a dynamic product catalog, cart and checkout management, and order tracking — all served through a RESTful API and a responsive React frontend.

---

## ✨ Features

- 🔐 **JWT Authentication** — Secure login and registration with token-based session management
- 🛍️ **Product Catalog** — Browse products with search and category-based filtering
- 🛒 **Shopping Cart** — Add, update, and remove items with persistent cart state
- 💳 **Checkout Flow** — End-to-end order placement and payment processing
- 📦 **Order Management** — Track order history and status per user
- 👤 **User Profile** — Manage account details and saved information
- 🛠️ **Admin Dashboard** — Manage products, users, and orders via Django Admin
- 📱 **Responsive Design** — Fully optimized for desktop, tablet, and mobile

---

## 🧱 Tech Stack

| Layer       | Technology                          |
|-------------|--------------------------------------|
| Frontend    | React.js, Vite, Bootstrap / Tailwind CSS |
| Backend     | Django, Django REST Framework        |
| Database    | PostgreSQL                           |
| Auth        | JWT (JSON Web Tokens)                |
| Version Control | Git & GitHub                    |

---

## 🗂️ Project Structure

```
ecommerce/
├── frontend/               # React.js application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route-level page components
│   │   ├── context/        # Cart and Auth context (state management)
│   │   └── services/       # Axios API service layer
├── backend/                # Django REST Framework application
│   ├── accounts/           # User auth, JWT endpoints
│   ├── products/           # Product catalog, search, filtering
│   ├── orders/             # Cart, checkout, order management
│   └── core/               # Settings, URLs, middleware
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites

- Python 3.10+
- Node.js 18+
- PostgreSQL

### Backend Setup

```bash
cd backend
python -m venv env
source env/bin/activate       # Windows: env\Scripts\activate
pip install -r requirements.txt
```

Configure your `.env` file:

```env
SECRET_KEY=your_secret_key
DEBUG=True
DATABASE_URL=postgresql://user:password@localhost:5432/ecommerce_db
```

Run migrations and start the server:

```bash
python manage.py migrate
python manage.py runserver
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`

---

## 🔌 API Overview

| Method | Endpoint                  | Description               |
|--------|---------------------------|---------------------------|
| POST   | `/api/auth/register/`     | Register a new user       |
| POST   | `/api/auth/login/`        | Login and receive JWT     |
| GET    | `/api/products/`          | List all products         |
| GET    | `/api/products/?search=`  | Search and filter products|
| POST   | `/api/cart/`              | Add item to cart          |
| GET    | `/api/orders/`            | Retrieve user orders      |
| POST   | `/api/checkout/`          | Place an order            |

---

## 💡 Key Technical Decisions

- **JWT over sessions** — Stateless authentication enables easy scalability and decoupled frontend/backend architecture.
- **DRF serializers** — Used for clean input validation and consistent API response shaping.
- **React Context API** — Lightweight global state for cart and auth without the overhead of Redux.
- **PostgreSQL** — Chosen for relational integrity across users, products, and orders.

---



## 🚀 Future Improvements

- [ ] Integrate Razorpay / Stripe for live payments
- [ ] Add product reviews and ratings
- [ ] Implement Redis-based caching for product queries
- [ ] Deploy on AWS / Render with CI/CD pipeline

---

## 👩‍💻 Author

**Tejal**
Full Stack Developer Intern | React.js · Django REST Framework · PostgreSQL
