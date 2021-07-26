export default {
  data() {
    return {
      newUser: {
        stuffId: '',
        role: '',
        username: '',
        password: '',
        is_active: true
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
        password: [{
          trigger: 'change',
          validator: (rule, value, cb) => {
            if (value) {
              return cb()
            } else {
              return cb(new Error('Password should not be empty'))
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
        stuffId: [{
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
