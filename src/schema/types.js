const product = `
  type Product {
    id: ID!
    title: String!
  }

  input ProductInput {
    title: String!
  }
`

const lineItem = `
  type LineItem {
    product: Product!
    order: Order!
    quantity: Int!
  }

  input LineItemInput {
    productId: ID!
    quantity: Int!
  }
`

const order = `
  type Order {
    id: ID!
    items: [LineItem!]
  }

  input OrderInput {
    items: [LineItemInput!]
  }
`

module.exports = {
  product,
  lineItem,
  order,
}
