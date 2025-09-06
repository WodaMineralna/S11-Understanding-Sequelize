# Node.js Course - S11 Understanding Sequelize

Practice code for Section 11 - Understanding Sequelize, part of the course "NodeJS - The Complete Guide (MVC, REST APIs, GraphQL, Deno)" by Maximilian Schwarzmüller.

This project covers:
- Setting up Sequelize as an ORM for MySQL
- Defining models, mapping them to database tables, creating associations
- Performing CRUD operations using Sequelize
- Fetching and filtering data using query methods
- Managing secrets with environmental variables
- Running the database locally with Docker Compose

# Project type
- Independently implemented while following a Node.js course, writing all functionalities from scratch and extending the project with personal improvements.

## Tech Stack
- Node.js
- Express.js
- JavaScript (ES6+)
- Docker
- MySQL 8
- Sequelize (ORM)
- dotenv
- Nodemon
  
# How to Run

### 1) Clone the repo
```bash
git clone https://github.com/WodaMineralna/S11-Understanding-Sequelize
cd ./S11-Understanding-Sequelize
```

---

### 2) Environment variables

#### 2.1) Copy the example file
```bash
cp .env.example .env
```

#### 2.2) Adjust values if needed
```ini
DB_HOST=localhost
DB_PORT=3306
DB_USER=app_user
DB_PASSWORD=app_password
DB_NAME=academind_demo
```

---

## 3) Run the app
### Option A: Use your local MySQL (already installed)

#### 1. Make sure your MySQL server is running

#### 2. Create schema and user (if not existing) from MySQL Workbench or CLI
   ```sql
   CREATE DATABASE IF NOT EXISTS academind_demo;
   CREATE USER IF NOT EXISTS 'app_user'@'localhost' IDENTIFIED BY 'app_password';
   GRANT ALL PRIVILEGES ON academind_demo.* TO 'app_user'@'localhost';
   FLUSH PRIVILEGES;
   ```
#### 3. Run the app
   ```bash
   npm install
   npm start
   ```

---

### Option B: Run MySQL via Docker

#### 1. Make sure your Docker app is running

#### 2. Start MySQL with Docker Compose
   ```bash
   docker compose up -d
   ```
   - Creates database `academind_demo`

#### 3. Run the app
   ```bash
   npm install
   node .\app.js
   ```

#### 4. Stop the container
   ```bash
   docker compose down
   ```

#### 5. Reset database (remove data + re-run init scripts)
   ```bash
   docker compose down -v && docker compose up -d
   ```

---

## Testing DB Connection
A helper script is included to quickly test DB connectivity

```bash
npm run test:db
```

Expected output:
```

===== DB connection OK =====

--- Product data: --- [
  {
    id: 1,
    title: 'A Book',
    price: 4.99,
    description: 'This is a book',
    imageUrl: 'https://pics.clipartpng.com/Red_Book_PNG_Clipart-1063.png',
    createdAt: [date-now]
  },
  {
    id: 2,
    title: 'A Pen',
    price: 2.49,
    description: 'An awesome pen',
    imageUrl: 'https://png.pngtree.com/png-vector/20240316/ourmid/pngtree-fountain-pen-realistic-png-image_11980898.png',
    createdAt: [date-now]
  }
]
--- User data: --- [
  {
    name: 'Igor',
    email: '[randomised-number]@test.com',
    createdAt: [date-now]
  }
]
--- Cart data: --- [
  {
    id: 1,
    createdAt: [date-now],
    updatedAt: [date],
    UserId: 1
  }
]

```

---

## NPM Scripts

- **`npm start` / `node .\app.js`** → start the Node app
- **`npm run test:db`** → run DB connectivity test (`scripts/test-db.mjs`)
- **`npm run db:up`** → start MySQL container in background
- **`npm run db:down`** → stop MySQL container
- **`npm run db:reset`** → reset database (drop volume + re-init)

---

## Notes
- `.env` is ignored by Git; only `.env.example` is committed
- If port `3306` is already in use on your machine, change `DB_PORT` in your local `.env` to `3307` (or another free port)
