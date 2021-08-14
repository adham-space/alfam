<template>
  <el-col :span="24" class="orders-page-body">
    <el-table
      v-loading="tableLoading"
      style="width: 100%"
      height="calc(100% - 3.5rem)"
      :data="orders"
      stripe
      highlight-current-row
      @row-dblclick="rowChosen"
      @row-click="orderChosed"
    >
      <el-table-column type="expand" fixed="left">
        <!-- eslint-disable-next-line -->
        <template slot-scope="scope">
          <div class="inner-table">
            <el-table
              :data="scope.row.products"
              :show-header="true"
              style="width: 80%"
              stripe
            >
              <el-table-column
                label="КАФЕЛНИ КОДИ"
                prop="code"
                fixed="left"
                align="center"
              />
              <el-table-column
                label="СПЕЦИФИКАЦИЯСИ"
                prop="type_name"
                align="center"
              />
              <el-table-column
                label="ТОВАРНИ РАЗМЕРИ"
                prop="size"
                align="center"
              />
              <el-table-column
                label="ТОВАРНИ РАСМИ"
                prop="photo"
                align="center"
              >
                <!-- eslint-disable-next-line  -->
              <template slot-scope="scope">

                  <el-image
                    style="width: 50px; height: 50px"
                    :src="'http://localhost:3000/' + scope.row.photo_path"
                    fit="scale-down"
                    @click="openImg('http://localhost:3000/' + scope.row.photo_path)"
                  />
                </template>
              </el-table-column>
              <el-table-column
                label="1-ТА ПОЧКАДИГИ КОЛИЧЕСТВАНИ ЎЛЧОВ БИРЛИГИ"
                align="center"
              >
                <el-table-column
                  label="ПОЧКАСИДИГИ (м2)"
                  align="center"
                  prop="area_of_one_packet"
                />
                <el-table-column
                  label="1-ДОНАСИНИ (м2)"
                  prop="area_of_an_item"
                  align="center"
                />
                <el-table-column
                  align="center"
                  prop="number_of_items"
                  label="УМУМИЙ ДОНАСИ"
                />
                <el-table-column
                  label="ПОЧКАСИДИГИ (КГ)"
                  align="center"
                  prop="wight_of_one_packet"
                />
                <el-table-column
                  label="1-ДОНАСИНИ  (КГ)"
                  align="center"
                  prop="weight_of_an_item"
                />
              </el-table-column>
            </el-table>
          </div>
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
      <el-table-column width="170" align="center">
        <template slot="header">
          <span>Area m<sup>2</sup></span>
        </template>
        <template slot-scope="scope">
          {{ parseFloat(getTotalAre(scope.row.products).packTotalArea.toFixed(4)) }}
        </template>
      </el-table-column>
      <el-table-column width="170" align="center" label="Number of items">
        <template slot-scope="scope">

          <el-popover
            placement="right"
            trigger="hover"
          >
            <el-table :show-header="false" :data="gridData(scope.row.products)">
              <el-table-column align="center" width="120" property="name" label="name" />
              <el-table-column align="center" width="100" property="value" label="value" />
            </el-table>
            <el-button slot="reference" type="text">{{ getTotalNumber(scope.row.products).item_num }}</el-button>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column width="170" align="center" label="Pack / Overpack num">
        <template slot-scope="scope">
          {{ getPackNumber(scope.row.products).pack_num }} / {{ getOverPackNumber(scope.row.products).over_pack_num }}
        </template>
      </el-table-column>

      <el-table-column align="center" prop="last_sum" label="Price">
        <template slot-scope="scope">

          <el-popover
            placement="right"
            trigger="hover"
          >
            <el-table :show-header="false" :data="gridDataPrice(scope.row.products)">
              <el-table-column align="center" width="120" property="name" label="name" />
              <el-table-column align="center" width="100" property="value" label="value">
                <!-- eslint-disable-next-line -->
                <template slot-scope="scope">
                  <span>  {{ parseFloat(scope.row.value.toFixed(4)) }}</span>
                </template>
              </el-table-column>
            </el-table>
            <el-button slot="reference" type="text">
              {{ parseFloat(scope.row.last_sum.toFixed(4)) }}
            </el-button>
          </el-popover>
        </template>
      </el-table-column>

      <!-- <el-table-column width="170" align="center" prop="last_sum" label="Price">
        <template slot-scope="scope">
          {{ parseFloat(scope.row.last_sum.toFixed(4)) }}
        </template>
      </el-table-column> -->
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
      <el-table-column v-if="roles.includes('admin')" width="180" align="center" label="Stuff">
        <template slot-scope="scope">
          {{ scope.row.user.stuff.firstName + ' ' + scope.row.user.stuff.lastName }}
        </template>
      </el-table-column>
      <el-table-column width="80" align="center" label="Actuality" fixed="right">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            :content="scope.row.actuality_status ? 'Open':'Closed'"
            placement="left-start"
          >
            <el-checkbox
              :value="scope.row.actuality_status"
              :disabled="!!!scope.row.actuality_status"
              @change="closeCurrentOrder(scope.row)"
            />
          </el-tooltip>
          <!-- <el-tooltip v-else>
            <i class="el-icon-check" />
          </el-tooltip> -->
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
// import request from '@/utils/request'
// import { Message } from 'element-ui'
export default {
  name: 'OrderInventar',
  components: {
    Pagination
  },
  data: () => ({
    showImageDilog: false,
    actuality: false,
    imageUrl: '',
    statuses: ['el-icon-loading', 'el-icon-error', 'el-icon-success'],
    statuses_text: ['Waiting approvement', 'Order ejected', 'Order accepted'],
    statuses_color: ['gray', 'red', 'green']
  }),
  computed: {
    ...mapState('user', ['roles']),
    ...mapState('orders', ['orders', 'tableLoading', 'currentOrderHeader'])
  },
  mounted() {
    this.GET_ORDERS()
  },
  beforeDestroy() {
    this.SET_ORDER(null)
  },
  methods: {
    ...mapMutations('orders', ['SET_ORDER', 'SET_CURRENT_ORDER_HEADER', 'SET_CURRENT_TABLE']),
    ...mapActions('orders', ['GET_ORDERS', 'GET_CURRENT_ORDER', 'CLOSE_CURRENT_ORDER']),
    rowChosen(row) {
      console.log(row)
      this.GET_CURRENT_ORDER().then(() => {
        this.SET_CURRENT_ORDER_HEADER(row)
        this.SET_CURRENT_TABLE('innerTable')
      })
    },
    gridDataPrice(products) {
      let dataItem = {
        name: '',
        value: '',
        isReturning: false
      }
      const data = []
      products.forEach(product => {
        dataItem.name = product.type_name + (product.is_broken ? ' - broken' : '')
        dataItem.value = product.sum
        dataItem.isReturning = product.isReturning
        data.push(dataItem)
        dataItem = {
          name: '',
          value: '',
          isReturning: false
        }
      })
      return data
    },

    openImg(url) {
      this.showImageDilog = true
      this.imageUrl = url
    },
    orderChosed(row) {
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
      let dataItem = {
        name: '',
        value: ''
      }
      const data = []
      products.forEach(product => {
        dataItem.name = product.type_name + (product.is_broken ? ' - broken' : '')
        dataItem.value = product.item_num
        data.push(dataItem)
        dataItem = {
          name: '',
          value: ''
        }
      })
      return data
    },
    closeCurrentOrder(row) {
      console.log('row:', row)
      this.CLOSE_CURRENT_ORDER({ order_id: row._id, consumer: row.customer._id, product_id: row.product_id }).then(() => {
        this.GET_ORDERS()
      }).catch(err => {
        console.error(err)
      })
    }
  }
}
</script>

<style>

  .inner-table {
    width: 100%;
    display: flex;
    justify-content: center;
  }
</style>
