export default {
  data() {
    return {
      newDriver: {
        firstName: '',
        lastName: '',
        address: '',
        phone: '',
        car_type: '',
        car_num: ''
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
              return cb(new Error('First should not be empty'))
            }
          }
        }],
        lastName: [{
          trigger: 'change',
          validator: (rule, value, cb) => {
            if (value) {
              return cb()
            } else {
              return cb(new Error('Last name should not be empty'))
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
