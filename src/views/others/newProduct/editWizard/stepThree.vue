<template>
  <el-row>
    <el-col :span="24" class="step-header">
      <h2>{{ $store.state.newProduct.product_name }}</h2>
    </el-col>
    <el-col :span="24">
      <el-table width="100%" :data="types">
        <el-table-column
          type="index"
          label="№"
          align="center"
        />
        <el-table-column
          prop="code"
          label="Коди"
          align="center"
        />
        <el-table-column
          prop="type_name"
          label="Турлари"
          align="center"
        />
        <el-table-column label="Размери" align="center">
          <template slot-scope="scope">
            {{ scope.row.height }}*{{ scope.row.width }}
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      currentType: ''
    }
  },
  computed: {
    ...mapState('newProduct', ['types'])
  },
  methods: {
  }
}
</script>

<style>

.step-header {
  display: flex;
  justify-content: center;
}
</style>
