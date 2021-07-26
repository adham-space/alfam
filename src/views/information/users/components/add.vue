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
            <el-select v-model="newUser.stuffId" :loading="stuffLoading" style="width: 100%" placeholder="Stuff">
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
          <el-form-item prop="roleId">
            <el-select v-model="newUser.role" style="width: 100%" placeholder="Role">
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
      stuffLoading: false,
      saving: false
    }
  },
  computed: {
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
    ...mapActions('users', ['ADD_USER']),
    ...mapActions('stuffs', ['GET_STUFFS']),
    cancel() {
      this.$emit('closeDialog')
      this.$refs.newUserRef.resetFields()
      this.newUser = {
        stuffId: '',
        role: '',
        username: '',
        password: ''
      }
    },
    save() {
      this.$refs.newUserRef.validate(valid => {
        if (valid) {
          this.saving = true
          this.ADD_USER({
            stuffId: this.newUser.stuffId,
            role: this.newUser.role,
            username: this.newUser.username,
            password: this.newUser.password,
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
              message: err.response.data,
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
