require("dotenv").config()

const { ApolloServer } = require("apollo-server")
const typeDefs = require("./schema")
const resolvers = require("./resolvers")
const { createStore } = require("./db")
const getDataSources = require("./data-sources")
const context = require("./context")

// creates a sequelize connection once. NOT for every request
const store = createStore()
const dataSources = getDataSources(store)

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => dataSources,
  context,
  introspection: true,
  playground: true,
  subscriptions: {
    path: "/subscriptions",
    onConnect: (_, __, ___) => {
      console.log("WEBSOCKET Connected!")
      return {
        dataSources,
      }
    },
  },
})

// Start our server if we're not in a test env.
// if we're in a test env, we'll manually start it in a test
if (process.env.NODE_ENV !== "test") {
  server.listen().then(() => {
    console.log(`
      Server is running!
      Listening on port 4000
      Query at https://studio.apollographql.com/dev
    `)
  })
}

// export all the important pieces for integration/e2e tests to use
module.exports = {
  dataSources,
  context,
  typeDefs,
  resolvers,
  ApolloServer,
  store,
  server,
}
