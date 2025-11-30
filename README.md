# 📦 Real-Time Order Management + Stripe Payments + AI Chatbot (Backend)

A complete **Node.js + Express + TypeScript** backend that includes:

- 🔐 JWT Authentication

- 🛒 Order Management System

- 💳 Stripe Payment Integration (with Webhooks)

- ⚡ Real-Time Updates with Socket.io

- 🤖 AI Chatbot using OpenRouter

- 🗄️ PostgreSQL + Prisma ORM

- 🧩 Zod Validation

- 🚀 Ready for deployment on **Render**

---
## 🌐 Production URL

**Backend Live URL:**
[Order Management](https://order-task-server.onrender.com/)

---
## 📘 API Documentation
### 🔗 **Postman Published Documentation**

👉 **Public API Docs:**
[https://documenter.getpostman.com/view/46499415/2sB3dLUrbu](https://documenter.getpostman.com/view/46499415/2sB3dLUrbu)

### 📥 **Postman Collection (Importable)**

👉 **Download Postman Collection (.json)**
https://documenter.getpostman.com/view/46499415/2sB3dLUrbu?version=latest#software

### 📌 API Includes:
- Auth APIs

- Order APIs

- Payment APIs (Stripe)

- Webhook

- Chatbot AI API

- Admin APIs

---
## 🛠️ Tech Stack

| Feature | Technology |
| ------------- | ------------- |
| Backend | Node.js, Express.js, TypeScript |
| Database | PostgreSQL + Prisma ORM |
| Real-time | Socket.io |
| Payment | Stripe |
| Auth | JWT + bcrypt |
| Validation | Zod |
| AI Chatbot | OpenRouter API |
| Deployment | Vercel / Render |

---
## 📘 Features
### 🔐 Authentication
- Register user

- Login using JWT

- Admin registration

- Logout (clear cookies)

- Role-based protection

### 🛒 Order Management
- Create order

- User order history

- Admin: all orders

- Admin: update orderStatus

- Tracks:

    - paymentStatus (`PENDING`, `PAID`, `FAILED`)

    - orderStatus (`PENDING`, `PROCESSING`, `DELIVERED`)

### 💳 Stripe Payment
- Create PaymentIntent

- Return `clientSecret`

- Secure Webhook to verify payments

- Update order + send realtime update

### ⚡ Real-Time System (Socket.io)
- Realtime status messages:

    - Payment success

    - Admin status updates

- Dashboard auto refresh

### 🤖 AI Chatbot (OpenRouter)
- Product suggestions

- FAQ assistance

- Saves last 3 messages (per user)

---
## 📁 Project Structure
```
src/
│── app.ts
│── server.ts
├── config/
├── controllers/
├── errors/
├── middleware/
├── routes/
├── services/
├── types/
├── utils/
└── validations/

```
---
## ⚙️ Environment Variables (`.env`)
```
DATABASE_URL=postgresql://user:password@host:port/dbname
PORT=5000
NODE_ENV=development

JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=7d

STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxx

OPENROUTER_API_KEY=your_openrouter_key

```
---
## 🚀 Setup & Run Locally
### 1️⃣ Clone repository
```bash
git clone https://github.com/nayeem-miah/order-task-server.git
cd order-task-server

```
### 2️⃣ Install packages
```bash
npm install

```
### 3️⃣ Prisma
```bash
npx prisma generate
npx prisma migrate dev

```
### 4️⃣ Start server
```bash
npm run dev

```
---
## 🛣️ API Routes
### 👤 Authentication

| Method | Route | Description |
| ------------- | ------------- | ------------- |
| POST | /auth/register | Register user |
| POST | /auth/login | Login user |
| POST | /auth/logout | Logout user |
| POST | /auth/register-admin | Admin register |
| GET | /auth/ | Admin → all users |
| GET | /auth/:id | Admin → user details |

### 🛒 Orders

| Method | Route | Description |
| ------------- | ------------- | ------------- |
| POST | /order | Create order |
| GET | /order/my-orders | My orders |
| GET | /order | Admin → all orders |
| PATCH | /order/:id/status | Admin → update status |

### 💳 Payment

| Method | Route | Description |
| ------------- | ------------- | ------------- |
| POST | /payment/create-intent | Create Stripe paymentIntent |
| POST | /webhook | Stripe webhook |

### 🤖 Chatbot

| Method | Route | Description |
| ------------- | ------------- | ------------- |
| POST | /chatbot | Chat with AI |

---
## 🧪 Stripe Webhook (Local)
```bash
stripe listen --forward-to http://localhost:5000/webhook

```
---
## 🧰 Deployment (Render)
- Add repository
- Add env variables
- Build command:

    ```
    npm install && npm run build

    ```
- Start command:

    ```
    npm start

    ```

---
## 👤 Test Accounts

| Role | Email | Password |
| ------------- | ------------- | ------------- |
| User | nayeem@gmail.com | Nayeem123 |
| Admin | admin@gmail.com | admin123 |

---
## 📄 API Documentation (Postman)

🔗 **Postman Public Documentation**
[https://documenter.getpostman.com/view/46499415/2sB3dLUrbu](https://documenter.getpostman.com/view/46499415/2sB3dLUrbu)

📁 **Importable Collection (.json)**
https://documenter.getpostman.com/view/46499415/2sB3dLUrbu?version=latest#software

---
## 📜 License

MIT License © 2025