const Mutation = {
  createRun: async (_, { run }, { dataSources }) => {
    return await dataSources.sql.createRun(run)
  },
}

module.exports = {
  Mutation,
}
