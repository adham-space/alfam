<template>
  <el-dialog
    title="Add new stuff"
    :visible.sync="dialogVisible"
    width="50%"
    align="center"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
  >
    <el-form ref="newStuffRef" :model="newStuff" :rules="rules">
      <el-form-item>
        <el-col :span="12">
          <el-form-item prop="firstName">
            <el-input v-model="newStuff.firstName" placeholder="First name" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="lastName">
            <el-input v-model="newStuff.lastName" placeholder="Last name" />
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="12">
          <el-form-item prop="address">
            <el-input v-model="newStuff.address" placeholder="Address" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="phone">
            <el-input v-model="newStuff.phone" placeholder="Phone" />
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
    ...mapMutations('drivers', ['CREATE_NEWSTUFF']),
    cancel() {
      this.$emit('closeDialog')
      this.$refs.newStuffRef.resetFields()
      this.newStuff = {
        firstName: '',
        lastName: '',
        address: '',
        phone: ''
      }
    },
    save() {
      this.$refs.newStuffRef.validate(valid => {
        if (valid) {
          this.CREATE_NEWSTUFF({
            firstName: this.newStuff.firstName,
            lastName: this.newStuff.lastName,
            address: this.newStuff.address,
            id: Math.floor(Math.random() * 1000),
            phone: this.newStuff.phone,
            createdAt: new Date().toLocaleDateString(),
            car_num: this.newStuff.car_num,
            car_type: this.newStuff.car_type
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
