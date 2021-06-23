<template>
  <el-dialog
    title="Edit order"
    :visible.sync="dialogVisible"
    custom-class="customDialog"
    align="center"
    fullscreen
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    @open="dialogOpened"
  >
    <editBody ref="editBodyRef">
      <span style="margin-top: 1rem" class="dialog-footer">
        <el-button @click="cancel()">Cancel</el-button>
        <el-button type="primary" @click="save()">Save</el-button>
      </span>
    </editBody>

  </el-dialog>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import editBody from '../../editOrder/index.vue'
export default {
  components: {
    editBody
  },
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
    ...mapState('orders', ['currentDriver'])
  },
  methods: {
    ...mapMutations('orders', ['EDIT_DRIVER']),
    dialogOpened() {
      this.newDriver = {
        ...this.currentDriver
      }
    },
    cancel() {
      this.$emit('closeDialog')
    },
    save() {
      this.$refs.editBodyRef.callSave()
      this.$emit('closeDialog')
    }
  }
}
</script>

<style>

.customDialog > .el-dialog__body {
  padding: 0 !important;
}

</style>
