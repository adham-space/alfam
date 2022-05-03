import request from '@/utils/request'

export default {
  data() {
    return {
      action_of_customer: -1,
      toolBarForm: {
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
        time: '',
        debtDescription: ''
      },
      rules: {
        currentShop: [
          {
            trigger: 'change',
            validator: (rule, value, cb) => {
              if (this.toolBarForm.isSample) {
                if (value) {
                  cb()
                } else {
                  cb(new Error('Дўконни танланг'))
                }
              } else {
                cb()
              }
            }
          }
        ],
        debtDate: [
          {
            trigger: 'change',
            validator: (rule, value, cb) => {
              if (this.toolBarForm.isDebt) {
                if (value) {
                  cb()
                } else {
                  cb(new Error('Қарзни қайтариш курси'))
                }
              } else {
                cb()
              }
            }
          }
        ],

        totalPrice: [
          {
            trigger: 'change',
            validator: (rule, value, cb) => {
              if (!this.toolBarForm.isSample) {
                if (value !== '') {
                  cb()
                } else {
                  cb(new Error('Нархини киритинг'))
                }
              } else cb()
            }
          }
        ],

        currentDriver: [
          {
            trigger: 'change',
            validator: (rule, value, cb) => {
              if (!this.toolBarForm.isSample) {
                if (value) {
                  cb()
                } else {
                  cb(new Error('Ҳайдовчини танланг'))
                }
              } else cb()
            }
          }
        ],

        currentStatus: [
          {
            trigger: 'change',
            validator: (rule, value, cb) => {
              if (!this.toolBarForm.isSample) {
                if (value) {
                  cb()
                } else {
                  cb(new Error('Жараённи танланг'))
                }
              } else cb()
            }
          }
        ],

        currentProduct: [
          {
            trigger: 'change',
            validator: (rules, value, cb) => {
              if (!this.toolBarForm.isSample) {
                if (value) {
                  cb()
                } else {
                  cb(new Error('Махсулотни танланг'))
                }
              } else cb()
            }
          }
        ],
        currentcustomer: [
          {
            trigger: 'change',
            validator: (rules, value, cb) => {
              if (!this.toolBarForm.isSample) {
                if (value) {
                  cb()
                } else {
                  cb(new Error('Харидорни танланг'))
                }
              } else cb()
            }
          }
        ]
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
      })
        .then((res) => {
          console.log('Current order', res)
          this.action_of_customer = res.data === null ? -1 : res.data.action
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }
}
