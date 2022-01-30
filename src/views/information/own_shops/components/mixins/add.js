export default {
  data() {
    return {
      newShop: {
        name: '',
        isOther: false
      },
      rules: {
        name: [{
          trigger: 'change',
          validator: (rule, value, cb) => {
            if (value) {
              return cb()
            } else {
              return cb(new Error('Name should not be empty'))
            }
          }
        }]
      }
    }
  }
}
