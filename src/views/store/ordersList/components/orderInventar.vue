<template>
  <el-col :span="24" class="orders-page-body konversiya">
    <el-row :gutter="10" style="width: 100%">
      <slot />
      <el-col :span="19" style="height: 3.5rem" class="konversiya-main-tools">
        <el-date-picker
          v-model="fromDate"
          style="margin-right: 0.5em"
          type="datetime"
          placeholder="Дан"
          default-time="12:00:00"
        />
        <el-date-picker
          v-model="toDate"
          style="margin-right: 0.5em"
          type="datetime"
          placeholder="Гача"
          default-time="12:00:00"
        />
        <el-button icon="el-icon-search" style="border: 1px solid transparent" />
      </el-col>
      <el-col
        :span="19"
        style="
          height: calc(100% - 3.5rem);
          border: 1px solid gray;
          border-radius: 10px;
        "
      >
        <el-table
          v-loading="gettingOuterTable || gettingInnerTable"
          style="width: 100%"
          height="calc(100% - 3.5rem)"
          :data="outerTableData"
          stripe
          highlight-current-row
          @row-dblclick="rowChosen"
          @row-click="orderChosed"
        >
          <el-table-column type="expand" fixed="left">
            <!-- eslint-disable-next-line -->
            <template slot-scope="scope">
              <div class="inner-table">
                <el-table :data="scope.row.products" :show-header="true" style="width: 80%" stripe>
                  <el-table-column label="КАФЕЛНИ КОДИ" prop="code" fixed="left" align="center" />
                  <el-table-column label="СПЕЦИФИКАЦИЯСИ" prop="type_name" align="center" />
                  <el-table-column label="ТОВАРНИ РАЗМЕРИ" prop="size" align="center" />
                  <el-table-column label="ТОВАРНИ РАСМИ" prop="photo" align="center">
                    <!-- eslint-disable-next-line  -->
                    <template slot-scope="scope">
                      <el-image
                        style="width: 50px; height: 50px"
                        :src="scope.row.photo_path"
                        fit="scale-down"
                        @click="openImg(scope.row.photo_path)"
                      />
                    </template>
                  </el-table-column>
                  <el-table-column label="1-ТА ПОЧКАДИГИ КОЛИЧЕСТВАНИ ЎЛЧОВ БИРЛИГИ" align="center">
                    <el-table-column label="ПОЧКАСИДИГИ (м2)" align="center" prop="area_of_one_packet" />
                    <el-table-column label="1-ДОНАСИНИ (м2)" prop="area_of_an_item" align="center" />
                    <el-table-column align="center" prop="number_of_items" label="УМУМИЙ ДОНАСИ" />
                    <el-table-column label="ПОЧКАСИДИГИ (КГ)" align="center" prop="wight_of_one_packet" />
                    <el-table-column label="1-ДОНАСИНИ  (КГ)" align="center" prop="weight_of_an_item" />
                  </el-table-column>
                </el-table>
              </div>
            </template>
          </el-table-column>
          <el-table-column width="160" align="center" prop="order_name" label="Инвойс №" />
          <el-table-column width="170" align="center" prop="product" label="Махсулот" />
          <el-table-column width="170" align="center">
            <template slot="header">
              <span>
                Умумий м
                <sup>2</sup>
              </span>
            </template>
            <template slot-scope="scope">
              <el-popover placement="right" trigger="hover">
                <el-table :show-header="false" :data="gridDataArea(scope.row.products)">
                  <el-table-column align="center" width="120" property="name" label="name" />
                  <el-table-column align="center" width="100" property="value" label="value" />
                </el-table>
                <el-button slot="reference" type="text">
                  {{
                    parseFloat(
                      getTotalAre(scope.row.products).packTotalArea.toFixed(4)
                    )
                  }}
                </el-button>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column width="170" align="center" label="Умумий донаси">
            <template slot-scope="scope">
              <el-popover placement="right" trigger="hover">
                <el-table :show-header="false" :data="gridData(scope.row.products)">
                  <el-table-column align="center" width="120" property="name" label="name" />
                  <el-table-column align="center" width="100" property="value" label="value" />
                </el-table>
                <el-button slot="reference" type="text">
                  {{
                    getTotalNumber(scope.row.products).item_num
                  }}
                </el-button>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column width="170" align="center" label="Почкаси / Донаси">
            <template slot-scope="scope">
              {{ getPackNumber(scope.row.products).pack_num }} /
              {{ getOverPackNumber(scope.row.products).over_pack_num }}
            </template>
          </el-table-column>

          <el-table-column v-if="roles[0] === 'admin'" align="center" prop="last_sum" label="Кассаси">
            <template slot-scope="scope">
              <el-popover placement="right" trigger="hover">
                <el-table :show-header="false" :data="gridDataPrice(scope.row.products)">
                  <el-table-column align="center" width="120" property="name" label="name" />
                  <el-table-column align="center" width="100" property="value" label="value">
                    <!-- eslint-disable-next-line -->
                    <template slot-scope="scope">
                      <span>{{ parseFloat(scope.row.value.toFixed(4)) }}</span>
                    </template>
                  </el-table-column>
                </el-table>
                <el-button slot="reference" type="text">{{ parseFloat(scope.row.last_sum.toFixed(4)) }}</el-button>
              </el-popover>
            </template>
          </el-table-column>

          <!-- <el-table-column
            width="180"
            align="center"
            prop="customer"
            label="Диллер"
          >
            <template slot-scope="scope">
              {{ `${scope.row.customer.name}` }}
            </template>
          </el-table-column>-->
          <el-table-column width="180" align="center" prop="upload_cost" label="Умумий пагрузка пули">
            <template slot-scope="scope">
              {{
                toThousandFilter(
                  scope.row.upload_cost *
                    parseFloat(
                      getTotalAre(scope.row.products).packTotalArea.toFixed(4)
                    )
                )
              }}
            </template>
          </el-table-column>
          <el-table-column width="180" align="center" prop="driver" label="Ҳайдовчи">
            <template slot-scope="scope">{{ `${scope.row.driver.firstName} ${scope.row.driver.lastName}` }}</template>
          </el-table-column>
          <el-table-column v-if="roles.includes('admin')" width="180" align="center" label="Ходим">
            <template slot-scope="scope">
              {{
                scope.row.user.stuff.firstName +
                  " " +
                  scope.row.user.stuff.lastName
              }}
            </template>
          </el-table-column>

          <el-table-column v-if="roles[0] === 'admin'" width="120" align="center" label="Касса">
            <template slot-scope="scope">
              <el-tooltip
                class="item"
                effect="dark"
                :content="scope.row.did_kassa ? 'Ёпилган' : 'Очиқ'"
                placement="left-start"
              >
                <i v-if="scope.row.did_kassa === false" style="color: red" class="el-icon-minus" />
                <i v-else style="color: green" class="el-icon-check" />
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column width="180" align="center" label="Бошланғич вақти" fixed="right">
            <template slot-scope="scope">{{ new Date(scope.row.time).toLocaleString("uz-UZ") }}</template>
          </el-table-column>
          <el-table-column width="200" align="center" label="Охириги ўзгарган вақти" fixed="right">
            <template slot-scope="scope">{{ new Date(scope.row.updatedAt).toLocaleString("uz-UZ") }}</template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-dialog title :visible.sync="showImageDilog" append-to-body width="40%">
      <el-image style="width: 100%; height: 90%" :src="imageUrl" fit="scale-down" />
    </el-dialog>
  </el-col>
