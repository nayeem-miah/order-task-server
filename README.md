# Real-Time Order Management + Payment System + AI Chatbot

## Project Overview

This is a **backend-only system** that provides:

* User authentication (JWT + bcrypt)
* Order creation and payment via **Stripe**
* Real-time order updates using **Socket.io**
* AI-powered chatbot for product help and FAQs (**OpenRouter free model**)
* Admin management of orders with live user notifications
* Secure payment handling via webhooks (Stripe)

---

## Tech Stack

* **Backend**: Node.js, Express.js, TypeScript
* **Database**: PostgreSQL (via Prisma ORM)
* **Realtime**: Socket.io
* **Payments**: Stripe
* **Authentication**: JWT, bcrypt
* **Validation**: Zod
* **AI Chatbot**: OpenRouter free API
* **Other Tools**: compression, cookie-parser, cors, central error handler

---


## Live Deployment

* **Production URL**: https://order-amber.vercel.app

---

## Deploy to Render

You can easily deploy this application to [Render](https://render.com) using the following steps:

### Manual Deployment:
1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set the following environment variables in your Render dashboard:
   - `DATABASE_URL`: PostgreSQL database connection string
   - `JWT_SECRET`: Secret key for JWT tokens (use a strong random string)
   - `STRIPE_SECRET_KEY`: Your Stripe secret key
   - `STRIPE_WEBHOOK_SECRET`: Your Stripe webhook secret
   - `OPENROUTER_API_KEY`: Your OpenRouter API key
4. Set the Build Command to: `npm install && npm run build`
5. Set the Start Command to: `npm start`
6. Set the Environment to: `Node`

### Using render.yaml:
If you're using the included `render.yaml` file, deployment will be automatic when you connect your repo to Render. The configuration will set up both the web service and a PostgreSQL database.

---

## Test Credentials

| Role  | Email            | Password   |
| ----- | ---------------- | ---------- |
| User  | nayeem@gmail.com | Nayeem123  |
| Admin | admin@gmail.com  | admin123   |




## Features

### 1️⃣ Authentication

* **Register**: `POST /auth/register`
* **Login**: `POST /auth/login`
* **Admin Register**: `POST /auth/register-admin`
* **Logout**: `POST /auth/logout`
* **Role-based access** with `Role.USER` and `Role.ADMIN`

### 2️⃣ Order Management

* **Endpoints**:

  * `POST /order/` → create order
  * `GET /order/my-orders` → user orders
  * `GET /order/` → admin all orders
  * `PATCH /order/:id/status` → admin update order status

### 3️⃣ Payments

* **Stripe Flow**:

  * Create payment intent → return `clientSecret`
  * Webhook verifies signature → update `paymentStatus` & `orderStatus`


**⚠️ Never trust the frontend for payment confirmation.**

### 4️⃣ Real-Time Updates

* Socket.io emits `orderUpdate` events to users when:

  * Payment succeeds
  * Admin updates order status
* Authentication via JWT token in query params

### 5️⃣ AI Chatbot (OpenRouter)

* Endpoint: `POST /chatbot`
* Supports streaming or normal HTTP response
* Keeps **last 3 messages per user** in memory or DB (bonus)
* Example response:

```json
{
  "reply": "USB Hub (Price: $25, Stock: 12) - Best value for budget-conscious shoppers."
}
```

### 6️⃣ Middleware & Validation

* Central error handler (`globalErrorHandler`)
* Role-based auth (`auth`)
* Validation using Zod schemas
* 404 handler (`notFound`)

---

## Folder Structure

```
src/
  ├─ config/           # DB, configs
  ├─ controllers/      # UserController, OrderController, PaymentController
  ├─ errors/           # Custom error classes
  ├─ middleware/       # auth, validateRequest, error handlers
  ├─ routes/           # userRouter, OrderRoute, ChatBotRoutes
  ├─ services/         # chatService, orderService, paymentService, userServices
  ├─ types/            # TypeScript interfaces
  ├─ utils/            # Helpers: JWT, calculateTotal, etc.
  ├─ validations/      # Zod schemas
  ├─ app.ts            # Express app setup
  └─ server.ts         # Server & Socket.io init
```

---

## Environment Variables (`.env.example`)

```env
DATABASE_URL=postgresql://user:password@host:port/dbname
PORT=5000
NODE_ENV=development
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=7d
STRIPE_SECRET_KEY=sk_test_...
PAYPAL_CLIENT_ID=...
PAYPAL_CLIENT_SECRET=...
OPENROUTER_API_KEY=your_openrouter_key
```

---

## Setup & Run

1. Clone the repo:

```bash
git clone https://github.com/nayeem-miah/order-task-server.git
cd order-task-server
```

2. Install dependencies:

```bash
npm install
```

3. Setup Prisma and Database:

```bash
npx prisma generate
npx prisma migrate dev
```

4. Start server:

```bash
npm run dev
```

5. Test API:

* Base URL: `http://localhost:5000/api/v1`
* Use provided Postman collection

6. Stripe Webhook (local testing):

```bash
stripe listen --forward-to localhost:5000/webhook
```

---

## API Routes Summary

| Method | Route                | Role       | Description               |
| ------ | -------------------- | ---------- | ------------------------- |
| POST   | /auth/register       | Public     | Register new user         |
| POST   | /auth/login          | Public     | Login user                |
| POST   | /auth/logout         | User/Admin | Logout user               |
| POST   | /auth/register-admin | Admin      | Register admin            |
| GET    | /auth/               | Admin      | Get all users             |
| GET    | /auth/:id            | Admin      | Get single user           |
| GET    | /order/              | Admin      | Get all orders            |
| GET    | /order/my-orders     | User       | Get own orders            |
| POST   | /order/              | User       | Create new order          |
| PATCH  | /order/:id/status    | Admin      | Update order status       |
| POST   | /chatbot             | User/Admin | Chat with AI (OpenRouter) |

---

## Webhook Testing

1. **Stripe**:

```bash
stripe listen --forward-to http://localhost:5000/webhook
```

2. **PayPal**:

* Configure sandbox webhooks to your `/webhook` endpoint
* Verify in `PaymentController.handleWebhook`


