
const state = {
  name: '',
  types: []
}

const mutations = {
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_TYPES: (state, types) => {
    state.types = types
  },
  SET_TYPE(state, type) {
    state.types[type.index] = type.type
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
