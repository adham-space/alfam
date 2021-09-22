<template>
  <el-col
    :md="{span: 11}"
    :lg="{span: 11}"
    :sm="{span: 24}"
    :xm="{span: 24}"
    class="custom-e-charts-panel tahometer-table"
    style="border-radius: 10px; overflow: hidden; margin-top: 10px"
  >

    <div style="background: #0a2e52; width: 100%; height: 375px; overflow: hidden; border-radius: 10px; padding: 0 1em">
      <h4 style="text-align: center; color: white; display: flex; align-items: center; justify-content: center; font-size: 12px">ҚАРЗДОРЛАР</h4>
      <el-input v-model="filterTableValue" prefix-icon="el-icon-search" class="filter-input" />

      <el-table
        :data="tableData"
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
          :min-width="190"
          prop="customer"
          label="Ҳаридор"
        />
        <el-table-column
          align="center"
          :min-width="120"
          prop="product_name"
          label="Махсулот"
        />
        <el-table-column
          align="center"
          :min-width="120"
          prop="area"
          label="Юзаси (м2)"
        />
        <el-table-column
          align="center"
          prop="cost"
          :min-width="120"
          label="Суммаси"
        />
        <el-table-column
          align="center"
          :min-width="120"
          prop="debt_return_date"
          label="Тўлов санаси"
        />
      </el-table>
    </div>
  </el-col>
</template>

<script>
import request from '@/utils/request'
export default {
  data() {
    return {
      current_product: {
        product_name: 'Nilufar-1',
        days_left: 13,
        from: '12 oct',
        to: '20 nov',
        percent: 80
      },
      table_data: [
        {
          product_name: 'Nilufar-1',
          customer: 'Adham Muhammadjonov',
          debt_return_date: '12 oct',
          cost: 1200,
          area: 250
        }
      ],
      filterTableValue: '',
      currentSize: '',
      gettingData: false,
      sizeOptions: []

    }
  },
  computed: {
    tableData() {
      if (this.filterTableValue) {
        return this.table_data.filter(d => {
          if (d.product_name.toLowerCase().includes(this.filterTableValue.toLowerCase()) || d.customer.toLowerCase().includes(this.filterTableValue.toLowerCase())) { return true }
          return false
        })
      } else {
        return this.table_data
      }
    }
  },
  mounted() {
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
    },
    headerCellClassName() {
      return 'table-cell-style'
    },
    rowClassName() {
      return 'table-row-style'
    },
    headerRowClassName() {
      return 'header-row-class-name'
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
}

.custom-table > .el-table__body-wrapper::-webkit-scrollbar-track {
  background-color: #0a2e52;
  border-radius: 0px;
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
