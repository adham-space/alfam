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
        <el-button
          icon="el-icon-search"
          style="border: 1px solid transparent"
        />
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
          v-loading="gettingInnerTable"
          style="width: 100%"
          height="calc(100% - 3.5rem)"
          :data="innertTableData"
          stripe
          highlight-current-row
          @row-click="orderChosed"
        >
          <el-table-column width="50" type="expand" fixed="left">
            <!-- eslint-disable-next-line -->
            <template slot-scope="scope">
              <div class="inner-table">
                <el-table
                  :data="scope.row.products"
                  :show-header="true"
                  style="width: 100%"
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
                        style="width: 30px; height: 30px"
                        :src="scope.row.photo_path"
                        fit="scale-down"
                        @click="openImg(scope.row.photo_path)"
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
          <el-table-column
            width="180"
            align="center"
            prop="order_name"
            label="Инвойс №"
          />
          <el-table-column width="180" align="center">
            <template slot="header">
              <span>Умумий м<sup>2</sup></span>
            </template>
            <template slot-scope="scope">
              {{
                parseFloat(
                  getTotalAre(scope.row.products).packTotalArea.toFixed(4)
                )
              }}
            </template>
          </el-table-column>
          <el-table-column width="180" align="center" label="Умумий донаси">
            <template slot-scope="scope">
              <el-popover placement="right" trigger="hover">
                <el-table
                  :show-header="false"
                  :data="gridData(scope.row.products)"
                >
                  <el-table-column
                    align="center"
                    width="120"
                    property="name"
                    label="name"
                  />
                  <el-table-column
                    align="center"
                    width="100"
                    property="value"
                    label="value"
                  >
                    <!-- eslint-disable-next-line -->
                    <template slot-scope="scope">
                      <span
                        v-if="scope.row.isReturning || scope.row.action === 3"
                        style="color: red"
                      >
                        - {{ scope.row.value }}</span>
                      <span v-else style="color: green">
                        + {{ scope.row.value }}</span>
                    </template>
                  </el-table-column>
                </el-table>
                <el-button slot="reference" type="text">{{
                  getTotalNumber(scope.row.products).item_num
                }}</el-button>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column width="180" align="center" label="Почкаси / Донаси">
            <template slot-scope="scope">
              {{ getPackNumber(scope.row.products).pack_num }} /
              {{ getOverPackNumber(scope.row.products).over_pack_num }}
            </template>
          </el-table-column>

          <el-table-column
            v-if="roles[0] === 'admin'"
            width="180"
            align="center"
            prop="last_sum"
            label="Кассаси"
          >
            <template slot-scope="scope">
              <el-popover placement="right" trigger="hover">
                <el-table
                  :show-header="false"
                  :data="gridDataPrice(scope.row.products)"
                >
                  <el-table-column
                    align="center"
                    width="120"
                    property="name"
                    label="name"
                  />
                  <el-table-column
                    align="center"
                    width="100"
                    property="value"
                    label="value"
                  >
                    <!-- eslint-disable-next-line -->
                    <template slot-scope="scope">
                      <span
                        v-if="scope.row.isReturning || scope.row.action === 3"
                        style="color: red"
                      >
                        {{ parseFloat(scope.row.value.toFixed(4)) }}</span>
                      <span v-else style="color: green">
                        + {{ parseFloat(scope.row.value.toFixed(4)) }}</span>
                    </template>
                  </el-table-column>
                </el-table>
                <el-button slot="reference" type="text">
                  <span
                    style=""
                  >+ {{ getPriceMinusPlus(scope.row.products).plus }}</span>
                  /
                  <span style="color: red">{{
                    getPriceMinusPlus(scope.row.products).minus
                  }}</span>
                </el-button>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            width="180"
            align="center"
            prop="driver"
            label="Ҳайдовчи"
          >
            <template slot-scope="scope">
              {{ `${scope.row.driver.firstName} ${scope.row.driver.lastName}` }}
            </template>
          </el-table-column>
          <el-table-column
            v-if="roles.includes('admin')"
            width="180"
            align="center"
            label="Ходим"
          >
            <template slot-scope="scope">
              {{
                scope.row.user.stuff.firstName +
                  " " +
                  scope.row.user.stuff.lastName
              }}
            </template>
          </el-table-column>

          <el-table-column
            v-if="roles[0] === 'admin'"
            width="120"
            align="center"
            label="Касса"
          >
            <template slot-scope="scope">
              <el-tooltip
                class="item"
                effect="dark"
                :content="scope.row.did_cassa ? 'Ёпилган' : 'Очиқ'"
                placement="left-start"
              >
                <el-checkbox
                  :value="scope.row.did_cassa"
                  @change="doKassaForNow(scope.row)"
                />
              </el-tooltip>
              <!-- <el-tooltip v-else>
            <i class="el-icon-check" />
          </el-tooltip> -->
            </template>
          </el-table-column>

          <el-table-column
            v-if="roles[0] === 'admin'"
            width="250"
            align="center"
            label="Касса қилиниб бўлинган вақти"
            prop="updatedAt"
          >
            <template slot-scope="scope">
              {{ new Date(scope.row.updatedAt).toLocaleString("uz-UZ") }}
            </template>
          </el-table-column>

          <el-table-column
            align="center"
            width="150"
            label="Сотув вақти"
            prop="createdAt"
          >
            <template slot-scope="scope">
              {{ new Date(scope.row.createdAt).toLocaleString("uz-UZ") }}
            </template>
          </el-table-column>

          <el-table-column
            prop="action"
            width="140"
            align="center"
            :label="!!currentOrderHeader.order_name ? 'Процесс' : 'Last action'"
            fixed="right"
          >
            <template slot-scope="scope">
              <span :style="{ color: actions[scope.row.action].color }">{{
                actions[scope.row.action].title
              }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-dialog
      title=""
      :visible.sync="showImageDilog"
      append-to-body
      width="40%"
    >
      <el-image
        style="width: 100%; height: 90%"
        :src="imageUrl"
        fit="scale-down"
      />
    </el-dialog>
  </el-col>
</template>

<script>
// import Pagination from '@/components/Pagination'
import { mapMutations, mapState, mapActions } from 'vuex'
import request from '@/utils/request'
import { Message } from 'element-ui'
export default {
  name: 'InnerTable',
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
    actions: [
      '',
      { title: 'Сотув', color: 'blue' },
      { title: 'Сотув-2/Бартер', color: 'green' },
      { title: 'Возврат', color: 'red' }
    ],
    statuses: ['el-icon-loading', 'el-icon-error', 'el-icon-success'],
    statuses_text: [
      'Тасдиқлаш кутилмоқда',
      'Заказ рад қилинди',
      'Заказ қабул қилинди'
    ],
    statuses_color: ['gray', 'red', 'green']
  }),
  computed: {
    ...mapState('user', ['roles']),
    ...mapState('commertia', [
      'innertTableData',
      'gettingInnerTable',
      'currentOrderHeader',
      'currentOrder'
    ]),
    partnersList() {
      return this.partners.filter((partner) => {
        return partner.name
          .toLowerCase()
          .includes(this.currentPartner.toLowerCase())
      })
    }
  },
  beforeDestroy() {
    this.SET_ORDER(null)
  },
  mounted() {
    this.gettingPartners = true
    request({
      method: 'GET',
      url: '/info/get-shops-other'
    })
      .then((res) => {
        this.gettingPartners = false
        this.partners = res.data
      })
      .catch((err) => {
        console.error(err)
        this.gettingPartners = false
        this.partners = []
      })
  },
  methods: {
    // ...mapMutations("orders", ["SET_ORDER", "SET_CURRENT_ORDER_HEADER"]),
    // ...mapActions("orders", ["GET_ORDERS", "GET_CURRENT_ORDER"]),
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
    doKassaForNow(row) {
      this.$confirm('Касса қилишни тасдиқланг!', 'Касса қилиш').then(
        async() => {
          try {
            const { data } = await request({
              url: '/orders/do-cassa-partner-orders',
              method: 'PUT',
              data: {
                order_id: row._id,
                state: !row.did_cassa
              }
            })
            Message({
              message: data.message,
              type: 'success',
              duration: 2500
            })
            this.get_inner_table_data({
              time: this.currentOrder.createdAt,
              _id: this.currentOrder.customer._id
            }).then(() => {
              this.SET_CURRENT_ORDER_HEADER(row)
              this.SET_CURRENT_TABLE('innerTable')
            })
          } catch (error) {
            Message({
              message: error.response.data,
              type: 'error',
              duration: 2500
            })
          }
        }
      )
    },
    getCurrentPartnerOrders(row, column, event) {
      console.log(row)
      this.getPartnerProducts(row._id)
    },
    async getPartnerProducts(id) {
      try {
        const { data } = await request({
          method: 'GET',
          url: '/orders/get-partner-orders',
          params: {
            partner_id: id
          }
        }).catch((err) => {
          throw err
        })
        this.orders = data
        console.log('dafafasfasfasf', this.orders)
      } catch (error) {
        this.orders = []
        console.error(error)
      }
    },
    openImg(url) {
      this.showImageDilog = true
      this.imageUrl = url
    },
    orderChosed(row) {
      if (row.status === -1) {
        this.SET_ORDER(row)
      } else {
        this.$notify({
          message:
            'You cant edit this order: order already processed by zavsklad',
          type: 'warning',
          duration: 4000
        })
      }
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
        value: '',
        isReturning: false
      }
      const data = []
      products.forEach((product) => {
        dataItem.name =
          product.type_name + (product.is_broken ? ' - broken' : '')
        dataItem.value = product.item_num
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
    getPriceMinusPlus(products) {
      let minus = 0
      let plus = 0
      products.forEach((product) => {
        if (product.isReturning) {
          minus += product.sum
        } else {
          plus += product.sum
        }
      })
      minus = parseFloat(minus.toFixed(4))
      plus = parseFloat(plus.toFixed(4))
      return { minus: minus, plus: plus }
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
  justify-content: flex-end;
  align-items: center;
  padding: 0 1em;
}
</style>
