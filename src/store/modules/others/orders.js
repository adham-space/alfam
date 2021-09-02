import request from '@/utils/request'
import { Message } from 'element-ui'

function get_my_orders(params) {
  return request({
    url: '/others/get-my-orders',
    method: 'GET',
    params
  })
}

function get_order_of_inventar(params) { // used when want to know inside of inventar of orders
  return request({
    url: '/others/get-order-of-inventar',
    method: 'GET',
    params
  })
}

function close_current_order(params) {
  return request({
    url: '/others/close-current-order',
    method: 'PUT',
    data: params
  })
}

function set_order_status(data) {
  return request({
    url: '/others/set-order-status',
    method: 'PUT',
    data
  })
}

function set_order_checkout(data) {
  return request({
    url: '/others/set-order-checkout',
    method: 'PUT',
    data
  })
}

const state = {
  currentTable: 'orderInventar',
  queryParams: {
    search_input: 1,
    search_text: '',
    currentPage: 1,
    perPage: 20
  },

  orders: [],
  currentOrderHeader: {
    customer: '',
    product: '',
    order_name: ''
  },
  tableLoading: false,
  currentOrder: null
}

const mutations = {
  SET_CURRENT_TABLE: (state, table) => {
    state.currentTable = table
  },
  SET_ORDER: (state, order) => {
    state.currentOrder = order
  },

  SET_ORDERS: (state, orders) => {
    state.orders = orders
  },
  SET_CURRENT_ORDER_HEADER: (state, { customer, product, order_name }) => {
    customer = customer.firstName + ' ' + customer.lastName
    state.currentOrderHeader = {
      customer,
      product,
      order_name
    }
  }
}

const actions = {
  DO_CHECKOUT: ({ dispatch }, data) => {
    return new Promise((resolve, reject) => {
      set_order_checkout(data).then(res => {
        console.log('Getter after checkout')
        dispatch('GET_CURRENT_ORDER')
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  SET_ORDER_STATUS: ({ commit, state }, data) => {
    return new Promise((resolve, reject) => {
      set_order_status(data).then(res => {
        Message({
          message: res.data,
          type: 'success',
          duration: 4000
        })
        resolve()
      }).catch(err => {
        Message({
          message: err.response.data,
          type: 'error',
          duration: 4000
        })
        reject(err)
      })
    })
  },

  CLOSE_CURRENT_ORDER: ({ commit, state }, data) => {
    return new Promise((resolve, reject) => {
      close_current_order(data).then(res => {
        Message({
          message: res.data,
          type: 'success',
          duration: 4000
        })
        resolve()
      }).catch(err => {
        Message({
          message: err.response.data,
          type: 'errors',
          duration: 4000
        })
        reject()
      })
    })
  },
  GET_CURRENT_ORDER: ({ commit, state }) => {
    return new Promise((resolve, reject) => {
      const sendObj = {
        product_id: state.currentOrder.product_id,
        customer: state.currentOrder.customer._id,
        batch: state.currentOrder.batch,
        order_count: state.currentOrder.order_count
      }
      state.tableLoading = true
      get_order_of_inventar(sendObj).then(res => {
        state.tableLoading = false
        console.log('data:', res.data)
        commit('SET_ORDERS', res.data)
        resolve()
      }).catch(err => {
        state.tableLoading = false
        commit('SET_ORDERS', [])
        reject(err.response.data)
      })
    })
  },
  GET_ORDERS: ({ commit, state }) => {
    return new Promise((resolve, reject) => {
      state.tableLoading = true
      get_my_orders(state.queryParams).then(res => {
        commit('SET_ORDERS', res.data)
        state.tableLoading = false
        resolve()
      }).catch(err => {
        state.tableLoading = false
        commit('SET_ORDERS', [])
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

