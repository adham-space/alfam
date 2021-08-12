<template>
  <el-row :gutter="15" class="packing-list-body">
    <el-col :span="18" style="height: 100%; ">
      <Table ref="packingListTableRef" :broken="broken" @calculateTotalPrice="calculateTotalPrice" />
    </el-col>
    <el-col :span="6" style="height: 100%; overflow-y: auto;   ">
      <Tools :is-table-valid="isTableValid" :total-price="totalPrice" @checkTable="checkTableValididty()" @closeNotification="closeNotification_" @totalPriceChanged="totalPriceChanged" @brokenState="changedBrokenState" />
    </el-col>
  </el-row>
</template>

<script>
import Table from './components/Table'
import Tools from './components/Tools'
import { mapMutations } from 'vuex'
export default {
  name: 'ShopPackingList',
  components: {
    Table,
    Tools
  },
  data() {
    return {
      totalPrice: 0,
      broken: false,
      isTableValid: false
    }
  },
  methods: {
    ...mapMutations('products', ['SET_ORDER']),
    checkTableValididty() {
      console.log('this.$refs.packingListTableRef.checkTableIsValid()', this.$refs.packingListTableRef.checkTableIsValid())
      this.isTableValid = this.$refs.packingListTableRef.checkTableIsValid()
    },
    closeNotification_() {
      this.$refs.packingListTableRef.closeNotification()
    },
    calculateTotalPrice(val) {
      this.totalPrice = val
      this.SET_ORDER({ key: 'last_sum', value: val })
    },
    totalPriceChanged(val) {
      this.totalPrice = val
      this.SET_ORDER({ key: 'last_sum', value: val })
      this.$refs.packingListTableRef.calculatebase_prices(val)
    },
    changedBrokenState(val) {
      this.broken = val
      setTimeout(() => { // this needs for to wait until computed state change for table data
        this.$refs.packingListTableRef.calculateTotalPrice()
      }, 200)
    }
  }
}
</script>

<style>
  .packing-list-body {
   height: calc(100vh - 50px);
   padding: 1em;
   /* background-color: #fcf5ef; */
   background-color: #ecc5a2;
  }
</style>
