<template>
  <el-col :span="24" class="inventars-page-body">
    <el-table
      v-loading="tblLoading"
      style="width: 100%;"
      height="calc(100% - 3.5rem)"
      :data="inventarData"
      stripe
      highlight-current-row
      @row-click="driverChosed"
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
                :min-width="150"
                fixed="left"
                align="center"
              >
                <template slot-scope="scope">
                  {{ productTypeMap[scope.row.product_type].code }}
                </template>
              </el-table-column>
              <el-table-column
                label="СПЕЦИФИКАЦИЯСИ"
                prop="type_name"
                :min-width="180"
                align="center"
              >
                <template slot-scope="scope">
                  {{ productTypeMap[scope.row.product_type].type_name }}
                </template>
              </el-table-column>
              <el-table-column
                label="ТОВАРНИ РАЗМЕРИ"
                prop="size"
                :min-width="180"
                align="center"
              >
                <template slot-scope="scope">
                  {{ productTypeMap[scope.row.product_type].size }}
                </template>
              </el-table-column>
              <el-table-column
                label="ТОВАРНИ РАСМИ"
                prop="photo"
                :min-width="160"
                align="center"
              >
                <!-- eslint-disable-next-line  -->
              <template slot-scope="scope">

                  <el-image
                    style="width: 30px; height: 30px"
                    :src="baseApi + productTypeMap[scope.row.product_type].photo_path"
                    fit="scale-down"
                    @click="openImg(baseApi + productTypeMap[scope.row.product_type].photo_path)"
                  />
                </template>
              </el-table-column>

              <el-table-column
                label="УМУМИЙ ЮЗАСИ"
                prop="total_area"
                :min-width="160"
                align="center"
              >
                <template slot-scope="scope">
                  {{ toThousandFilter(scope.row.total_area) }}
                </template>
              </el-table-column>
              <el-table-column
                label="УМУМИЙ СОНИ"
                :min-width="160"
                prop="total_number_of_items"
                align="center"
              >
                <template slot-scope="scope">
                  {{ toThousandFilter(scope.row.total_number_of_items) }}
                </template>
              </el-table-column>

              <el-table-column
                label="УМУМИЙ ПАCКЕТ/ОРТИҚЧА СОНИ"
                prop="total_number_of_packets"
                align="center"
                :min-width="160"
              >
                <template slot="header">
                  <span>УМУМИЙ <br> ПАCКЕТ/ОРТИҚЧА <br> СОНИ</span>
                </template>
                <template slot-scope="scope">
                  {{ toThousandFilter(scope.row.total_number_of_items) }} /  {{ scope.row.total_number_of_over_packet }}
                </template>
              </el-table-column>

              <el-table-column
                label="УМУМИЙ ОҒИРЛИГИ"
                :min-width="160"
                prop="total_wight_of_packets"
                align="center"
              >
                <template slot="header">
                  <span>УМУМИЙ <br> ОҒИРЛИГИ</span>
                </template>
                <template slot-scope="scope">
                  {{ toThousandFilter(scope.row.total_wight_of_packets) }}
                </template>
              </el-table-column>
              <el-table-column
                label="1-ТА ПОЧКАДИГИ КОЛИЧЕСТВАНИ ЎЛЧОВ БИРЛИГИ"
                align="center"
              >
                <el-table-column
                  label="ПОЧКАСИДИГИ (м2)"
                  align="center"
                  :min-width="160"
                  prop="area_of_one_packet"
                />
                <el-table-column
                  label="1-ДОНАСИНИ (м2)"
                  :min-width="160"
                  prop="area_of_an_item"
                  align="center"
                />
                <el-table-column
                  align="center"
                  prop="number_of_items"
                  :min-width="160"
                  label="УМУМИЙ ДОНАСИ"
                />
                <el-table-column
                  label="ПОЧКАСИДИГИ (КГ)"
                  align="center"
                  :min-width="160"
                  prop="wight_of_one_packet"
                />
                <el-table-column
                  label="1-ДОНАСИНИ  (КГ)"
                  align="center"
                  :min-width="160"
                  prop="weight_of_an_item"
                />
              </el-table-column>
            </el-table>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="_id" align="center" label="Махсулот" :min-width="180">
        <template slot-scope="scope">
          {{ scope.row._id.product.product_name }} - {{ scope.row._id.batch }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Умумий юзаси" prop="total_area" :min-width="180">
        <template slot="header">
          <span>Умумий юзаси м <sup>2</sup></span>
        </template>
        <template slot-scope="scope">
          {{ toThousandFilter(scope.row.total_area) }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Умумий махсулот сони" prop="total_number_of_items" :min-width="180">
        <template slot-scope="scope">
          {{ toThousandFilter(scope.row.total_number_of_items) }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Пакетлар/ортиқча сони" prop="total_number_of_packets" :min-width="180">
        <template slot-scope="scope">
          {{ toThousandFilter(scope.row.total_number_of_packets) }} / {{ scope.row.total_number_of_over_packet }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Умумий оғирлиги (кг)" prop="total_wight_of_packets" :min-width="180">
        <template slot-scope="scope">
          {{ toThousandFilter(scope.row.total_wight_of_packets) }}
        </template>
      </el-table-column>
    </el-table>
    <div class="pgntion">
      <Pagination
        :total="102"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getList"
      />
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
    listQuery: {
      page: 1,
      limit: 20
    }
  }),
  computed: {
    ...mapState('inventars', ['inventarData', 'tblLoading'])
  },
  beforeDestroy() {
    // this.SET_SHOP(null)
  },
  mounted() {
    this.GET_INVENTARS().then(() => {
      this.mapProductTypes()
    })
  },
  methods: {
    ...mapMutations('inventars', ['SET_INVENTAR', 'SET_QUERY_PARAM']),
    ...mapActions('inventars', ['GET_INVENTARS']),
    openImg(url) {
      this.showImageDilog = true
      this.imageUrl = url
    },
    driverChosed(row, column, event) {
      this.SET_INVENTAR(row)
    },
    mapProductTypes() {
      this.inventarData.forEach(data => {
        const prTypes = data._id.product.product_types
        prTypes.forEach(pr => {
          this.productTypeMap[pr._id] = pr
        })
      })
      console.log('inventarData', this.productTypeMap)
    },
    toThousandFilter(num) {
      return toThousandFilter(parseFloat(num.toFixed(3)))
    },
    getList() {
      this.SET_QUERY_PARAM({ key: 'perPage', value: this.listQuery.limit })
      this.SET_QUERY_PARAM({ key: 'currentPage', value: this.listQuery.page })
      this.GET_INVENTARS()
    }
  }

}
</script>

<style>

</style>
