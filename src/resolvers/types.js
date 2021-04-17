const Order = {
  items: async (order, _, { dataSources }) => {
    return order.line_items
  },
}

const LineItem = {
  product: async (lineItem, _, { dataSources }) => {
    return await dataSources.sql.getProduct(lineItem.productId)
  },

  order: async (lineItem, _, { dataSources }) => {
    return await dataSources.sql.getOrder(lineItem.orderId)
  },
}

module.exports = {
  Order,
  LineItem,
}
