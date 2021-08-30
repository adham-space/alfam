<template>
  <el-col :span="24" class="archive-page-body">
    <el-table
      v-loading="tblLoading"
      border
      style="width: 100%;"
      height="calc(100% - 3.5rem)"
      :data="archiveTable"
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
          {{ toThousandFilter(parseFloat(scope.row.proportion.toFixed(2))) }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="partiya" label="batch" />
      <el-table-column align="center" prop="total_area" label="Area">
        <template slot-scope="scope">
          {{ toThousandFilter(parseFloat(scope.row.total_area.toFixed(2))) }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="total_number_of_items" label="Items">
        <template slot-scope="scope">
          {{ toThousandFilter(scope.row.total_number_of_items) }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="total_number_of_packets" label="Number of packets">
        <template slot-scope="scope">
          {{ toThousandFilter(scope.row.total_number_of_packets) }}
        </template>
      </el-table-column>
    </el-table>
    <div class="pgntion">
      <Pagination
        style="background-color: transparent"
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
import { toThousandFilter } from '@/filters/index'
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
    ...mapState('archive', ['archiveTable', 'tblLoading'])
  },
  beforeDestroy() {
    // this.SET_SHOP(null)
  },
  mounted() {
    this.GET_ARCHIVE()
  },
  methods: {
    ...mapMutations('archive', ['SET_ARCHIVE', 'SET_QUERY_PARAM']),
    ...mapActions('archive', ['GET_ARCHIVE']),
    driverChosed(row, column, event) {
      this.SET_ARCHIVE(row)
    },
    toThousandFilter(num) {
      return toThousandFilter(num)
    },
    getList() {
      this.SET_QUERY_PARAM({ key: 'perPage', value: this.listQuery.limit })
      this.SET_QUERY_PARAM({ key: 'currentPage', value: this.listQuery.page })
      this.GET_archive()
    }
  }

}
</script>

<style>

</style>
