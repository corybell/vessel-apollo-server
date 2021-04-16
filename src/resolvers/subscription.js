const { RUN_CREATED } = require("../events")

const Subscription = {
  runCreated: {
    subscribe: (_, __, { pubSub }) => {
      return pubSub.asyncIterator([RUN_CREATED])
    },
  },
}

module.exports = {
  Subscription,
}
