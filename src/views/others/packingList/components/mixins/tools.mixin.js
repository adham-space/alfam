import request from '@/utils/request'

export default {
  data() {
    return {
      action_of_customer: -1,
      toolBarForm: {
        belongsTo: '',
        isSample: false,
        currentProduct: '',
        withBorken: false,
        currentcustomer: '',
        currentStatus: '',
        currentDriver: '',
        costOfUpload: '',
        totalPrice: this.totalPrice,
        isDebt: false,
        currentShop: '',
        debtDate: '',
        batch_: '',
        debtDescription: ''
      },
      rules: {
        batch_: [{
          trigger: 'change',
          validator: (rule, value, cb) => {
            if (value) {
              cb()
            } else {
              cb(new Error('Enter batch'))
            }
          }
        }],
        currentShop: [{
          trigger: 'change',
          validator: (rule, value, cb) => {
            if (this.toolBarForm.isSample) {
              if (value) {
                cb()
              } else {
                cb(new Error('Select shop'))
              }
            } else {
              cb()
            }
          }
        }],
        debtDate: [{
          trigger: 'change',
          validator: (rule, value, cb) => {
            if (this.toolBarForm.isDebt) {
              if (value) {
                cb()
              } else {
                cb(new Error('Select debt date'))
              }
            } else {
              cb()
            }
          }
        }],
        batch: [{
          trigger: 'change',
          validator: (rule, value, cb) => {
            if (this.toolBarForm.isDebt) {
              if (value) {
                cb()
              } else {
                cb(new Error('Input batch'))
              }
            } else {
              cb()
            }
          }
        }],
        totalPrice: [{
          trigger: 'change',
          validator: (rule, value, cb) => {
            if (!this.toolBarForm.isSample) {
              if (value !== '') {
                cb()
              } else {
                cb(new Error('Enter price'))
              }
            } else cb()
          }
        }],

        currentDriver: [{
          trigger: 'change',
          validator: (rule, value, cb) => {
            if (!this.toolBarForm.isSample) {
              if (value) {
                cb()
              } else {
                cb(new Error('Select driver'))
              }
            } else cb()
          }
        }],
        belongsTo: [{
          trigger: 'change',
          validator: (rule, value, cb) => {
            if (!this.toolBarForm.isSample) {
              if (value) {
                cb()
              } else {
                cb(new Error('Select other'))
              }
            } else cb()
          }
        }],

        currentStatus: [{
          trigger: 'change',
          validator: (rule, value, cb) => {
            if (!this.toolBarForm.isSample) {
              if (value) {
                cb()
              } else {
                cb(new Error('Select action'))
              }
            } else cb()
          }
        }],

        currentProduct: [{
          trigger: 'change',
          validator: (rules, value, cb) => {
            if (!this.toolBarForm.isSample) {
              if (value) {
                cb()
              } else {
                cb(new Error('Select product'))
              }
            } else cb()
          }
        }],
        currentcustomer: [{
          trigger: 'change',
          validator: (rules, value, cb) => {
            if (!this.toolBarForm.isSample) {
              if (value) {
                cb()
              } else {
                cb(new Error('Select customer'))
              }
            } else cb()
          }
        }]

      }
    }
  },
  methods: {
    getLastActionOfCustomer() {
      request({
        url: '/orders/what_is_last_action_of_customer',
        params: {
          id: this.toolBarForm.currentcustomer
        }
      }).then(res => {
        console.log('Current order', res)
        this.action_of_customer = res.data === null ? -1 : res.data.action
      }).catch(err => {
        console.error(err)
      })
    }
  }
}
