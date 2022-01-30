<template>
  <div>
    <el-row :gutter="10" class="shops-body">
      <Tools />
      <page-body />
    </el-row>
  </div>
</template>

<script>
import Tools from './components/tools.vue'
import pageBody from './components/pageBody.vue'
export default {
  name: 'Shops',
  components: {
    Tools,
    pageBody
  }

}
</script>

<style>
    .shops-body {
        background-color: #dae2de;
        height: calc(100vh - 50px);
        width: 100%;
        padding: 1rem;
    }

    .shops-page-body {
        background-color: white;
        border-radius: 8px;
    }
    .shops-page-body {
        margin-top: 1rem;
        height: calc(100vh - 6rem - 59px);
    }
    .pgntion {
        height: 3.5rem;
        display: flex;
        align-items: center;
    }
</style>
