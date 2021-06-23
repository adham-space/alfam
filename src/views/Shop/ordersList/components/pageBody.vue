<template>
  <el-col :span="24" class="orders-page-body">
    <el-table
      style="width: 100%;"
      height="calc(100% - 3.5rem)"
      :data="tableData"
      stripe
      highlight-current-row
      @row-click="orderChosed"
    >
      <el-table-column width="100" align="center" prop="id" label="ID" />
      <el-table-column width="130" align="center" prop="order_num" label="Order No" />
      <el-table-column width="170" align="center" prop="shop" label="Shop" />
      <el-table-column width="170" align="center" prop="product" label="Product" />
      <el-table-column width="170" align="center" prop="area" label="Area ㎡" />
      <el-table-column width="170" align="center" prop="price" label="Price" />
      <el-table-column width="180" align="center" prop="customer" label="Customer">
        <template slot-scope="scope">
          {{ `${scope.row.customer.firstName} ${scope.row.customer.lastName}` }}
        </template>
      </el-table-column>
      <el-table-column width="170" align="center" prop="purchase_amount" label="Purchases" />
      <el-table-column width="190" align="center" prop="address" label="Address">
        <template slot-scope="scope">
          {{ scope.row.customer.address }}
        </template>
      </el-table-column>
      <el-table-column width="180" align="center" prop="driver" label="Driver">
        <template slot-scope="scope">
          {{ `${scope.row.driver.firstName} ${scope.row.driver.lastName}` }}
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
    ...mapState('orders', ['tableData'])
  },
  beforeDestroy() {
    this.SET_ORDER(null)
  },
  methods: {
    ...mapMutations('orders', ['SET_ORDER']),
    orderChosed(row, column, event) {
      this.SET_ORDER(row)
    }
  }

}
</script>

<style>

</style>
