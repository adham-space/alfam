<template>
  <el-row style="height: calc(100vh - 86px);">
    <el-col
      style="height: 3rem;"
      class="toolbar-list"
      :span="24"
    >
      <tools />
    </el-col>
    <el-col
      ref="mainPartRef"
      :span="24"
      style="height: calc(100% - 3rem);"
    >
      <el-table
        height="100%"
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
            @click="openImg('https://images.unsplash.com/photo-1612831661153-4914a5ff7851?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2125&q=80')"
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
                :key="whatIsInserting[0] === false ? scope.row.item_num : ''"
                :code="scope.row.code"
                :init="scope.row.packTotalArea + ''"
                @newAreaChanging="calculateNewList"
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
              <newItemNum
                :key="
                  whatIsInserting[1] === false ? scope.row.packTotalArea : ''
                "
                :init="scope.row.item_num + ''"
                :code="scope.row.code"
                @newItemNumChanging="insertingItemNum"
              />
            </template>
          </el-table-column>
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
          >
            <template slot-scope="scope">
              <!-- {{ scope.row.pack_num }} / {{ scope.row.over_pack_num }} -->
              <newPackInserting
                :key="whatIsInserting[2] === false ? scope.row.item_num : ''"
                :init_pack="scope.row.pack_num + ''"
                :init_over_pack="scope.row.over_pack_num + ''"
                :code="scope.row.code"
                :max_num="scope.row.pack_content_num"
                @newPackChanging="newPackChanging_"
              />
            </template>
          </el-table-column>
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
    <el-dialog title="" :visible.sync="showImageDilog" width="40%">
      <el-image
        style="width: 90%; height: 90%"
        :src="imageUrl"
        fit="scale-down"
      />
    </el-dialog>
  </el-row>
</template>

