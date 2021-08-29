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
      <el-table-column width="100" align="center" prop="_id" label="ID">
        <template slot-scope="scope">
          {{ scope.row._id.substr(0, 10) }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="title" label="Product" />
      <el-table-column align="center" label="Size">
        <template slot-scope="scope">
          {{ scope.row.product_type.height + ' * ' + scope.row.product_type.width }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="proportion">
        <template slot-scope="scope">
          {{ parseFloat(scope.row.proportion.toFixed(2)) }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="partiya" label="batch" />
      <el-table-column align="center" prop="total_area" label="Area">
        <template slot-scope="scope">
          {{ parseFloat(scope.row.total_area.toFixed(2)) }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="total_number_of_items" label="Items" />
      <el-table-column align="center" prop="total_number_of_packets" label="Number of packets" />
    </el-table>
    <div class="pgntion">
      <Pagination
        :total="102"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getList"
      />
    </div>
  </el-col>
</template>

<script>
import Pagination from '@/components/Pagination'
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  components: {
    Pagination
  },
  data: () => ({
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
    this.GET_INVENTARS()
  },
  methods: {
    ...mapMutations('inventars', ['SET_INVENTAR', 'SET_QUERY_PARAM']),
    ...mapActions('inventars', ['GET_INVENTARS']),
    driverChosed(row, column, event) {
      this.SET_INVENTAR(row)
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
