<template>
  <div>
    <el-row :gutter="10" class="archive-body">
      <Tools />
      <page-body />
    </el-row>
  </div>
</template>

<script>
import Tools from './components/tools.vue'
import pageBody from './components/pageBody.vue'
export default {
  name: 'Inventars',
  components: {
    Tools,
    pageBody
  }

}
</script>

<style>
    .archive-body {
         background-color: #dae2de;
        height: calc(100vh - 50px);
        width: 100%;
        padding: 1rem;
    }

    .archive-page-body {
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
