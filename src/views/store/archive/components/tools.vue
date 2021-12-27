<template>
  <el-col :span="24" class="archive-page-tools">
    <div style="display: flex">
      <el-input v-model="search_input" clearable style="border: 1px solid transparent" placeholder="Search for driver" @input="searchTypeChanged">
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
export default {
  data: () => ({
    search_input: '',
    search_type: 'name',
    addDialog: false,
    editDialog: false,
    delete_Dialog: false
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
  },
  methods: {
    ...mapMutations('inventars', ['SET_QUERY_PARAM_ARCHIVE']),
    ...mapActions('inventars', ['GET_ARCHIVE']),
    search() {
      this.$router.replace({ name: 'Archive', query: { [this.search_type]: this.search_input }})
      this.GET_ARCHIVE().then(() => {
        this.$emit('setMapOfProductTypeArch')
      })
      this.SET_QUERY_PARAM_ARCHIVE({
        key: 'currentPage',
        value: 1
      })
    },
    searchTypeChanged() {
      this.SET_QUERY_PARAM_ARCHIVE({
        key: 'search_input',
        value: this.search_type
      })
      this.SET_QUERY_PARAM_ARCHIVE({
        key: 'search_text',
        value: this.search_input
      })
    }
  }
}
</script>

<style>
     .archive-page-tools {
         background-color: white;
        border-radius: 8px;
    }

    .archive-page-tools {
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