</template>

<script>
// import Pagination from '@/components/Pagination'
import { mapMutations, mapState, mapActions } from 'vuex'
// import request from '@/utils/request'
// import { Message } from 'element-ui'
import { toThousandFilter } from '@/filters/index'
export default {
  name: 'OrderInventar',
  components: {
    // Pagination
  },
  data: () => ({
    fromDate: '',
    toDate: '',
    dateRangeValue: '',
    baseApi: process.env.VUE_APP_BASE_API,
    showImageDilog: false,
    actuality: false,
    imageUrl: '',
    statuses: ['el-icon-loading', 'el-icon-error', 'el-icon-success'],
    statuses_text: ['Waiting approvement', 'Order ejected', 'Order accepted'],
    statuses_color: ['gray', 'red', 'green']
  }),
  computed: {
    ...mapState('user', ['roles']),
    ...mapState('commertia', [
      'outerTableData',
      'gettingOuterTable',
      'currentOrderHeader',
      'gettingInnerTable'
    ])
  },
  mounted() {
    // this.GET_ORDERS_COMMERTIA();
  },
  beforeDestroy() {
    this.SET_ORDER(null)
  },
  methods: {
    ...mapMutations('commertia', [
      'SET_ORDER',
      'SET_CURRENT_ORDER_HEADER',
      'SET_CURRENT_TABLE'
    ]),
    ...mapActions('commertia', [
      'get_inner_table_data',
      'GET_ORDERS_COMMERTIA',
      'GET_CURRENT_ORDER_COMMERTIA',
      'DO_KASSA_COMMERTIA'
    ]),
    toThousandFilter(n) {
      return toThousandFilter(n)
    },
    rowChosen(row) {
      this.SET_ORDER(row)
      this.get_inner_table_data({
        time: row.time,
        _id: row.customer._id
      }).then(() => {
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
      products.forEach((product) => {
        dataItem.name =
          product.type_name + (product.is_broken ? ' - broken' : '')
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

    gridDataArea(products) {
      let dataItem = {
        name: '',
        value: '',
        isReturning: false
      }
      const data = []
      products.forEach((product) => {
        dataItem.name =
          product.type_name + (product.is_broken ? ' - broken' : '')
        dataItem.value = product.packTotalArea
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
      return products.reduce((a, b) => ({
        packTotalArea: a.packTotalArea + b.packTotalArea
      }))
    },
    getTotalNumber(products) {
      return products.reduce((a, b) => ({ item_num: a.item_num + b.item_num }))
    },
    getPackNumber(products) {
      return products.reduce((a, b) => ({ pack_num: a.pack_num + b.pack_num }))
    },
    getOverPackNumber(products) {
      return products.reduce((a, b) => ({
        over_pack_num: a.over_pack_num + b.over_pack_num
      }))
    },
    gridData(products) {
      let dataItem = {
        name: '',
        value: ''
      }
      const data = []
      products.forEach((product) => {
        dataItem.name =
          product.type_name + (product.is_broken ? ' - broken' : '')
        dataItem.value = product.item_num
        data.push(dataItem)
        dataItem = {
          name: '',
          value: ''
        }
      })
      return data
    },
    doKassaForNow(row) {
      this.$confirm('Ушбу савдони қилишни тасдиқланг', 'Касса қилиш').then(
        () => {
          this.DO_KASSA_COMMERTIA({
            order_id: row._id,
            consumer: row.customer._id,
            product_id: row.product_id
          })
            .then(() => {
              this.GET_ORDERS_COMMERTIA()
            })
            .catch((err) => {
              console.error(err)
            })
        }
      )
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

.konversiya {
  display: flex;
  overflow: hidden;
}

.PartnerListTool {
  display: flex;
  height: 3.5rem;
  align-items: center;
  justify-content: center;
}

.konversiya-main-tools {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 1em;
}

.el-time-panel.el-popper {
  width: 15rem;
}
</style>
