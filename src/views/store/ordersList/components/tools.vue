<template>
  <el-col :span="24" class="orders-page-tools">
    <div style="display: flex">
      <!-- <el-input
        v-model="search_input"
        style="border: 1px solid transparent"
        placeholder="Қидириш"
      >
        <el-select
          slot="prepend"
          v-model="search_type"
          :style="
            search_type == 1 || search_type == 2
              ? { width: '5.5rem' }
              : { width: '10rem' }
          "
          placeholder="Select"
          @change="searchTypeChanged"
        >
          <el-option label="ID" :value="1" />
          <el-option label="Name" :value="2" />
          <el-option label="Registred date" :value="3" />
          <el-option label="Shopping times" :value="4" />
          <el-option label="Shopping amount" :value="5" />
        </el-select>
      </el-input>
      <el-button
        style="border: 1px solid transparent; margin-left: 0.5rem"
        icon="el-icon-search"
      /> -->
    </div>
    <div
      v-if="!!currentOrderHeader.order_name"
      class="current-order"
      style="flex: 1; margin: 0 1em; text-align: right"
    >
      <el-button
        style="
          border: 1px solid transparent;
          background-color: white;
          font-size: 1.2em;
        "
        class="el-icon-back"
        @click="backToInventar()"
      />
      <span style="color: gray">{{ currentOrderHeader.order_name }}</span> /
      <span style="color: gray">{{ currentOrderHeader.product }}</span> /
      <span style="color: gray">{{ currentOrderHeader.customer }}</span>
    </div>
    <div style="display: flex">
      <!--      <el-button style="border: 1px solid transparent"><svg-icon style="color: green" icon-class="excel" /></el-button>
 -->
      <el-button
        style="border: 1px solid transparent"
        icon="el-icon-plus"
        @click="$router.push('/shop/shop-packing-list')"
      />
      <!-- <el-button
        v-if="currentTable === 'innerTable'"
        :disabled="!!!currentOrder"
        style="border: 1px solid transparent"
        icon="el-icon-edit"
        @click="editDialog = true"
      /> -->
      <!-- <el-button
        :disabled="!!!currentOrder"
        style="border: 1px solid transparent; color: red"
        icon="el-icon-delete"
        @click="delete_Dialog = true"
      /> -->
      <edit :dialog-visible="editDialog" @closeDialog="editDialog = false" />
    </div>
  </el-col>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex'
import edit from './edit.vue'
export default {
  components: {
    edit
  },
  data: () => ({
    search_input: '',
    search_type: 1,
    addDialog: false,
    editDialog: false,
    delete_Dialog: false
  }),
  computed: {
    ...mapState('orders', [
      'currentOrder',
      'currentOrderHeader',
      'currentTable'
    ])
  },
  methods: {
    ...mapMutations('orders', [
      'SET_QUERY',
      'SET_CURRENT_TABLE',
      'SET_CURRENT_ORDER_HEADER'
    ]),
    ...mapActions('orders', ['GET_ORDERS_COMMERTIA']),
    searchTypeChanged(t) {
      this.SET_QUERY({
        key: 'search_input',
        value: t
      })
    },
    backToInventar() {
      this.GET_ORDERS_COMMERTIA().then(() => {
        this.SET_CURRENT_TABLE('orderInventar')
        this.SET_CURRENT_ORDER_HEADER({
          customer: '',
          product: '',
          order_name: ''
        })
      })
    }
  }
}
</script>

<style>
.orders-page-tools {
  background-color: white;
  border-radius: 8px;
}

.orders-page-tools {
  height: 3rem;
  /* border: 1px solid red; */
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.el-input-group__append,
.el-input-group__prepend {
  background-color: white;
}
</style>
