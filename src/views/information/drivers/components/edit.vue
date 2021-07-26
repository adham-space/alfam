<template>
  <el-dialog
    title="Edit driver"
    :visible.sync="dialogVisible"
    width="40%"
    align="center"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    @open="dialogOpened"
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
          <el-form-item prop="phon">
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
      <el-button :disabled="saving" :loading="saving" type="primary" @click="save()">Save</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import edit from './mixins/edit'
import { Message } from 'element-ui'
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
    ...mapState('drivers', ['currentDriver'])
  },
  methods: {
    ...mapActions('drivers', ['EDIT_DRIVER']),
    dialogOpened() {
      this.newDriver = {
        ...this.currentDriver
      }
    },
    cancel() {
      this.$emit('closeDialog')
      this.$refs.newDriverRef.resetFields()
      this.newDriver = {
        firstName: '',
        lastName: '',
        address: '',
        car_type: '',
        car_num: ''
      }
    },
    save() {
      this.$refs.newDriverRef.validate(valid => {
        if (valid) {
          this.saving = true
          this.EDIT_DRIVER(this.newDriver).then(res => {
            this.cancel()
            this.saving = false
            Message({
              message: 'Success: updated',
              duration: 2000,
              type: 'success'
            })
          }).catch(err => {
            this.saving = false
            Message({
              message: err.response.data,
              duration: 2000,
              type: 'error'
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
