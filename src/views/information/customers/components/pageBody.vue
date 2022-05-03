<template>
  <el-col :span="24" class="customers-page-body">
    <el-table
      v-loading="tblLoading"
      style="width: 100%"
      height="calc(100% - 3.5rem)"
      :data="tableData"
      stripe
      highlight-current-row
      @row-click="customerChosed"
    >
      <!-- <el-table-column width="100" align="center" prop="id" label="ID">
        <template slot-scope="scope">
          {{ scope.row._id.substr(0, 6) }}
        </template>
      </el-table-column> -->
      <el-table-column width="180" align="center" prop="name" label="Тўлиқ исм">
        <template slot-scope="scope">
          {{ `${scope.row.firstName} ${scope.row.lastName}` }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="address" label="Аддрес" />
      <el-table-column width="260" align="center" prop="phone" label="Тел. рақам" />
      <el-table-column width="150" align="center" prop="date" label="Рег. санаси">
        <template slot-scope="scope">
          {{ new Date(scope.row.date).toLocaleDateString("uz-UZ") }}
        </template>
      </el-table-column>
      <!-- <el-table-column
        width="130"
        align="center"
        prop="shopping_times"
        label="Shopping times"
      /> -->
      <!-- <el-table-column
        width="150"
        align="center"
        prop="shopping_amount"
        label="Shopping amount"
      />-->
    </el-table>
    <!-- <div class="pgntion">
      <Pagination :total="102" :page="1" :limit="20" />
    </div> -->
  </el-col>
</template>

<script>
// import Pagination from '@/components/Pagination'
import { mapMutations, mapState } from 'vuex'

export default {
  components: {
    // Pagination
  },
  data: () => ({}),
  computed: {
    ...mapState('customers', ['tableData', 'tblLoading'])
  },
  beforeDestroy() {
    this.SET_CUSTOMER(null)
  },
  methods: {
    ...mapMutations('customers', ['SET_CUSTOMER']),
    customerChosed(row, column, event) {
      this.SET_CUSTOMER(row)
    }
  }
}
</script>

<style>
</style>
