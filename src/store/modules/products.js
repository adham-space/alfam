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

function save_order(data) {
  return request({
    url: '/orders/save-order',
    method: 'POST',
    data
  })
}
const d = new Date()

const state = {
  products: [],
  product_with_types: [],
  product_with_types_table_loading: false,
  products_types: [],
  todays_product_nums: 0,
  order: {
    products: [],
    order_name: `ALFAM-${1}-${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`,
    includes_brokens: false,
    action: -1,
    customer: '',
    driver: '',
    upload_cost: '',
    last_sum: '',
    is_debt: false,
    date_of_return_debt: '',
    description_of_debt: ''
  }
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
  },
  SET_ORDER: (state, order) => {
    state.order[order.key] = order.value
  },
  PREPARE_ORDER: (state) => {
    const current_product = state.product_with_types
    for (let i = 0; i < current_product.length; i++) {
      if (state.order.includes_brokens) {
        const pro_obj = {
          is_broken: current_product[i].broken,
          code: current_product[i].code + (current_product[i].broken ? '-1' : ''),
          type_name: current_product[i].type_name,
          size: current_product[i].size,
          photo: current_product[i].photo,
          packTotalArea: current_product[i].packTotalArea,
          item_num: current_product[i].item_num,
          pack_num: current_product[i].pack_num,
          over_pack_num: current_product[i].over_pack_num,
          price_by: current_product[i].price_by,
          base_price: current_product[i].base_price,
          sum_kassa: current_product[i].sum_kassa,
          sum: current_product[i].sum,
          area_of_one_packet: current_product[i].area_of_one_packet,
          area_of_an_item: current_product[i].area_of_an_item,
          number_of_items: current_product[i].number_of_items,
          wight_of_one_packet: current_product[i].wight_of_one_packet,
          weight_of_an_item: current_product[i].weight_of_an_item
        }
        state.order.products.push(pro_obj)
      } else if (!current_product[i].broken) {
        const pro_obj = {
          is_broken: current_product[i].broken,
          code: current_product[i].code,
          type_name: current_product[i].type_name,
          size: current_product[i].size,
          photo: current_product[i].photo,
          packTotalArea: current_product[i].packTotalArea,
          item_num: current_product[i].item_num,
          pack_num: current_product[i].pack_num,
          over_pack_num: current_product[i].over_pack_num,
          price_by: current_product[i].price_by,
          base_price: current_product[i].base_price,
          sum_kassa: current_product[i].sum_kassa,
          sum: current_product[i].sum,
          area_of_one_packet: current_product[i].area_of_one_packet,
          area_of_an_item: current_product[i].area_of_an_item,
          number_of_items: current_product[i].number_of_items,
          wight_of_one_packet: current_product[i].wight_of_one_packet,
          weight_of_an_item: current_product[i].weight_of_an_item
        }
        state.order.products.push(pro_obj)
      }
    }
  },
  RESET_ORDER: (state) => {
    state.product_with_types = []
    state.order = {
      products: [],
      order_name: '',
      includes_brokens: false,
      action: -1,
      customer: '',
      driver: '',
      upload_cost: '',
      last_sum: '',
      is_debt: false,
      date_of_return_debt: '',
      description_of_debt: ''
    }
  }
}

const actions = {
  SAVE_ORDER({ commit, state }) {
    return new Promise((resolve, reject) => {
      save_order(state.order).then(res => {
        commit('RESET_ORDER')
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  GET_PRODUCT_BY_TYPE_ID({ commit }, id) {
    return new Promise((resolve, reject) => {
      commit('SET_LOADER', { key: 'product_with_types_table_loading', value: true })
      getProductById(id).then(res => {
        commit('SET_LOADER', { key: 'product_with_types_table_loading', value: false })
        commit('SET_PRODUCT', res.data)
        resolve()
      }).catch(err => {
        commit('SET_LOADER', { key: 'product_with_types_table_loading', value: false })
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
        console.log(err)
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

