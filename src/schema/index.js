const { gql } = require("apollo-server")
const { product, lineItem, order } = require("./types")

const query = `
  type Query {
    getProduct(id: ID!): Product
    getProducts: [Product!]

    getOrder(id: ID!): Order
    getOrders: [Order!]
  }
`

const mutation = `
  type Mutation {
    newProduct(product: ProductInput!): Product
    newOrder(order: OrderInput!): Order
  }
`

const subscription = `
  type Subscription {
    orderCreated: Order
  }
`

const typeDefs = gql`
  ${query}
  ${mutation}
  ${subscription}

  ${product}
  ${lineItem}
  ${order}
`

module.exports = typeDefs
