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
      <el-col :md="{span: 12}" :lg="{span: 12}" :sm="{span: 24}" :xm="{span: 24}">
        <vue-apex-charts
          :key="barchartKey"
          class="char-body"
          width="100%"
          height="300"
          :options="chartOptionsBar"
          :series="seriesBar"
        />
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

export default {
  name: 'DashboardAdmin',
  components: {
    VueApexCharts
  },
  data() {
    return {
      barchartKey: 0,
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
            click: function(chart, w, e) {
              // console.log(chart, w, e)
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
          enabled: false
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
          text: 'Miqdorli gistogramma indeksi',
          align: 'center',
          style: {
            fontSize: '12px'
          }
        },
        subtitle: {
          // text: '20%',
          floating: true,
          align: 'right',
          offsetY: 0,
          style: {
            fontSize: '22px'
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
    request({
      url: '/dashboard/get-inventar-area',
      method: 'GET'
    })
      .then(res => {
        const chart1st = res.data
        console.log('chart1', chart1st)
        chart1st.forEach(ch => {
          this.seriesBar[0].data.push(parseFloat((ch.total_area).toFixed(2)))
          this.chartOptionsBar.xaxis.categories.push(ch.size)
        })
        this.barchartKey = Math.random() * 199
        console.log('seriesBar', this.seriesBar)
        console.log(
          'this.chartOptionsBar.xaxis.categories',
          this.chartOptionsBar.xaxis.categories
        )
      })
      .catch(err => {
        console.error(err)
      })
  },
  methods: {
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

<style lang="scss" scoped>
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
  padding-left: 20px;
  padding-bottom: 20px;
  background-color: #02111f;
  height: calc(100vh - 50px);
  overflow-x: auto;
}

.char-body {
  background-color: #072746;
  padding: 20px;
  border-radius: 10px;
  margin: 20px 20px 0 0;
}
</style>

