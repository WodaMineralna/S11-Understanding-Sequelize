import sequelize from "../src/db/pool.js";
import { fetchAll } from "../models/product.js";

try {
  await sequelize.authenticate();
  const dbData = await fetchAll();
  console.log("===== DB connection OK =====");
  console.log(dbData);
} catch (error) {
  console.error("===== DB connection FAILED =====");
  console.error(error.message);
  process.exit(1);
} finally {
  await sequelize.close();
}
