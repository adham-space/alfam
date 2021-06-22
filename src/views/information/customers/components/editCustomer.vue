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
import { mapMutations, mapState } from 'vuex'
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
    return {

    }
  },
  computed: {
    ...mapState('customers', ['currentCustomer'])
  },
  methods: {
    ...mapMutations('customers', ['CREATE_NEWCUSTOMER', 'EDIT_CUSTOMER']),
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
      this.$refs.newCustomerRef.validate(valid => {
        if (valid) {
          this.EDIT_CUSTOMER({
            firstName: this.newCustomer.firstName,
            lastName: this.newCustomer.lastName,
            address: this.newCustomer.address,
            phone: this.newCustomer.phone,
            id: this.newCustomer.id
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
