const ClinicSearch = {
  results: async (clinicSearch, _, { dataSources }) => {
    const res = await dataSources.sql.findClinicSearch(clinicSearch.id)
    return res.clinic_search_results
  },
}

const ClinicDetail = {
  results: async (clinicDetail, _, { dataSources }) => {
    const res = await dataSources.sql.findClinicDetail(clinicDetail.id)
    return res.clinic_detail_results
  },
}

const Run = {
  clinicSearch: async (run, _, { dataSources }) => {
    const res = await dataSources.sql.findRun(run.id)
    return res.clinic_search
  },
  clinicDetails: async (run, _, { dataSources }) => {
    const res = await dataSources.sql.findRun(run.id)
    return res.clinic_details
  },
}

module.exports = {
  ClinicDetail,
  ClinicSearch,
  Run,
}
