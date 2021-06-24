export default {
  data() {
    return {
      newUser: {
        stuffId: '',
        roleId: '',
        username: ''
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
        roleId: [{
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
