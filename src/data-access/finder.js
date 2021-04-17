async function findProducts(store) {
  return await store.product.findAll({
    order: [["createdAt", "DESC"]],
  })
}

async function findProduct(store, id) {
  return await store.product.findByPk(id)
}

async function findOrders(store) {
  return await store.order.findAll({
    include: [store.lineItem],
    order: [["createdAt", "DESC"]],
  })
}

async function findOrder(store, id) {
  return await store.order.findByPk(id, {
    include: [store.lineItem],
  })
}

module.exports = {
  findProduct,
  findProducts,
  findOrder,
  findOrders,
}
