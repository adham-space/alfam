import request from '@/utils/request'

function getInventars(params) {
  return request({
    url: '/products/inventars',
    params,
    method: 'GET'
  })
}

const state = {
  queryParams: {
    search_input: 1,
    search_text: '',
    currentPage: 1,
    perPage: 20
  },
  total: 0,
  inventarData: [],
  tblLoading: false,
  currentInventar: null
}

const mutations = {
  SET_INVENTARS: (state, d) => {
    console.log(d)
    const { data, metadata } = d[0]
    state.inventarData = data
    state.queryParams.currentPage = metadata[0].page
    state.total = metadata[0].total
  },
  SET_INVENTAR: (state, data) => {
    state.currentInventar = data
  },
  SET_TABLE_LOADER: (state) => {
    state.tblLoading = !state.tblLoading
  },
  SET_QUERY_PARAM(state, data) {
    state.queryParams[data.key] = data.value
  }
}

const actions = {
  GET_INVENTARS({ commit, state }) {
    return new Promise((resolve, reject) => {
      commit('SET_TABLE_LOADER')
      getInventars(state.queryParams).then(res => {
        commit('SET_INVENTARS', res.data)
        commit('SET_TABLE_LOADER')
        resolve()
      }).catch(err => {
        commit('SET_INVENTARS', [])
        commit('SET_TABLE_LOADER')
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

