import request from '@/utils/request'

function getProductTypes() {
  return request({
    url: '/products/get_product_types',
    method: 'GET'
  })
}

function getProducts() {
  return request({
    url: '/products/all-products',
    method: 'GET'
  })
}

function getTodaysProductInfo(params) {
  return request({
    url: '/products/todays-products',
    params
  })
}

function getProductById(id) {
    return request({
        params: {
            id
        },
        url: '/products/get-product-by-typeid'
    })
}

const state = {
  products: [],
  product_with_types: [],
  product_with_types_table_loading: false,
  products_types: [],
  todays_product_nums: 0
}

const mutations = {
  SET_PRODUCT_TYPES: (state, types) => {
    state.products_types = types
  },
  SET_PRODUCTS: (state, products) => {
    state.products = products
  },
  SET_TODAYS_PRODUCT_NUM: (state, num) => {
    state.todays_product_nums = num
  },
  SET_PRODUCT: (state, product) => {
      state.product_with_types = product
  },
  SET_LOADER: (state, loader) => {
      state[loader.key] = loader.value
  }
}

const actions = {
    GET_PRODUCT_BY_TYPE_ID({commit}, id) {
        return new Promise((resolve, reject) => {
            commit('SET_LOADER', {key: 'product_with_types_table_loading', value: true})
            getProductById(id).then(res => {
                commit('SET_LOADER', {key: 'product_with_types_table_loading', value: false})
                commit('SET_PRODUCT' , res.data)
                resolve()
            }).catch(err => {
                commit('SET_LOADER', {key: 'product_with_types_table_loading', value: false})
                reject(err)
            })
        })
    },
  GET_PRODUCT_TYPES({ commit }) {
    return new Promise((resolve, reject) => {
      getProductTypes().then(res => {
        commit('SET_PRODUCT_TYPES', res.data)
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  GET_PRODUCTS({ commit }) {
    return new Promise((resolve, reject) => {
      getProducts().then(res => {
        commit('SET_PRODUCTS', res.data)
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  GET_TODAYS_PRODUCTS({ commit }, params) {
    return new Promise((resolve, reject) => {
      getTodaysProductInfo(params).then(res => {
        // num_of_todays_product
        commit('SET_TODAYS_PRODUCT_NUM', res.data)
      }).catch(err => {
        commit('SET_TODAYS_PRODUCT_NUM', -1)
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

