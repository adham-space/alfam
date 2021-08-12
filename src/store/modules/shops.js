import request from '@/utils/request'

function getShops(params) {
  return request({
    url: '/info/get-shops',
    params,
    method: 'GET'
  })
}

function updateShop(params) {
  return request({
    url: '/info/update-shop',
    data: params,
    method: 'PATCH'
  })
}

function deleteShop(params) {
  return request({
    url: '/info/delete-shop',
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
  shops: [],
  tblLoading: false,
  currentShop: null
}

const mutations = {
  SET_SHOPS: (state, data) => {
    state.tableData = data
    state.shops = data
  },
  SET_SHOP: (state, data) => {
    state.currentShop = data
  },
  SET_TABLE_LOADER: (state) => {
    state.tblLoading = !state.tblLoading
  },
  SET_QUERY_PARAM(state, data) {
    state.queryParams[data.key] = data.value
  }
}

const actions = {
  GET_SHOPS({ commit, state }) {
    return new Promise((resolve, reject) => {
      commit('SET_TABLE_LOADER')
      getShops(state.queryParams).then(res => {
        commit('SET_SHOPS', res.data)
        commit('SET_TABLE_LOADER')
        resolve()
      }).catch(err => {
        commit('SET_SHOPS', [])
        commit('SET_TABLE_LOADER')
        reject(err)
      })
    })
  },
  EDIT_SHOP({ dispatch }, data) {
    return new Promise((resolve, reject) => {
      updateShop(data).then(res => {
        resolve(res)
        dispatch('GET_SHOPS')
      }).catch(err => {
        reject(err)
      })
    })
  },
  DELETE_SHOP({ dispatch }, data) {
    return new Promise((resolve, reject) => {
      deleteShop(data).then(res => {
        resolve(res)
        dispatch('GET_SHOPS')
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

