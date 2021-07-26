<template>
  <div ref="tblContainer1" style="height: calc(100vh - 86px)">
    <el-table
      :max-height="bodyHeight + ''"
      style="width: 100%"
      size="small"
      :data="tableDataComputed"
      show-summary
      :summary-method="jamiSumma"
    >
      <el-table-column
        width="150"
        label="КАФЕЛНИ КОДИ"
        prop="code"
        fixed="left"
        align="center"
      />
      <el-table-column
        width="150"
        label="СПЕЦИФИКАЦИЯСИ"
        prop="type_name"
        align="center"
      />
      <el-table-column
        width="150"
        label="ТОВАРНИ РАЗМЕРИ"
        prop="size"
        align="center"
      />
      <el-table-column
        width="150"
        label="ТОВАРНИ РАСМИ"
        prop="photo"
        align="center"
      >
        <el-image
          style="width: 30px; height: 30px"
          src="https://images.unsplash.com/photo-1612831661153-4914a5ff7851?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2125&q=80"
          fit="scale-down"
          @click="openImg('https://images.unsplash.com/photo-1612831661153-4914a5ff7851?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2125&q=80')"
        />
      </el-table-column>
      <el-table-column
        width="300"
        label="УМУМИЙ МИҚДОРНИ ЎЛЧОВ БИРЛИГИ"
        align="center"
      >
        <el-table-column
          width="150"
          label="УМУМИЙ (м2)"
          align="center"
          prop="packTotalArea"
        >
          <template slot-scope="scope">
            <el-input
              size="small"
              type="number"
              :value="scope.row.packTotalArea"
              @input="areaIsChanging($event, scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column
          width="150"
          label="УМУМИЙ (ДОНАСИ)"
          prop="item_num"
          align="center"
        >
          <template slot-scope="scope">
            <div class="two-fields">
              <el-input
                size="small"
                :value="scope.row.item_num"
                @input="item_numIsChanging($event, scope.row)"
              />
            </div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column
        width="155"
        align="center"
      >
        <template slot="header" slot-scope="">
          <span>ТОВАРНИ УМУМИЙ</span><br>
          <span>ПОЧКАСИНИЙ</span><br>
          <span>(МИҚДОРИ)</span><br>
        </template>
        <el-table-column
          width="178"
          align="center"
          prop="pack_num"
        >
          <template slot="header" slot-scope="">
            <span>ТОВАРНИ УМУМИЙ</span><br>
            <span>ДОНАСИНИ</span><br>
            <span>(МИҚДОРИ)</span><br>
          </template>
          <template slot-scope="scope">
            <div class="two-fields">
              <div class="two-fields">
                <el-input
                  size="small"
                  :value="scope.row.pack_num"
                  @input="pack_numIsChanging($event, scope.row)"
                />
              </div>

              <div class="two-fields">
                <el-input
                  size="small"
                  :value="scope.row.over_pack_num"
                  @input="over_pack_numIsChanging($event, scope.row)"
                />
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column
        width="100"
        prop="base_price"
        align="center"
      >
        <template slot="header" slot-scope="">
          <span>ТАН НАРХИ</span><br>
          <span>m2 / Dona</span>
        </template>
        <template slot-scope="scope">
          <el-tooltip style="margin-right: 1em" effect="dark" :content=" scope.row.price_by ? 'Price by item number' : 'Price by area (m2)'" placement="left">
            <el-switch :value="scope.row.price_by" active-color="#13ce66" inactive-color="" @change="calcPriceprice_byChanged($event, scope.row)" />
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column
        width="120"
        label="ТАН НАРХИ"
        prop="base_price"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.base_price }}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="130"
        prop="sum_kassa"
        align="center"
      >
        <template slot="header">
          <span>СУММАСИ</span><br>
          <span>КАССА</span>
        </template>
      </el-table-column>

      <el-table-column
        width="130"
        prop="base_price_changed"
        align="center"
      >
        <template slot="header">
          <span>ЎЗГАРГАН</span><br>
          <span>ТАН НАРХИ</span>
        </template>

        <template slot-scope="scope">
          <el-input
            size="small"
            type="number"
            :value="scope.row.base_price_changed"
            @input="base_priceIsChanging($event, scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column
        width="130"
        label="СУММАСИ"
        prop="sum"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.sum.toFixed(2) }}
        </template>
      </el-table-column>
      <el-table-column
        width="150"
        label="ТОВАРНИ УМУМИЙ КИЛОГРАММИ"
        prop="weight"
        align="center"
      />
      <el-table-column
        label="1-ТА ПОЧКАДИГИ КОЛИЧЕСТВАНИ ЎЛЧОВ БИРЛИГИ"
        align="center"
      >
        <el-table-column
          width="160"
          label="ПОЧКАСИДИГИ (м2)"
          align="center"
          prop="area_of_one_packet"
        />
        <el-table-column
          width="140"
          label="1-ДОНАСИНИ (м2)"
          prop="area_of_an_item"
          align="center"
        />
        <el-table-column
          align="center"
          prop="number_of_items"
          width="140"
          label="УМУМИЙ ДОНАСИ"
        />
        <el-table-column
          width="160"
          label="ПОЧКАСИДИГИ (КГ)"
          align="center"
          prop="wight_of_one_packet"
        />
        <el-table-column
          width="140"
          label="1-ДОНАСИНИ  (КГ)"
          align="center"
          prop="weight_of_an_item"
        />
      </el-table-column>
    </el-table>
    <el-dialog title="" :visible.sync="showImageDilog" append-to-body width="40%">
      <el-image
        style="width: 100%; height: 90%"
        :src="imageUrl"
        fit="scale-down"
      />
    </el-dialog>
  </div>
</template>

<script>
import data_ from './mixins/data_.js'
import methods_ from './mixins/methods_.js'
export default {
  components: {

  },
  mixins: [data_, methods_],
  data() {
    return {
      bodyHeight: 300
    }
  },
  mounted() {
    setTimeout(() => {
      this.bodyHeight = this.$refs.tblContainer1.clientHeight
    }, 300)
    window.addEventListener('resize', e => {
      console.log('windows resizing')
      this.bodyHeight = this.$refs.tblContainer1.clientHeight
    })
  },
  methods: {
    openImg(url) {
      this.showImageDilog = true
      this.imageUrl = url
    },
    jamiSumma(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = 'Жами'
          // return;
        }
        if (
          column.property === 'packTotalArea' ||
          column.property === 'item_num' ||
          column.property === 'sum' ||
          column.property === 'sum_kassa'
        ) {
          const values = data.map((item) => Number(item[column.property]))
          if (!values.every((value) => isNaN(value))) {
            const val = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                return prev + curr
              } else {
                return prev
              }
            }, 0)
            sums[index] = val.toFixed(2)
          } else {
            sums[index] = ''
          }
        }
      })
      this.$nextTick(() => {
        // this.$refs.myTableDHJ.doLayout()
      })
      return sums
    }
  }
}
</script>

<style>
.header-section {
  height: 3em;
  display: flex;
  justify-content: center;
  margin: 0 !important;
}

.list-main {
  /* border: 1px solid green; */
  height: calc(100% - 105px);
  margin: 0 !important;
}
.el-tabs__header {
  margin: 0 !important;
}

.toolbar-list {
  display: flex;
  align-items: center;
  padding: 0 0.5em;
}

.two-fields {
  display: flex;
  flex-flow: column;
}
</style>
