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
              />
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
              />
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
          />
        </template>
      </el-table-column>
      <el-table-column
        width="160"
        label="СУММАСИ"
        prop="sum"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.sum }}
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
    }
  },
  methods: {
    openImg(url) {
      this.showImageDilog = true
      this.imageUrl = url
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
