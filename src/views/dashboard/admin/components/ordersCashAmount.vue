<template>
  <el-col
    :md="{span: 12}"
    :lg="{span: 12}"
    :sm="{span: 24}"
    :xm="{span: 24}"
  >
    <vue-apex-charts
      ref="chart2nd"
      class="char-body"
      width="100%"
      height="300"
      :options="chartOptions"
      :series="series"
    />
  </el-col>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import request from '@/utils/request'
import { toThousandFilter } from '@/filters/index'
export default {
  components: {
    VueApexCharts
  },
  props: ['filterdate'],
  data() {
    return {
      gettingData: false,
      sizeOptions: [],
      currentSize: '',
      total_area: 0,
      series: [
        {
          name: '',
          data: []
        }
      ],
      chartOptions: {
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false
          },
          toolbar: {
            show: false
          },
          dropShadow: {
            enabled: true,
            enabledOnSeries: undefined,
            top: 15,
            left: 3,
            blur: 3,
            color: '#000',
            opacity: 0.35
          }
        },
        dataLabels: {
          enabled: false
        },
        // stroke: {
        //   curve: 'straight'
        // },
        title: {
          text: 'OPERATSIYA JARAYONI GRAFIGI',
          align: 'center',
          style: {
            color: 'white',
            fontSize: '14px',
            fontWeight: 'light'
          }
        },
        subtitle: {
          text: 'Total: ',
          floating: true,
          align: 'right',
          offsetY: 0,
          style: {
            fontSize: '14px',
            color: 'white'
          }
        },
        // colors: ["#db2e03", "#6bdb03"],
        grid: {
          show: false
        },
        stroke: {
          curve: 'smooth'
        },
        colors: ['#FCCF31', '#17ead9', '#f02fc2'],
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: 'horizontal',
            shadeIntensity: 0.5,
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100],
            gradientToColors: ['#F55555', '#6078ea', '#6094ea']
          }
        },
        tooltip: {
          theme: 'dark'
        },
        legend: {
          labels: {
            useSeriesColors: true
          }
        },
        // title: {
        //   text: '',
        //   style: {
        //     color: 'white'
        //   }
        // },
        yaxis: {
          labels: {
            style: {
              colors: 'white'
            }
          }
        },
        xaxis: {
          categories: [],
          labels: {
            style: {
              colors: 'white'
            }
          }
        }
      }
    }
  },
  mounted() {
    this.getOrdersHistory()
    // request({
    //   url: '/dashboard/get-product-sizes',
    //   method: 'GET'
    // })
    //   .then(res => {
    //     this.sizeOptions = res.data
    //   })
    //   .catch(err => {
    //     console.error(err)
    //     this.sizeOptions = []
    //   })
  },
  methods: {
    getOrdersHistory() {
      this.gettingData = true
      request({
        url: '/dashboard/get-orders-cost',
        method: 'GET',
        params: {
          filterdate: this.filterdate
        }
      })
        .then(res => {
          this.gettingData = false
          this.series[0].data = []
          this.chartOptions.xaxis.categories = []
          res.data.forEach(ch => {
            this.series[0].data.push(parseFloat(ch.last_sum.toFixed(2)))
            this.chartOptions.xaxis.categories.push(ch.day)

            this.chartOptions.subtitle.text = 'Total: ' + toThousandFilter(parseFloat((this.series[0].data.reduce((a, b) => a + b, 0)).toFixed(2)))
          })
          this.$refs.chart2nd.refresh()
        })
        .catch(err => {
          this.gettingData = false
          console.error(err)
        })
    },
    generateMinuteWiseTimeSeries(baseval, count, yrange) {
      var i = 0
      var series = []
      while (i < count) {
        var x = baseval
        var y =
          (Math.sin(i / this.trigoStrength) * (i / this.trigoStrength) +
            i / this.trigoStrength +
            1) *
          (this.trigoStrength * 2)

        series.push([x, y])
        baseval += 300000
        i++
      }
      return series
    }
  }
}
</script>

<style lang="scss">
.char-body-1st {
  position: relative;
}
.select-size-wrapper {
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
