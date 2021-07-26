<template>
  <div class="tools-wrapper">
    <p>List №: ALFAM-001 </p>

    <el-select
      v-model="currentProduct"
      style="width: 100%"
      placeholder="Choose a product"
      @change="getProducts"
    >
      <el-option
        v-for="(pr, i) in batches"
        :key="i"
        :label="pr._product[0].split('-')[0] + ' - ' + pr._product[0].split('-')[2]"
        :value="pr._id"
      />
    </el-select>
    <el-checkbox v-model="withBorken" style="margin: 1em 0" @change="brokenStateChanged">Include borkens</el-checkbox>
    <el-select
      v-model="currentStatus"
      style="width: 100%"
      class="tools-wrapper-item"
      placeholder="Choose action"
    >
      <el-option
        v-for="(pr, i) in Procedures"
        :key="i"
        :label="pr.label"
        :value="pr.value"
      />
    </el-select>
    <el-select
      v-model="currentConsumer"
      class="tools-wrapper-item"
      style="width: 100%"

      placeholder="Choose a consumer"
    >
      <el-option
        v-for="(pr, i) in consumers"
        :key="i"
        :label="pr.firstName + ' ' + pr.lastName"
        :value="pr._id"
      />
    </el-select>
    <el-select
      v-model="currentDriver"
      class="tools-wrapper-item"
      style="width: 100%"

      placeholder="Choose a Driver"
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
      class="tools-wrapper-item"
      placeholder="Cost to upload (so'm)"
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
      />
      Is debt?
    </div>
    <el-date-picker
      v-if="isDebt"
      v-model="debtDate"
      style="margin-bottom: 1em"
      placeholder="Debt back date"
    />
    <el-input
      v-if="isDebt"
      v-model="debtDescription"
      style="margin-bottom: 1em"
      type="textarea"
      rows="4"
    />
    <div class="order-action-btn">
      <el-button type="primary">Save</el-button>
      <el-button type="danger">Cancel</el-button>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import request from '@/utils/request'
export default {
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
    currentConsumer: '',
    costOfUpload: '',
    currentDriver: '',
    discountPrice: 0,
    debtDescription: '',
    debtDate: '',
    isDebt: false,
    batches: [],
    Procedures: [
      {
        label: 'Sotib olish',
        value: 1
      },
      {
        label: 'Barter (Almashtirish)',
        value: 2
      },
      {
        label: 'Qaytarib berish',
        value: 3
      }
    ]
  }),
  computed: {
    ...mapState('products', ['products_types', 'product']),
    drivers() {
      return this.$store.state.drivers.tableData
    },
    consumers() {
      return this.$store.state.customers.tableData
    }
  },
  mounted() {
    this.GET_PRODUCT_TYPES()
    this.GET_CUSTOMERS()
    this.GET_DRIVERS()
    request({
      url: '/products/get-batches',
      method: 'GET'
    }).then(res => {
      this.batches = res.data
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    ...mapActions('products', ['GET_PRODUCT_TYPES', 'GET_PRODUCT_BY_TYPE_ID']),
    ...mapActions('customers', ['GET_CUSTOMERS']),
    ...mapActions('drivers', ['GET_DRIVERS']),
    getProducts(val) {
      this.GET_PRODUCT_BY_TYPE_ID(val)
    },
    base_priceChangedOneOfItem(val) { // this will be called when base price of one item is changed
      this.discountPrice = val
    },
    changebase_price(val) { // this is to change each item base price accordingly
      this.$emit('totalPriceChanged', val)
    },
    brokenStateChanged(val) {
      this.$emit('brokenState', val)
    }

  }
}
</script>

<style>
    .tools-wrapper {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: .5rem;
        overflow-y: auto;
    }

    .tools-wrapper-item {
        margin-top: .5rem;
        margin-bottom: .5rem;
    }

    .notificationTable {
      width: 230px;
      border-spacing: 5px;
    }

    .order-action-btn {

    }
</style>
