const Query = {
  getProducts: async (_, __, { dataSources }) => {
    return await dataSources.sql.findProducts()
  },
  getProduct: async (_, { id }, { dataSources }) => {
    return await dataSources.sql.findProduct(id)
  },

  getOrders: async (_, __, { dataSources }) => {
    return await dataSources.sql.findOrders()
  },
  getOrder: async (_, { id }, { dataSources }) => {
    return await dataSources.sql.findOrder(id)
  },
}

module.exports = {
  Query,
}
