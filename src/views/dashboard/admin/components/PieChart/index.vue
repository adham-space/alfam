<template>
  <el-col
    :md="{span: 12}"
    :lg="{span: 12}"
    :sm="{span: 24}"
    :xm="{span: 24}"
    class="custom-e-charts-panel"
    style="margin-top: 10px"
  >
    <PieChart
      ref="PieChartRef"
      :loading="gettingData"
      :current-size="currentSize"
      @getBySize="sizeChangedHandler"
    />
    <div class="select-size-wrapper">
      <el-select
        v-model="currentSize"
        clearable
        align="center"
        style="width: 6.6em"
        class="select-size"
        @change="sizeChangedHandler"
      >
        <el-option label="Хаммаси" :value="''" />
        <el-option
          v-for="size in sizeOptions"
          :key="size._id"
          :label="size.size"
          :value="size.size"
        />
      </el-select>
      <i style="color: white" :class="gettingData ? 'el-icon-loading': ''" />
    </div>
  </el-col>
</template>

<script>
import request from '@/utils/request'
import PieChart from './PieChart.vue'
export default {
  components: {
    PieChart
  },
  props: {
    filterdate: {
      type: String,
      default: ''
    }

  },
  data() {
    return {
      currentSize: '',
      gettingData: false,
      sizeOptions: []

    }
  },
  mounted() {
    this.sizeChangedHandler('')
    request({
      url: '/dashboard/get-product-sizes',
      method: 'GET'
    })
      .then(res => {
        this.sizeOptions = res.data
      })
      .catch(err => {
        console.error(err)
        this.sizeOptions = []
      })
  },
  methods: {

    async sizeChangedHandler(size) {
      this.gettingData = true
      this.currentSize = size
      try {
        const res = await request({
          url: '/dashboard/product-share-orders',
          method: 'GET',
          params: {
            size: size
          }
        })
        this.gettingData = false
        const chart1st = res.data
        this.$refs.PieChartRef.setChart(chart1st, this.sizeOptions)
      } catch (error) {
        this.gettingData = false
        console.error(error)
      }
    }
  }
}
</script>

<style>
    .custom-e-charts-panel {
        position: relative;
        display:  grid;
        grid-template-rows: auto 1fr;
        grid-template-columns: 1fr;
    }

    .select-size-wrapper {
         grid-column: 3 / span 2;
         grid-row: 1 2;
        position: absolute;
        top: 12px;
        left: 12px;
    }

.el-select.select-size > .el-input > .el-input__inner {
  background-color: transparent !important;
  color: white !important;
  border: 1px solid transparent;
}

</style>
