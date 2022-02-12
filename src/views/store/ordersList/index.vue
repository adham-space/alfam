<template>
  <div>
    <el-row :gutter="10" class="orders-body">
      <Tools />
      <current :is="currentTable" :orders="orders">
        <el-col
          :span="5"
          style="border: 0px solid gray; border-radius: 10px; height: 100%"
        >
          <div class="PartnerListTool">
            <el-input
              v-model="currentPartner"
              style="width: 100%"
              placeholder="Partner"
            />
          </div>
          <el-table
            v-loading="gettingPartners"
            highlight-current-row
            height="calc(100% - 4rem)"
            :data="partnersList"
            @row-click="getCurrentPartnerOrders"
          >
            <el-table-column align="center" prop="name" label="Parners" />
          </el-table>
        </el-col>
      </current>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
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
      orders: [],
      key: Math.random(),
      currentPartner: ''
    }
  },
  computed: {
    ...mapState('commertia', ['partners', 'currentTable', 'gettingPartners']),
    partnersList() {
      return this.partners.filter((partner) => {
        return partner.name
          .toLowerCase()
          .includes(this.currentPartner.toLowerCase())
      })
    }
  },
  beforeDestroy() {
    this.SET_CURRENT_TABLE('orderInventar')
    this.SET_CURRENT_ORDER_HEADER({
      customer: '',
      product: '',
      order_name: ''
    })
  },
  mounted() {
    this.get_partners()
  },
  methods: {
    ...mapMutations('commertia', [
      'SET_CURRENT_TABLE',
      'SET_CURRENT_ORDER_HEADER'
    ]),
    ...mapActions('commertia', ['get_partners', 'get_outer_table_data']),
    currentPartnerChanged(val) {
      this.partnersList(val)
    },
    getCurrentPartnerOrders(row) {
      this.SET_CURRENT_TABLE('orderInventar')
      this.get_outer_table_data({ id: row._id })
    }
  }
}
</script>

<style>
.orders-body {
  /* background-color: #fcf5ef; */
  background-color: #dae2de;
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

.PartnerListTool {
  display: flex;
  height: 3.5rem;
  align-items: center;
  justify-content: center;
}
</style>
