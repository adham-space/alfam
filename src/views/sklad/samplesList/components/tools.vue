<template>
  <el-col :span="24" class="inventars-page-tools">
    <div style="display: flex">
      <el-select v-model="current_shop" placeholder="Диллер/Дўконни киритинг" style="margin-right: 1em" clearable @change="shopChanged">
        <el-option v-for="shop in shops" :key="shop._id" :value="shop._id" :label="shop.name" />
      </el-select>

      <el-input v-model="search_input" clearable style="border: 1px solid transparent; width: 20rem" placeholder="Қидириш" @input="searchTypeChanged">
        <el-select
          slot="prepend"
          v-model="search_type"
          :style="{'width': '6rem'} "
          placeholder="Select"
          @change="searchTypeChanged"
        >
          <el-option label="Номи" :value="'name'" />
          <el-option label="Размер" :value="'size'" />
        </el-select>
      </el-input>
      <el-select v-model="return_status" style="width: 17rem; margin: 0 1em" placeholder="Return status" @change="returnStatusChanged">
        <el-option :value="0" label="Ҳаммаси" />
        <el-option :value="1" label="Қайтарилган" />
        <el-option :value="2" label="Қайтарилмаган" />
      </el-select>
      <el-button style=" border: 1px solid transparent; margin-left: .5rem " icon="el-icon-search" @click="search()" />
    </div>
    <div style="display: flex">
<!--      <el-button style="border: 1px solid transparent"><svg-icon style="color: green" icon-class="excel" /></el-button>
 -->      <el-button style="border: 1px solid transparent" icon="el-icon-plus" @click="$router.push('/sklad/storetproduct')" />
    </div>
  </el-col>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex'
import request from '@/utils/request'
export default {
  data: () => ({
    search_input: '',
    search_type: 'name',
    addDialog: false,
    editDialog: false,
    delete_Dialog: false,
    return_status: 2,
    current_shop: '',
    shops: []
  }),
  computed: {
    ...mapState('inventars', ['currentOrder'])
  },
  mounted() {
    if ('size' in this.$route.query) {
      this.search_type = 'size'
      this.search_input = this.$route.query.size
      this.searchTypeChanged()
    } else if ('name' in this.$route.query) {
      this.search_type = 'name'
      this.search_input = this.$route.query.name
      this.searchTypeChanged()
    }
    request({
      url: '/info/get-shops-list',
      method: 'GET'
    }).then(res => {
      this.shops = res.data
    }).catch(err => {
      console.error(err)
    })
  },
  methods: {
    ...mapMutations('samples', ['SET_QUERY']),
    ...mapActions('samples', ['GET_SAMPLES']),
    returnStatusChanged(val) {
      this.SET_QUERY({
        key: 'return_status',
        value: val
      })
    },
    shopChanged(val) {
      this.SET_QUERY({
        key: 'shop',
        value: val
      })
    },
    search() {
      // this.$router.replace({ name: 'Samples', query: { [this.search_type]: this.search_input }})
      this.GET_SAMPLES().then(() => {
        this.$emit('setMapOfProductType')
      })
      this.SET_QUERY({
        key: 'currentPage',
        value: 1
      })
    },
    searchTypeChanged(t) {
      this.SET_QUERY({
        key: 'search_input',
        value: this.search_type
      })
      this.SET_QUERY({
        key: 'search_text',
        value: this.search_input
      })
    }
  }
}
</script>

<style>
     .inventars-page-tools {
         background-color: white;
        border-radius: 8px;
    }

    .inventars-page-tools {
        height: 3rem;
        /* border: 1px solid red; */
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .el-input-group__append, .el-input-group__prepend {
        background-color: white;
    }
</style>
