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
    >
      <tab-content class="tb-cnt" title="Name/Types">
        <stepOne ref="stepOneRef" />
      </tab-content>
      <tab-content :lazy="true" class="tb-cnt" title="Types details">
        <stepTwo />
      </tab-content>
      <tab-content :lazy="true" class="tb-cnt" title="Packet details">
        <stepFour />
      </tab-content>
      <tab-content :lazy="true" class="tb-cnt" title="Preview">
        <stepThree />
      </tab-content>
      <template slot="custom-buttons-right" style="pardding-right: 2rem">
        <el-button style="color: red; margin-right: 1rem" @click="cancelConfirmDialog = true">cancel</el-button>
      </template>
      <template slot="finish">
        <el-button type="primary" :loading="finishing" :disabled="finishing">Save new product</el-button>
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
import stepFour from './stepFour'
import stepThree from './stepThree'
import { mapActions, mapState } from 'vuex'
import { Message } from 'element-ui'
export default {
  name: 'NewProduct',
  components: {
    FormWizard,
    TabContent,
    stepOne,
    stepFour,
    stepTwo,
    stepThree
  },
  data() {
    return {
      cancelConfirmDialog: false,
      finishing: false
    }
  },
  computed: {
    ...mapState('others/newProduct', ['types', 'product_name'])
  },
  methods: {
    ...mapActions('others/newProduct', ['UPLOAD_IMAGES', 'SAVE_PRODUCTS']),
    async onComplete() {
      try {
        for (let i = 0; i < this.types.length; i++) {
          const formData = new FormData()
          formData.append('image', this.types[i].photo.raw)
          const filePath = await this.UPLOAD_IMAGES(formData)
          this.types[i].photo_path = filePath.data.path
        }
        this.finishing = true
        await this.SAVE_PRODUCTS()

        Message({
          message: 'Success:  types are saved',
          duration: 3000,
          type: 'success'
        })
        this.finishing = false
        this.Cancel()
      } catch (error) {
        this.finishing = false
        Message({
          message: error.response.data,
          type: 'error',
          duration: 2000
        })
      }
    },
    Cancel() {
      this.cancelConfirmDialog = false
      this.$refs.FormWizardRef.reset()
      this.$store.commit('others/newProduct/SET_TYPES', [])
      this.$store.commit('others/newProduct/SET_NAME', '')
      this.$store.commit('others/newProduct/SET_OTHER', '')
      this.$refs.stepOneRef.reset()
    }
  }
}
</script>

<style>

.vue-form-wizard, .wizard-header {
  background-color: white;
  border-radius: 10px;
}

.frm-wzrd {
  height: 100%;
}
.wizard-title {
  font-weight: bold !important;
  font-size: 24px !important;
}
.new-product-body {
  height: calc(100vh - 2em - 50px);
  max-width: 900px;
  border-radius: 10px;
  overflow: hidden;
  background-color: white;
  margin: 1em auto;
}
.tb-cnt {
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
