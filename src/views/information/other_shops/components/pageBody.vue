<template>
  <el-col :span="24" class="shops-page-body">
    <el-table
      v-loading="tblLoading"
      style="width: 100%"
      height="calc(100% - 3.5rem)"
      :data="shops_other"
      stripe
      highlight-current-row
      @row-click="driverChosed"
    >
      <el-table-column align="center" prop="name" label="Номи" />
    </el-table>
  </el-col>
</template>

<script>
// import Pagination from '@/components/Pagination'
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  components: {
    // Pagination
  },
  data: () => ({
    listQuery: {
      page: 1,
      limit: 20
    }
  }),
  computed: {
    ...mapState('shops', ['tableData', 'tblLoading', 'shops_other'])
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
