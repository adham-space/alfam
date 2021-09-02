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
    ...mapState('others/products', ['product']),
    tableDataComputed() {
      if (this.product.product_types) {
        return this.product.product_types
      }
      return this.product.product_types ? this.product.product_types.filter(item => item.broken === this.broken) : []
    }
  }
}
