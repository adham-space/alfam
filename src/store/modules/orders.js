import request from '@/utils/request'

function get_my_orders(params) {
  return request({
    url: '/orders/get-my-orders',
    method: 'GET',
    params
  })
}

const state = {
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
    order_name: '',
  },
  tableLoading: false,
  currentOrder: null
}

const mutations = {
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

