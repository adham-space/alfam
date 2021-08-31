
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
  types: [],
  other_id: ''
}

const mutations = {
  SET_OTHER: (state, id) => {
    state.other_id = id
  },
  SET_NAME: (state, name) => {
    state.product_name = name
  },
  SET_TYPES: (state, types) => {
    state.types = types
  },
  SET_TYPE(state, type) {
    state.types[type.index] = type.type
  },
  SET_PACKET_INFO(state, packet) {
    const indx = state.types.findIndex(type => type.id === packet.type_id)
    state.types[indx] = {
      ...state.types[indx],
      base_price: parseFloat(packet.base_price),
      numberOfItems: parseFloat(packet.numberOfItems),
      weightOfPacket: parseFloat(packet.weightOfPacket),
      base_priceBy: parseFloat(packet.base_priceBy)
    }
    delete state.types[indx].type_id
  }
}

// base_price:"25"
// base_priceBy:false
// code:"A1191"
// currentProduct:""
// current_subType:0
// description:""
// height:30
// id:0
// numberOfItems:"6"
// photo:Object
// singan:false
// totalArea:""
// type_name:"Ochi"
// weightOfPacket:"27"
// width:90

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
