<template>
  <el-row style="height: calc(100vh - 96px); ">
    <el-col :span="19" style="height: calc(100vh - 96px);">
      <Table ref="packingListTableRef_edit" :broken="broken" @calculateTotalPrice="calculateTotalPrice"  />
    </el-col>
    <el-col :span="5" style="height: calc(100vh - 86px); ">
      <Tools ref="calculatorRef" :total-price="totalPrice" @totalPriceChanged="totalPriceChanged" @brokenState="changedBrokenState">
        <slot />
      </Tools>
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
  data() {
    return {
      totalPrice: 0,
      broken: false
    }
  },
  methods: {
    callSave() {
      this.$refs.calculatorRef.save()
    },
    calculateTotalPrice(val) {
      this.totalPrice = val
    },
    totalPriceChanged(val) {
      this.totalPrice = val
      this.$refs.packingListTableRef_edit.calculateBasePrices(val)
    },
    changedBrokenState(val) {
      this.broken = val
    },
    triggerSumTotalPrice() {
      this.$refs.packingListTableRef_edit.calculateTotalPrice()
    }
  }
}
</script>

<style>

</style>
