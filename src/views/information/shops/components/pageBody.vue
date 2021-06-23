<template>
  <el-col :span="24" class="drivers-page-body">
    <el-table
      style="width: 100%;"
      height="calc(100% - 3.5rem)"
      :data="tableData"
      stripe
      highlight-current-row
      @row-click="driverChosed"
    >
      <el-table-column width="100" align="center" prop="id" label="ID" />
      <el-table-column align="center" prop="name" label="Name">
        <template slot-scope="scope">
          {{ `${scope.row.firstName} ${scope.row.lastName}` }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="address" label="Address" />
      <el-table-column width="260" align="center" prop="phone" label="Phone number" />
      <el-table-column width="180" align="center" prop="car_type" label="Car type" />
      <el-table-column width="160" align="center" prop="car_num" label="Car num" />
      <el-table-column width="150" align="center" prop="createdAt" label="Registred date" />
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
    ...mapState('drivers', ['tableData'])
  },
  beforeDestroy() {
    this.SET_DRIVER(null)
  },
  methods: {
    ...mapMutations('drivers', ['SET_DRIVER']),
    driverChosed(row, column, event) {
      this.SET_DRIVER(row)
    }
  }

}
</script>

<style>

</style>
