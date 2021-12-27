<template>
  <el-col :span="10" class="left-side">
    <h3 style="text-align: center; color: gray">Янги махсулот қўшиш</h3>
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
        <el-button
          type="danger"
          style="margin-right: 1rem"
          @click="cancelConfirmDialog = true"
        >Отмена</el-button>
      </template>
      <template slot="finish">
        <el-button
          type="primary"
          :loading="finishing"
          :disabled="finishing"
        >Янги махсулотни сақлаш</el-button>
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
      <span>Янги махсулот яратишни бекор қилишга розимисиз?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelConfirmDialog = false">Йўқ</el-button>
        <el-button type="danger" @click="Cancel()">Ха</el-button>
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
    ...mapState('newProduct', ['types', 'product_name'])
  },
  methods: {
    ...mapActions('newProduct', ['UPLOAD_IMAGES', 'UPLOAD_TYPES']),
    async onComplete() {
      try {
        this.finishing = true
        let main_size_counter = 0
        for (let i = 0; i < this.types.length; i++) {
          if (this.types[i].isMain) {
            main_size_counter++
          }
        }

        if (main_size_counter === 1) {
          for (let i = 0; i < this.types.length; i++) {
            const formData = new FormData()
            formData.append('image', this.types[i].photo.raw)
            console.log('this.types[i].photo', this.types[i].photo)

            const filePath = await this.UPLOAD_IMAGES({
              name: this.types[i].photo.raw.name,
              type: this.types[i].photo.raw.type
            })

            await this.uploadToS3(
              this.types[i].photo.raw,
              filePath.data.signedRequest
            )

            // let results3 = await axios({
            //   url: filePath.data.signedRequest,
            //   method: 'PUT',
            //   data: formData,
            //   headers: { 'Content-Type': 'multipart/form-data' }
            // })
            // console.log("result s3", filePath)
            this.types[i].photo_path = filePath.data.path
          }

          const dataObj = {
            product_name: this.product_name,
            product_types: this.types
          }

          // / count mains if there is no any so count is = 0

          await this.UPLOAD_TYPES(dataObj)
          Message({
            message: 'Янги махсулот мувоффақиятли яратилди',
            duration: 3000,
            type: 'success'
          })
          this.finishing = false
          this.Cancel()
          this.$emit('updateProductsList')
          main_size_counter = 0
        } else {
          this.finishing = false
          this.$notify({
            message: 'Сиз асосий размерни танламагансиз ёки кўп асосий размер белгилагансиз',
            duration: 3500,
            type: 'error'
          })
        }
      } catch (error) {
        this.finishing = false
        console.log(error)
        Message({
          message: error.response.data.message,
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
      this.$refs.stepOneRef.reset()
    },
    uploadToS3(file, url) {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open('PUT', url)
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              resolve()
            } else {
              reject()
              alert('Could not upload file.')
            }
          }
        }
        xhr.send(file)
      })
    }
  }
}
</script>

<style>
</style>
