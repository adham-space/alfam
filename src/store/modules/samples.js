import request from '@/utils/request'
import { Message } from 'element-ui'

function getSamples(params) {
  return request({
    url: '/products/samples',
    method: 'GET',
    params
  })
}

function setSample(_id) {
  return request({
    url: '/products/do-return-sample',
    data: {
      _id
    },
    method: 'PUT'
  })
}

const state = {
  samplesTable: [],
  tableLoading: false,
  queryParams: {
    search_input: 'name',
    search_text: '',
    currentPage: 1,
    perPage: 20,
    shop: '',
    return_status: 2
  },
  total: 0
}
const mutations = {
  SET_QUERY: (state, data) => {
    state.queryParams[data.key] = data.value
  },
  SET_TABLE_LOADER: (state, status) => {
    state.tableLoading = status
  },
  SET_TABLE_DATA: (state, data) => {
    state.total = data.length
    state.samplesTable = data
    state.samplesTable.forEach(elem => {
      const totalArea = elem.products.reduce((acc, val) => acc + val.packTotalArea, 0)
      const totalNumber = elem.products.reduce((acc, val) => acc + val.item_num, 0)
      elem.totalArea = totalArea
      elem.totalNumber = totalNumber
    })
  }
}
const actions = {
  GET_SAMPLES: ({ commit, state }) => {
    return new Promise((resolve, reject) => {
      commit('SET_TABLE_LOADER', true)
      getSamples(state.queryParams).then(res => {
        commit('SET_TABLE_DATA', res.data)
        commit('SET_TABLE_LOADER', false)
        resolve()
      }).catch(err => {
        commit('SET_TABLE_LOADER', false)
        reject(err)
      })
    })
  },
  DO_RETURN: ({ commit }, data) => {
    return new Promise((resolve, reject) => {
      commit('SET_TABLE_LOADER', true)
      setSample(data).then(res => {
        Message({
          message: res.data.message,
          duration: 2500,
          type: 'success'
        })
        resolve()
      }).catch(err => {
        Message({
          message: err.response.data,
          duration: 2500,
          type: 'success'
        })
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
