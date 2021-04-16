const { Sequelize } = require("sequelize")

function buildTypes(store) {
  store.clinicSearchResult = store.db.define("clinic_search_result", {
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
    name: Sequelize.STRING,
    url: Sequelize.STRING,
  })

  store.clinicSearch = store.db.define("clinic_search", {
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
    ts: Sequelize.STRING,
    url: Sequelize.STRING,
  })

  store.clinicDetailResult = store.db.define("clinic_detail_result", {
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
    time: Sequelize.STRING,
    numberAvailable: Sequelize.STRING,
  })

  store.clinicDetail = store.db.define("clinic_detail", {
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
    ts: Sequelize.STRING,
    url: Sequelize.STRING,
    name: Sequelize.STRING,
  })

  store.run = store.db.define("run", {
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  })
}

function buildRelationships(store) {
  store.clinicSearch.hasMany(store.clinicSearchResult)
  store.clinicSearchResult.belongsTo(store.clinicSearch)

  store.clinicDetail.hasMany(store.clinicDetailResult)
  store.clinicDetailResult.belongsTo(store.clinicDetail)

  store.run.hasOne(store.clinicSearch)
  store.clinicSearch.belongsTo(store.run)

  store.run.hasMany(store.clinicDetail)
  store.clinicDetail.belongsTo(store.run)
}

module.exports.createStore = () => {
  const store = {
    db: new Sequelize({
      dialect: "sqlite",
      storage: "./store.sqlite",
    }),
  }

  buildTypes(store)
  buildRelationships(store)

  store.db.sync()

  return store
}
