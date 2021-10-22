import request from '@/utils/request'
import { Message } from 'element-ui'

export default {
  data() {
    return {
      inventar: []
    }
  },
  methods: {
    async getInventarForProduct(product_id, batch) {
      this.inventar = await request({
        url: '/products/get-inventar-for-edit-archive',
        method: 'GET',
        params: {
          product_id,
          batch
        }
      }).catch(() => {
        Message({
          message: 'Error on getting inventars',
          duration: 1000,
          type: 'error'
        })
      })
      this.inventar = this.inventar.data
      console.log('Inventars', this.inventar)
    }
  }
}
