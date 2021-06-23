export default {
  data() {
    return {
      newDriver: {
        stuff: '',
        username: '',
        role: ''
      },
      rules: {
        stuff: [{
          trigger: 'change',
          validator: (rule, value, cb) => {
            if (value) {
              return cb()
            } else {
              return cb(new Error('Stuff should not be empty'))
            }
          }
        }],
        username: [{
          trigger: 'change',
          validator: (rule, value, cb) => {
            if (value) {
              return cb()
            } else {
              return cb(new Error('Username should not be empty'))
            }
          }
        }],
        role: [{
          trigger: 'change',
          validator: (rule, value, cb) => {
            if (value) {
              return cb()
            } else {
              return cb(new Error('Role should not be empty'))
            }
          }
        }]
      }
    }
  }
}