<script>
import calcNewItem from './calcNewItem'
import newItemNum from './insertNewItem_num'
import newPackInserting from './insertNewpac_num'
import tools from './tools'
export default {
  components: {
    calcNewItem,
    newItemNum,
    newPackInserting,
    tools
  },
  data() {
    return {
      showImageDilog: false,
      imageUrl: '',
      maxHeight: 600,
      newArea: '',
      whatIsInserting: [0, 0, 0],
      tableData: [
        {
          code: '1191A',
          spec: 'Ochi',
          size: '30 * 60',
          packTotalArea: '',
          item_num: '',
          pack_num: '',
          over_pack_num: '',
          pack_weight: 25,
          one_item_weight: 3.125,
          weight: '',
          packArea: 1.44,
          itemArea: 0.18,
          pack_content_num: 8
        },
        {
          code: '1191B',
          spec: "To'qi",
          size: '30 * 60',
          packTotalArea: '',
          item_num: '',
          pack_num: '',
          over_pack_num: '',
          pack_weight: 25,
          one_item_weight: 3.125,
          weight: '',
          packArea: 1.44,
          itemArea: 0.18,
          pack_content_num: 8
        },
        {
          code: '1191C',
          spec: 'Dekor',
          size: '30 * 60',
          packTotalArea: '',
          item_num: '',
          pack_num: '',
          over_pack_num: '',
          pack_weight: 25,
          one_item_weight: 3.125,
          weight: '',
          packArea: 1.44,
          itemArea: 0.18,
          pack_content_num: 8
        },
        {
          code: '1191D',
          spec: 'Pol',
          size: '30 * 30',
          packTotalArea: '',
          item_num: '',
          pack_num: '',
          over_pack_num: '',
          pack_weight: 21,
          one_item_weight: 1.4,
          weight: '',
          packArea: 1.35,
          itemArea: 0.09,
          pack_content_num: 15
        },
        {
          code: '1191F',
          spec: 'Friz',
          size: '30 * 6 ',
          packTotalArea: '',
          item_num: '',
          pack_num: '',
          over_pack_num: '',
          pack_weight: 21,
          one_item_weight: 1.4,
          weight: '',
          packArea: 0.72,
          itemArea: 0.018,
          pack_content_num: 40
        },
        {
          code: '1191S',
          spec: 'Sigara',
          size: '30 * 2 ',
          packTotalArea: '',
          item_num: '',
          pack_num: '',
          over_pack_num: '',
          pack_weight: 10,
          one_item_weight: 0.1,
          weight: '',
          packArea: 0.6,
          itemArea: 0.006,
          pack_content_num: 100
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
    openImg(url) {
      this.showImageDilog = true
      this.imageUrl = url
    },
    calculateNewList({ code, newValue }) {
      this.whatIsInserting[0] = true
      this.whatIsInserting[1] = false
      this.whatIsInserting[2] = false
      const currentProduct = this.tableData.find((item) => item.code === code)
      const totalNumberOfItems = (newValue / currentProduct.itemArea).toFixed(
        4
      )
      let errorInNumer = totalNumberOfItems - parseInt(totalNumberOfItems)
      errorInNumer =
        errorInNumer === 0.0
          ? errorInNumer
          : parseFloat(1 - errorInNumer).toFixed(4)
      if (parseFloat(errorInNumer) <= 0.0001) {
        currentProduct.item_num = Math.ceil(totalNumberOfItems)
        currentProduct.pack_num = Math.floor(
          currentProduct.item_num / currentProduct.pack_content_num
        )
        currentProduct.packTotalArea = newValue
        currentProduct.over_pack_num =
          currentProduct.item_num % currentProduct.pack_content_num
      } else {
        currentProduct.item_num = 'XATO'
        currentProduct.pack_num = 'XATO'
        currentProduct.packTotalArea = ''
        currentProduct.over_pack_num = ''
      }
    },
    insertingItemNum({ code, newItemNum }) {
      this.whatIsInserting[0] = false
      this.whatIsInserting[1] = true
      this.whatIsInserting[2] = false
      const currentProduct = this.tableData.find((item) => {
        console.log('itm: ', item)
        return item.code === code
      })
      console.log(newItemNum - parseInt(newItemNum))
      if (newItemNum - parseInt(newItemNum) <= 0.0) {
        newItemNum = parseFloat(newItemNum)
        currentProduct.packTotalArea =
          parseFloat((newItemNum * currentProduct.itemArea).toFixed(4)) + ''

        currentProduct.item_num = newItemNum
        currentProduct.pack_num = Math.floor(
          currentProduct.item_num / currentProduct.pack_content_num
        )
        currentProduct.over_pack_num =
          currentProduct.item_num % currentProduct.pack_content_num
      } else {
        currentProduct.item_num = 'XATO'
        currentProduct.packTotalArea = 'XATO'
        currentProduct.pack_num = 'XATO'
      }
    },
    newPackChanging_({ code, pack, overPack }) {
      this.whatIsInserting[0] = false
      this.whatIsInserting[1] = false
      this.whatIsInserting[2] = true
      const currentProduct = this.tableData.find((item) => item.code === code)
      pack = pack.length > 0 ? parseInt(pack) : 0
      overPack = overPack.length > 0 ? parseInt(overPack) : 0
      console.log('Current product: ', currentProduct)
      if (pack > 0 && pack - parseInt(pack) <= 0.0) {
        currentProduct.item_num = currentProduct.pack_content_num * pack + ''
        currentProduct.packTotalArea =
          parseFloat((pack * currentProduct.packArea).toFixed(4)) + ''
        currentProduct.pack_num = pack + ''
      } else {
        currentProduct.item_num = 'XATO'
        currentProduct.packTotalArea = 'XATO'
        currentProduct.pack_num = ''
      }

      if (overPack > 0) {
        currentProduct.item_num = parseInt(currentProduct.item_num) + overPack
        currentProduct.packTotalArea =
          parseFloat(
            (currentProduct.item_num * currentProduct.itemArea).toFixed(4)
          ) + ''
        currentProduct.over_pack_num = overPack + ''
      } else {
        currentProduct.over_pack_num = 0
      }
    },

    newListEditing(row) {
      console.log('Log: ', row)
    },
    getHeaderCellStyle({ row, column, rowIndex, columnIndex }) {

    },
    setTableHeight() {
      console.log('a: ', this.maxHeight)
      this.maxHeight = this.$refs.mainPartRef.$el.clientHeight - 100
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
</style>
