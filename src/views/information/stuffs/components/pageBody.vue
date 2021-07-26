<template>
  <el-col :span="24" class="stuffs-page-body">
    <el-table
      v-loading="tblLoading"
      style="width: 100%;"
      height="calc(100% - 3.5rem)"
      :data="tableData"
      stripe
      highlight-current-row
      @row-click="stuffChosed"
    >
      <el-table-column width="100" align="center" prop="_id" label="ID">
        <template slot-scope="scope">
          {{ scope.row._id.substr(0, 6) }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Name">
        <template slot-scope="scope">
          {{ `${scope.row.firstName} ${scope.row.lastName}` }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="address" label="Address" />
      <el-table-column width="260" align="center" prop="phone" label="Phone number" />
      <el-table-column width="150" align="center" prop="shop" label="Shop">
        <template slot-scope="scope">
          {{ scope.row.shop.name }}
        </template>
      </el-table-column>
      <el-table-column width="150" align="center" prop="date" label="Registred date">
        <template slot-scope="scope">
          {{ (new Date(scope.row.date)).toLocaleString().split(',')[0] }}
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
    ...mapState('stuffs', ['tableData', 'tblLoading'])
  },
  beforeDestroy() {
    this.SET_STUFF(null)
  },
  methods: {
    ...mapMutations('stuffs', ['SET_STUFF']),
    stuffChosed(row, column, event) {
      this.SET_STUFF(row)
    }
  }

}
</script>

<style>

</style>
