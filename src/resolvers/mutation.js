const Mutation = {
  newProduct: async (_, { product }, { dataSources }) => {
    return await dataSources.sql.addProduct(product)
  },
  newOrder: async (_, { order }, { dataSources }) => {
    return await dataSources.sql.addOrder(order)
  },
}

module.exports = {
  Mutation,
}
