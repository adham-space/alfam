<template>
  <div style="background-color: #0a2e52;  border-radius: 10px; font-family: 'LatoWebLight';" :class="className" :style="{height:height,width:width}" />
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
      default: '100%'
    },
    height: {
      type: String,
      default: '340px'
    },
    currentSize: {
      type: String,
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
        darkMode: true,
        // color: ['#fac858', '#6094ea', '#ff4800', '#17ead9', '#91cc75', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
        color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
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
          formatter: '{b} | {c}m2 ({d}%)',
          textStyle: {
            color: '#fff'
          },
          backgroundColor: '#000'
        },
        line: {
          symbol: 'circle'
        },
        legend: {
          show: false,
          left: 'center',
          // top: 'center',
          bottom: '10',
          textStyle: {
            color: '#fff'
          },
          // color: ['#ffffff'],
          data: legendData
        },
        series: [
          {
            // name: 'WEEKLY WRITE ARTICLES',
            clockwise: true,
            type: 'pie',
            radius: [10, 100],
            center: ['50%', '50%'],
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
              borderRadius: 5,
              borderWidth: 1,
              borderJoin: 'round'
            },
            zlevel: 0,
            z: 2,
            startAngle: 90,
            minAngle: 0,
            precentPrecision: 2,
            labelLayout: {
              hideOverlap: true
            },
            selectedOffset: 10,
            emphasis: {
              scale: true,
              scaleSize: 5
            },
            data: initSeries.sort(function(a, b) { return a.value - b.value }),
            animationType: 'expansion',
            animationTypeUpdate: 'transition',
            animationEasingUpdate: 'transition',
            animationDurationUpdate: 300,
            animationEasing: 'cubicInOut'
          }
        ]
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
    }
  }
}
</script>
