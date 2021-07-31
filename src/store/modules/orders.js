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
  tableLoading: false,
  currentOrder: null
}

const mutations = {
  SET_ORDER: (state, order) => {
    state.currentOrder = order
  },
  SET_ORDERS: (state, orders) => {
    state.orders = orders
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

