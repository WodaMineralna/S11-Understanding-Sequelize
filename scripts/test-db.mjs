import pool from "../src/db/pool.js";

try {
  const [[{ now }]] = await pool.query("SELECT NOW() AS now");
  const [[{ db }]] = await pool.query("SELECT DATABASE() AS db");
  const [rows] = await pool.query("SELECT * FROM products")
  console.log("===== DB connection OK =====");
  console.log("   Database: ", db);
  console.log("   Time now: ", now);
  console.log(rows)
} catch (err) {
  console.error("===== DB connection FAILED =====");
  console.error(err.message);
  process.exit(1);
} finally {
  await pool.end();
}
