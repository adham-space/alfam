<template>
  <el-dialog
    title="Add new customer"
    :visible.sync="dialogVisible"
    width="50%"
    align="center"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
  >
    <el-form ref="newCustomerRef" :model="newCustomer" :rules="rules">
      <el-form-item>
        <el-col :span="12">
          <el-form-item prop="firstName">
            <el-input v-model="newCustomer.firstName" placeholder="Enter firstName" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="lastName">
            <el-input v-model="newCustomer.lastName" placeholder="Enter lastName" />
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="12">
          <el-form-item prop="address">
            <el-input v-model="newCustomer.address" placeholder="Enter address" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="phon">
            <el-input v-model="newCustomer.phone" placeholder="Enter phone" />
          </el-form-item>
        </el-col>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button :disabled="saving" @click="cancel()">Cancel</el-button>
      <el-button :disabled="saving" :loading="saving" type="primary" @click="save()">Save</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import addCustomer from './mixins/addCustomer'
import request from '@/utils/request'
import { Message } from 'element-ui'
export default {
  mixins: [addCustomer],
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
  methods: {
    ...mapActions('customers', ['GET_CUSTOMERS']),
    cancel() {
      this.$emit('closeDialog')
      this.$refs.newCustomerRef.resetFields()
      this.newCustomer = {
        firstName: '',
        lastName: '',
        address: '',
        phone: ''
      }
    },
    save() {
      this.$refs.newCustomerRef.validate(valid => {
        if (valid) {
          this.saving = true
          request({
            url: '/info/add-customer',
            method: 'POST',
            data: this.newCustomer
          }).then(() => {
            this.saving = false
            Message({
              message: 'Success:  added new customer',
              type: 'success',
              duration: 2000
            })
            this.GET_CUSTOMERS()
            this.cancel()
          })
            .catch(err => {
              this.saving = false
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
