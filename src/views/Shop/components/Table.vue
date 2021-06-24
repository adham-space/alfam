<template>
  <div style="height: calc(100vh - 86px)">
    <el-table
      height="100%"
      style="width: 100%"
      size="small"
      :data="tableData"
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
            <div class="two-fields">
              <el-input
                size="small"
                type="number"
                :min="0"
                :value="scope.row.packTotalArea"
                @input="areaIsChanging($event, scope.row)"
              >
              </el-input>
            </div>


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
              >
              </el-input>
           </div>
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
            <div class="two-fields">
              <div class="two-fields">
              <el-input
                size="small"
                :value="scope.row.pack_num"
                @input="pack_numIsChanging($event, scope.row)"
              >
              </el-input>
           </div> 
           
           <div class="two-fields">
              <el-input
                size="small"
                :value="scope.row.over_pack_num"
                @input="over_pack_numIsChanging($event, scope.row)"
              >
              </el-input>
           </div>
            </div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column
        width="160"
        label="ТАН НАРХИ"
        prop="basePrice"
        align="center"
      >
        <template slot-scope="scope">
              <el-input
                size="small"
                :value="scope.row.basePrice"
                @input="basePriceIsChanging($event, scope.row)"
              >
              </el-input>
        </template>
      </el-table-column>
      <el-table-column
        width="160"
        label="СУММАСИ"
        prop="sum"
        align="center"
      >
        <template slot-scope="scope">
          {{scope.row.sum}}
        </template>
      </el-table-column>
      <el-table-column
        width="150"
        label="ТОВАРНИ УМУМИЙ КИЛОГРАММИ"
        prop="weight"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="1-ТА ПОЧКАДИГИ КОЛИЧЕСТВАНИ ЎЛЧОВ БИРЛИГИ"
        align="center"
      >
        <el-table-column
          width="160"
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
          width="160"
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
    <el-dialog title="" :visible.sync="showImageDilog" width="40%">
      <el-image
        style="width: 100%; height: 90%"
        :src="imageUrl"
        fit="scale-down"
      />
    </el-dialog>
  </div>
</template>

<script>
import calcNewItem from './calcNewItem'
import newItemNum from './insertNewItem_num'
import newPackInserting from './insertNewpac_num'
import data_ from './mixins/data_.js'
import methods_ from './mixins/methods_.js'
export default {
  components: {
    calcNewItem,
    newItemNum,
    newPackInserting
  },
  mixins: [data_, methods_ ],
  data() {
    return {
    }
  },
  methods: {
    openImg(url) {
      this.showImageDilog = true
      this.imageUrl = url
    },
    basePriceChanged(event, row) {
      const currentProduct = this.tableData.find((item) => item.code === row.code)
      currentProduct.basePrice = event;
      if(event && currentProduct.packTotalArea) {
        currentProduct.sum = (event * parseFloat(currentProduct.packTotalArea).toFixed(4)).toFixed(1)
      } else {
        currentProduct.sum = 0;
      }
    },
    calculateArea({ code, newValue }) { // calculate new area
      this.whatIsInserting[0] = true
      this.whatIsInserting[1] = false
      this.whatIsInserting[2] = false
      const currentProduct = this.tableData.find((item) => item.code === code) // find the current product which is calculating
      const totalNumberOfItems = (newValue / currentProduct.itemArea).toFixed(
        4
      )
      let errorInNumer = totalNumberOfItems - parseInt(totalNumberOfItems) // whether wrong number of are (m2) entered
      errorInNumer =
        errorInNumer === 0.0
          ? errorInNumer
          : parseFloat(1 - errorInNumer).toFixed(4)
      if (parseFloat(errorInNumer) <= 0.0001 && newValue) { // if error is less or equal to 0.0001 is ok else it should be fixed
        currentProduct.item_num = Math.ceil(totalNumberOfItems)
        currentProduct.pack_num = Math.floor(
          currentProduct.item_num / currentProduct.pack_content_num
        )
        currentProduct.packTotalArea = newValue
        currentProduct.sum = (currentProduct.basePrice * parseFloat(currentProduct.packTotalArea).toFixed(4)).toFixed(1)
        currentProduct.over_pack_num =
          currentProduct.item_num % currentProduct.pack_content_num
        currentProduct.weight = currentProduct.item_num * currentProduct.one_item_weight // find weight using all items multipled by weight of single item
      } else { // else give user feedback about error
        currentProduct.item_num = 'XATO'
        currentProduct.pack_num = 'XATO'
        currentProduct.packTotalArea = ''
        currentProduct.over_pack_num = ''
        currentProduct.weight = ''
        currentProduct.sum = 0;

      }
    },
    calculateTotalNumOfItems({ code, newItemNum }) {
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
        currentProduct.sum = (currentProduct.basePrice * parseFloat(currentProduct.packTotalArea).toFixed(4)).toFixed(1)
        currentProduct.item_num = newItemNum
        currentProduct.pack_num = Math.floor(
          currentProduct.item_num / currentProduct.pack_content_num
        )
        currentProduct.over_pack_num =
          currentProduct.item_num % currentProduct.pack_content_num
        currentProduct.weight = currentProduct.item_num * currentProduct.one_item_weight
      } else {
        currentProduct.item_num = 'XATO'
        currentProduct.packTotalArea = 'XATO'
        currentProduct.pack_num = 'XATO'
        currentProduct.weight = ''
        currentProduct.sum = 0
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
        currentProduct.sum = (currentProduct.basePrice * parseFloat(currentProduct.packTotalArea).toFixed(4)).toFixed(1)
        currentProduct.pack_num = pack + ''
        currentProduct.weight = currentProduct.item_num * currentProduct.one_item_weight
      } else {
        currentProduct.item_num = 'XATO'
        currentProduct.packTotalArea = 'XATO'
        currentProduct.pack_num = ''
        currentProduct.weight = ''
        currentProduct.sum = 0;
      }
      if (overPack > 0) {
        currentProduct.item_num = parseInt(currentProduct.item_num) + overPack
        currentProduct.packTotalArea =
          parseFloat(
            (currentProduct.item_num * currentProduct.itemArea).toFixed(4)
          ) + ''
        currentProduct.sum = (currentProduct.basePrice * parseFloat(currentProduct.packTotalArea).toFixed(4)).toFixed(1)
        currentProduct.over_pack_num = overPack + ''
        currentProduct.weight = currentProduct.item_num * currentProduct.one_item_weight
      } else {
        currentProduct.over_pack_num = 0
        currentProduct.weight = ''
        currentProduct.sum = 0;
      }
    },
    newListEditing(row) {
      console.log('Log: ', row)
    },
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
