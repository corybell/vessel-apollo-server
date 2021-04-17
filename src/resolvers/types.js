
const Order = {
  items: async (order, _, { dataSources }) => {
    return order.line_items
  }
}

const LineItem = {
  product: async (lineItem, _, { dataSources }) => {
    const res = await dataSources.sql.findProduct(lineItem.productId)
    return res
  },

  order: async (lineItem, _, { dataSources }) => {
    const res = await dataSources.sql.findOrder(lineItem.orderId)
    return res
  }
}

module.exports = {
  Order,
  LineItem,
}
