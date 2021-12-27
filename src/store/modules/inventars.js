import request from '@/utils/request'

function getInventars(params) {
  return request({
    url: '/products/inventars',
    params,
    method: 'GET'
  })
}

function getArchive(params) {
  return request({
    url: '/products/archive',
    params,
    method: 'GET'
  })
}

const state = {
  queryParamsArchive: {
    search_input: 'name',
    search_text: '',
    currentPage: 1,
    perPage: 20
  },
  queryParams: {
    search_input: 'name',
    search_text: '',
    currentPage: 1,
    perPage: 20
  },
  total: 0,
  total_archive: 0,
  inventarData: [],
  archiveData: [],
  tblLoading: false,
  tblLoadingInvs: false,
  currentInventar: null,
  currentArchive: null
}

const mutations = {
  SET_INVENTARS: (state, d) => {
    const { data, metadata } = d[0]

    if (data.length && metadata.length) {
      state.inventarData = data
      state.queryParams.currentPage = metadata[0].page
      state.total = metadata[0].total
    } else {
      state.inventarData = []
      state.queryParams.currentPage = 1
      state.total = 0
    }
  },
  SET_ARCHIVES: (state, d) => {
    const { data, metadata } = d[0]
    if (data.length && metadata.length) {
      state.archiveData = data
      state.queryParamsArchive.currentPage = metadata[0].page
      state.total_archive = metadata[0].total
    } else {
      state.archiveData = []
      state.queryParamsArchive.currentPage = 1
      state.total_archive = 0
    }
  },
  SET_INVENTAR: (state, data) => {
    state.currentInventar = data
  },
  SET_ARCHIVE: (state, data) => {
    state.currentArchive = data
  },
  SET_TABLE_LOADER: (state, status) => {
    state.tblLoading = status
  },
  SET_TABLE_LOADER_INV: (state, st) => {
    state.tblLoadingInvs = st
  },
  SET_QUERY_PARAM(state, data) {
    state.queryParams[data.key] = data.value
  },
  SET_QUERY_PARAM_ARCHIVE(state, data) {
    state.queryParamsArchive[data.key] = data.value
  }
}

const actions = {
  GET_INVENTARS({ commit, state }) {
    return new Promise((resolve, reject) => {
      commit('SET_TABLE_LOADER_INV', true)
      getInventars(state.queryParams).then(res => {
        commit('SET_INVENTARS', res.data)
        commit('SET_TABLE_LOADER_INV', false)
        resolve()
      }).catch(err => {
        commit('SET_INVENTARS', [])
        commit('SET_TABLE_LOADER_INV', false)
        reject(err)
      })
    })
  },
  GET_ARCHIVE({ commit, state }) {
    return new Promise((resolve, reject) => {
      commit('SET_TABLE_LOADER', true)
      getArchive(state.queryParamsArchive).then(res => {
        commit('SET_ARCHIVES', res.data)
        commit('SET_TABLE_LOADER', false)
        resolve()
      }).catch(err => {
        commit('SET_ARCHIVES', [])
        commit('SET_TABLE_LOADER', false)
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

