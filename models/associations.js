function applyAssociations(sequelize) {
  const { Product, User, Cart, CartItem, Order, OrderItem } = sequelize.models;

  // ^ if User is deleted, all Products belonging to it will also be deleted
  Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
  User.hasMany(Product);

  Cart.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
  User.hasOne(Cart);

  Cart.belongsToMany(Product, { through: CartItem });
  Product.belongsToMany(Cart, { through: CartItem });

  Order.belongsTo(User);
  User.hasMany(Order);
  Order.belongsToMany(Product, { through: OrderItem });
  Product.belongsToMany(Order, { through: OrderItem });
}

module.exports = { applyAssociations };
