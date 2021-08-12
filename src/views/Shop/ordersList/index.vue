<template>
  <div>
    <el-row :gutter="10" class="orders-body">
      <Tools />
     <keep-alive>
       <current :is="currentTable" />
     </keep-alive>
    </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Tools from './components/tools.vue'
import innerTable from './components/innerTable'
import orderInventar from './components/orderInventar'
export default {
  name: 'OrdersList',
  components: {
    Tools,
    orderInventar,
    innerTable
  },
  computed: {
    ...mapState('orders', ['currentTable'])
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
