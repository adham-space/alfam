<template>
  <div style="background-color: #0a2e52; border-top-left-radius: 10px;  border-bottom-left-radius: 10px;  font-family: 'LatoWebLight';" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import * as echarts from 'echarts'
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
      default: '50%'
    },
    height: {
      type: String,
      default: '350px'
    },
    currentProduct: {
      type: Object,
      required: true
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
    setChart(initSeries = [], legendData = []) {
      this.chart.setOption({
        // color: ['#fac858', '#6094ea', '#ff4800', '#17ead9', '#91cc75', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
        color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
        title: {
          text: '',
          left: 'center',
          top: 15,
          textStyle: {
            color: '#fff',
            fontSize: '12px'
          }
        },

        series: [{
          type: 'gauge',
          axisLine: {
            lineStyle: {
              width: 8,
              color: [
                [0.5, '#fd666d'],
                [0.7, '#fffb00'],
                [1, '#67e0e3']
              ]
            }
          },
          pointer: {
            itemStyle: {
              color: 'auto'
            }
          },
          axisTick: {
            distance: -5,
            length: 4,
            lineStyle: {
              color: '#fff',
              width: 1
            }
          },
          splitLine: {
            distance: -5,
            length: 10,
            lineStyle: {
              color: '#fff',
              width: 1
            }
          },
          axisLabel: {
            color: 'auto',
            distance: 10,
            fontSize: 14
          },
          detail: {
            valueAnimation: true,
            formatter: '{value} %',
            color: 'auto'
          },
          data: [{
            value: 80
          }]
        }]
      })
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.on('click', params => {
        console.log(params)
        if (this.currentSize === '') {
          this.$emit('getBySize', params.name)
        }
      })
    },
    updateChart(product) {
      const options = this.chart._api.getOption()
      options.series[0].data[0].value = product.percent
      this.chart.setOption(options, true)
    }
  }
}
</script>
