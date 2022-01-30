import request from '@/utils/request'
import { Message } from 'element-ui'

function getShops(params) {
  return request({
    url: '/info/get-shops',
    params,
    method: 'GET'
  })
}

function getShopsOthers(params) {
  return request({
    url: '/info/get-shops-other',
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

function updateShopOthers(params) {
  return request({
    url: '/info/update-shop-other',
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

function deleteShopOthers(params) {
  return request({
    url: '/info/delete-shop-other',
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
  shops_other: [],
  tblLoading: false,
  currentShop: null
}

const mutations = {
  SET_SHOPS: (state, data) => {
    state.tableData = data
    state.shops = data
  },
  SET_SHOPS_OTHER: (state, data) => {
    state.shops_other = data
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
  GET_SHOPS_OTHER({ commit, state }) {
    return new Promise((resolve, reject) => {
      commit('SET_TABLE_LOADER')
      getShopsOthers(state.queryParams).then(res => {
        commit('SET_SHOPS_OTHER', res.data)
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
  EDIT_SHOP_OTHER({ dispatch }, data) {
    return new Promise((resolve, reject) => {
      updateShopOthers(data).then(res => {
        resolve(res)
        dispatch('GET_SHOPS_OTHER')
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
        console.log(err.response)
        if (err.response.status === 409) {
          Message({
            message: err.response.data.message,
            duration: 2000,
            type: 'error'
          })
        } else {
          Message({
            message: err.response.data,
            duration: 2000,
            type: 'error'
          })
        }
        reject(err)
      })
    })
  },
  DELETE_SHOP_OTHER({ dispatch }, data) {
    return new Promise((resolve, reject) => {
      deleteShopOthers(data).then(res => {
        resolve(res)
        dispatch('GET_SHOPS_OTHER')
      }).catch(err => {
        console.log(err.response)
        if (err.response.status === 409) {
          Message({
            message: err.response.data.message,
            duration: 2000,
            type: 'error'
          })
        } else {
          Message({
            message: err.response.data,
            duration: 2000,
            type: 'error'
          })
        }
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

