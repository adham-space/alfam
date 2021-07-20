<template>
  <el-dialog
    title="Add new shop"
    :visible.sync="dialogVisible"
    width="50%"
    align="center"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
  >
    <el-form ref="newShopRef" :model="newShop" :rules="rules">
      <el-form-item>
        <el-col :span="24" >
          <el-form-item prop="name">
            <el-input v-model="newShop.name" placeholder="Name" />
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
import { mapMutations, mapActions } from 'vuex'
import add from './mixins/add'
import request from '@/utils/request'
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
    ...mapActions('shops', ['GET_SHOPS']),
    cancel() {
      this.$emit('closeDialog')
      this.$refs.newShopRef.resetFields()
      this.newShop = {
        name: '',
        ower: ''
      }
    },
    save() {
      this.$refs.newShopRef.validate(valid => {
        if (valid) {
         request({
           url: "info/add-shop",
           method: 'POST',
           data: this.newShop
         }).then(res => {
           this.cancel()
           this.$notify({
             message: res.data.message,
             type: 'success',
             duration: 2000
           })
           this.GET_SHOPS()
         }).catch(err => {
           this.$notify({
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
