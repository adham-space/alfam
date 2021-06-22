<template>
  <el-col :span="24" class="customers-page-body">
    <el-table
      style="width: 100%;"
      height="calc(100% - 3.5rem)"
      :data="tableData"
      stripe
      highlight-current-row
      @row-click="customerChosed"
    >
      <el-table-column width="100" align="center" prop="id" label="ID" />
      <el-table-column width="180" align="center" prop="name" label="Name">
        <template slot-scope="scope">
          {{ `${scope.row.firstName} ${scope.row.lastName}` }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="address" label="Address" />
      <el-table-column width="260" align="center" prop="phone" label="Phone number" />
      <el-table-column width="150" align="center" prop="createdAt" label="Registred date" />
      <el-table-column width="130" align="center" prop="shopping_times" label="Shopping times" />
      <el-table-column width="150" align="center" prop="shopping_amount" label="Shopping amount" />
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
    ...mapState('customers', ['tableData'])
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
