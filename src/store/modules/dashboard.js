import request from '@/utils/request'

function sizes() {
  return request({
    url: '/dashboard/get-product-sizes',
    method: 'GET'
  })
}

const state = {
  sizeOptions: []
}

const mutations = {
  SET_SIZES: (state, size) => {
    state.sizeOptions = size
  }
}

const actions = {
  GET_SIZES: ({ commit }) => {
    return new Promise((resolve, reject) => {
      sizes().then(res => {
        commit('SET_SIZES', res.data)
        resolve()
      }).catch(() => {
        commit('SET_SIZES', [])
        reject()
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

