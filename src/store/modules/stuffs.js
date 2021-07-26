import request from '@/utils/request'

function getStuffs(params) {
  return request({
    url: '/info/get-stuffs',
    params,
    method: 'GET'
  })
}

function updateStuff(params) {
  return request({
    url: '/info/update-stuff',
    data: params,
    method: 'PATCH'
  })
}

function deleteStuff(params) {
  return request({
    url: '/info/delete-stuff',
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
  currentStuff: null
}

const mutations = {
  SET_STUFFS: (state, data) => {
    state.tableData = data
  },
  SET_STUFF: (state, data) => {
    state.currentStuff = data
  },
  SET_TABLE_LOADER: (state) => {
    state.tblLoading = !state.tblLoading
  },
  SET_QUERY_PARAM(state, data) {
    state.queryParams[data.key] = data.value
  }
}

const actions = {
  GET_STUFFS({ commit, state }) {
    return new Promise((resolve, reject) => {
      commit('SET_TABLE_LOADER')
      getStuffs(state.queryParams).then(res => {
        commit('SET_STUFFS', res.data)
        commit('SET_TABLE_LOADER')
        resolve()
      }).catch(err => {
        commit('SET_STUFFS', [])
        commit('SET_TABLE_LOADER')
        reject(err)
      })
    })
  },
  EDIT_STUFF({ dispatch }, data) {
    return new Promise((resolve, reject) => {
      updateStuff(data).then(res => {
        resolve(res)
        dispatch('GET_STUFFS')
      }).catch(err => {
        reject(err)
      })
    })
  },
  DELETE_STUFF({ dispatch }, data) {
    return new Promise((resolve, reject) => {
      deleteStuff(data).then(res => {
        resolve()
        dispatch('GET_STUFFS')
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

