<template>
  <div class="tools-wrapper">
    <p>List №: {{ order.order_name }}</p>

    <el-select
      v-model="currentProduct"
      style="width: 100%"
      placeholder="Choose a product"
      @change="getProducts"
    >
      <el-option
        v-for="(pr, i) in batches"
        :key="i"
        :label="
          pr._product[0].split('-')[0] + ' - ' + pr._product[0].split('-')[2]
        "
        :value="pr._id"
      />
    </el-select>
    <el-checkbox
      v-model="withBorken"
      style="margin: 1em 0"
      @change="brokenStateChanged"
    >Include borkens</el-checkbox>

    <el-select
      v-model="currentcustomer"
      class="tools-wrapper-item"
      style="width: 100%"
      placeholder="Choose a customer"
      @change="customerChanged"
    >
      <el-option
        v-for="(pr, i) in customers"
        :key="i"
        :label="pr.firstName + ' ' + pr.lastName"
        :value="pr._id"
      />
    </el-select>
    <el-select
      v-model="currentStatus"
      style="width: 100%"
      class="tools-wrapper-item"
      placeholder="Choose action"
      @change="procedureChanged"
    >
      <el-option label="Sotib olish" :value="1" />
      <el-option label="Barter (Almashtirish)" :value="2" />
      <el-option label="Sotib olish" :value="1" />
    </el-select>
    <el-select
      v-model="currentDriver"
      class="tools-wrapper-item"
      style="width: 100%"
      placeholder="Choose a Driver"
      @change="currentDriverChanged"
    >
      <el-option
        v-for="(pr, i) in drivers"
        :key="i"
        :label="pr.firstName + ' ' + pr.lastName"
        :value="pr._id"
      />
    </el-select>
    <el-input
      v-model="costOfUpload"
      type="number"
      class="tools-wrapper-item"
      placeholder="Cost to upload (so'm)"
      @change="costOfUploadChanging"
    />
    <div>
      Discount price (last price)
      <el-input
        :value="totalPrice"
        type="number"
        class="tools-wrapper-item"
        placeholder="Discount price"
        @input="changebase_price"
      />
    </div>
    <div style="margin-bottom: 1em">
      <el-switch
        v-model="isDebt"
        active-color="#13ce66"
        inactive-color=""
        @change="setIsDebt"
      />
      Is debt?
    </div>
    <el-date-picker
      v-if="isDebt"
      v-model="debtDate"
      type="date"
      format="yyyy-MM-dd"
      value-format="timestamp"
      style="margin-bottom: 1em"
      placeholder="Debt back date"
      @change="setReturnDebtDate"
    />
    <el-input
      v-if="isDebt"
      v-model="debtDescription"
      style="margin-bottom: 1em"
      type="textarea"
      rows="4"
      @change="setDebtDescription"
    />
    <div class="order-action-btn">
      <el-button
        type="primary"
        :disabled="order_saving"
        :loading="order_saving"
        @click="saveOrder()"
      >Save</el-button>
      <el-button type="danger" @click="cancelOrder()">Cancel</el-button>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapActions, mapState } from 'vuex'
