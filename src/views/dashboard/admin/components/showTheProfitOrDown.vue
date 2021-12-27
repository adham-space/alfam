<template>
  <el-col
    :md="{ span: 24 }"
    :lg="{ span: 24 }"
    :sm="{ span: 24 }"
    :xm="{ span: 24 }"
    style="margin-top: 10px;"
    class="char-body-1st"
  >
    <vue-apex-charts
      ref="chartProfitOrLossRef"
      class="char-body"
      width="100%"
      height="380"
      style="padding: 1rem"
      :options="chartOptionsBar"
      :series="seriesBar"
    />
    <!-- <div class="select-size-wrapper-1" :style="currentSize !== '' ? {'right': '50%'}: {'right': '45%'}">
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
      <i :style="gettingData ? {color: 'white'} : {color: 'transparent'}" class="el-icon-loading" />
    </div> -->
    <!-- <div v-if="currentSize !== ''" class="select-name-wrapper">
      <el-select
        v-model="currentName"
        clearable
        align="center"
        style="width: 9em"
        class="select-size"
        @change="nameChangedHandler"
      >
        <el-option label="Хаммаси" :value="''" />
        <el-option
          v-for="(name, index) in this.chartOptionsBar.xaxis.categories"
          :key="index"
          :label="name"
          :value="name"
        />
      </el-select>
      <i :style="gettingDataByName ? {color: 'white'} : {color: 'transparent'}" class="el-icon-loading" />
    </div> -->
  </el-col>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import request from '@/utils/request'
import { toThousandFilter } from '@/filters/index'
import { mapActions, mapState } from 'vuex'
export default {
  components: {
    VueApexCharts
  },
  data() {
    return {
      seriesBar: [
        {
          name: 'касса нархи',
          data: []
        },
        {
          name: 'сотув нархи',
          data: []
        },
        {
          name: 'фойда/зарар суммаси',
          data: []
        }
      ],
      chartOptionsBar: {
        chart: {
          type: 'bar',
          foreColor: 'white',
          toolbar: {
            show: false
          },
          events: {
            click: (chart, w, e) => {
              if (this.currentSize === '' && e.dataPointIndex >= 0) {
                this.currentSize = e.config.xaxis.categories[e.dataPointIndex]
                this.sizeChangedHandler(this.currentSize)
              } else if (this.currentSize !== '' && this.currentName === '') {
                this.currentName = e.config.xaxis.categories[e.dataPointIndex]
                this.nameChangedHandler(this.currentName)
              }
            }
          }
        },
        // colors: colors,
        grid: {
          borderColor: '#40475D'
        },
        plotOptions: {
          bar: {

            columnWidth: '25%'
            // distributed: true,
          }
        },
        dataLabels: {
          enabled: true,
          formatter: function(value) {
            return toThousandFilter(value)
          }
        },
        stroke: {
          width: 0
        },
        legend: {
          show: true
        },
        colors: ['#1e8871', '#17ead9', '#ff9100'],
        // fill: {
        //   type: 'gradient',
        //   gradient: {
        //     type: 'vertical',
        //     shade: 'dark',
        //     shadeIntensity: 0.5,
        //     inverseColors: false,
        //     opacityFrom: 1,
        //     opacityTo: 0.8,
        //     stops: [0, 100],
        //     gradientToColors: ['#F55555', '#6078ea', '#6094ea']
        //   }
        // },
        title: {
          text: 'ТОВАРЛАРНИ РЕНТАБЕЛНОСТЬ ШКАЛАСИ',
          align: 'center',
          style: {
            fontSize: '12px',
            fontWeight: 'light'
          }
        },
        // subtitle: {
        //   text: 'Жами: ',
        //   floating: true,
        //   align: 'right',
        //   offsetY: 0,
        //   style: {
        //     fontSize: '14px'
        //   }
        // },
        tooltip: {
          theme: 'dark'
        },
        yaxis: {
          labels: {
            formatter: function(value) {
              return toThousandFilter(value)
            }
          }
        },
        xaxis: {
          categories: [],
          labels: {
            style: {
              fontSize: '12px'
            }
          }
        }
      }
    }
  },
  computed: {
    ...mapState('dashboard', ['sizeOptions'])
  },
  mounted() {
    this.sizeChangedHandler('')
  },
  methods: {
    ...mapActions('dashboard', ['GET_SIZES']),

    async sizeChangedHandler() {
      try {
        const res = await request({
          url: '/dashboard/get-profit-or-loss',
          method: 'GET'
        })
        const chart1st = res.data
        this.seriesBar[0].data = []
        this.chartOptionsBar.xaxis.categories = []
        chart1st.forEach((ch) => {
          this.seriesBar[0].data.push(parseFloat(ch.last_sum_kassa.toFixed(2)))
          this.seriesBar[1].data.push(parseFloat(ch.last_sum.toFixed(2)))
          this.seriesBar[2].data.push(parseFloat((ch.last_sum - ch.last_sum_kassa).toFixed(2)))
          this.chartOptionsBar.xaxis.categories.push(ch._id)
        })
        this.$refs.chartProfitOrLossRef.refresh()
      } catch (err) {
        this.gettingData = false
        console.error(err)
      }
    }
  }
}
</script>

<style lang="scss">
.char-body-1st {
  position: relative;
}
.select-size-wrapper-1 {
  position: absolute;
  bottom: 10px;
  right: 50%;
}

.select-name-wrapper {
  position: absolute;
  bottom: 10px;
  left: 55%;
}

.el-select.select-size > .el-input > .el-input__inner {
  background-color: transparent !important;
  color: white !important;
  border: 1px solid rgba(184, 184, 184, 0) !important;
}
</style>
