# Expense Tracker Backend

---

This repository contains the backend service for a React Native Expense Tracker application. It provides a RESTful API to manage user transactions—such as creating, retrieving, and deleting expenses or incomes—as well as generating user financial summaries. The backend is built with **Node.js**, **Express**, and **PostgreSQL** (via [Neon](https://neon.tech/)), and includes **rate limiting** and **scheduled tasks** for optimal performance and security.

---

## 🔧 Features

* **Transactions API** – Create, retrieve, and delete income/expense transactions.
* **User Summary** – Fetch total balance, income, and expenses per user.
* **Rate Limiting** – Powered by Upstash Redis to prevent abuse.
* **Database** – Uses serverless PostgreSQL (Neon).
* **Scheduled Cron Jobs** – Automated tasks executed at intervals.
* **Environment Config** – `.env`-based setup using `dotenv`.

---

## 🚀 Getting Started

### Prerequisites

* Node.js (v18 or higher)
* npm
* Neon database (or compatible PostgreSQL instance)
* Upstash Redis account (for rate limiting)

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory and populate it with:

   ```env
   PORT=5001
   DATABASE_URL=<your-neon-database-url>
   UPSTASH_REDIS_REST_URL=<your-upstash-redis-url>
   UPSTASH_REDIS_REST_TOKEN=<your-upstash-redis-token>
   API_URL=<your-cron-job-callback-url>
   ```

---

## 📦 Running the Server

### Development

```bash
npm run dev
```

### Production

```bash
npm start
```

Server starts at: `http://localhost:<PORT>` (default: `5001`)

---

## 📡 API Endpoints

### Health Check

* `GET /health` – Returns server status.

### Transactions

* `POST /api/transactions/` – Create a transaction
  **Body:**

  ```json
  {
    "user_id": "string",
    "title": "string",
    "amount": number,
    "category": "string"
  }
  ```

* `GET /api/transactions/:user_id` – Retrieve all transactions for a user.

* `DELETE /api/transactions/:id` – Delete a specific transaction.

* `GET /api/transactions/summary/:user_id` – Retrieve a user's balance, income, and expense summary.

---

## 🚫 Rate Limiting

All endpoints are protected via [Upstash Redis](https://upstash.com/), limiting requests to **100 per minute per IP**.

---

## ⏱ Scheduled Tasks

* A cron job (in `src/config/cron.js`) sends a GET request to `API_URL` every 14 minutes.
* Must be initialized manually in your app entry point (`index.js` or `server.js`).

---

## 🗃 Database

* PostgreSQL database (Neon) is automatically initialized on server startup.
* If the `transactions` table does not exist, it is created automatically.
  See: `src/config/db.js` for schema.

---

## 📜 Scripts

| Command       | Description                           |
| ------------- | ------------------------------------- |
| `npm run dev` | Start server in dev mode with nodemon |
| `npm start`   | Start server in production            |

---

## 🌍 Environment Variables

| Variable                   | Description                               |
| -------------------------- | ----------------------------------------- |
| `PORT`                     | Port the server runs on (default: `5001`) |
| `DATABASE_URL`             | PostgreSQL connection string              |
| `UPSTASH_REDIS_REST_URL`   | Upstash Redis URL                         |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis token                       |
| `API_URL`                  | Endpoint triggered by the cron job        |

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 👤 Author

**aNasiusA** *(Tee the Dev)*

---
