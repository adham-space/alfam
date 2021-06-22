// import request from '@/utils/request'

const state = {
  queryParams: {
    search_input: 1,
    search_text: '',
    currentPage: 1,
    perPage: 20
  },
  currentCustomer: null,
  tableData: []
}

const mutations = {
  SET_QUERY: (state, query) => {
    state.queryParams[query.key] = query.value
  },
  SET_CUSTOMER: (state, customer) => {
    state.currentCustomer = customer
  },
  SET_TABLE_DATA: (state, data) => {
    state.tableData = data
  },
  CREATE_NEWCUSTOMER: (state, customer) => {
    state.tableData.push(customer)
  },
  EDIT_CUSTOMER: (state, customer) => {
    const indx = state.tableData.findIndex(c => c.id === customer.id)
    state.tableData[indx].firstName = customer.firstName
    state.tableData[indx].lastName = customer.lastName
    state.tableData[indx].address = customer.address
    state.tableData[indx].phone = customer.phone
  },
  DELETE: (state) => {
    const indx = state.tableData.findIndex(c => c.id === state.currentCustomer.id)
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

