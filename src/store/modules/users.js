import request from '@/utils/request'

function get_users(params) {
  return request({
    url: '/user/get_users',
    method: 'get',
    params
  })
}
function add_user(data) {
  return request({
    url: '/user/signup',
    method: 'post',
    data
  })
}

function edit_user(data) {
  return request({
    url: '/user/user_update',
    method: 'patch',
    data
  })
}

function delete_user(data) {
  return request({
    url: '/user/delete_user',
    method: 'delete',
    data: {
      id: data
    }
  })
}

const state = {
  queryParams: {
    search_input: 1,
    search_text: '',
    currentPage: 1,
    perPage: 20
  },
  tableData: [],
  tblLoading: false,
  currentUser: null
}

const mutations = {
  SET_USER: (state, user) => {
    state.currentUser = user
  },
  SET_USERS: (state, users) => {
    state.tableData = users
  },
  SET_TBL_LOADING(state, loading) {
    state.tblLoading = loading
  }
}

const actions = {
  GET_USERS({ state, commit }) {
    return new Promise((resolve, reject) => {
      commit('SET_TBL_LOADING', true)
      get_users(state.queryParams).then(res => {
        commit('SET_USERS', res.data)
        commit('SET_TBL_LOADING', false)
        resolve()
      }).catch(err => {
        commit('SET_TBL_LOADING', false)
        reject(err)
      })
    })
  },
  ADD_USER({ dispatch }, data) {
    return new Promise((resolve, reject) => {
      add_user(data).then(res => {
        dispatch('GET_USERS')
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  EDIT_USER({ dispatch }, data) {
    return new Promise((resolve, reject) => {
      edit_user(data).then(res => {
        dispatch('GET_USERS')
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  DELETE_USER({ dispatch }, data) {
    return new Promise((resolve, reject) => {
      delete_user(data).then(res => {
        dispatch('GET_USERS')
        resolve(res)
      }).catch(err => {
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

