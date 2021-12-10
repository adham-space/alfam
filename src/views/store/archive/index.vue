<template>
  <div>
    <el-row :gutter="10" class="inventars-body">
      <Tools @setMapOfProductTypeArch="setProductMap" />
      <page-body ref="pBodyArc" />
    </el-row>
  </div>
</template>

<script>
import Tools from './components/tools.vue'
import pageBody from './components/pageBody.vue'
export default {
  name: 'Archive',
  components: {
    Tools,
    pageBody
  },
  methods: {
    setProductMap() {
      console.log('pressed')
      this.$refs.pBodyArc.mapProductTypes()
    }
  }

}
</script>

<style>
    .inventars-body {
         background-color: #dae2de;
        height: calc(100vh - 50px);
        width: 100%;
        padding: 1rem;
    }

    .inventars-page-body {
        background-color: white;
        border-radius: 8px;
        margin-top: 1rem;
        height: calc(100vh - 6rem - 50px);
    }
    .pgntion {
        height: 3.5rem;
        display: flex;
        align-items: center;
    }
</style>
