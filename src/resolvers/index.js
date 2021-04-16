const { Query } = require("./query")
const { Mutation } = require("./mutation")
const { Subscription } = require("./subscription")
const { ClinicSearch, ClinicDetail, Run } = require("./types")

module.exports = {
  Query,
  Mutation,
  Subscription,

  ClinicSearch,
  ClinicDetail,
  Run,
}
