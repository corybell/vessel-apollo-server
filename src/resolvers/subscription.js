const { ORDER_CREATED } = require("../events")

const Subscription = {
  orderCreated: {
    subscribe: (_, __, { pubSub }) => {
      return pubSub.asyncIterator([ORDER_CREATED])
    },
  },
}

module.exports = {
  Subscription,
}
