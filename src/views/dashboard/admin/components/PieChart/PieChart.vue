<template>
  <div style="background-color: #0a2e52;  border-radius: 10px; font-family: 'LatoWebLight';" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from '../mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '340px'
    },
    currentSize: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart(initSeries = [], legendData = []) {
      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.on('click', (params) => {
        if (this.currentSize === '' && !this.loading) {
          console.log('Getting things', this.loading)
          this.$emit('getBySize', params.name)
        }
      })
      this.chart.setOption({
        color: ['#fac858', '#6094ea', '#ff4800', '#17ead9', '#91cc75', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
        title: {
          text: 'САВДО СОТИК ОБЪЁМИ ИНДЕКСИ',
          left: 'center',
          top: 20,
          textStyle: {
            color: '#fff',
            fontSize: '12px'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} | {c}m2 ({d}%)'
        },
        legend: {
          show: false,
          left: 'center',
          // top: 'center',
          bottom: '10',
          textStyle: {
            color: '#fff'
          },
          color: ['#ffffff'],
          data: legendData
        },
        series: [
          {
            // name: 'WEEKLY WRITE ARTICLES',
            type: 'pie',
            roseType: 'area',
            label: {
              color: 'rgba(255, 255, 255, 1)'
            },
            labelLine: {
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.5)'
              },
              smooth: 0.2,
              length: 10,
              length2: 20
            },
            itemStyle: {
              // color: ['#ff4800', '#FCCF31', '#17ead9', '#f02fc2'],
              // shadowBlur: 200,
            },

            radius: [10, 120],
            center: ['50%', '50%'],
            data: initSeries.sort(function(a, b) { return a.value - b.value }),
            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function(idx) {
              return Math.random() * 1000
            }
          }
        ]
      })
    }
  }
}
</script>
