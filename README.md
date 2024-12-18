# library-management-system-api

## Live link

- [Library Management API](https://book-libray-api.vercel.app/)

This is a **Library Management API** built with **Node.js, Express, Prisma**, and **PostgreSQL**. It provides functionality to manage books, members, and borrowing records.

---

## Features

- **Books Management:**
  - Create, update, delete, and fetch book details.
- **Members Management:**
  - Create, update, delete, and fetch member details.
- **Borrowing & Returning:**
  - Borrow and return books.
  - Track overdue borrowed books.

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/library-management-api.git
   cd library-management-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file:

   - Run the following command to create the `.env` file:

     ```bash
     touch .env
     ```

   - Add the following inside `.env`:

     ```env
     DATABASE_URL=your_postgresql_connection_string
     ```

4. Generate Prisma Client:

   ```bash
   npx prisma generate
   ```

---

## Usage

Start the server:

```bash
npm start
```
