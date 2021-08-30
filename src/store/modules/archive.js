import request from '@/utils/request'

function getAchive() {
  return request({
    url: '/products/archive',
    method: 'GET',
    params: {}
  })
}

const state = {
  archiveTable: [],
  tableLoading: false,
  current_archive: {}
}
const mutations = {
  SET_TABLE_LOADER: (state) => {
    state.tableLoading = !state.tableLoading
  },
  SET_TABLE_DATA: (state, data) => {
    state.archiveTable = data
  },
  SET_ARCHIVE: (state, data) => {
    state.current_archive = data
  }
}
const actions = {
  GET_ARCHIVE: ({ commit, state }) => {
    return new Promise((resolve, reject) => {
      state.tableLoading = true
      getAchive().then(res => {
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
