<template>
  <div>
    <el-row :gutter="10" class="orders-body">
      <Tools />
      <current :is="currentTable" />
    </el-row>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
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
  data() {
    return {
      key: Math.random()
    }
  },
  computed: {
    ...mapState('orders', ['currentTable'])
  },
  beforeDestroy() {
    console.log('Is destrotying')
    this.SET_CURRENT_TABLE('orderInventar')
    this.SET_CURRENT_ORDER_HEADER({
      customer: '',
      product: '',
      order_name: ''
    })
  },
  methods: {
    ...mapMutations('orders', ['SET_CURRENT_TABLE', 'SET_CURRENT_ORDER_HEADER'])
  }

}
</script>

<style>
.orders-body {
  /* background-color: #fcf5ef; */
  background-color: #e4bb98;
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
