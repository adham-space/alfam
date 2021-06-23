<template>
  <el-dialog
    title="Edit shop"
    :visible.sync="dialogVisible"
    width="40%"
    align="center"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    @open="dialogOpened"
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
import { mapMutations, mapState } from 'vuex'
import edit from './mixins/edit'
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

    }
  },
  computed: {
    ...mapState('shops', ['currentShop'])
  },
  methods: {
    ...mapMutations('shops', ['EDIT_SHOP']),
    dialogOpened() {
      this.newShop = {
        ...this.currentShop
      }
    },
    cancel() {
      this.$emit('closeDialog')
      this.$refs.newShopRef.resetFields()
      this.newShop = {
        firstName: '',
        lastName: '',
        address: ''
      }
    },
    save() {
      this.$refs.newShopRef.validate(valid => {
        if (valid) {
          this.EDIT_SHOP({
            name: this.newShop.name,
            owner: this.newShop.owner,
            id: this.newShop.id
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
