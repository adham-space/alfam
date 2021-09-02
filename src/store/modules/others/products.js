
import request from '@/utils/request'

function getProducts(params) {
  return request({
    url: '/others/products',
    params
  })
}

function getProduct(params) {
  return request({
    url: '/others/product',
    params
  })
}

function save_order(data) {
  return request({
    url: '/others/save-order',
    method: 'POST',
    data,
    timeout: 20 * 1000
  })
}

function save_sample(data) {
  return request({
    url: '/orders/save-sample',
    method: 'POST',
    data
  })
}

const d = new Date()

const state = {
  products: [],
  product: {}, // this is for types like: Ochi To'qi
  getting_product: false,
  order: {
    other_id: '',
    batch_: '',
    product: '',
    products: [],
    order_name: `ALFAM-${1}-${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`,
    includes_brokens: false,
    action: -1,
    customer: '',
    driver: '',
    upload_cost: '',
    isSample: false,
    last_sum: '',
    is_debt: false,
    date_of_return_debt: '',
    description_of_debt: '',
    status: -1,
    shop: ''
  },
  wrong_format: false,
  wrong_format_product: ''
}

const mutations = {
  SET_PRODUCTS: (state, data) => {
    state.products = data
  },
  SET_GETTING_PRODUCT: (state) => {
    state.getting_product = !state.getting_product
  },
  SET_PRODUCT: (state, data) => {
    state.product = data
  },
  SET_ORDER: (state, order) => {
    state.order[order.key] = order.value
  },
  PREPARE_ORDER: (state) => {
    state.order.products = []
    state.wrong_format_product = ''
    state.wrong_format = false
    const current_product = state.product.product_types
    for (let i = 0; i < current_product.length; i++) {
      if (current_product[i].item_num < 0) {
        state.wrong_format = true
        state.wrong_format_product = current_product[i].type_name
        i = 1000000
        return
      }
      console.log('PREPARE PHOTO:', current_product[i])

      if (state.order.includes_brokens) {
        const pro_obj = {
          id: current_product[i]._id,
          is_broken: current_product[i].broken,
          code: current_product[i].code + (current_product[i].broken ? '-1' : ''),
          type_name: current_product[i].type_name,
          size: current_product[i].size,
          photo_path: current_product[i].photo_path,
          isReturning: current_product[i].isReturning,
          packTotalArea: current_product[i].packTotalArea,
          item_num: current_product[i].item_num,
          pack_num: current_product[i].pack_num,
          over_pack_num: current_product[i].over_pack_num,
          price_by: current_product[i].price_by,
          base_price: current_product[i].base_price,
          base_price_changed: current_product[i].base_price_changed,
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
          id: current_product[i]._id,
          is_broken: current_product[i].broken,
          code: current_product[i].code,
          type_name: current_product[i].type_name,
          size: current_product[i].size,
          photo_path: current_product[i].photo_path,
          isReturning: current_product[i].isReturning,
          packTotalArea: current_product[i].packTotalArea,
          item_num: current_product[i].item_num,
          pack_num: current_product[i].pack_num,
          over_pack_num: current_product[i].over_pack_num,
          price_by: current_product[i].price_by,
          base_price: current_product[i].base_price,
          base_price_changed: current_product[i].base_price_changed,
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
    state.product = {}
    state.order = {
      products: [],
      isSample: false,
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
      console.log('Is Sample:', state.order.isSample)
      if (!state.wrong_format) {
        if (state.order.isSample) {
          save_sample(state.order).then(res => {
            commit('RESET_ORDER')
            resolve()
          }).catch(err => {
            reject(err)
          })
        } else {
          save_order(state.order).then(res => {
            commit('RESET_ORDER')
            resolve()
          }).catch(err => {
            reject(err)
          })
        }
      } else {
        this.$notify({
          message: 'You inserted wrong value to: ' + state.wrong_format_product
        })
      }
    })
  },
  GET_PRODUCTS: async({ commit }, params) => {
    try {
      const res = await getProducts(params)
      commit('SET_PRODUCTS', res.data)
      return
    } catch (error) {
      return error
    }
  },
  GET_PRODUCT: async({ commit }, params) => {
    try {
      commit('SET_GETTING_PRODUCT')
      const res = await getProduct(params)
      commit('SET_PRODUCT', res.data)
      commit('SET_GETTING_PRODUCT')
      return
    } catch (error) {
      commit('SET_GETTING_PRODUCT')
      return error
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
