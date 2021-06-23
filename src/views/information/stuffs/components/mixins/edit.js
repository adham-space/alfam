export default {
  data() {
    return {
      newStuff: {
        firstName: '',
        lastName: '',
        address: '',
        phone: '',
        registered_date: ''
      },
      rules: {
        firstName: [{
          trigger: 'change',
          validator: (rule, value, cb) => {
            if (value) {
              return cb()
            } else {
              return cb(new Error('First name should not be empty'))
            }
          }
        }],
        lastName: [{
          trigger: 'change',
          validator: (rule, value, cb) => {
            if (value) {
              return cb()
            } else {
              return cb(new Error('Last should not be empty'))
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
