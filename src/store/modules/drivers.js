// import request from '@/utils/request'

const state = {
  queryParams: {
    search_input: 1,
    search_text: '',
    currentPage: 1,
    perPage: 20
  },
  currentDriver: null,
  tableData: []
}

const mutations = {
  SET_QUERY: (state, query) => {
    state.queryParams[query.key] = query.value
  },
  SET_DRIVER: (state, driver) => {
    state.currentDriver = driver
  },
  SET_TABLE_DATA: (state, data) => {
    state.tableData = data
  },
  CREATE_NEWDRIVER: (state, driver) => {
    state.tableData.push(driver)
  },
  EDIT_DRIVER: (state, driver) => {
    const indx = state.tableData.findIndex(c => c.id === driver.id)
    state.tableData[indx].firstName = driver.firstName
    state.tableData[indx].lastName = driver.lastName
    state.tableData[indx].address = driver.address
    state.tableData[indx].phone = driver.phone
    state.tableData[indx].car_num = driver.car_num
    state.tableData[indx].car_type = driver.car_type
  },
  DELETE: (state) => {
    const indx = state.tableData.findIndex(c => c.id === state.currentDriver.id)
    state.tableData.splice(indx, 1)
  }
}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

