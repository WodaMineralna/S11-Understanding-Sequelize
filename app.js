const path = require("path");

const express = require("express");

require("dotenv").config();

const {
  ensureSchema,
  ensureUserAndCart,
  ensureSeedProducts,
} = require("./src/db/bootstrap");

const { User } = require("./models/user");

const errorController = require("./controllers/error");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const catchErrAsync = require("./utils/catchErrAsync");

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// dummy User selector
const USER_ID = Number(process.env.USER_ID) || 1;

app.use(
  catchErrAsync(async (req, res, next) => {
    const user = await User.findByPk(USER_ID); // ! user authentication will be implemented in the future
    if (!user) {
      throw new Error(`No user found!`);
    }
    req.user = user;
    next();
  })
);

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);
app.use(errorController.getErrorPage);

// ! IIFE
// * creates tables for all Sequelize Models and defines their associations, creates User and Cart if doesn't exist
(async () => {
  try {
    await ensureSchema();
    await ensureUserAndCart(USER_ID);
    
    if (process.env.SEED_PRODUCTS === "true") {
      await ensureSeedProducts({ ownerUserId: USER_ID });
    }
  } catch (error) {
    console.log("Startup failed:", error);
    process.exit(1);
  }
})();

app.listen(3000);
