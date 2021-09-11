<template>
  <div style="background-color: #0a2e52;  border-radius: 10px; font-family: 'Nunito Sans', sans-serif" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

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
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        color: ['#fac858', '#6094ea', '#ff4800', '#17ead9', '#91cc75', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
        title: {
          text: 'САВДО СОТИҚ ОБъЁМИ ИНДЕКСИ',
          left: 'center',
          top: 20,
          textStyle: {
            color: '#fff',
            // fontFamily: "'Nunito Sans', sans-serif",
            fontSize: '14px'
          }
        },

        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)'
        },
        legend: {
          show: true,
          left: 'center',
          // top: 'center',
          bottom: '10',
          textStyle: {
            color: '#fff'
          },
          color: ['#ffffff'],
          data: ['30*90', '60*90', '60*120']
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
              // shadowColor: 'rgba(0, 0, 0, 0.5)'
            },

            radius: [25, 100],
            center: ['50%', '50%'],
            data: [
              { value: 320, name: '30*90' },
              { value: 240, name: '60*90' },
              { value: 149, name: '60*120' }
            ].sort(function(a, b) { return a.value - b.value }),
            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function(idx) {
              return Math.random() * 200
            }
          }
        ]
      })
    }
  }
}
</script>
