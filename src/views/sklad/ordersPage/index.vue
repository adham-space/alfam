<template>
  <el-row style="height: calc(100vh - 50px)">
    <el-col :span="9" style="height: calc(100vh - 50px);">
      <el-table
        v-loading="tableLoading"
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
          label="Product"
        />
        <el-table-column
          prop="address"
          width="150"
          align="center"
          fixed="right"
          label="Action"
        >
          <template slot-scope="scope">
            <div class="action-btns">
              <el-tooltip effect="dark" content="Accept" placement="left-start">
                <el-button :disabled="order_processing" :icon="order_processing ?'el-icon-loading' :'el-icon-check'" class="action-btn" @click="accept(scope.row._id)" />
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="Reject" placement="right-start">
                <el-button :disabled="order_processing" icon="el-icon-close" style="color: red;" class="action-btn" @click="reject(scope.row._id)" />
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <el-col :span="15" style="height: calc(100vh - 50px)">
      <el-table
        height="100%"
        style="width: 100%"
        size="small"
        :data="currentOrderProducts"
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
        >
          <template slot-scope="scope">
            {{ scope.row.type_name + (scope.row.broken ? ' - broken': '') }}
          </template>
        </el-table-column>

        <el-table-column
          width="150"
          label="ТОВАРНИ РАЗМЕРИ"
          prop="size"
          align="center"
        />

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
              {{ scope.row.packTotalArea }}
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
                {{ scope.row.item_num }}
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
              {{ scope.row.pack_num }} / {{ scope.row.over_pack_num }}
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column
          width="150"
          label="ТОВАРНИ УМУМИЙ КИЛОГРАММИ"
          prop="weight"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.weight_of_an_item * scope.row.item_num }}
          </template>
        </el-table-column>
        <el-table-column
          width="150"
          label="ТОВАРНИ РАСМИ"
          prop="photo"
          align="center"
        >
          <template slot-scope="scope">
            <el-image
              style="width: 30px; height: 30px"
              :src="scope.row.photo_path"
              fit="scale-down"
              @click="openImg(scope.row.photo_path)"
            />
          </template>
        </el-table-column>

      </el-table>
    </el-col>
    <el-dialog title="" :visible.sync="showImageDilog" width="40%">
      <el-image
        style="width: 100%"
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
    currentOrderProducts: [],
    order_processing: false
  }),
  computed: {
    ...mapState('orders', ['zavskladOrders', 'tableLoading'])
  },
  mounted() {
    this.GET_ZAVSKLAD_ORDERS()
  },
  methods: {
    ...mapActions('orders', ['GET_ZAVSKLAD_ORDERS', 'SET_ORDER_STATUS']),
    choseOrder(row) {
      this.currentOrderProducts = row.products
      console.log(this.currentOrderProducts)
    },
    openImg(url) {
      this.showImageDilog = true
      this.imageUrl = url
    },
    accept(id) {
      this.order_processing = true
      this.SET_ORDER_STATUS({ status: 1, order_id: id }).then(() => {
        this.order_processing = false
        this.currentOrderProducts = []
        this.GET_ZAVSKLAD_ORDERS()
      }).catch(err => {
        console.error(err)
        this.order_processing = false
      })
    },
    reject(id) {
      this.order_processing = true
      this.SET_ORDER_STATUS({ status: 0, order_id: id }).then(() => {
        this.order_processing = false
        this.currentOrderProducts = []
        this.GET_ZAVSKLAD_ORDERS()
      }).catch(err => {
        console.error(err)
        this.order_processing = false
      })
    }
  }
}
</script>

<style>
.action-btns {
    display: flex;
    align-items: center;
    justify-content: space-between;

}

.action-btn {
    color: green;
    border: 1px solid transparent;
    margin: 0 !important
}
</style>
