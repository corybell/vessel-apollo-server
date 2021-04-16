const { DataSource } = require("apollo-datasource")
const { RUN_CREATED } = require("../events")
const { Op } = require("sequelize")

class SqlDataSource extends DataSource {
  constructor({ store }) {
    super()
    this.store = store
  }

  initialize(config) {
    this.context = config.context
  }

  async createRun({ clinicSearch, clinicDetails }) {
    const runCreated = await this.store.run.create({})

    await this.createClinicSearch(runCreated.id, clinicSearch)

    if (clinicDetails && clinicDetails.length) {
      for (let i = 0; i < clinicDetails.length; i++) {
        await this.createClinicDetail(runCreated.id, clinicDetails[i])
      }
    }

    await runCreated.reload()

    this.context.pubSub.publish(RUN_CREATED, {
      runCreated,
    })

    return runCreated
  }

  async createClinicSearch(runId, { url, ts, results }) {
    const clinicSearchCreated = await this.store.clinicSearch.create({
      runId,
      url,
      ts,
    })

    for (let i = 0; i < results.length; i++) {
      const element = results[i]
      await this.store.clinicSearchResult.create({
        clinicSearchId: clinicSearchCreated.id,
        ...element,
      })
    }

    return clinicSearchCreated
  }

  async createClinicDetail(runId, { url, ts, name, results }) {
    const clinicDetailCreated = await this.store.clinicDetail.create({
      runId,
      url,
      ts,
      name,
    })

    for (let i = 0; i < results.length; i++) {
      const element = results[i]
      this.store.clinicDetailResult.create({
        clinicDetailId: clinicDetailCreated.id,
        ...element,
      })
    }

    return clinicDetailCreated
  }

  async latestRun() {
    return await this.store.run.findOne({
      include: [this.store.clinicSearch, this.store.clinicDetail],
      where: {
        id: {
          [Op.eq]: await this.store.run.max("id"),
        },
      },
    })
  }

  async findRuns() {
    return await this.store.run.findAll({
      include: [this.store.clinicSearch, this.store.clinicDetail],
      limit: 12,
      order: [["createdAt", "DESC"]],
    })
  }

  async findRun(id) {
    return await this.store.run.findByPk(id, {
      include: [this.store.clinicSearch, this.store.clinicDetail],
    })
  }

  async findClinicSearches() {
    return await this.store.clinicSearch.findAll({
      include: this.store.clinicSearchResult,
    })
  }

  async findClinicSearch(id) {
    return await this.store.clinicSearch.findByPk(id, {
      include: this.store.clinicSearchResult,
    })
  }

  async findClinicDetails() {
    return await this.store.clinicDetail.findAll({
      include: this.store.clinicDetailResult,
    })
  }

  async findClinicDetail(id) {
    return await this.store.clinicDetail.findByPk(id, {
      include: this.store.clinicDetailResult,
    })
  }
}

module.exports = SqlDataSource
