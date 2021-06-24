<template>
  <el-dialog
    title="Edit user"
    :visible.sync="dialogVisible"
    width="40%"
    align="center"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    @open="dialogOpened"
  >
    <el-form ref="newUserRef" :model="newUser" :rules="rules">
        <el-form-item>
        <el-col :span="12">
          <el-form-item prop="stuffId">
            <el-select v-model="newUser.stuffId" style="width: 100%" placeholder="Stuff">
              <el-option label="Adham Muhammadjonov" value="231"></el-option>
              <el-option label="Alisher Rahimov" value="651"></el-option>
              <el-option label="Sardor Rahimov" value="432"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="roleId">
              <el-select v-model="newUser.roleId" style="width: 100%" placeholder="Role">
              <el-option label="admin" value="231"></el-option>
              <el-option label="zav. sklad" value="651"></el-option>
              <el-option label="seller" value="432"></el-option>
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
    ...mapState('users', ['currentUser'])
  },
  methods: {
    ...mapMutations('users', ['EDIT_USER']),
    dialogOpened() {
      this.newUser = {
        ...this.currentUser
      }
    },
    cancel() {
      this.$emit('closeDialog')
      this.$refs.newUserRef.resetFields()
      this.newUser = {
        username: '',
        stuffId: '',
        roleId: ''
      }
    },
    save() {
      this.$refs.newUserRef.validate(valid => {
        if (valid) {
          this.EDIT_USER({
            username: this.newUser.username,
            stuffId: this.newUser.stuffId,
            roleId: this.newUser.roleId,
            id: this.newUser.id
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
