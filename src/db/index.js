const { Sequelize } = require("sequelize")

function buildTypes(store) {
  store.product = store.db.define("product", {
    title: Sequelize.STRING,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  })

  store.order = store.db.define("order", {
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  })

  store.lineItem = store.db.define("line_item", {
    quantity: Sequelize.INTEGER,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  })
}

function buildRelationships(store) {
  store.order.hasMany(store.lineItem)
  store.lineItem.belongsTo(store.order)

  store.product.belongsToMany(store.order, { through: store.lineItem })
  store.order.belongsToMany(store.product, { through: store.lineItem })
}

module.exports.createStore = () => {
  const store = {
    db: new Sequelize({
      dialect: "sqlite",
      storage: "./store.sqlite",
    }),
  }

  buildTypes(store)
  buildRelationships(store)

  store.db.sync()

  return store
}
