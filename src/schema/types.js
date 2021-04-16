const clinicDetail = `
  type ClinicDetail {
    id: ID!
    ts: String!
    url: String!
    name: String!
    results: [ClinicDetailResult]
  }

  input ClinicDetailInput {
    url: String!
    ts: String!
    name: String!
    results: [ClinicDetailResultInput]
  }
`

const clinicDetailResult = `
  input ClinicDetailResultInput {
    time: String!
    numberAvailable: String!
  }

  type ClinicDetailResult {
    id: ID!
    time: String!
    numberAvailable: String!
  }
`

const clinicSearch = `
  type ClinicSearch {
    id: ID!
    url: String!
    ts: String!
    results: [ClinicSearchResult]
  }

  input ClinicSearchInput {
    url: String!
    ts: String!
    results: [ClinicSearchResultInput]
  }
`

const clinicSearchResult = `
  type ClinicSearchResult {
    id: ID!
    name: String!
    url: String!
  }  

  input ClinicSearchResultInput {
    name: String!
    url: String!
  }
`

const run = `
  type Run {
    id: ID!
    clinicSearch: ClinicSearch!
    clinicDetails: [ClinicDetail]
  }

  input RunInput {
    clinicSearch: ClinicSearchInput!
    clinicDetails: [ClinicDetailInput]
  }
`

module.exports = {
  clinicDetail,
  clinicDetailResult,
  clinicSearch,
  clinicSearchResult,
  run,
}
