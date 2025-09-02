// ! will be reimplemented in the future

// const db = require("../src/db/pool");

// const ALLOWED_TABLES = new Set(["products"]);

// async function loadData(table) {
//   if (!ALLOWED_TABLES.has(table)) {
//     throw new Error(`Invalid table name: ${table}`);
//   }
//   try {
//     const [rows] = await db.query("SELECT id, title, price, description, imageUrl FROM ??", [table]);
//     return rows;
//   } catch (error) {
//     throw new Error(`An error occurred while fetching db data! --- ${error}`);
//   }
// }

// module.exports = {
//   loadData,
// };
