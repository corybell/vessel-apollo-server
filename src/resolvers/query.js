const Query = {
  getProducts: async (_, __, { dataSources }) => {
    return await dataSources.sql.getProducts()
  },
  getProduct: async (_, { id }, { dataSources }) => {
    return await dataSources.sql.getProduct(id)
  },

  getOrders: async (_, __, { dataSources }) => {
    return await dataSources.sql.getOrders()
  },
  getOrder: async (_, { id }, { dataSources }) => {
    return await dataSources.sql.getOrder(id)
  },
}

module.exports = {
  Query,
}
