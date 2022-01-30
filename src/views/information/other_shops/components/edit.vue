<template>
  <el-dialog
    title="Edit shop"
    :visible.sync="dialogVisible"
    width="40%"
    align="center"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    @open="dialogOpened"
  >
    <el-form ref="newShopRef" :model="newShop" :rules="rules">
      <el-form-item>
        <el-col :span="18">
          <el-form-item prop="name">
            <el-input v-model="newShop.name" placeholder="Name" />
          </el-form-item>
        </el-col>
        <!-- <el-col :span="6">
          <el-form-item prop="isOther">
            <el-checkbox v-model="newShop.isOther">Бегона</el-checkbox>
          </el-form-item>
        </el-col> -->
      </el-form-item>

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button :disabled="saving" @click="cancel()">Cancel</el-button>
      <el-button :disabled="saving" :loading="saving" type="primary" @click="save()">Save</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { Message } from 'element-ui'
import { mapActions, mapState } from 'vuex'
import edit from './mixins/edit'
export default {
  mixins: [edit],
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      saving: false
    }
  },
  computed: {
    ...mapState('shops', ['currentShop'])
  },
  methods: {
    ...mapActions('shops', ['EDIT_SHOP_OTHER']),
    dialogOpened() {
      this.newShop = {
        ...this.currentShop
      }
    },
    cancel() {
      this.$emit('closeDialog')
      this.$refs.newShopRef.resetFields()
      this.newShop = {
        name: ''
      }
    },
    save() {
      this.$refs.newShopRef.validate(valid => {
        if (valid) {
          this.saving = true
          this.EDIT_SHOP_OTHER({
            name: this.newShop.name,
            isOther: this.newShop.isOther,
            id: this.newShop._id
          }).then(res => {
            this.saving = false
            Message({
              message: res.data,
              type: 'success',
              duration: 3000
            })
            this.cancel()
          }).catch(err => {
            this.saving = false
            Message({
              message: err.response.data,
              type: 'error',
              duration: 3000
            })
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style>

</style>
