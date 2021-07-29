<template>
  <el-col :span="24" class="orders-page-body">
    <el-table
      style="width: 100%"
      height="calc(100% - 3.5rem)"
      :data="orders"
      stripe
      highlight-current-row
      @row-click="orderChosed"
    >
      <el-table-column type="expand">
        <!-- eslint-disable-next-line -->
        <template slot-scope="scope">
          <el-table
            :data="scope.row.products"
            :show-header="false"
            stripe
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
              <!-- eslint-disable-next-line  -->
              <template slot-scope="scope">
                <el-image
                  style="width: 30px; height: 30px"
                  :src="'http://localhost:3000/' + scope.row.photo"
                  fit="scale-down"
                  @click="openImg('http://localhost:3000/' + scope.row.photo)"
                />
              </template>
            </el-table-column>
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
        </template>
      </el-table-column>
      <el-table-column width="100" align="center" prop="_id" label="ID">
        <template slot-scope="scope">
          {{ scope.row._id.substr(0, 6) }}
        </template>
      </el-table-column>
      <el-table-column
        width="160"
        align="center"
        prop="order_name"
        label="Order No"
      />
      <el-table-column
        width="170"
        align="center"
        prop="product"
        label="Product"
      />
      <el-table-column width="170" align="center" label="Area ㎡">
        <template slot-scope="scope">
          {{ parseFloat(getTotalAre(scope.row.products).packTotalArea.toFixed(4)) }}
        </template>
      </el-table-column>
      <el-table-column width="170" align="center" label="Number of items">
        <template slot-scope="scope">

          <el-popover
            placement="right"
            trigger="hover">
            <el-table :show-header="false" :data="gridData(scope.row.products)">
              <el-table-column align="center" width="120" property="name" label="name"></el-table-column>
              <el-table-column align="center" width="100" property="value" label="value"></el-table-column>
            </el-table>
            <el-button type="text" slot="reference">{{ getTotalNumber(scope.row.products).item_num }}</el-button>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column width="170" align="center" label="Pack / Overpack num">
        <template slot-scope="scope">
          {{ getPackNumber(scope.row.products).pack_num }} / {{ getOverPackNumber(scope.row.products).over_pack_num }}
        </template>
      </el-table-column>

      <el-table-column width="170" align="center" prop="last_sum" label="Price" />
      <el-table-column
        width="180"
        align="center"
        prop="customer"
        label="Customer"
      >
        <template slot-scope="scope">
          {{ `${scope.row.customer.firstName} ${scope.row.customer.lastName}` }}
        </template>
      </el-table-column>
      <!-- <el-table-column
        width="170"
        align="center"
        prop="purchase_amount"
        label="Purchases"
      /> -->
      <el-table-column
        width="230"
        align="center"
        prop="address"
        label="Address"
      >
        <template slot-scope="scope">
          {{ scope.row.customer.address }}
        </template>
      </el-table-column>
      <el-table-column width="180" align="center" prop="driver" label="Driver">
        <template slot-scope="scope">
          {{ `${scope.row.driver.firstName} ${scope.row.driver.lastName}` }}
        </template>
      </el-table-column>
    </el-table>
    <div class="pgntion">
      <Pagination :total="102" :page="1" :limit="20" />
    </div>
    <el-dialog title="" :visible.sync="showImageDilog" append-to-body width="40%">
      <el-image
        style="width: 100%; height: 90%"
        :src="imageUrl"
        fit="scale-down"
      />
    </el-dialog>
  </el-col>
</template>

<script>
import Pagination from '@/components/Pagination'
import { mapMutations, mapState, mapActions } from 'vuex'

export default {
  components: {
    Pagination
  },
  data: () => ({
    showImageDilog: false,
    imageUrl: ''
  }),
  computed: {
    ...mapState('orders', ['orders'])
  },
  mounted() {
    this.GET_ORDERS()
  },
  beforeDestroy() {
    this.SET_ORDER(null)
  },
  methods: {
    ...mapMutations('orders', ['SET_ORDER']),
    ...mapActions('orders', ['GET_ORDERS']),
    openImg(url) {
      this.showImageDilog = true
      this.imageUrl = url
    },
    orderChosed(row, column, event) {
      this.SET_ORDER(row)
    },
    getTotalAre(products) {
      return products.reduce((a, b) => ({ packTotalArea: a.packTotalArea + b.packTotalArea }))
    },
    getTotalNumber(products) {
      return products.reduce((a, b) => ({ item_num: a.item_num + b.item_num }))
    },
    getPackNumber(products) {
      return products.reduce((a, b) => ({ pack_num: a.pack_num + b.pack_num }))
    },
    getOverPackNumber(products) {
      return products.reduce((a, b) => ({ over_pack_num: a.over_pack_num + b.over_pack_num }))
    },
    gridData(products) {
      let dataItem  = {
        name: '',
        value: ''
      }
      let data = []
      products.forEach(product => {
        console.log('broken: ', product.is_broken)
        dataItem.name = product.type_name + (product.is_broken ? ' - broken' : '')
        dataItem.value = product.item_num
        data.push(dataItem)
        dataItem  = {
          name: '',
          value: ''
        }
      })

      return data;
    }
  }
}
</script>

<style>
</style>
