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
   - Initializes tables - runs [`sql/init/schema.sql`](./sql/init/schema.sql) and [`sql/init/seed.sql`](./sql/init/seed.sql)

#### 3. Run the app
   ```bash
   npm install
   npm start
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
   Database:  [db-name]
   Time now:  [time-now]
[
  {
    id: 1,
    title: 'Book',
    price: 12.99,
    description: 'This is an awesome book!',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoDXr4is7-bVjWtE-TI4q-l0jHX0SPN4_4Uw&s'
  },
  {
    id: 2,
    title: 'Pen',
    price: 2.99,
    description: 'An awesome pen!',
    imageUrl: 'https://media.istockphoto.com/id/1304186549/vector/automatic-spring-ballpoint-pen-in-black-case-vector-illustration.jpg?s=612x612&w=0&k=20&c=R_yPawneqKX8J-NeiKmNXuYx36tCoPSCFEHx0Bd4dEg='
  }
]

```

---

## NPM Scripts

- **`npm start`** → start the Node app
- **`npm run test:db`** → run DB connectivity test (`scripts/test-db.mjs`)
- **`npm run db:up`** → start MySQL container in background
- **`npm run db:down`** → stop MySQL container
- **`npm run db:reset`** → reset database (drop volume + re-init)

---

## Notes
- `.env` is ignored by Git; only `.env.example` is committed
- If port `3306` is already in use on your machine, change `DB_PORT` in your local `.env` to `3307` (or another free port)
