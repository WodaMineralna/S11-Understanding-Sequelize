const path = require("path");

const express = require("express");

const sequelize = require("./src/db/pool");
const { Product } = require("./models/product");
const { User } = require("./models/user");
const { Cart } = require("./models/cart");
const { CartItem } = require("./models/cart-item");

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
const USER_ID = 2;

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

// ^ if User is deleted, all Products belonging to it will also be deleted
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
Cart.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasOne(Cart);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

// * .sync() creates tables for all Sequelize Models and defines their relations
sequelize
  // .sync({ force: true })
  .sync()
  .then(() => {
    return User.findByPk(USER_ID);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Igor", email: `${Date.now()}@test.com` }); // ! yields a Promise, so the 2nd return has to be a Promise too
    }
    return Promise.resolve(user);
  })
  .then(async (user) => {
    const cart = await user.getCart();
    if (!cart) {
      return await user.createCart();
    }
    return Promise.resolve(cart);
  })
  .then((cart) => {
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error);
  });
