// import request from '@/utils/request'

const state = {
  queryParams: {
    search_input: 1,
    search_text: '',
    currentPage: 1,
    perPage: 20
  },
  tableData: [{
    id: '163',
    name: 'A-B',
    owner: 'our',
    daily_avg_sales: 400,
    sellers: 5
  }, {
    id: '123',
    name: 'A4',
    owner: 'Ali bektopi',
    daily_avg_sales: 670,
    sellers: 1
  }],
  currentShop: null
}

const mutations = {
  SET_SHOP: (state, order) => {
    state.currentShop = order
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

