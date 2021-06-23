// import request from '@/utils/request'

const state = {
  queryParams: {
    search_input: 1,
    search_text: '',
    currentPage: 1,
    perPage: 20
  },
  tableData: [{
    id: '123',
    order_num: 'ALFAM-001',
    shop: 'Bektopi shop',
    product: 'Nilufar',
    area: 345,
    price: 2000000,
    purchase_amount: 5,
    customer: {
      firstName: 'Adham',
      lastName: 'Muhammadjonov',
      address: 'Tashkent city'
    },
    driver: {
      firstName: 'Alisher',
      lastName: 'Rahimov'
    },
    load_price: 1231,
    date: '10/23/2021'
  }],
  currentOrder: null
}

const mutations = {
  SET_ORDER: (state, order) => {
    state.currentOrder = order
  }
}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

