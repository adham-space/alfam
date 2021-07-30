import { mapState } from 'vuex'

export default {
  props: {
    broken: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showImageDilog: false,
      imageUrl: '',
      maxHeight: 600,
      newArea: '',
      currentNotification: null,
      currentProduct: {},
      brokenPropotionArr: [],
      totalPrice: 0
    }
  },
  computed: {
    ...mapState('products', ['product_with_types']),
    tableDataComputed() {
      if (this.broken) {
        return this.product_with_types
      }
      return this.product_with_types.filter(item => item.broken === this.broken)
    }
  }
}
