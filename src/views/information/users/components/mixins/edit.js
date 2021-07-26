export default {
  data() {
    return {
      newUser: {
        stuff: '',
        role: '',
        username: '',
        password: '',
        is_active: false
      },
      rules: {
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
        }],
        stuff: [{
          trigger: 'change',
          validator: (rule, value, cb) => {
            if (value) {
              return cb()
            } else {
              return cb(new Error('Stuff should not be empty'))
            }
          }
        }]
      }
    }
  }
}
