<template>
  <el-col :span="24" class="inventars-page-body">
    <el-table
      :key="resetKey"
      v-loading="tableLoading"
      style="width: 100%"
      height="calc(100% - 3.5rem)"
      :data="samplesTable"
      :row-class-name="className"
    >
      <!-- eslint-disable  -->
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
                label="Кафелни коди"
                prop="code"
                :min-width="150"
                fixed="left"
                align="center"
              >
                <template slot-scope="scope">
                  {{
                    productTypeMap[scope.row._id]
                      ? productTypeMap[scope.row._id].code
                      : scope.$index
                  }}
                  {{ scope.row.broken ? "синган" : "" }}
                </template>
              </el-table-column>
              <el-table-column
                label="Спецификацияси"
                prop="type_name"
                :min-width="180"
                align="center"
              >
                <template slot-scope="scope">
                  {{
                    productTypeMap[scope.row._id]
                      ? productTypeMap[scope.row._id].type_name
                      : "" + scope.row.product_type
                  }}
                </template>
              </el-table-column>
              <el-table-column
                label="Товарни размери"
                prop="size"
                :min-width="180"
                align="center"
              >
                <template slot-scope="scope">
                  {{
                    productTypeMap[scope.row._id]
                      ? productTypeMap[scope.row._id].size
                      : ""
                  }}
                </template>
              </el-table-column>

              <el-table-column
                label="Товарни расми"
                prop="photo"
                :min-width="160"
                align="center"
              >
                <!-- eslint-disable-next-line  -->
                <template slot-scope="scope">
                  <el-image
                    style="width: 30px; height: 30px"
                    :src="
                      productTypeMap[scope.row._id]
                        ? productTypeMap[scope.row._id].photo_path
                        : ''
                    "
                    fit="scale-down"
                    @click="
                      openImg(
                        productTypeMap[scope.row._id]
                          ? productTypeMap[scope.row._id].photo_path
                          : ''
                      )
                    "
                  />
                  <!-- <editImage /> -->
                </template>
              </el-table-column>
              <el-table-column
                label="Касса нархи"
                prop="total_area"
                :min-width="160"
                align="center"
              >
                <template slot-scope="scope">
                  {{ toThousandFilter(scope.row.base_price) }}
                  <span v-if="!scope.row.price_by">(м<sup>2</sup>)</span>
                  <span v-else>(дона)</span>
                </template>
              </el-table-column>
              <el-table-column
                label="Умумий суммаси ($)"
                :min-width="160"
                align="center"
              >
                <template slot-scope="scope">
                  {{
                    toThousandFilter(
                      scope.row.packTotalArea * scope.row.base_price
                    )
                  }}
                </template>
              </el-table-column>
              <el-table-column
                label="Умумий юзаси"
                prop="total_area"
                :min-width="160"
                align="center"
              >
                <template slot-scope="scope">
                  {{ toThousandFilter(scope.row.packTotalArea) }}
                </template>
              </el-table-column>
              <el-table-column
                label="Умумий сони"
                :min-width="160"
                prop="total_number_of_items"
                align="center"
              >
                <template slot-scope="scope">
                  {{ toThousandFilter(scope.row.item_num) }}
                </template>
              </el-table-column>

              <el-table-column
                label="Умумий пакет / ортиқча сони"
                prop="total_number_of_packets"
                align="center"
                :min-width="160"
              >
                <template slot="header">
                  <span
                    >Умумий <br />пакет / ортиқча <br />
                    сони</span
                  >
                </template>
                <template slot-scope="scope">
                  {{ toThousandFilter(scope.row.pack_num) }} /
                  {{ scope.row.over_pack_num }}
                </template>
              </el-table-column>

              <el-table-column
                label="УМУМИЙ ОҒИРЛИГИ"
                :min-width="160"
                prop="total_wight_of_packets"
                align="center"
              >
                <template slot="header">
                  <span
                    >Умумий <br />
                    оғирлиги</span
                  >
                </template>
                <template slot-scope="scope">
                  {{
                    toThousandFilter(
                      scope.row.weight_of_an_item * scope.row.item_num
                    )
                  }}
                </template>
              </el-table-column>
              <el-table-column
                label="1-та почкадаги каличество ўлчов бирлиги"
                align="center"
              >
                <el-table-column
                  label="Почкасини (м2)"
                  align="center"
                  :min-width="160"
                  prop="area_of_one_packet"
                />
                <el-table-column
                  label="1-донасини (м2)"
                  :min-width="160"
                  prop="area_of_an_item"
                  align="center"
                />
                <el-table-column
                  align="center"
                  prop="number_of_items"
                  :min-width="160"
                  label="Умумий донаси"
                />
                <el-table-column
                  label="Почкасини (КГ)"
                  align="center"
                  :min-width="160"
                  prop="wight_of_one_packet"
                />
                <el-table-column
                  label="1-донасини  (КГ)"
                  align="center"
                  :min-width="160"
                  prop="weight_of_an_item"
                />
              </el-table-column>
            </el-table>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="shop"
        align="center"
        label="Diller/Do'kon"
        :min-width="180"
      >
        <template slot-scope="scope">
          {{ scope.row.shop.name }}
        </template>
      </el-table-column>
      <el-table-column
        prop="product"
        align="center"
        label="Махсулот"
        :min-width="180"
      >
      </el-table-column>
      <el-table-column
        prop="totalArea"
        align="center"
        label="Umumiy M2"
        :min-width="180"
      >
        <template slot-scope="scope">
          {{ scope.row.totalArea ? scope.row.totalArea.toFixed(2) : "" }}
        </template>
      </el-table-column>
      <el-table-column
        prop="totalNumber"
        align="center"
        label="Umumiy donasi"
        :min-width="180"
      >
        <template slot-scope="scope">
          {{ scope.row.totalNumber }}
        </template>
      </el-table-column>
      <el-table-column
        prop="partiya"
        align="center"
        label="Partiya"
        :min-width="180"
      >
      </el-table-column>
      <el-table-column
        prop="isReturned"
        align="center"
        label="Qaytarildi"
        :min-width="180"
      >
        <template slot-scope="scope">
          <el-checkbox
            :disabled="scope.row.isReturned"
            :value="scope.row.isReturned"
            @change="doReturnSample(scope.row._id, scope.row)"
          ></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column
        prop="createdAt"
        align="center"
        label="Berilgan vaqti"
        :min-width="180"
      >
        <template slot-scope="scope">
          {{ giveDate(scope.row.createdAt) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="updatedAt"
        align="center"
        label="Qaytarilgan vaqti"
        :min-width="180"
      >
        <template slot-scope="scope">
          {{ scope.row.isReturned ? giveDate(scope.row.updatedAt) : "-" }}
        </template>
      </el-table-column>
    </el-table>
    <div class="pgntion">
      <Pagination
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getList"
      />
    </div>
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
import Pagination from '@/components/Pagination'
import { mapActions, mapMutations, mapState } from 'vuex'
import { toThousandFilter } from '@/filters/index'
export default {
  components: {
    Pagination
  },
  data: () => ({
    baseApi: process.env.VUE_APP_BASE_API,
    showImageDilog: false,
    imageUrl: '',
    productTypeMap: [],
    resetKey: 101,
    listQuery: {
      page: 1,
      limit: 20
    }
  }),
  computed: {
    ...mapState('samples', [
      'samplesTable',
      'tableLoading',
      'total',
      'queryParams'
    ])
  },
  beforeDestroy() {
    // this.SET_SHOP(null)
  },
  mounted() {
    this.listQuery = {
      page: this.queryParams.currentPage,
      limit: this.queryParams.perPage
    }
    this.GET_SAMPLES().then(() => {
      this.mapProductTypes()
    })
  },
  methods: {
    giveDate(d) {
      d = new Date(d)

      return (
        d.toLocaleDateString() +
        ' ' +
        d.getHours() +
        ':' +
        d.getMinutes() +
        ':' +
        d.getSeconds()
      )
    },
    ...mapMutations('samples', ['SET_QUERY']),
    ...mapActions('samples', ['GET_SAMPLES', 'DO_RETURN']),
    doReturnSample(val, row) {
      this.$confirm(
        `Сиз ${row.shop.name}-га берилган ${row.product} махсулот образецини қайтармоқчимисиз?`,
        'Образецни қайтариш'
      ).then(() => {
        this.DO_RETURN(val)
          .then(() => {
            this.GET_SAMPLES()
          })
          .catch((err) => console.error(err))
      }).catch(() => {})
    },
    openImg(url) {
      this.showImageDilog = true
      this.imageUrl = url
    },
    className({ row }) {
      if (row.isReturned) {
        return ''
      } else {
        return 'warning-row'
      }
    },
    mapProductTypes() {
      this.samplesTable.forEach((data) => {
        const products = data.products
        const products_types = data.product_id.product_types
        products.forEach((pr) => {
          const pr_type = products_types.find((elem) => elem.code === pr.code)
          this.productTypeMap[pr._id] = { ...pr, ...pr_type }
        })
      })
    },
    toThousandFilter(num) {
      if (!num) return 0
      else return toThousandFilter(parseFloat(num.toFixed(3)))
    },
    getList() {
      this.SET_QUERY_PARAM({ key: 'perPage', value: this.listQuery.limit })
      this.SET_QUERY_PARAM({ key: 'currentPage', value: this.listQuery.page })
      this.GET_SAMPLES().then(() => {
        this.mapProductTypes()
      })
    }
  }
}
</script>

<style>
.el-table .warning-row {
  background-color: rgb(255, 215, 215);
}
</style>
