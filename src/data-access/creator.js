async function createProduct(store, product) {
  const productCreated = await store.product.create({
    ...product
  })

  return productCreated
}

async function createOrder(store, order) {
  const orderCreated = await store.order.create({})

  for (let i = 0; i < order.items.length; i++) {
    const item = order.items[i]
    await store.lineItem.create({
      orderId: orderCreated.id,
      ...item,
    })
  }

  return orderCreated
}

module.exports = {
  createProduct,
  createOrder,
}