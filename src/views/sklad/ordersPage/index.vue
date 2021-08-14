<template>
  <el-row style="height: calc(100vh - 86px)">
    <el-col :span="9" style="height: calc(100vh - 86px);">
      <el-table
        :data="zavskladOrders"
        style="width: 100%"
        height="100%"
        border
        :highlight-current-row="true"
        @row-click="choseOrder"
      >
        <el-table-column
          align="center"
          label="Do'kon nomi"
          width="200"
        >
          <template slot-scope="scope">
            {{ scope.row.user.stuff.shop.name }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          width="200"
          label="Haridor"
        >
          <template slot-scope="scope">
            {{ scope.row.customer.firstName + ' ' + scope.row.customer.lastName }}
          </template>
        </el-table-column>
        <el-table-column
          width="200"
          prop="product"
          align="center"
          label="Status"
        >
          <!-- <template slot-scope="scope">

          </template> -->
        </el-table-column>
        <el-table-column
          prop="address"
          width="100"
          align="center"
          fixed="right"
          label="Action"
        >
          <template slot-scope="">
            <div class="action-btns">
              <el-tooltip style="width: 50%" effect="dark" content="Top Left prompts info" placement="left-start">
                <el-button type="text" icon="el-icon-check" class="action-btn" />
              </el-tooltip>
              <el-tooltip style="width: 50%" class="item" effect="dark" content="Top Left prompts info" placement="right-start">
                <el-button type="text" icon="el-icon-close" style="color: red;" class="action-btn" />
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <el-col :span="15" style="height: calc(100vh - 86px)">
      <el-table
        height="100%"
        style="width: 100%"
        size="small"
        :data="currentOrderProducts"
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
          label="УМУМИЙ КОЛИЧЕСТВАНИ ЎЛЧОВ БИРЛИГИ"
          align="center"
        >
          <el-table-column
            width="150"
            label="УМУМИЙ (м2)"
            align="center"
            prop="packTotalArea"
          />
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
          >
            -                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         </el-table-column>
        </el-table-column>
        <el-table-column
          width="160"
          label="ТОВАРНИ УМУМИЙ КИЛОГРАММИ"
          prop="weight"
          align="center"
        />
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
import { mapActions, mapState } from 'vuex'
// import tools from './components/tools'
export default {
  name: 'OrdersPage',
  // components: {
  //   tools
  // },
  data: () => ({
    showImageDilog: false,
    imageUrl: '',
    currentOrderProducts: []
  }),
  computed: {
    ...mapState('orders', ['zavskladOrders'])
  },
  mounted() {
    this.GET_ZAVSKLAD_ORDERS()
  },
  methods: {
    ...mapActions('orders', ['GET_ZAVSKLAD_ORDERS']),
    choseOrder(row) {
      this.currentOrderProducts = row.products
    },
    openImg(url) {
      this.showImageDilog = true
      this.imageUrl = url
    }
  }
}
</script>

<style>
.action-btns {
    display: flex;
    align-items: center;

}

.action-btn {
    color: green;
    border: 1px solid transparent;
    margin: 0 !important
}
</style>
