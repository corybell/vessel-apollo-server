const { DataSource } = require("apollo-datasource")
const { createOrder, createProduct } = require("../data-access/creator")
const { findOrder, findOrders, findProduct, findProducts } = require("../data-access/finder")
const { ORDER_CREATED } = require("../events")

class SqlDataSource extends DataSource {
  constructor({ store }) {
    super()
    this.store = store
  }

  initialize(config) {
    this.context = config.context
  }

  async addProduct(product) {
    return await createProduct(this.store, product)
  }

  async addOrder(order) {
    const newOrder = await createOrder(this.store, order)

    const orderCreated = await findOrder(this.store, newOrder.id)

    this.context.pubSub.publish(ORDER_CREATED, {
      orderCreated,
    })

    return orderCreated
  }

  async getProducts() {
    return await findProducts(this.store)
  }

  async getProduct(id) {
    return await findProduct(this.store, id)
  }

  async getOrders() {
    return await findOrders(this.store)
  }

  async getOrder(id) {
    return await findOrder(this.store, id)
  }
}

module.exports = SqlDataSource
