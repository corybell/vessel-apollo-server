const { DataSource } = require("apollo-datasource")
const { createOrder, createProduct } = require("../data-access/creator")
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

    const orderCreated = await this.findOrder(newOrder.id)

    this.context.pubSub.publish(ORDER_CREATED, {
      orderCreated,
    })

    return orderCreated
  }

  async findProducts() {
    return await this.store.product.findAll({
      order: [["createdAt", "DESC"]],
    })
  }

  async findProduct(id) {
    return await this.store.product.findByPk(id)
  }

  async findOrders() {
    return await this.store.order.findAll({
      include: [this.store.lineItem],
      order: [["createdAt", "DESC"]],
    })
  }

  async findOrder(id) {
    return await this.store.order.findByPk(id, {
      include: [this.store.lineItem],
    })
  }
}

module.exports = SqlDataSource
