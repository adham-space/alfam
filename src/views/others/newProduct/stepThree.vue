<template>
  <el-row>
    <el-col :span="24" class="step-header">
      <h2>Nilufar</h2>
    </el-col>
    <el-col :md="{ offset: 6, span: 12 }">
      <el-table width="100%" :data="types">
        <el-table-column
          type="index"
          label="No"
          align="center"
        />
        <el-table-column
          prop="code"
          label="Code"
          align="center"
        />
        <el-table-column
          prop="name"
          label="Specification"
          align="center"
        />
        <el-table-column label="Size" align="center">
          <template slot-scope="scope">
            {{ scope.row.width }} * {{ scope.row.height }}
          </template>
        </el-table-column>
        <el-table-column label="Rasmi" align="center">
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