import request from '@/utils/request'
import { Message } from 'element-ui'
import tools_mixin from './mixins/tools.mixin'
export default {
  mixins: [tools_mixin],
  props: {
    totalPrice: {
      type: [Number, String],
      default: 0
    }
  },
  data: () => ({
    withBorken: false,
    currentProduct: '',
    currentStatus: '',
    currentcustomer: '',
    costOfUpload: '',
    order_saving: false,
    currentDriver: '',
    discountPrice: 0,
    debtDescription: '',
    debtDate: '',
    isDebt: false,
    batches: [],
    Procedures: [
      {
        label: '',
        value: 1
      },
      {
        label: '',
        value: 2
      },
      {
        label: 'Qaytarib berish',
        value: 3
      }
    ]
  }),
  computed: {
    ...mapState('products', ['products_types', 'product', 'order']),
    drivers() {
      return this.$store.state.drivers.tableData
    },
    customers() {
      return this.$store.state.customers.tableData
    }
  },
  mounted() {
    this.getOrderCount()
    this.GET_PRODUCT_TYPES()
    this.GET_CUSTOMERS()
    this.GET_DRIVERS()
    request({
      url: '/products/get-batches',
      method: 'GET'
    })
      .then((res) => {
        this.batches = res.data
      })
      .catch((err) => {
        console.log(err)
      })
  },
  methods: {
    ...mapActions('products', [
      'GET_PRODUCT_TYPES',
      'GET_PRODUCT_BY_TYPE_ID',
      'SAVE_ORDER'
    ]),
    ...mapActions('customers', ['GET_CUSTOMERS']),
    ...mapActions('drivers', ['GET_DRIVERS']),
    ...mapMutations('products', ['SET_ORDER', 'PREPARE_ORDER']),

    getOrderCount() {
      request({
        url: '/orders/get-order-count-for-today'
      })
        .then((res) => {
          console.log('orders', res.data)
          const d = new Date()
          this.SET_ORDER({
            key: 'order_name',
            value: `ALFAM-${res.data[0].count + 1}-${d.getDate()}/${
              d.getMonth() + 1
            }/${d.getFullYear()}`
          })
        })
        .catch((err) => {
          console.log('orders', err)
        })
    },

    saveOrder() {
      // first need to be check whether everything is ok
      this.order_saving = true
      this.PREPARE_ORDER()
      setTimeout(() => {
        this.SAVE_ORDER()
          .then(() => {
            this.order_saving = false
            Message({
              message: 'Order successfully saved',
              type: 'success',
              duration: 3000
            })
            this.reset_all()
            this.$emit('closeNotification')
            this.getOrderCount()
          })
          .catch((err) => {
            this.order_saving = false
            Message({
              message: err.response.data,
              type: 'error',
              duration: 3000
            })
          })
      }, 200)
    },
    setIsDebt(val) {
      this.SET_ORDER({ key: 'is_debt', value: val })
    },
    getProducts(val) {
      let product = this.batches.find(batch => batch._id === val)._product[0]
      product = product.split('-')[0] + ' - ' + product.split('-')[2]
      this.SET_ORDER({ key: 'product', value: product })
      this.GET_PRODUCT_BY_TYPE_ID(val)
    },
    // base_priceChangedOneOfItem(val) { // this will be called when base price of one item is changed
    //   this.discountPrice = val
    // },
    changebase_price(val) {
      // this is to change each item base price accordingly
      this.$emit('totalPriceChanged', val)
      this.SET_ORDER({ key: 'last_sum', val })
    },
    brokenStateChanged(val) {
      this.$emit('brokenState', val)
      this.SET_ORDER({ key: 'includes_brokens', value: val })
    },
    procedureChanged(val) {
      this.SET_ORDER({ key: 'action', value: val })
    },
    setReturnDebtDate(val) {
      this.SET_ORDER({ key: 'date_of_return_debt', value: val })
    },
    setDebtDescription(val) {
      this.SET_ORDER({ key: 'description_of_debt', value: val })
    },
    costOfUploadChanging(val) {
      this.SET_ORDER({ key: 'upload_cost', value: parseFloat(val) })
    },
    currentDriverChanged(val) {
      this.SET_ORDER({ key: 'driver', value: val })
    },
    customerChanged(val) {
      this.SET_ORDER({ key: 'customer', value: val })
      this.getLastActionOfCustomer()
    },
    reset_all() {
      this.withBorken = false
      this.currentProduct = ''
      this.currentStatus = ''
      this.currentcustomer = ''
      this.costOfUpload = ''
      this.order_saving = false
      this.currentDriver = ''
      this.discountPrice = 0
      this.debtDescription = ''
      this.debtDate = ''
      this.isDebt = false
      this.changebase_price(0)
    }
  }
}
</script>

<style>
.tools-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1.5em !important;
  overflow-y: auto;
  height: 100%;
  background-color: white;
  border-radius: 10px;
}

.tools-wrapper-item {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.notificationTable {
  width: 230px;
  border-spacing: 5px;
}

.order-action-btn {
}
</style>
