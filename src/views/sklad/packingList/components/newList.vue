<template>
  <el-row>
    <el-col class="header-section" :span="24">
      <h3 style="color: darkgray">УПАКОВАЧНЫЙ ЛИСТ</h3>
    </el-col>
    <el-col class="header-section" :span="24">
      <h4>Nilufar</h4>
    </el-col>
    <el-col
      ref="mainPartRef"
      :span="24"
      style="height: calc(100vh - 132px); border: 0px solid red"
    >
      <el-table
        :max-height.sync="maxHeight"
        style="width: 100%"
        size="small"
        :data="tableData"
        :header-cell-style="getHeaderCellStyle"
      >
        <el-table-column type="index" label="№" align="center" width="100" />
        <el-table-column
          width="150"
          label="КАФЕЛНИ КОДИ"
          prop="code"
          align="center"
        />
        <el-table-column
          width="150"
          label="СПЕЦИФИКАЦИЯСИ"
          prop="spec"
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
          />
        </el-table-column>
        <el-table-column
          width="300"
          label="УМУМИЙ КОЛИЧЕСТВАНИ ЎЛЧОВ БИРЛИГИ"
          align="center"
        >
          <el-table-column
            width="150"
            label="УМУМИЙ (м2)"
            align="center"
            prop="packTotalArea"
          >
            <template slot-scope="scope">
              <calcNewItem
                :code="scope.row.code"
                @newAreChanging="calculateNewList"
              />
            </template>
          </el-table-column>
          <el-table-column
            width="150"
            label="УМУМИЙ (ДОНАСИ)"
            prop="item_num"
            align="center"
          />
        </el-table-column>
        <el-table-column
          width="155"
          label="ТОВАРНИ УМУМИЙ ПОЧКАСИНИ (МИҚДОРИ)"
          prop=""
          align="center"
        >
          <el-table-column
            width="178"
            align="center"
            prop="pack_num"
            label="ТОВАРНИ УМУМИЙ ДОНАСИНИ (МИҚДОРИ)"
          />
        </el-table-column>
        <el-table-column
          width="160"
          label="ТОВАРНИ УМУМИЙ КИЛОГРАММИ"
          prop="weight"
          align="center"
        />
        <el-table-column
          label="1-ТА ПОЧКАДИГИ КОЛИЧЕСТВАНИ ЎЛЧОВ БИРЛИГИ"
          align="center"
        >
          <el-table-column
            width="140"
            label="ПОЧКАСИДИГИ (м2)"
            align="center"
            prop="packArea"
          />
          <el-table-column
            width="140"
            label="1-ДОНАСИНИ (м2)"
            prop="itemArea"
            align="center"
          />
          <el-table-column
            align="center"
            prop="pack_content_num"
            width="140"
            label="УМУМИЙ ДОНАСИ"
          />
          <el-table-column
            width="140"
            label="ПОЧКАСИДИГИ (КГ)"
            align="center"
            prop="pack_weight"
          />
          <el-table-column
            width="140"
            label="1-ДОНАСИНИ  (КГ)"
            align="center"
            prop="one_item_weight"
          />
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
import calcNewItem from './calcNewItem'
export default {
  components: {
    calcNewItem
  },
  data() {
    return {
      maxHeight: 800,
      newArea: '',
      tableData: [
        {
          code: '1191A',
          spec: 'Ochi',
          size: '15 * 66',
          packTotalArea: '',
          item_num: '',
          pack_num: '',
          pack_weight: 27,
          one_item_weight: 4.5,
          weight: '',
          packArea: 0.99,
          itemArea: 0.099,
          pack_content_num: 10
        },
        {
          code: '1191F',
          spec: 'Friz',
          size: '30 * 5.4',
          packTotalArea: '',
          item_num: '',
          pack_num: '',
          pack_weight: 27,
          one_item_weight: 4.5,
          weight: '',
          packArea: 0.648,
          itemArea: 0.0162,
          pack_content_num: 40
        }
      ]
    }
  },
  mounted() {
    this.setTableHeight()
    window.onresize = () => {
      this.setTableHeight()
    }
  },
  methods: {
    calculateNewList({ code, newValue }) {
      console.log(code, newValue)
      const currentProduct = this.tableData.find((item) => item.code === code)
      const totalNumberOfItems = (newValue / currentProduct.itemArea).toFixed(4)

      let errorInNumer = totalNumberOfItems - parseInt(totalNumberOfItems)
      errorInNumer = errorInNumer === 0.0000 ? errorInNumer : parseFloat(1 - errorInNumer).toFixed(4)
      console.log('error in num: ', errorInNumer)
      console.log(parseFloat(errorInNumer) <= 0.0001)
      if (parseFloat(errorInNumer) <= 0.0001) {
        currentProduct.item_num = Math.ceil(totalNumberOfItems)
      } else {
        currentProduct.item_num = 'XATO'
      }
      // currentProduct.item_num = totalNumberOfItems
      console.log(currentProduct)
    },
    newListEditing(row) {
      console.log('Log: ', row)
    },
    getHeaderCellStyle({ row, column, rowIndex, columnIndex }) {
      //   console.log("Col: ", column);
      //   if (
      //     column.label == "КАФЕЛНИ КОДИ" ||
      //     column.label == "СПЕЦИФИКАЦИЯСИ" ||
      //     column.label == "ТОВАРНИ РАЗМЕРИ" ||
      //     column.label == "ТОВАРНИ РАЗМЕРИ" ||
      //     column.label == "ТОВАРНИ РАСМИ" ||
      //     column.label == "ПОЧКАСИДИГИ (м2)" ||
      //     column.label == "1-ДОНАСИНИ (м2)"
      //   ) {
      //     return { "background-color": "yellow", color: "black" };
      //   } else if (
      //     column.label == "УМУМИЙ КОЛИЧЕСТВАНИ ЎЛЧОВ БИРЛИГИ" ||
      //     column.label == "УМУМИЙ (м2)" ||
      //     column.label == "УМУМИЙ (ДОНАСИ)"  ||
      //     column.label == 'УМУМИЙ ДОНАСИ'
      //   ) {
      //     return { "background-color": "#dadada", color: "black" };
      //   } else if (
      //     column.label == "ТОВАРНИ УМУМИЙ ПОЧКАСИНИ (МИҚДОРИ)" ||
      //     column.label == "ТОВАРНИ УМУМИЙ ДОНАСИНИ (МИҚДОРИ)"||
      //     column.label == 'ПОЧКАСИДИГИ (КГ)' ||
      //     column.label == '1-ДОНАСИНИ  (КГ)'
      //   ) {
      //     return {
      //       "background-color": "#ffe48a",
      //       color: "black",
      //     };
      //   } else if (
      //     column.label == "ТОВАРНИ УМУМИЙ ПОЧКАСИНИ (КИЛОГРАММИ)" ||
      //     column.label == "ТОВАРНИ УМУМИЙ ДОНАСИНИ (КИЛОГРАММИ)"
      //   ) {
      //     return {
      //       "background-color": "#97ffb9",
      //       color: "black",
      //     };
      //   } else if (
      //     column.label == "1-ТА ПОЧКАДИГИ КОЛИЧЕСТВАНИ ЎЛЧОВ БИРЛИГИ"  ) {
      //     return {
      //       "background-color": "#65d3ff",
      //       color: "black",
      //     };
      //   } else if (
      //     column.label == "1-ТА ПОЧКАДИГИ КОЛИЧЕСТВАНИ ЎЛЧОВ БИРЛИГИ"  ) {
      //     return {
      //       "background-color": "#65d3ff",
      //       color: "black",
      //     };
      //   }
    },
    setTableHeight() {
      console.log('a: ', this.maxHeight)
      this.maxHeight = this.$refs.mainPartRef.$el.clientHeight
      console.log('b: ', this.maxHeight)
    }
  }
}
</script>

<style>
.header-section {
  height: 3em;
  display: flex;
  justify-content: center;
}
</style>
