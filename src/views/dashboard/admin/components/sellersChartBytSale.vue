<template>
  <el-col
    :md="{span: 12}"
    :lg="{span: 12}"
    :sm="{span: 24}"
    :xm="{span: 24}"
    class="char-body-1st"
  >
    <vue-apex-charts
      ref="sellersChartRef"
      class="char-body"
      width="100%"
      height="400"
      :options="chartOptionsBar"
      :series="seriesBar"
    />
  </el-col>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import request from '@/utils/request'
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
      sellerOptions: [],
      currentSize: '',
      total_area: 0,
      seriesBar: [
        {
          name: '',
          data: []
        }
      ],
      chartOptionsBar: {
        chart: {
          type: 'bar',
          foreColor: 'white',
          toolbar: {
            show: false
          }
          // events: {
          //   click: (chart, w, e) => {
          //     if (this.currentSize === '' && e.dataPointIndex >= 0) {
          //       this.currentSize = e.config.xaxis.categories[e.dataPointIndex]
          //       this.sizeChangedHandler(this.currentSize)
          //     }
          //   }
          // }
        },
        grid: {
          borderColor: '#40475D'
        },
        plotOptions: {
          bar: {
            columnWidth: '35%',
            // distributed: true,
            borderRadius: 4,
            horizontal: true

          }
        },
        dataLabels: {
          enabled: true
        },
        stroke: {
          width: 0
        },
        legend: {
          show: true
        },
        colors: ['#FCCF31', '#17ead9', '#f02fc2'],
        fill: {
          type: 'gradient',
          gradient: {
            type: 'horizontal',
            shade: 'dark',
            shadeIntensity: 0.5,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 0.8,
            stops: [0, 100],
            gradientToColors: ['#F55555', '#6078ea', '#6094ea']
          }
        },
        title: {
          text: 'РАҚОБАТНИ ТАҚҚОСЛОВЧИ ДИНАМИКА',
          align: 'center',
          style: {
            fontSize: '14px',
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
          lines: {
            show: true
          }
        },
        xaxis: {
          lines: {
            show: true
          },
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
  mounted() {
    this.sizeChangedHandler('')
  },
  methods: {
    sizeChangedHandler() {
      this.gettingData = true
      request({
        url: '/dashboard/sellers-sales',
        method: 'GET',
        params: {
          filterdate: this.filterdate
        }
      })
        .then(res => {
          this.gettingData = false
          const chart1st = res.data
          this.seriesBar[0].data = []
          this.chartOptionsBar.xaxis.categories = []
          chart1st.forEach(ch => {
            this.seriesBar[0].data.push(parseFloat(ch.last_sum.toFixed(2)))
            this.chartOptionsBar.xaxis.categories.push(ch.shop)
            // this.chartOptionsBar.subtitle.text = 'Жами: ' + toThousandFilter(parseFloat((this.seriesBar[0].data.reduce((a, b) => a + b, 0)).toFixed(2)))
          })
          this.$refs.sellersChartRef.refresh()
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
