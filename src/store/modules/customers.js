import request from '@/utils/request'

function getCustomers(params) {
  return request({
    url: '/info/get-customers',
    params,
    method: 'GET'
  })
}

function updateCustomer(params) {
  return request({
    url: '/info/update-customer',
    data: params,
    method: 'PATCH'
  })
}

function deleteCustomer(params) {
  return request({
    url: '/info/delete-customer',
    data: {
      id: params
    },
    method: 'DELETE'
  })
}

const state = {
  queryParams: {
    search_input: 1,
    search_text: '',
    currentPage: 1,
    perPage: 20
  },
  tableData: [],
  tblLoading: false,
  currentCustomer: null
}

const mutations = {
  SET_CUSTOMERS: (state, data) => {
    state.tableData = data
  },
  SET_CUSTOMER: (state, data) => {
    state.currentCustomer = data
  },
  SET_TABLE_LOADER: (state) => {
    state.tblLoading = !state.tblLoading
  },
  SET_QUERY_PARAM(state, data) {
    state.queryParams[data.key] = data.value
  }
}

const actions = {
  GET_CUSTOMERS({ commit, state }) {
    return new Promise((resolve, reject) => {
      commit('SET_TABLE_LOADER')
      getCustomers(state.queryParams).then(res => {
        commit('SET_CUSTOMERS', res.data)
        commit('SET_TABLE_LOADER')
        resolve()
      }).catch(err => {
        commit('SET_CUSTOMERS', [])
        commit('SET_TABLE_LOADER')
        reject(err)
      })
    })
  },
  EDIT_CUSTOMER({ dispatch }, data) {
    return new Promise((resolve, reject) => {
      updateCustomer(data).then(res => {
        resolve(res)
        dispatch('GET_CUSTOMERS')
      }).catch(err => {
        reject(err)
      })
    })
  },
  DELETE_CUSTOMER({ dispatch }, data) {
    return new Promise((resolve, reject) => {
      deleteCustomer(data).then(res => {
        resolve()
        dispatch('GET_CUSTOMERS')
      }).catch(err => {
        reject(err)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

