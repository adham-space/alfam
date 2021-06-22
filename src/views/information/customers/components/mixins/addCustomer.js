export default {
  data() {
    return {
      newCustomer: {
        firstName: '',
        lastName: '',
        address: '',
        phone: ''
      },
      rules: {
        phone: [{
          trigger: 'change',
          validator: (rule, value, cb) => {
            if (value) {
              return cb()
            } else {
              return cb(new Error('Phone should not be empty'))
            }
          }
        }],
        firstName: [{
          trigger: 'change',
          validator: (rule, value, cb) => {
            if (value) {
              return cb()
            } else {
              return cb(new Error('firstName should not be empty'))
            }
          }
        }],
        lastName: [{
          trigger: 'change',
          validator: (rule, value, cb) => {
            if (value) {
              return cb()
            } else {
              return cb(new Error('lastName should not be empty'))
            }
          }
        }],
        address: [{
          trigger: 'change',
          validator: (rule, value, cb) => {
            if (value) {
              return cb()
            } else {
              return cb(new Error('Address should not be empty'))
            }
          }
        }]
      }
    }
  }
}
