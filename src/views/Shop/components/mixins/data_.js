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
      // tableData: [
      //   {
      //     propotion: 53.33,
      //     code: '1191A',
      //     type_name: 'Ochi',
      //     size: '30 * 90',
      //     base_price: 2,
      //     base_price_changed: 2,
      //     sum: 0,
      //     sum_kassa: 0,
      //     price_by: false,
      //     broken: false,
      //     packTotalArea: '',
      //     item_num: '',
      //     pack_num: '',
      //     over_pack_num: '',
      //     wight_of_one_packet: 28,
      //     weight_of_an_item: 4.6,
      //     weight: '',
      //     area_of_one_packet: 1.62,
      //     area_of_an_item: 0.27,
      //     number_of_items: 6
      //   },
      //   {
      //     propotion: 26.67,
      //     code: '1191D',
      //     type_name: 'Decor',
      //     size: '30 * 90',
      //     broken: false,
      //     base_price: 4,
      //     base_price_changed: 4,
      //     sum_kassa: 0,
      //     sum: 0,
      //     price_by: false,
      //     packTotalArea: '',
      //     item_num: '',
      //     pack_num: '',
      //     over_pack_num: '',
      //     wight_of_one_packet: 28,
      //     weight_of_an_item: 4.6,
      //     weight: '',
      //     area_of_one_packet: 1.62,
      //     area_of_an_item: 0.27,
      //     number_of_items: 6
      //   },
      //   {
      //     propotion: 53.33,
      //     broken: true,
      //     code: '1191BR',
      //     type_name: 'Ochi (Singan)',
      //     size: '30 * 90',
      //     base_price: 2,
      //     base_price_changed: 2,
      //     sum: 0,
      //     sum_kassa: 0,
      //     price_by: false,
      //     packTotalArea: '',
      //     item_num: '',
      //     pack_num: '',
      //     over_pack_num: '',
      //     wight_of_one_packet: 28,
      //     weight_of_an_item: 4.6,
      //     weight: '',
      //     area_of_one_packet: 1.62,
      //     area_of_an_item: 0.27,
      //     number_of_items: 6
      //   },
      //   {
      //     propotion: 20,
      //     code: '1191C',
      //     type_name: 'Pol',
      //     size: '30 * 30',
      //     base_price: 6,
      //     base_price_changed: 6,
      //     sum_kassa: 0,
      //     sum: 0,
      //     packTotalArea: '',
      //     item_num: '',
      //     pack_num: '',
      //     broken: false,
      //     price_by: false,
      //     over_pack_num: '',
      //     wight_of_one_packet: 25,
      //     weight_of_an_item: 2.28,
      //     weight: '',
      //     area_of_one_packet: 0.99,
      //     area_of_an_item: 0.09,
      //     number_of_items: 11
      //   }

      // ],

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
