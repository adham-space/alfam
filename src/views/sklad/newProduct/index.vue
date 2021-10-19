<template>
  <el-row class="new-product-body">
    <editWizard v-if="is_editing" />
    <newWizard v-else />
    <el-col :span="14">
      <productsListPage />
    </el-col>
  </el-row>
</template>

<script>

import productsListPage from './productsListPage/index'
import newWizard from './newWizard'
import editWizard from './editWizard'
import { mapState } from 'vuex'
export default {
  name: 'NewProduct',
  components: {
    editWizard,
    newWizard,
    productsListPage
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState('newProduct', ['is_editing'])
  },
  methods: {

  }
}
</script>

<style>

.vue-form-wizard, .wizard-header {
  background-color: white
}

.frm-wzrd {
  /* border: 1px solid green; */
   /* background-color: #dae2de; */
  /* height: 100%; */
}
.wizard-title {
  font-weight: bold !important;
  font-size: 24px !important;
}
.new-product-body {
  /* border: 1px solid rgb(128, 0, 0); */
  height: calc(100vh - 50px);
  overflow: hidden;
  background-color: white;
}
.tb-cnt {
  overflow-y: auto;
  overflow-x: hidden;
}

.dialog-footer {
  display: flex;
  justify-content: center;
  align-items: center;
}

.left-side {
  border-right: 1px solid rgb(202, 202, 202);
  height: 100%;
  overflow-y: auto;
}
</style>
