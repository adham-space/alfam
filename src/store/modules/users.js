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
    username: 'Adham2023',
    stuffId: 'Adham Muhammadjonov',
    roleId: 'admin'
  }, {
    id: '143',
    username: 'Sardor2023',
    stuffId: 'Sardor Rahimov',
    roleId: 'seller'
  }],
  currentUser: null
}

const mutations = {
  SET_USER: (state, order) => {
    state.currentUser = order
  },
  CREATE_NEWUSER: (state, user) => {
    state.tableData.push(user)
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

