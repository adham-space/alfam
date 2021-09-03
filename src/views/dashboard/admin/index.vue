<template>
  <div class="dashboard-editor-container">
    <el-row>
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
          :options="chartOptions"
          :series="series"
        />
      </el-col>-->
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
          :options="chartOptions2"
          :series="series"
        />
      </el-col>-->
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
      <el-col
        :md="{span: 12}"
        :lg="{span: 12}"
        :sm="{span: 24}"
        :xm="{span: 24}"
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
            style="width: 5.9em"
            class="select-size"
            @change="sizeChangedHandler"
          >
            <el-option label="All" :value="''" />
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
    </el-row>
    <!-- <el-row>
      <el-col
        :md="{span: 12}"
        :lg="{span: 12}"
        :sm="{span: 24}"
        :xm="{span: 24}"
      >
        <div class="char-body">
          <vue-apex-charts
            width="100%"
            height="70"
            :options="optionsBarHorizontal1"
            :series="optionsBarHorizontal1.series"
          />
          <vue-apex-charts
            width="100%"
            height="70"
            :options="optionsBarHorizontal2"
            :series="optionsBarHorizontal2.series"
          />
          <vue-apex-charts
            width="100%"
            height="70"
            :options="optionsBarHorizontal3"
            :series="optionsBarHorizontal3.series"
          />
        </div>
      </el-col>
    </el-row>-->
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import request from '@/utils/request'
import { toThousandFilter } from '@/filters/index'
export default {
  name: 'DashboardAdmin',
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
            columnWidth: '35%'
            // distributed: true,
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
          text: 'MIQDORLI GISTOGRAMMA INDEKSI',
          align: 'center',
          style: {
            fontSize: '14px',
            fontWeight: 'light'
          }
        },
        subtitle: {
          text: 'Total (m2): ' + this.total_area,
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
      .then(res => {
        this.sizeOptions = res.data
      })
      .catch(err => {
        console.error(err)
        this.sizeOptions = []
      })
  },
  methods: {
    sizeChangedHandler(size) {
      this.gettingData = true
      request({
        url: '/dashboard/get-inventar-area',
        method: 'GET',
        params: {
          size: size
        }
      })
        .then(res => {
          this.gettingData = false
          const chart1st = res.data
          this.seriesBar[0].data = []
          this.chartOptionsBar.xaxis.categories = []
          chart1st.forEach(ch => {
            if (size === '') {
              this.seriesBar[0].data.push(parseFloat(ch.total_area.toFixed(2)))
              this.chartOptionsBar.xaxis.categories.push(ch.size)
            } else {
              this.seriesBar[0].data.push(parseFloat(ch.total_area.toFixed(2)))
              this.chartOptionsBar.xaxis.categories.push(ch.product_name)
            }
            this.chartOptionsBar.subtitle.text = 'Total (m2): ' + toThousandFilter(this.seriesBar[0].data.reduce((a, b) => a + b, 0))
          })
          this.$refs.chart1Ref.refresh()
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
  padding: 10px;
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

