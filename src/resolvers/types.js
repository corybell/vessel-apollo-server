
const Order = {
  items: async (order, _, { dataSources }) => {
    const res = await dataSources.sql.findOrder(order.id)
    return res.items
  }
}

const LineItem = {
  product: async (lineItem, _, { dataSources }) => {
    const res = await dataSources.sql.findLineItem(lineItem.id)
    return res.product
  }
}


module.exports = {
  Order,
  LineItem,
}
