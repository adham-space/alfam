<template>
  <el-row style="height: calc(100vh - 86px); ">
    <el-col :span="19" style="height: calc(100vh - 96px);">
      <Table ref="packingListTableRef_sklad" :broken="broken" @calculateTotalPrice="calculateTotalPrice"  />
    </el-col>
    <el-col :span="5" style="height: calc(100vh - 86px); ">
      <Tools :total-price="totalPrice" @totalPriceChanged="totalPriceChanged" @brokenState="changedBrokenState" />
    </el-col>
  </el-row>
</template>

<script>
import Table from './components/Table'
import Tools from './components/Tools'
export default {
  name: 'Shop',
  components: {
    Table,
    Tools
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
