<template>
  <div class="dashboard-editor-container">
    <div class="range-buttons__wrapper">
      <div class="btn-group">
        <div class="range-btn" :class="filterdate === 'day' ? 'active': ''" @click="filterdate = 'day'">КУН</div>
        <div class="range-btn" :class="filterdate === 'month' ? 'active': ''" @click="filterdate = 'month'">ОЙ</div>
        <div class="range-btn" :class="filterdate === 'year' ? 'active': ''" @click="filterdate = 'year'">ЙИЛ</div>
      </div>
      <div class="current-date">
        {{ currentDate }}
      </div>
    </div>

    <el-row :gutter="10">
      <totalAreachart1st />
      <totalCostOfProductsBySizeChart />

      <!-- -->
      <!-- <el-col
        :md="{span: 12}"
        :lg="{span: 12}"
        :sm="{span: 24}"
        :xm="{span: 24}"
      >
        <vue-apex-charts
          class="char-body"
          width="100%"
          height="300"
          :options="chartOptionsRadial"
          :series="seriesRadial"
        />
      </el-col>-->

    </el-row>
    <el-row :gutter="10" style="margin-top: 10px">
      <ordersCashAmount :filterdate="filterdate" />
      <sellersChartBytSale :filterdate="filterdate" />
    </el-row>
  </div>
</template>

<script>
import totalAreachart1st from './components/totalAreachart1st'
import totalCostOfProductsBySizeChart from './components/totalCostOfProductsBySizeChart'
import ordersCashAmount from './components/ordersCashAmount'
import sellersChartBytSale from './components/sellersChartBytSale'
export default {
  name: 'DashboardAdmin',
  components: {
    totalAreachart1st,
    ordersCashAmount,
    sellersChartBytSale,
    totalCostOfProductsBySizeChart
  },
  data() {
    return {
      filterdate: 'month'
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
  border-radius: 10px;
  // margin: 20px 20px 0 0;
}

.range-buttons__wrapper {
  display: flex;
  color: white;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1em;
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
        font-family: 'Nunito Sans', sans-serif;
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

</style>

