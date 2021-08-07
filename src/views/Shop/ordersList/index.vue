<template>
  <div>
    <el-row :gutter="10" class="orders-body">
      <Tools />
      <page-body />
    </el-row>
  </div>
</template>

<script>
import Tools from './components/tools.vue'
import pageBody from './components/pageBody.vue'
export default {
  name: 'OrdersList',
  components: {
    Tools,
    pageBody
  }

}
</script>

<style>
    .orders-body {
        /* background-color: #fcf5ef; */
        background-color: #E4BB98;
        height: calc(100vh - 50px);
        width: 100%;
        padding: 1rem;
    }

    .orders-page-body {
        background-color: white;
        border-radius: 8px;
    }
    .orders-page-body {
        margin-top: 1rem;
        height: calc(100vh - 6rem - 50px);
    }
    .pgntion {
        height: 3.5rem;
        display: flex;
        align-items: center;
    }
</style>
