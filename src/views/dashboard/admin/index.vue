<template>
  <div class="dashboard-editor-container">
    <div class="range-buttons__wrapper">
      <div class="btn-group">
        <div class="range-btn" :class="filterdate === 'day' ? 'active': ''" @click="filterdate = 'day'">КУН</div>
        <div class="range-btn" :class="filterdate === 'month' ? 'active': ''" @click="filterdate = 'month'">ОЙ</div>
        <div class="range-btn" :class="filterdate === 'year' ? 'active': ''" @click="filterdate = 'year'">ЙИЛ</div>
      </div>
      <div class="refresh-and-date">
        <el-button type="text" :icon="refreshing? 'el-icon-loading' : 'el-icon-refresh-right' " @click="refreshAllCharts()" />
        <div class="current-date">
          {{ currentDate }}
        </div>
      </div>
    </div>
    <el-row :gutter="10">
      <totalAreachart1st ref="totalAreachart1stRef" />
      <totalCostOfProductsBySizeChart ref="totalCostOfProductsBySizeChartRef" />
    </el-row>
    <el-row :gutter="10">
      <ordersCashAmount ref="ordersCashAmountRef" :filterdate="filterdate" />
      <PieChart :filterdate="filterdate" />
    </el-row>
    <el-row :gutter="10">
      <sellersChartBytSale ref="sellersChartBytSaleRef" :filterdate="filterdate" />
      <stuffRating ref="stuffRatingRef" :filterdate="filterdate" />
    </el-row>
    <el-row :gutter="10">
      <targetChart :filterdate="filterdate" />
      <Debitors />
    </el-row>
  </div>
</template>

<script>
import totalAreachart1st from './components/totalAreachart1st'
import totalCostOfProductsBySizeChart from './components/totalCostOfProductsBySizeChart'
import ordersCashAmount from './components/ordersCashAmount'
import sellersChartBytSale from './components/sellersChartBytSale'
import stuffRating from './components/stuffRatings'
// import polarAreaForProducts from './components/polarAreaForProducts'
import PieChart from './components/PieChart/index.vue'
import targetChart from './components/targetChart/index.vue'
import Debitors from './components/Debitors'
export default {
  name: 'DashboardAdmin',
  components: {
    totalAreachart1st,
    ordersCashAmount,
    sellersChartBytSale,
    totalCostOfProductsBySizeChart,
    stuffRating,
    targetChart,
    // polarAreaForProducts,
    PieChart,
    Debitors
  },
  data() {
    return {
      filterdate: 'month',
      refreshing: false
    }
  },
  computed: {
    currentDate() {
      const d = new Date()
      let result = ''
      switch (this.filterdate) {
        case 'day':
          result = d.toLocaleString('ru', { month: 'long' }) + ', ' + d.getDate()
          break
        case 'month':
          result = d.toLocaleString('ru', { month: 'long' }) + ', ' + d.getFullYear()
          break
        case 'year':
          result = d.getFullYear()
          break
        default:
          break
      }
      return result
    }
  },
  methods: {
    async refreshAllCharts() {
      const {
        totalAreachart1stRef,
        totalCostOfProductsBySizeChartRef,
        ordersCashAmountRef,
        sellersChartBytSaleRef,
        stuffRatingRef
      } = this.$refs

      try {
        this.refreshing = true
        await totalAreachart1stRef.sizeChangedHandler('')
        await totalCostOfProductsBySizeChartRef.sizeChangedHandler('')
        await ordersCashAmountRef.getOrdersHistory(this.filterdate)
        await sellersChartBytSaleRef.sizeChangedHandler(this.filterdate)
        await stuffRatingRef.sizeChangedHandler(this.filterdate)
        this.refreshing = false
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200&display=swap');

.dashboard-editor-container::-webkit-scrollbar {
  width: 6px;
  border-radius: 10px;
}

/* Track */
.dashboard-editor-container::-webkit-scrollbar-track {
  background: #f1f1f100;
  border-radius: 10px;
}

/* Handle */
.dashboard-editor-container::-webkit-scrollbar-thumb {
  background: rgba(172, 172, 172, 0.186);
  border-radius: 10px;
}

/* Handle on hover */
.dashboard-editor-container::-webkit-scrollbar-thumb:hover {
  background: rgb(146, 146, 146);
  border-radius: 10px;
}

.dashboard-editor-container {
  // padding-left: 20px;
  // padding-bottom: 20px;
  padding: 1em;
  background-color: #02111f;

  height: calc(100vh - 50px);
  overflow-x: auto;
}

.char-body {
  background-color: #0a2e52;
  padding: 20px;
  padding-bottom: 3rem;
  border-radius: 10px;
  // margin: 20px 20px 0 0;
}

.range-buttons__wrapper {
  background-color: #02111f;
  z-index: 100;
  position: sticky;
  top: -16px;
  padding: .3em;
  display: flex;
  color: white;
  align-items: center;
  justify-content: space-between;
  // margin-bottom: 1em;
  .current-date {
    border-bottom: 1px solid wheat;
  }
  .btn-group {
    border-radius: 25px;
    display: flex;
    padding: .5em;
    // background-color: #9dc4eb83;
    border: 1px solid #9dc4eb83;
      .range-btn {
        font-size: 14px;
        cursor: pointer;
        text-align: center;
        color: white;
        width: 80px;
        border-radius: 17px;
        padding: .5em;
        // font-family: 'Nunito Sans', sans-serif;
        // font-family: 'LatoWebLight';
        font-size: 13px;
        margin-left: 2em;
      }
      .range-btn:nth-child(1) {
        margin-left: 0
      }
      .range-btn.active {
        background-color: #0a2e52;
      }
  }
}

.refresh-and-date {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 1em;
    color: white;
  }
}

</style>

