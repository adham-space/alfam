
import request from '@/utils/request'

function uploadImages(data) {
  return request({
    url: '/products/upload-images',
    method: 'POST',
    data,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

function uploadProducttype(data) {
  return request({
    url: '/products/upload-producttype',
    method: 'POST',
    data
  })
}

const state = {
  product_name: '',
  types: []
}

const mutations = {
  SET_NAME: (state, name) => {
    state.product_name = name
  },
  SET_TYPES: (state, types) => {
    state.types = types
  },
  SET_TYPE(state, type) {
    state.types[type.index] = type.type
  }
}

const actions = {
  UPLOAD_IMAGES(_, data) {
    return new Promise((resolve, reject) => {
      uploadImages(data).then(res => {
        console.log('res', res.data)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  UPLOAD_TYPES(_, data) {
    return new Promise((resolve, reject) => {
      uploadProducttype(data).then(res => {
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
