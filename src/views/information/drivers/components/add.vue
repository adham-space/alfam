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
      <el-button @click="cancel()">Cancel</el-button>
      <el-button type="primary" @click="save()">Save</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapMutations } from 'vuex'
import add from './mixins/add'
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

    }
  },
  methods: {
    ...mapMutations('drivers', ['CREATE_NEWDRIVER']),
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
          this.CREATE_NEWDRIVER({
            firstName: this.newDriver.firstName,
            lastName: this.newDriver.lastName,
            address: this.newDriver.address,
            id: Math.floor(Math.random() * 1000),
            phone: this.newDriver.phone,
            createdAt: new Date().toLocaleDateString(),
            car_num: this.newDriver.car_num,
            car_type: this.newDriver.car_type
          })
          this.cancel()
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
