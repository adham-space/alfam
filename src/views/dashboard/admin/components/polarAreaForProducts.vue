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
      type="polarArea"
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
  props: {
    filterdate: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      gettingData: false,
      sizeOptions: [42, 47, 52, 58, 65, 88],
      currentSize: '',
      total_area: 0,
      series: [42, 77, 52, 58, 65, 88],
      chartOptions: {
        chart: {
          height: 350,
          // width: 380,
          type: 'polarArea',
          toolbar: {
            show: false
          }
        },
        yaxis: {
          show: false
        },
        labels: ['Rose A', 'Rose B', 'Rose C', 'Rose D', 'Rose E', 'Rose F'],
        dataLabels: {
          enabled: true,
          formatter: function(value) {
            return parseFloat(value.toFixed(2))
          }
        },
        // stroke: {
        //   curve: 'straight'
        // },
        title: {
          text: 'ОПЕРАЦИЯ ЖАРАЁНИ ГРАФИГИ',
          align: 'center',
          style: {
            color: 'white',
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
        //     fontSize: '14px',
        //     color: 'white'
        //   }
        // },
        // colors: ["#db2e03", "#6bdb03"],
        // grid: {
        //   borderColor: '#40475D',
        //   show: true,
        //   xaxis: {
        //     lines: {
        //       show: false
        //     }
        //   },
        //   yaxis: {
        //     lines: {
        //       show: true
        //     }
        //   }
        // },
        stroke: {
          curve: 'smooth',
          width: 1,
          colors: undefined
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
            gradientToColors: ['#6078ea', '#6078ea', '#6094ea']
          }
        },
        tooltip: {
          theme: 'dark'
        },
        legend: {
          labels: {
            useSeriesColors: true
          },
          position: 'right'
        },
        // title: {
        //   text: '',
        //   style: {
        //     color: 'white'
        //   }
        // },
        plotOptions: {
          polarArea: {
            rings: {
              strokeWidth: 0
            },
            spokes: {
              strokeWidth: 0
            }
          }
        },
        // yaxis: {
        //   labels: {
        //     style: {
        //       colors: 'white'
        //     },
        //     formatter: function(value) {
        //       return toThousandFilter(value)
        //     }
        //   }
        // },
        // xaxis: {
        //   categories: [],
        //   labels: {
        //     style: {
        //       colors: 'white'
        //     }
        //   }
        // },
        theme: {
          monochrome: {
            enabled: true,
            shadeTo: 'light',
            shadeIntensity: 0.8
          }
        }
      }
    }
  },
  mounted() {
    // this.getOrdersHistory()
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
    async getOrdersHistory() {
      this.gettingData = true

      try {
        const res = await request({
          url: '/dashboard/get-orders-cost',
          method: 'GET',
          params: {
            filterdate: this.filterdate
          }
        })
        this.gettingData = false
        this.series[0].data = []
        this.chartOptions.xaxis.categories = []
        res.data.forEach(ch => {
          this.series[0].data.push(parseFloat(ch.last_sum.toFixed(2)))
          this.chartOptions.xaxis.categories.push(ch.day)

          this.chartOptions.subtitle.text = 'Жами: ' + toThousandFilter(parseFloat((this.series[0].data.reduce((a, b) => a + b, 0)).toFixed(2)))
        })
        this.$refs.chart2nd.refresh()
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
