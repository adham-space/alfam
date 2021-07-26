<template>
  <el-dialog
    title="Delete driver"
    :visible.sync="dialogVisible"
    width="50%"
    align="center"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    :destroy-on-close="true"
  >
    <p v-if="!!currentDriver">Do you want to delete driver: {{ `${currentDriver.firstName} ${currentDriver.lastName} with an ID: ${currentDriver._id}` }} </p>
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
    ...mapState('drivers', ['currentDriver'])
  },
  methods: {
    ...mapActions('drivers', ['DELETE_DRIVER']),
    cancel() {
      this.$emit('closeDialog')
    },
    save() {
      this.DELETE_DRIVER({ _id: this.currentDriver._id }).then(() => {
        this.cancel()
        Message({
          message: 'Success: delete',
          type: 'success',
          duration: 2000
        })
      }).catch(err => {
        Message({
          message: err.response.data,
          type: 'error',
          duration: 2000
        })
      })
    }
  }
}
</script>

<style>

</style>
