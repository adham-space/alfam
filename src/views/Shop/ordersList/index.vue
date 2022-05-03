<template>
  <div>
    <el-row :gutter="10" class="orders-body">
      <Tools />
      <keep-alive>
        <current :is="currentTable" :orders="orders">
          <el-col :span="5" style="border: 1px solid gray; overflow-y: auto; border-radius: 10px; height: 100%">
            <div
              class="PartnerListTool"
              style="position: sticky; top: 0px; z-index: 10000; background-color: aliceblue;"
            >
              <el-input v-model="currentPartner" style="width: 100%" placeholder="Партнерлар" />
            </div>

            <div v-for="dts in partners" :key="dts._id" style="margin-bottom: 0em; position: relative">
              <div class="dt hdr">{{ dts._id }}</div>
              <el-table
                :key="dts._id + key"
                v-loading="gettingPartners"
                :show-header="false"
                highlight-current-row
                :max-height="500"
                :data="dts.partners"
                :header-cell-class-name="getHeadClassName"
                @row-click="getCurrentPartnerOrders"
                @cell-click="setCurrentDay(dts._id)"
              >
                <el-table-column align="center" prop="firstName" label="Партнерлар">
                  <template slot-scope="scope">{{ scope.row.firstName }} {{ scope.row.lastName }}</template>
                </el-table-column>
              </el-table>
            </div>
          </el-col>
        </current>
      </keep-alive>
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
      currentPartner: '',
      currentDate: ''
    }
  },
  computed: {
    ...mapState('commertiashop', ['partners', 'currentTable', 'gettingPartners', 'currentOrderHeader']),
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
    ...mapMutations('commertiashop', [
      'SET_CURRENT_TABLE',
      'SET_CURRENT_ORDER_HEADER'
    ]),
    setCurrentDay(day) {
      console.log('pressed', day)
      this.SET_CURRENT_ORDER_HEADER({
        ...this.currentOrderHeader,
        currentDay: day
      })
    },
    ...mapActions('commertiashop', ['get_partners', 'get_outer_table_data']),
    currentPartnerChanged(val) {
      this.partnersList(val)
    },
    getHeadClassName() {
      return 'hdr'
    },
    getCurrentPartnerOrders(row, day) {
      console.log('pressed row', row, day)

      this.SET_CURRENT_TABLE('orderInventar')
      this.get_outer_table_data({ id: row._id })
    }
  }
}
</script>

<style>
.hdr {
  background: black !important;
  color: white;
  position: sticky;
  top: 56px;
  z-index: 1000;
  padding: 0.5em;
}

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
