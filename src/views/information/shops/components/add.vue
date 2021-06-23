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
        <el-col :span="12">
          <el-form-item prop="name">
            <el-input v-model="newShop.name" placeholder="Name" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="owner">
            <el-input v-model="newShop.owner" placeholder="Ownership" />
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
    ...mapMutations('shops', ['CREATE_NEWSHOP']),
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
          this.CREATE_NEWSHOP({
            name: this.newShop.name,
            owner: this.newShop.owner,
            id: Math.floor(Math.random() * 1000)
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
