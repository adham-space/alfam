<template>
  <el-col
    :md="{ span: 24 }"
    :lg="{ span: 24 }"
    :sm="{ span: 24 }"
    :xm="{ span: 24 }"
    style="margin-top: 10px;"
    class="char-body-1st"
  >
    <vue-apex-charts
      ref="chart1Ref"
      class="char-body"
      width="100%"
      height="500"
      :options="chartOptionsBar"
      :series="seriesBar"
    />
    <div class="pagination" :style="{'left': '2%', 'width': '20rem', 'background-color': 'transparent'}">
      <Pagination
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        layout="prev, pager, next, total"
        @pagination="getList"
      />
    </div>
    <div class="select-size-wrapper-1" :style="currentSize !== '' ? {'right': '50%'}: {'right': '45%'}">
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
      <i :style="gettingData ? {color: 'white'} : {color: 'transparent'}" class="el-icon-loading" />
    </div>
    <div v-if="currentSize !== ''" class="select-name-wrapper">
      <el-select
        v-model="currentName"
        clearable
        align="center"
        style="width: 9em"
        class="select-size"
        @change="nameChangedHandler"
      >
        <el-option label="Хаммаси" :value="''" />
        <el-option
          v-for="(name, index) in chartOptionsBar.xaxis.categories"
          :key="index"
          :label="name"
          :value="name"
        />
      </el-select>
      <i :style="gettingDataByName ? {color: 'white'} : {color: 'transparent'}" class="el-icon-loading" />
    </div>
  </el-col>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import request from '@/utils/request'
import Pagination from '@/components/Pagination'
import { toThousandFilter } from '@/filters/index'
import { mapActions, mapState } from 'vuex'
export default {
  components: {
    VueApexCharts,
    Pagination
  },
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 15
      },
      total: 0,
      gettingData: false,
      currentSize: '',
      currentName: '',
      nameOptions: '',
      gettingDataByName: false,
      total_area: 0,
      seriesBar: [
        {
          name: '',
          data: []
        }
      ],
      seriesBarAll: [
        {
          name: '',
          data: []
        }
      ],
      categoriesAll: [],
      chartOptionsBar: {
        chart: {
          type: 'bar',
          foreColor: 'white',
          toolbar: {
            show: false
          },
          events: {
            click: (chart, w, e) => {
              if (e.dataPointIndex >= 0) {
                if (this.currentSize === '') {
                  this.currentSize = e.config.xaxis.categories[e.dataPointIndex]
                  this.sizeChangedHandler(this.currentSize)
                } else if (this.currentSize !== '' && this.currentName === '') {
                  this.currentName = e.config.xaxis.categories[e.dataPointIndex]
                  this.nameChangedHandler(this.currentName)
                }
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
            columnWidth: '25%',
            // distributed: true,
            borderRadius: 4
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
          formatter: 'МИҚДОРЛИ ГИСТОГРАММА <br> ИНДЕКСИ (м2)',
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
          rotate: -60,
          categories: [],
          labels: {
            style: {
              fontSize: '11px'
            }
          }
        }
      }
    }
  },
  computed: {
    ...mapState('dashboard', ['sizeOptions'])
  },
  mounted() {
    this.sizeChangedHandler('')
    this.GET_SIZES()
  },
  methods: {
    getList() {
      this.setWithPagination()
    },
    ...mapActions('dashboard', ['GET_SIZES']),
    async nameChangedHandler(product_name) {
      this.listQuery.page = 1
      this.gettingDataByName = true
      try {
        const res = await request({
          url: '/dashboard/get-inventar-area',
          method: 'GET',
          params: {
            product_name,
            size: this.currentSize
          }
        })
        this.gettingDataByName = false
        const chart1st = res.data
        this.seriesBarAll[0].data = []
        this.categoriesAll = []
        chart1st.forEach((ch) => {
          // if (size === '') {
          if (product_name === '') {
            this.total = res.data.length
            this.seriesBarAll[0].data.push(parseFloat(ch.total_area.toFixed(2)))
            this.categoriesAll.push(ch.product_name)
          } else {
            this.total = res.data.length
            this.seriesBarAll[0].data.push(parseFloat(ch.total_area.toFixed(2)))
            this.categoriesAll.push(ch.size + ' ' + ch.type_name)
          }
        })
        this.setWithPagination()
        console.log('need to be changed')
      } catch (err) {
        this.gettingData = false
        console.error(err)
      }
    },
    async sizeChangedHandler(size) {
      this.currentName = ''
      this.listQuery.page = 1
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
        this.seriesBarAll[0].data = []
        this.categoriesAll = []
        chart1st.forEach((ch) => {
          if (size === '') {
            this.total = res.data.length
            this.seriesBarAll[0].data.push(parseFloat(ch.total_area.toFixed(2)))
            this.categoriesAll.push(ch.size)
          } else {
            this.total = res.data.length
            this.seriesBarAll[0].data.push(parseFloat(ch.total_area.toFixed(2)))
            this.categoriesAll.push(ch.product_name)
          }
        })
        this.setWithPagination()
      } catch (err) {
        this.gettingData = false
        console.error(err)
      }
    },
    setWithPagination() {
      this.$refs.chart1Ref.updateOptions({
        subtitle: {
          text: 'Жами: ' + toThousandFilter(this.seriesBarAll[0].data.reduce((a, b) => a + b, 0).toFixed(2))
        },
        xaxis: {
          categories: this.categoriesAll.slice((this.listQuery.page - 1) * 15, (this.listQuery.page - 1) * 15 + this.listQuery.limit)
        },
        series: [{
          name: '',
          data: this.seriesBarAll[0].data.slice((this.listQuery.page - 1) * 15, (this.listQuery.page - 1) * 15 + this.listQuery.limit)
        }]
      }, false, true, false)
    }
  }
}
</script>

<style lang="scss">
.char-body-1st {
  position: relative;
}
.select-size-wrapper-1 {
  position: absolute;
  bottom: 10px;
  right: 50%;
}

.pagination {
   position: absolute;
  bottom: 10px;
  right: 10%;
  transform: scale(0.8);
}
.pagination > .pagination-container {
  background-color: transparent !important;
}

.pagination > .pagination-container > .el-pagination > .btn-prev, .btn-next {
  background-color: transparent !important;
}

.pagination > .pagination-container > .el-pagination > .el-pagination__total {
  color: white !important;
}

.pagination > .pagination-container > .el-pagination > .el-pager > .number  {
  background-color: rgba(247, 247, 247, 0.425) !important;
  color: black !important;
}

.pagination > .pagination-container > .el-pagination > .el-pager > .number.active  {
  background-color: rgb(0, 153, 255) !important;
  color: white !important;
}

.select-name-wrapper {
  position: absolute;
  bottom: 10px;
  left: 55%;
}

.el-select.select-size > .el-input > .el-input__inner {
  background-color: transparent !important;
  color: white !important;
  border: 1px solid rgba(184, 184, 184, 0) !important;
}
</style>
