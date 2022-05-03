<template>
  <el-dialog
    title="Edit customer"
    :visible.sync="dialogVisible"
    width="40%"
    align="center"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    @open="dialogOpened"
  >
    <el-form ref="newCustomerRef" :model="newCustomer" :rules="rules">
      <el-form-item>
        <el-col :span="12">
          <el-form-item prop="firstName" label="Исми">
            <el-input v-model="newCustomer.firstName" placeholder="Исми" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="lastName" label="Фамиляси">
            <el-input v-model="newCustomer.lastName" placeholder="Фамиляси" />
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="12">
          <el-form-item prop="address" label="Аддресс">
            <el-input v-model="newCustomer.address" placeholder="Аддресс" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="phone" label="Тел. рақам">
            <el-input v-model="newCustomer.phone" placeholder="Тел. рақам" />
          </el-form-item>
        </el-col>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel()">Отмена</el-button>
      <el-button type="primary" @click="save()">Сохранить</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { Message } from 'element-ui'
import { mapActions, mapState } from 'vuex'
import editCustomer from './mixins/editCustomer'
export default {
  mixins: [editCustomer],
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapState('customers', ['currentCustomer'])
  },
  methods: {
    ...mapActions('customers', ['EDIT_CUSTOMER']),
    dialogOpened() {
      this.newCustomer = {
        ...this.currentCustomer
      }
    },
    cancel() {
      this.$emit('closeDialog')
      this.$refs.newCustomerRef.resetFields()
      this.newCustomer = {
        firstName: '',
        lastName: '',
        address: ''
      }
    },
    save() {
      this.$refs.newCustomerRef.validate((valid) => {
        if (valid) {
          this.EDIT_CUSTOMER(this.newCustomer)
            .then(() => {
              this.cancel()
              Message({
                message: 'Success: update',
                type: 'success',
                duration: 2000
              })
            })
            .catch((err) => {
              Message({
                message: err.response.data,
                type: 'error',
                duration: 2000
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
