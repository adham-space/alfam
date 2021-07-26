<template>
  <el-col :span="24" class="shops-page-body">
    <el-table
      v-loading="tblLoading"
      style="width: 100%;"
      height="calc(100% - 3.5rem)"
      :data="tableData"
      stripe
      highlight-current-row
      @row-click="driverChosed"
    >
      <el-table-column width="100" align="center" prop="_id" label="ID">
        <template slot-scope="scope">
          {{ scope.row._id.substr(0, 6) }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="name" label="Name" />
      <el-table-column align="center" prop="sellers" label="Workers" />
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
    ...mapState('shops', ['tableData', 'tblLoading'])
  },
  beforeDestroy() {
    // this.SET_SHOP(null)
  },
  methods: {
    ...mapMutations('shops', ['SET_SHOP', 'SET_QUERY_PARAM']),
    ...mapActions('shops', ['GET_SHOPS']),
    driverChosed(row, column, event) {
      this.SET_SHOP(row)
    },
    getList() {
      this.SET_QUERY_PARAM({ key: 'perPage', value: this.listQuery.limit })
      this.SET_QUERY_PARAM({ key: 'currentPage', value: this.listQuery.page })
      this.GET_SHOPS()
    }
  }

}
</script>

<style>

</style>
