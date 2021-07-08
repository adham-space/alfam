~<template>
  <el-row style="height: calc(100vh - 86px); border: 0px solid red">
    <form-wizard
      ref="FormWizardRef"
      color="#20a0ff"
      step-size="xs"
      error-color="#ff4949"
      class="frm-wzrd"
      title=""
      subtitle=""
      @on-complete="onComplete"
      @on-change="tabChanged"
    >
      <tab-content class="tb-cnt" title="Name/Types">
        <stepOne ref="stepOneRef" />
      </tab-content>
      <tab-content :lazy="true" class="tb-cnt" title="Types detail">
        <stepTwo />
      </tab-content>
      <tab-content :lazy="true" class="tb-cnt" title="Preview">
        <stepThree />
      </tab-content>
      <template slot="custom-buttons-right">
        <el-button style="color: red; margin-right: 1rem" @click="cancelConfirmDialog = true">cancel</el-button>
      </template>
    </form-wizard>
    <el-dialog
      title="Cancel new product"
      :visible.sync="cancelConfirmDialog"
      width="30%"
      align="center"
    >
      <span>Are you sure want to cancel creating new product?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelConfirmDialog = false">No</el-button>
        <el-button
          type="danger"
          @click="Cancel()"
        >Yes</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>

<script>
import { FormWizard, TabContent } from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import stepOne from './stepOne'
import stepTwo from './stepTwo'
import stepThree from './stepThree'
export default {
  name: 'NewProduct',
  components: {
    FormWizard,
    TabContent,
    stepOne,
    stepTwo,
    stepThree
  },
  data() {
    return {
      cancelConfirmDialog: false
    }
  },
  methods: {
    onComplete() {},
    tabChanged() {},
    Cancel() {
      this.cancelConfirmDialog = false
      this.$refs.FormWizardRef.reset()
      this.$store.commit('newProduct/SET_TYPES', [])
      this.$store.commit('newProduct/SET_NAME', '')
      this.$refs.stepOneRef.reset()
    }
  }
}
</script>

<style>
.frm-wzrd {
  /* border: 1px solid green; */
  height: 100%;
}
.wizard-title {
  font-weight: bold !important;
  font-size: 24px !important;
}
.app-cntr {
  /* border: 1px solid green; */
  /* height: calc(100vh - 100px); */
}
.tb-cnt {
  /* border: 1px solid blue; */
  height: calc(100vh - 320px);
  overflow-y: auto;
  overflow-x: hidden;
}

.dialog-footer {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
