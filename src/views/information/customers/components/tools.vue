<template>
  <el-col :span="24" class="customers-page-tools">
    <div style="display: flex">
      <el-input v-model="search_input" style="border: 1px solid transparent" placeholder="Search for user">
        <el-select
          slot="prepend"
          v-model="search_type"
          :style="search_type == 1 || search_type == 2 ? {'width': '5.5rem'} : {'width': '10rem'} "
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
      <el-button style=" border: 1px solid transparent; margin-left: .5rem " icon="el-icon-search" />
    </div>
    <div style="display: flex">
      <el-button style="border: 1px solid transparent"><svg-icon style="color: green" icon-class="excel" /></el-button>
      <el-button style="border: 1px solid transparent" icon="el-icon-plus" @click="addCustomerDialog = true" />
      <el-button :disabled="!!!currentCustomer" style="border: 1px solid transparent" icon="el-icon-edit" @click="editCustomerDialog = true" />
      <el-button :disabled="!!!currentCustomer" style="border: 1px solid transparent; color: red" icon="el-icon-delete" @click="deleteCustomerDialog = true" />
      <addCustomer :dialog-visible="addCustomerDialog" @closeDialog="addCustomerDialog = false" />
      <editCustomer :dialog-visible="editCustomerDialog" @closeDialog="editCustomerDialog = false" />
      <deleteCustomer :dialog-visible="deleteCustomerDialog" @closeDialog="deleteCustomerDialog = false" />
    </div>
  </el-col>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import addCustomer from './addCustomer.vue'
import deleteCustomer from './deleteCustomer.vue'
import editCustomer from './editCustomer.vue'
export default {
  components: {
    addCustomer,
    deleteCustomer,
    editCustomer
  },
  data: () => ({
    search_input: '',
    search_type: 1,
    addCustomerDialog: false,
    editCustomerDialog: false,
    deleteCustomerDialog: false
  }),
  computed: {
    ...mapState('customers', ['currentCustomer'])
  },
  methods: {
    ...mapMutations('customers', ['SET_QUERY']),
    searchTypeChanged(t) {
      this.SET_QUERY({
        key: 'search_input',
        value: t
      })
    }
  }
}
</script>

<style>
     .customers-page-tools {
         background-color: white;
        border-radius: 8px;
    }

    .customers-page-tools {
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
