const SqlDataSource = require("./sql")

const getDataSources = (store) => ({
  sql: new SqlDataSource({ store }),
})

module.exports = getDataSources
