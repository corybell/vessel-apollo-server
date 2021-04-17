## Clone this vessel

```shell
mkdir new-project
cd new-project
git clone git@github.com:corybell/vessel-apollo-server.git .
git remote rm origin
```

## Example Queries

```graphql
query {
  getProducts {
    id
    title
  }
}
```

```graphql
query {
  getOrders {
    id
    items {
      quantity
      product {
        id
        title
      }
    }
  }
}
```

## Example Mutations

```graphl
mutation {
  newProduct(product: {
    title: "fancy toaster"
  }) {
    id
    title
  }
}
```

```graphql
mutation {
  newOrder(order: { items: [{ quantity: 13, productId: 1 }] }) {
    id
    items {
      quantity
      product {
        id
        title
      }
    }
  }
}
```
