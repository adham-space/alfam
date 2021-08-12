import request from '@/utils/request'

export default {
  data() {
    return {
      action_of_customer: -1,
      toolBarForm: {
        currentProduct: '',
        withBorken: false,
        currentcustomer: '',
        currentStatus: '',
        currentDriver: '',
        costOfUpload: '',
        totalPrice: this.totalPrice,
        isDebt: false,
        debtDate: '',
        debtDescription: ''
      },
      rules: {

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

        totalPrice: [{
          trigger: 'change',
          validator: (rule, value, cb) => {
            if (value !== '') {
              cb()
            } else {
              cb(new Error('Enter price'))
            }
          }
        }],

        currentDriver: [{
          trigger: 'change',
          validator: (rule, value, cb) => {
            if (value) {
              cb()
            } else {
              cb(new Error('Select driver'))
            }
          }
        }],

        currentStatus: [{
          trigger: 'change',
          validator: (rule, value, cb) => {
            if (value) {
              cb()
            } else {
              cb(new Error('Select action'))
            }
          }
        }],

        currentProduct: [{
          trigger: 'change',
          validator: (rules, value, cb) => {
            if (value) {
              cb()
            } else {
              cb(new Error('Select product'))
            }
          }
        }],
        currentcustomer: [{
          trigger: 'change',
          validator: (rules, value, cb) => {
            if (value) {
              cb()
            } else {
              cb(new Error('Select customer'))
            }
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
