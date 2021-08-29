import request from '@/utils/request'

function getInventar() {
  return request({
    url: '/products/inventars',
    method: 'GET',
    params: {}
  })
}

const state = {
  inventarTable: [],
  tableLoading: false
}
const mutations = {
  SET_TABLE_LOADER: (state) => {
    state.tableLoading = !state.tableLoading
  },
  SET_TABLE_DATA: (state, data) => {
    state.inventarTable = data
  }
}
const actions = {
  GET_INVENTARS: ({ commit, state }) => {
    return new Promise((resolve, reject) => {
      state.tableLoading = true
      getInventar().then(res => {
        commit('SET_TABLE_DATA', res.data)
        state.tableLoading = false
        resolve()
      }).catch(err => {
        state.tableLoading = false
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
