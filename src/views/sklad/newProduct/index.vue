~<template>
  <el-row class="new-product-body">
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
      <template slot="custom-buttons-right" style="pardding-right: 2rem">
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
import { mapActions, mapState } from 'vuex'
import { Message } from 'element-ui'
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
  computed: {
    ...mapState('newProduct', ['types', 'product_name'])
  },
  methods: {
    ...mapActions('newProduct', ['UPLOAD_IMAGES', 'UPLOAD_TYPES']),
    async onComplete() {
      try {
        for (let i = 0; i < this.types.length; i++) {
          const formData = new FormData()
          formData.append('image', this.types[i].photo.raw)
          const filePath = await this.UPLOAD_IMAGES(formData)
          this.types[i].photo_path = filePath.data.path
        }
        const dataObj = {
          product_name: this.product_name,
          product_types: this.types
        }
        await this.UPLOAD_TYPES(dataObj)
        Message({
          message: 'Success:  types are saved',
          duration: 3000,
          type: 'success'
        })
        this.Cancel()
      } catch (error) {
        Message({
          message: error.response.data,
          type: 'error',
          duration: 20000
        })
      }
    },
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

.vue-form-wizard, .wizard-header {
  background-color: white
}

.frm-wzrd {
  /* border: 1px solid green; */
   /* background-color: #ecc5a2; */
  height: 100%;
}
.wizard-title {
  font-weight: bold !important;
  font-size: 24px !important;
}
.new-product-body {
  /* border: 1px solid green; */
  /* height: calc(100vh - 100px); */
  height: calc(100vh - 2em - 50px); 
  max-width: 900px;
  /* border-radius: 10px; */
  /* background-color: #ecc5a2; */
  overflow: hidden;
  background-color: white;
  margin: 1em auto;
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
