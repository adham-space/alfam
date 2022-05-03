<template>
  <el-col :span="10" class="left-side">
    <h3 style="text-align: center; color: gray">Тахрирлаш </h3>
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
      <tab-content class="tb-cnt" title="Номланиши/Тури">
        <stepOne ref="stepOneRef" />
      </tab-content>
      <tab-content :lazy="true" class="tb-cnt" title="Турларни детализацияси">
        <stepTwo />
      </tab-content>
      <tab-content :lazy="true" class="tb-cnt" title="Ревизия">
        <stepThree />
      </tab-content>
      <template slot="custom-buttons-right" style="pardding-right: 2rem">
        <el-button type="danger" style="margin-right: 1rem" @click="cancelConfirmDialog = true">Отмена</el-button>
      </template>
      <template slot="finish">
        <el-button type="primary" :loading="finishing" :disabled="finishing">Ўзгаришни сақалаш</el-button>
      </template>
      <template slot="next">
        <el-button type="primary">Следуюший</el-button>
      </template>
      <template slot="prev">
        <el-button type="primary">Назад</el-button>
      </template>
    </form-wizard>
    <el-dialog
      title="Янги махсулот яратишни бекор қилиш"
      :visible.sync="cancelConfirmDialog"
      width="50%"
      align="center"
    >
      <span>Махсулотни тахрирлашни бекор қилишни розимисиз?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelConfirmDialog = false">Йўқ</el-button>
        <el-button
          type="danger"
          @click="Cancel()"
        >Ха</el-button>
      </span>
    </el-dialog>
  </el-col>
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
      cancelConfirmDialog: false,
      finishing: false
    }
  },
  computed: {
    ...mapState('newProduct', ['types', 'product_name', 'editing_product_id'])
  },
  methods: {
    ...mapActions('newProduct', ['EDIT_TYPES']),
    async onComplete() {
      try {
        this.finishing = true
        const dataObj = {
          product_name: this.product_name,
          product_types: this.types,
          product_id: this.editing_product_id
        }
        await this.EDIT_TYPES(dataObj)
        Message({
          message: 'Махсулот мувоффақиятли тахрирланди',
          duration: 3000,
          type: 'success'
        })
        this.finishing = false
        this.$emit('updateProductsList')
        this.Cancel()
      } catch (error) {
        this.finishing = false
        Message({
          message: error,
          type: 'error',
          duration: 2000
        })
      }
    },
    tabChanged() {},
    Cancel() {
      this.cancelConfirmDialog = false
      this.$refs.FormWizardRef.reset()
      this.$store.commit('newProduct/SET_TYPES', [])
      this.$store.commit('newProduct/SET_NAME', '')
      this.$store.commit('newProduct/SET_EDIT_STATUS', false)
      this.$refs.stepOneRef.reset()
    }
  }
}
</script>

<style>

</style>
