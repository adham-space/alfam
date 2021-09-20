<template>
  <el-col
    :md="{span: 13}"
    :lg="{span: 13}"
    :sm="{span: 24}"
    :xm="{span: 24}"
    class="custom-e-charts-panel tahometer-table"
    style="border-radius: 10px; overflow: hidden; display: flex; flex-flow: column"
  >
    <div style="background: #0a2e52; height: 350px; overflow: hidden; border-radius: 10px;  border-radius: 10px;">
      <h4 style="text-align: center; color: white; font-size: 12px">МАХСУЛОТДАН ҚОНИҚИШ ТАХОМЕТЕРИ</h4>
      <div style="display: flex;">
        <targetChart
          ref="targetChartRef"
          :loading="gettingData"
          :current-product="current_product"
          @getBySize="sizeChangedHandler"
        />
        <div style="background: #0a2e52; width: 60%; height: 350px; overflow: hidden; border-top-right-radius: 10px;  border-bottom-right-radius: 10px;">
          <el-table
            :data="data"
            height="280"
            :header-cell-class-name="headerCellClassName"
            :row-class-name="rowClassName"
            :header-row-class-name="headerRowClassName"
            style="width: 100%"
            highlight-current-row
            class="custom-table"
            @row-click="rowSelect"
          >
            <el-table-column
              align="center"
              prop="product_name"
              label="Махсулот"
            />
            <el-table-column
              align="center"
              prop="from"
              label="Дан"
            />
            <el-table-column
              align="center"
              prop="to"
              label="Гача"
            />
            <el-table-column
              align="center"
              prop="days_left"
              label="Кун - қолди"
            />
          </el-table>
        </div>
      </div>
    </div>
  </el-col>
</template>

<script>
import request from '@/utils/request'
import targetChart from './targetChart.vue'
export default {
  components: {
    targetChart
  },
  props: {
    filterdate: {
      type: String,
      default: ''
    }

  },
  data() {
    return {
      current_product: {
        product_name: 'Nilufar-1',
        days_left: 13,
        from: '12 oct',
        to: '20 nov',
        percent: 80
      },
      data: [
        {
          product_name: 'Nilufar-1',
          days_left: 13,
          from: '12 oct',
          to: '20 nov',
          percent: 80
        },
        {
          product_name: 'Nilufar-1',
          days_left: 13,
          from: '12 oct',
          to: '20 nov',
          percent: 80
        },
        {
          product_name: 'Nilufar-1',
          days_left: 13,
          from: '12 oct',
          to: '20 nov',
          percent: 80
        },
        {
          product_name: 'Nilufar-1',
          days_left: 13,
          from: '12 oct',
          to: '20 nov',
          percent: 80
        },
        {
          product_name: 'Nilufar-1',
          days_left: 13,
          from: '12 oct',
          to: '20 nov',
          percent: 80
        },
        {
          product_name: 'Nilufar-1',
          days_left: 13,
          from: '12 oct',
          to: '20 nov',
          percent: 80
        },
        {
          product_name: 'Nilufar-1',
          days_left: 13,
          from: '12 oct',
          to: '20 nov',
          percent: 80
        },
        {
          product_name: 'Nilufar-1',
          days_left: 13,
          from: '12 oct',
          to: '20 nov',
          percent: 80
        },
        {
          product_name: 'Nilufar-1',
          days_left: 12,
          from: '12 oct',
          to: '20 nov',
          percent: 30

        },
        {
          product_name: 'Nilufar-1',
          days_left: 123,
          from: '12 oct',
          to: '20 nov',
          percent: 50
        }

      ],
      currentSize: '',
      gettingData: false,
      sizeOptions: []

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
    rowSelect(row) {
      this.$refs.targetChartRef.updateChart(row)
    },
    headerCellClassName() {
      return 'table-cell-style'
    },
    rowClassName() {
      return 'table-row-style'
    },
    headerRowClassName() {
      return 'header-row-class-name'
    },
    async sizeChangedHandler(size) {
      this.gettingData = true
      this.currentSize = size
      try {
        const res = await request({
          url: '/dashboard/product-share-orders',
          method: 'GET',
          params: {
            size: size
          }
        })
        this.gettingData = false
        const chart1st = res.data
        this.$refs.targetChartRef.setChart(chart1st, this.sizeOptions)
      } catch (error) {
        this.gettingData = false
        console.error(error)
      }
    }
  }
}
</script>

<style>
    .custom-e-charts-panel {
        position: relative;
        display:  grid;
        grid-template-rows: auto 1fr;
        grid-template-columns: 1fr;
    }

    .select-size-wrapper {
        grid-column: 3 / span 2;
        grid-row: 1 2;
        position: absolute;
        top: 12px;
        left: 12px;
    }

.el-select.select-size > .el-input > .el-input__inner {
  background-color: transparent !important;
  color: white !important;
  border: 1px solid transparent;
}

.tahometer-table {
  display: flex;

}

.table-cell-style, .table-row-style {
  background-color: #0a2e52 !important;
  color: white;
  /* color: #fffb00 */
}

.table-cell-style {
  border-top-right-radius: 0px;
}

.el-table--enable-row-hover .el-table__body tr.table-row-style:hover > td  {
  background-color: #0d3c6b !important;
}

.el-table th.table-cell-style.is-leaf, .el-table.custom-table td {
  border-bottom: 1px solid #0d3c6b !important;
}

.header-row-class-name > .gutter {
  background-color: #0a2e52 !important;
}

.custom-table > .el-table__body-wrapper::-webkit-scrollbar-thumb  {
  background-color: #224d79;
  border-radius: 8px;
  height: 5px;
}

.custom-table > .el-table__body-wrapper::-webkit-scrollbar-track {
  background-color: #0a2e52;
  border-radius: 0px;
  height: 5px;
}

.el-table__body tr.current-row.table-row-style> td{
  background-color: #09345f! important;
  color: #fff;
}

.el-table.custom-table {
  background: #0a2e52 !important;
}

.custom-table.el-table::before {
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0px;
}

.custom-table > .el-table__body-wrapper {
  background: #0a2e52;
}

.custom-table.el-table tr {
  background-color: #0a2e52;
}

</style>
