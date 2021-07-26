<template>
  <el-col :span="24" class="users-page-body">
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
      <el-table-column align="center" prop="stuff" label="Stuff">
        <template slot-scope="scope">
          {{ scope.row.stuff.firstName + ' ' + scope.row.stuff.lastName }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="username" label="Username" />
      <el-table-column align="center" prop="role" label="Role" />
      <el-table-column align="center" prop="is_active" label="Status">
        <template slot-scope="scope">
          {{ scope.row.is_active }}
        </template>
      </el-table-column>
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
    ...mapState('users', ['tableData', 'tblLoading'])
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
