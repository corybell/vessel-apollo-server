const { DataSource } = require("apollo-datasource")
const { ORDER_CREATED } = require("../events")
const { Op } = require("sequelize")

class SqlDataSource extends DataSource {
  constructor({ store }) {
    super()
    this.store = store
  }

  initialize(config) {
    this.context = config.context
  }

  async createProduct({ title }) {
    const productCreated = await this.store.product.create({
      title,
    })
    return productCreated
  }

  async createOrder({ items }) {
    const order = await this.store.order.create({})

    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      await this.store.lineItem.create({
        orderId: order.id,
        ...item,
      })
    }

    const orderCreated = await this.findOrder(order.id)

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
