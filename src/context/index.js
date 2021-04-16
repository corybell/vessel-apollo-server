const { PubSub } = require("apollo-server")
const pubSub = new PubSub()

const context = async ({ req, connection }) => {
  if (connection) {
    // SUBSCRIPTION REQUEST
    // context is not auto-mapped for subscriptions so copy from connection context
    const { dataSources } = connection.context
    return {
      dataSources,
      pubSub,
    }
  }

  return {
    pubSub,
  }
}

module.exports = context
