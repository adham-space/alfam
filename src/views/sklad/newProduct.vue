<template>
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
        <stepOne />
      </tab-content>
      <tab-content :lazy="true" class="tb-cnt" title="Types detail">
        <stepTwo />
      </tab-content>
      <tab-content :lazy="true" class="tb-cnt" title="Preview">
        Yuhuuu! This seems pretty damn simple
      </tab-content>
    </form-wizard>
  </el-row>
</template>

<script>
import { FormWizard, TabContent } from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import stepOne from './newProduct/stepOne'
import stepTwo from './newProduct/stepTwo'
export default {
  name: 'NewProduct',
  components: {
    FormWizard,
    TabContent,
    stepOne,
    stepTwo
  },
  methods: {
    onComplete() {},
    tabChanged() {}
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
</style>
