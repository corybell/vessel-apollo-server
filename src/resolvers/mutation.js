const Mutation = {
  newProduct: async (_, { product }, { dataSources }) => {
    return await dataSources.sql.createProduct(product)
  },
  newOrder: async (_, { order }, { dataSources }) => {
    return await dataSources.sql.createOrder(order)
  },
}

module.exports = {
  Mutation,
}
