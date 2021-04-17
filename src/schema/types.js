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
    id: ID!
    product: Product!
    quantity: Int!
  }

  input LineItemInput {
    product: ProductInput!
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
  order  
}
