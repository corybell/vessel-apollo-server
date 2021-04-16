const { gql } = require("apollo-server")
const {
  clinicSearch,
  clinicSearchResult,
  clinicDetail,
  clinicDetailResult,
  run,
} = require("./types")

const query = `
  type Query {
    clinicSearch(id: ID!): ClinicSearch
    clinicSearches: [ClinicSearch]

    clinicDetail(id: ID!): ClinicDetail
    clinicDetails: [ClinicDetail]

    run(id: ID!): Run
    runs: [Run]
    latestRun: Run
  }
`

const mutation = `
  type Mutation {
    createRun(run: RunInput): Run
  }
`

const subscription = `
  type Subscription {
    runCreated: Run
  }
`

const typeDefs = gql`
  ${query}
  ${mutation}
  ${subscription}

  ${clinicSearch}
  ${clinicSearchResult}

  ${clinicDetail}
  ${clinicDetailResult}

  ${run}
`

module.exports = typeDefs
