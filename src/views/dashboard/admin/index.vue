<template>
  <div class="dashboard-editor-container">
    <el-row>
      <el-col
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
      </el-col>
      <el-col
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
      </el-col>
      <el-col
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
      </el-col>
      <el-col
        :md="{span: 12}"
        :lg="{span: 12}"
        :sm="{span: 24}"
        :xm="{span: 24}"
      >
        <vue-apex-charts
          class="char-body"
          width="100%"
          height="300"
          :options="chartOptionsBar"
          :series="seriesBar"
        />
      </el-col>
    </el-row>
    <el-row>
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
    </el-row>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
export default {
  name: 'DashboardAdmin',
  components: {
    VueApexCharts
  },
  data() {
    return {
      optionsBarHorizontal1: {
        chart: {
          foreColor: '#fff',
          type: 'bar',
          stacked: true,
          sparkline: {
            enabled: true
          }
        },
        stroke: {
          width: 3
        },
        colors: ['#FCCF31'],
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: '20%',
            colors: {
              backgroundBarColors: ['#40475D']
            }
          }
        },
        stroke: {
          width: 0
        },
        series: [
          {
            name: 'Process 1',
            data: [44]
          }
        ],
        title: {
          floating: true,
          offsetX: -10,
          offsetY: 5,
          text: 'Process 1'
        },
        subtitle: {
          floating: true,
          align: 'right',
          offsetY: 0,
          text: '44%',
          style: {
            fontSize: '20px'
          }
        },
        tooltip: {
          enabled: false
        },
        xaxis: {
          categories: ['Process 1']
        },
        yaxis: {
          max: 100
        },
        tooltip: {
          theme: 'dark'
        },
        fill: {
          opacity: 1,
          type: 'gradient',
          gradient: {
            gradientToColors: ['#F55555']
          }
        }
      },
      optionsBarHorizontal2: {
        chart: {
          foreColor: '#fff',
          type: 'bar',
          stacked: true,
          sparkline: {
            enabled: true
          }
        },
        stroke: {
          width: 3
        },
        colors: ['#17ead9'],
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: '20%',
            colors: {
              backgroundBarColors: ['#40475D']
            }
          }
        },
        stroke: {
          width: 0
        },
        series: [
          {
            name: 'Process 1',
            data: [84]
          }
        ],
        title: {
          floating: true,
          offsetX: -10,
          offsetY: 5,
          text: 'Process 1'
        },
        subtitle: {
          floating: true,
          align: 'right',
          offsetY: 0,
          text: '44%',
          style: {
            fontSize: '20px'
          }
        },
        tooltip: {
          enabled: false
        },
        xaxis: {
          categories: ['Process 2']
        },
        yaxis: {
          max: 100
        },
        tooltip: {
          theme: 'dark'
        },
        fill: {
          opacity: 1,
          type: 'gradient',
          gradient: {
            gradientToColors: ['#6078ea']
          }
        }
      },
      optionsBarHorizontal3: {
        chart: {
          foreColor: '#fff',
          type: 'bar',
          stacked: true,
          sparkline: {
            enabled: true
          }
        },
        stroke: {
          width: 3
        },
        colors: ['#f02fc2'],
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: '20%',
            colors: {
              backgroundBarColors: ['#40475D']
            }
          }
        },
        stroke: {
          width: 0
        },
        series: [
          {
            name: 'Process 1',
            data: [64]
          }
        ],
        title: {
          floating: true,
          offsetX: -10,
          offsetY: 5,
          text: 'Process 1'
        },
        subtitle: {
          floating: true,
          align: 'right',
          offsetY: 0,
          text: '44%',
          style: {
            fontSize: '20px'
          }
        },
        tooltip: {
          enabled: false
        },
        xaxis: {
          categories: ['Process 3']
        },
        yaxis: {
          max: 100
        },
        tooltip: {
          theme: 'dark'
        },
        fill: {
          opacity: 1,
          type: 'gradient',
          gradient: {
            gradientToColors: ['#6094ea']
          }
        }
      },
      seriesRadial: [44, 55],

      chartOptionsRadial: {
        chart: {
          // height: 350,
          type: 'radialBar',
          offsetX: 0,
          foreColor: '#fff'
        },
        colors: ['#FCCF31', '#17ead9', '#f02fc2'],
        plotOptions: {
          radialBar: {
            inverseOrder: false,
            hollow: {
              margin: 15,
              size: '48%',
              background: 'transparent'
            },
            track: {
              show: true,
              background: '#40475D',
              strokeWidth: '10%',
              opacity: 1,
              margin: 3 // margin is in pixels
            },
            dataLabels: {
              name: {
                fontSize: '22px'
              },
              value: {
                fontSize: '16px'
              },
              total: {
                show: true,
                label: 'Total',
                formatter: function(w) {
                  // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                  return 249
                }
              }
            }
          }
        },
        labels: ['Apples', 'Oranges'],
        title: {
          text: 'This is circular'
        },
        legend: {
          show: true,
          position: 'left',
          offsetX: -30,
          offsetY: 10,
          formatter: function(val, opts) {
            return val + ' - ' + opts.w.globals.series[opts.seriesIndex] + '%'
          }
        },
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
        }
      },
      seriesBar: [
        {
          data: [21, 22, 10, 28, 16, 21, 13, 30]
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
            type: 'vertical',
            shadeIntensity: 0.5,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 0.8,
            stops: [0, 100],
            gradientToColors: ['#F55555', '#6078ea', '#6094ea']
          }
        },
        title: {
          text: 'Load Average',
          align: 'left',
          style: {
            fontSize: '12px'
          }
        },
        subtitle: {
          text: '20%',
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
          categories: [
            ['John', 'Doe'],
            ['Joe', 'Smith'],
            ['Jake', 'Williams'],
            'Amber',
            ['Peter', 'Brown'],
            ['Mary', 'Evans'],
            ['David', 'Wilson'],
            ['Lily', 'Roberts']
          ],
          labels: {
            style: {
              fontSize: '12px'
            }
          }
        }
      },
      series: [
        {
          name: 'Desktops',
          data: [120, 41, 335, 501, 409, 612, 629, 391, 148]
        }
      ],
      chartOptions: {
        chart: {
          height: 350,
          type: 'area',
          zoom: {
            enabled: false
          },
          toolbar: {
            show: false
          },
          dropShadow: {
            enabled: false,
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
        stroke: {
          curve: 'straight'
        },
        title: {
          text: 'Product Trends by Month',
          align: 'left',
          style: {
            color: 'white'
          }
        },
        // colors: ["#db2e03", "#6bdb03"],
        grid: {
          show: true,
          borderColor: '#40475D'
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
          categories: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep'
          ],
          labels: {
            style: {
              colors: 'white'
            }
          }
        }
      },
      chartOptions2: {
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
        stroke: {
          curve: 'straight'
        },
        title: {
          text: 'Product Trends by Month',
          align: 'left',
          style: {
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
          categories: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep'
          ],
          labels: {
            style: {
              colors: 'white'
            }
          }
        }
      },
      trigoStrength: 3
    }
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

