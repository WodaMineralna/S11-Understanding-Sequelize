const path = require("path");

const express = require("express");

const sequelize = require("./src/db/pool");

const errorController = require("./controllers/error");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);
app.use(errorController.getErrorPage);

// * .sync() creates tables for all defined Sequelize Models
sequelize
  .sync()
  .then((result) => {
    // console.log(result); // DEBUGGING
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error);
  });
