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
  </el-dialog>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
 
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      saving: false
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
      setTimeout(() => {
        this.$refs.editBodyRef.triggerSumTotalPrice()
      }, 600)
    },
    cancel() {
      this.$emit('closeDialog')
    },
    save() {
      this.saving = true
      setTimeout(() => {
        this.saving = false
        this.$refs.editBodyRef.callSave()
        this.$emit('closeDialog')
      }, 2000)
    }
  }
}
</script>

<style>

.customDialog > .el-dialog__body {
  padding: 0 !important;
}

</style>
