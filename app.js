const path = require("path");

const express = require("express");

require("dotenv").config();

const { ensureSchema, ensureUserAndCart } = require("./src/db/bootstrap");

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
const USER_ID = process.env.USER_ID;

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

// * creates tables for all Sequelize Models and defines their associations, creates User and Cart if doesn't exist
catchErrAsync(ensureSchema());
catchErrAsync(ensureUserAndCart(USER_ID));

app.listen(3000);
