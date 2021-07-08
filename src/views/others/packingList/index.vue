<template>
  <el-row style="height: calc(100vh - 86px); ">
    <el-col :span="18" style="height: calc(100vh - 96px);">
      <Table ref="packingListTableRef" :broken="broken" @calculateTotalPrice="calculateTotalPrice" />
    </el-col>
    <el-col :span="6" style="height: calc(100vh - 86px); overflow-y: auto ">
      <Tools :total-price="totalPrice" @totalPriceChanged="totalPriceChanged" @brokenState="changedBrokenState" />
    </el-col>
  </el-row>
</template>

<script>
import Table from './components/Table'
import Tools from './components/Tools'
export default {
  name: 'OthersPackingList',
  components: {
    Table,
    Tools
  },
  data() {
    return {
      totalPrice: 0,
      broken: false
    }
  },
  methods: {
    calculateTotalPrice(val) {
      this.totalPrice = val
    },
    totalPriceChanged(val) {
      this.totalPrice = val
      this.$refs.packingListTableRef.calculateBasePrices(val)
    },
    changedBrokenState(val) {
      this.broken = val
    }
  }
}
</script>

<style>

</style>
