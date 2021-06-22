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
      <el-button @click="cancel()">Cancel</el-button>
      <el-button type="primary" @click="save()">Save</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapMutations } from 'vuex'
import addCustomer from './mixins/addCustomer'
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

    }
  },
  methods: {
    ...mapMutations('customers', ['CREATE_NEWCUSTOMER']),
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
          this.CREATE_NEWCUSTOMER({
            firstName: this.newCustomer.firstName,
            lastName: this.newCustomer.lastName,
            address: this.newCustomer.address,
            id: Math.floor(Math.random() * 1000),
            shopping_amount: 0,
            shopping_times: 0,
            phone: this.newCustomer.phone,
            createdAt: new Date().toLocaleDateString()
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
