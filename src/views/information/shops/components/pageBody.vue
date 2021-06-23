<template>
  <el-col :span="24" class="shops-page-body">
    <el-table
      style="width: 100%;"
      height="calc(100% - 3.5rem)"
      :data="tableData"
      stripe
      highlight-current-row
      @row-click="driverChosed"
    >
      <el-table-column width="100" align="center" prop="id" label="ID" />
      <el-table-column align="center" prop="name" label="Name" />
      <el-table-column align="center" prop="owner" label="Owner" />
      <el-table-column align="center" prop="owner" label="Owner" />
      <el-table-column align="center" prop="sellers" label="Sellers" />
      <el-table-column align="center" prop="daily_avg_sales" label="Daily sales ㎡" />
    </el-table>
    <div class="pgntion">
      <Pagination
        :total="102"
        :page="1"
        :limit="20"
      />
    </div>
  </el-col>
</template>

<script>
import Pagination from '@/components/Pagination'
import { mapMutations, mapState } from 'vuex'

export default {
  components: {
    Pagination
  },
  data: () => ({
  }),
  computed: {
    ...mapState('shops', ['tableData'])
  },
  beforeDestroy() {
    this.SET_SHOP(null)
  },
  methods: {
    ...mapMutations('shops', ['SET_SHOP']),
    driverChosed(row, column, event) {
      this.SET_SHOP(row)
    }
  }

}
</script>

<style>

</style>
