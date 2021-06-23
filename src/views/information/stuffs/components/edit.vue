<template>
  <el-dialog
    title="Edit stuff"
    :visible.sync="dialogVisible"
    width="40%"
    align="center"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    @open="dialogOpened"
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
          <el-form-item prop="phon">
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
    ...mapState('stuffs', ['currentStuff'])
  },
  methods: {
    ...mapMutations('stuffs', ['EDIT_STUFF']),
    dialogOpened() {
      this.newStuff = {
        ...this.currentStuff
      }
    },
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
          this.EDIT_STUFF({
            firstName: this.newStuff.firstName,
            lastName: this.newStuff.lastName,
            address: this.newStuff.address,
            phone: this.newStuff.phone,
            id: this.newStuff.id
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
