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
        <el-table-column label="Расми" align="center">
          <template slot-scope="scope">
            <el-image
              style="width: 25px; height: 25px"
              :src="!!scope.row.photo ? scope.row.photo.url: ''"
              fit="scale-down"
              @click="showImage(scope.row.name, !!scope.row.photo ? scope.row.photo.url: '')"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <el-dialog title="" :visible.sync="showImageDilog" width="40%">
      <el-image
        style="width: 90%; height: 90%"
        :src="imageUrl"
        fit="scale-down"
      />
    </el-dialog>
  </el-row>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      showImageDilog: false,
      currentType: '',
      imageUrl: ''
    }
  },
  computed: {
    ...mapState('newProduct', ['types'])
  },
  methods: {
    showImage(name, url) {
      this.showImageDilog = true
      this.currentType = name
      this.imageUrl = url
    }
  }
}
</script>

<style>

.step-header {
  display: flex;
  justify-content: center;
}
</style>
