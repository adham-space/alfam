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
          <el-form-item prop="stuff">
            <el-select v-model="newUser.stuff" :loading="stuffLoading" style="width: 100%" placeholder="Stuff">
              <el-option
                v-for="stuff in stuffs"
                :key="stuff._id"
                :label="stuff.firstName + ' ' + stuff.lastName "
                :value="stuff._id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="role">
            <el-select v-model="newUser.role" style="width: 100%" placeholder="Role">
              <el-option label="admin" value="admin" />
              <el-option label="zav. sklad" value="zav. sklad" />
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
        <el-col :span="12">
          <el-form-item prop="password">
            <el-input v-model="newUser.password" placeholder="Temprary password" />
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="12">
          <el-form-item prop="is_active">
            <div style="display: flex">
              <el-checkbox v-model="newUser.is_active" :label="'Status' + (newUser.is_active ? ': active' : ': inactive')" />
            </div>
          </el-form-item>
        </el-col>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button :disabled="saving" @click="cancel()">Cancel</el-button>
      <el-button :disabled="saving" :loading="saving" type="primary" @click="save()">Save</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import edit from './mixins/edit'
import { Message } from 'element-ui'

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
      saving: false,
      stuffLoading: false
    }
  },
  computed: {
    ...mapState('users', ['currentUser']),
    ...mapState('stuffs', ['tableData']),
    stuffs() {
      return this.tableData
    }
  },
  mounted() {
    this.stuffLoading = true
    this.GET_STUFFS().then(() => {
      this.stuffLoading = false
    }).catch(() => {
      this.stuffLoading = false
    })
  },
  methods: {
    ...mapActions('users', ['EDIT_USER']),
    ...mapActions('stuffs', ['GET_STUFFS']),
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
          this.saving = true
          this.EDIT_USER({
            id: this.newUser._id,
            username: this.newUser.username,
            stuff: this.newUser.stuff,
            role: this.newUser.role,
            is_active: this.newUser.is_active
          }).then(res => {
            this.cancel()
            this.saving = false
            Message({
              message: res.data,
              type: 'success',
              duration: 2000
            })
          }).catch(err => {
            this.saving = false
            Message({
              message: err.response.duration,
              type: 'error',
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
