const Query = {
  clinicSearches: async (_, __, { dataSources }) => {
    return await dataSources.sql.findClinicSearches()
  },
  clinicSearch: async (_, { id }, { dataSources }) => {
    return await dataSources.sql.findClinicSearch(id)
  },

  clinicDetails: async (_, __, { dataSources }) => {
    return await dataSources.sql.findClinicDetails()
  },
  clinicDetail: async (_, { id }, { dataSources }) => {
    return await dataSources.sql.findClinicDetail(id)
  },

  runs: async (_, __, { dataSources }) => {
    return await dataSources.sql.findRuns()
  },
  run: async (_, { id }, { dataSources }) => {
    return await dataSources.sql.findRun(id)
  },
  latestRun: async (_, __, { dataSources }) => {
    return await dataSources.sql.latestRun()
  },
}

module.exports = {
  Query,
}
