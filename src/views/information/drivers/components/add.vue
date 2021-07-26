<template>
  <el-dialog
    title="Add new driver"
    :visible.sync="dialogVisible"
    width="50%"
    align="center"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
  >
    <el-form ref="newDriverRef" :model="newDriver" :rules="rules">
      <el-form-item>
        <el-col :span="12">
          <el-form-item prop="firstName">
            <el-input v-model="newDriver.firstName" placeholder="First name" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="lastName">
            <el-input v-model="newDriver.lastName" placeholder="Last name" />
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="12">
          <el-form-item prop="address">
            <el-input v-model="newDriver.address" placeholder="Address" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="phone">
            <el-input v-model="newDriver.phone" placeholder="Phone" />
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-col :span="12">
          <el-form-item prop="car_type">
            <el-input v-model="newDriver.car_type" placeholder="Car type" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="car_num">
            <el-input v-model="newDriver.car_num" placeholder="Car number" />
          </el-form-item>
        </el-col>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button :disabled="saving" @click="cancel()">Cancel</el-button>
      <el-button :loading="saving" :disabled="saving" type="primary" @click="save()">Save</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import request from '@/utils/request'
import add from './mixins/add'
import { Message } from 'element-ui'
export default {
  mixins: [add],
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
    ...mapActions('drivers', ['GET_DRIVERS']),
    cancel() {
      this.$emit('closeDialog')
      this.$refs.newDriverRef.resetFields()
      this.newDriver = {
        firstName: '',
        lastName: '',
        address: '',
        phone: '',
        car_num: '',
        car_type: ''
      }
    },
    save() {
      this.$refs.newDriverRef.validate(valid => {
        if (valid) {
          this.saving = true
          request({
            url: '/info/add-driver',
            method: 'POST',
            data: this.newDriver
          }).then(() => {
            this.saving = false
            this.GET_DRIVERS()
            Message({
              message: 'Success: added new driver',
              type: 'success',
              duration: 2000
            })
            this.cancel()
          }).catch(err => {
            this.saving = false
            Message({
              message: err.response.data,
              type: 'success',
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
