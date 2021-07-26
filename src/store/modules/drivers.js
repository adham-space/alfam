import request from '@/utils/request'

function getDrivers(params) {
  return request({
    url: '/info/get-drivers',
    params,
    method: 'GET'
  })
}

function updateDriver(params) {
  return request({
    url: '/info/update-driver',
    data: params,
    method: 'PATCH'
  })
}

function deleteDriver(params) {
  return request({
    url: '/info/delete-driver',
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
  currentDriver: null
}

const mutations = {
  SET_DRIVERS: (state, data) => {
    state.tableData = data
  },
  SET_DRIVER: (state, data) => {
    state.currentDriver = data
  },
  SET_TABLE_LOADER: (state) => {
    state.tblLoading = !state.tblLoading
  },
  SET_QUERY_PARAM(state, data) {
    state.queryParams[data.key] = data.value
  }
}

const actions = {
  GET_DRIVERS({ commit, state }) {
    return new Promise((resolve, reject) => {
      commit('SET_TABLE_LOADER')
      getDrivers(state.queryParams).then(res => {
        commit('SET_DRIVERS', res.data)
        commit('SET_TABLE_LOADER')
        resolve()
      }).catch(err => {
        commit('SET_DRIVERS', [])
        commit('SET_TABLE_LOADER')
        reject(err)
      })
    })
  },
  EDIT_DRIVER({ dispatch }, data) {
    return new Promise((resolve, reject) => {
      updateDriver(data).then(res => {
        resolve(res)
        dispatch('GET_DRIVERS')
      }).catch(err => {
        reject(err)
      })
    })
  },
  DELETE_DRIVER({ dispatch }, data) {
    return new Promise((resolve, reject) => {
      deleteDriver(data).then(res => {
        resolve()
        dispatch('GET_DRIVERS')
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

