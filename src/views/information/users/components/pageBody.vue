<template>
  <el-col :span="24" class="users-page-body">
    <el-table
      style="width: 100%;"
      height="calc(100% - 3.5rem)"
      :data="tableData"
      stripe
      highlight-current-row
      @row-click="driverChosed"
    >
      <el-table-column width="100" align="center" prop="id" label="ID" />
      <el-table-column align="center" prop="stuffId" label="Stuff" />
      <el-table-column align="center" prop="username" label="Username" />
      <el-table-column align="center" prop="roleId" label="Role" />
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
    ...mapState('users', ['tableData'])
  },
  beforeDestroy() {
    this.SET_USER(null)
  },
  methods: {
    ...mapMutations('users', ['SET_USER']),
    driverChosed(row, column, event) {
      this.SET_USER(row)
    }
  }

}
</script>

<style>

</style>
