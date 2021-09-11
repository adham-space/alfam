<template>
  <el-col
    :md="{ span: 12 }"
    :lg="{ span: 12 }"
    :sm="{ span: 24 }"
    :xm="{ span: 24 }"
    class="char-body-1st"
  >
    <vue-apex-charts
      ref="chart1Ref"
      class="char-body"
      width="100%"
      height="300"
      :options="chartOptionsBar"
      :series="seriesBar"
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
      <i style="color: white" :class="gettingData ? 'el-icon-loading' : ''" />
    </div>
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
  data() {
    return {
      gettingData: false,
      sizeOptions: [],
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
          },
          events: {
            click: (chart, w, e) => {
              if (this.currentSize === '' && e.dataPointIndex >= 0) {
                this.currentSize = e.config.xaxis.categories[e.dataPointIndex]
                this.sizeChangedHandler(this.currentSize)
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
        colors: ['#FCCF31', '#17ead9', '#f02fc2'],
        fill: {
          type: 'gradient',
          gradient: {
            type: 'vertical',
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
          text: 'МИҚДОРЛИ ГИСТОГРАММА ИНДЕКСИ (м2)',
          align: 'center',
          style: {
            fontSize: '12px',
            fontWeight: 'light'
          }
        },
        subtitle: {
          text: 'Жами: ',
          floating: true,
          align: 'right',
          offsetY: 0,
          style: {
            fontSize: '14px'
          }
        },
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
  mounted() {
    this.sizeChangedHandler('')
    request({
      url: '/dashboard/get-product-sizes',
      method: 'GET'
    })
      .then((res) => {
        this.sizeOptions = res.data
      })
      .catch((err) => {
        console.error(err)
        this.sizeOptions = []
      })
  },
  methods: {
    async sizeChangedHandler(size) {
      this.gettingData = true
      try {
        const res = await request({
          url: '/dashboard/get-inventar-area',
          method: 'GET',
          params: {
            size: size
          }
        })
        this.gettingData = false
        const chart1st = res.data
        this.seriesBar[0].data = []
        this.chartOptionsBar.xaxis.categories = []
        chart1st.forEach((ch) => {
          if (size === '') {
            this.seriesBar[0].data.push(parseFloat(ch.total_area.toFixed(2)))
            this.chartOptionsBar.xaxis.categories.push(ch.size)
          } else {
            this.seriesBar[0].data.push(parseFloat(ch.total_area.toFixed(2)))
            this.chartOptionsBar.xaxis.categories.push(ch.product_name)
          }
          this.chartOptionsBar.subtitle.text =
            'Жами: ' +
            toThousandFilter(
              parseFloat(
                this.seriesBar[0].data.reduce((a, b) => a + b, 0).toFixed(2)
              )
            )
        })
        this.$refs.chart1Ref.refresh()
      } catch (err) {
        this.gettingData = false
        console.error(err)
      }
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
