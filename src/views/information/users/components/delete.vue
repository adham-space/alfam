<template>
  <el-dialog
    title="Delete user"
    :visible.sync="dialogVisible"
    width="50%"
    align="center"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    :destroy-on-close="true"
  >
    <p v-if="!!currentUser">Do you want to delete driver: {{ `ID: ${currentUser._id}` }} </p>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel()">No</el-button>
      <el-button type="danger" @click="save()">Yes</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { Message } from 'element-ui'
import { mapActions, mapState } from 'vuex'
export default {
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
    ...mapActions('users', ['DELETE_USER']),
    cancel() {
      this.$emit('closeDialog')
    },
    save() {
      this.DELETE_USER(this.currentUser._id).then(res => {
        Message({
          message: res.data,
          type: 'success',
          duration: 2000
        })
      }).catch(err => {
        Message({
          message: err.response.data,
          duration: 2000,
          type: 'error'
        })
      })
      this.cancel()
    }
  }
}
</script>

<style>

</style>
