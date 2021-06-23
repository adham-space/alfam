// import request from '@/utils/request'

const state = {
  queryParams: {
    search_input: 1,
    search_text: '',
    currentPage: 1,
    perPage: 20
  },
  tableData: [{
    id: '145',
    firstName: 'B4',
    lastName: 'B7',
    phone: '+998 91 914 57 37',
    address: 'Tashkent city',
    registered_date: '10/21/2021'
  }, {
    id: '123',
    firstName: 'A4',
    lastName: 'A7',
    phone: '+998 91 914 37 37',
    address: 'Kharezm city',
    registered_date: '10/21/2021'
  }],
  currentStuff: null
}

const mutations = {
  SET_STUFF: (state, order) => {
    state.currentStuff = order
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

