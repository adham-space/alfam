<template>
  <el-dialog
    title="Add new user"
    :visible.sync="dialogVisible"
    width="50%"
    align="center"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
  >
    <el-form ref="newUserRef" :model="newUser" :rules="rules">
      <el-form-item>
        <el-col :span="12">
          <el-form-item prop="stuffId">
            <el-select v-model="newUser.stuffId" style="width: 100%" placeholder="Stuff">
              <el-option label="Adham Muhammadjonov" value="231" />
              <el-option label="Alisher Rahimov" value="651" />
              <el-option label="Sardor Rahimov" value="432" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="roleId">
            <el-select v-model="newUser.roleId" style="width: 100%" placeholder="Role">
              <el-option label="admin" value="admin" />
              <el-option label="zav. sklad" value="zavsklad" />
              <el-option label="seller" value="seller" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="12">
          <el-form-item prop="username">
            <el-input v-model="newUser.username" placeholder="Username" />
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
    ...mapMutations('users', ['CREATE_NEWUSER']),
    cancel() {
      this.$emit('closeDialog')
      this.$refs.newUserRef.resetFields()
      this.newUser = {
        stuffId: '',
        roleId: '',
        username: ''
      }
    },
    save() {
      this.$refs.newUserRef.validate(valid => {
        if (valid) {
          this.CREATE_NEWUSER({
            stuffId: this.newUser.stuffId,
            roleId: this.newUser.roleId,
            username: this.newUser.username,
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
