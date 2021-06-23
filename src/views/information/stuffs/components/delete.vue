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
    <p v-if="!!currentDriver">Do you want to delete driver: {{ `${currentDriver.firstName} ${currentDriver.lastName} with an ID: ${currentDriver.id}` }} </p>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel()">No</el-button>
      <el-button type="danger" @click="save()">Yes</el-button>
    </span>
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

    }
  },
  computed: {
    ...mapState('drivers', ['currentDriver'])
  },
  methods: {
    ...mapMutations('drivers', ['DELETE']),
    cancel() {
      this.$emit('closeDialog')
    },
    save() {
      this.DELETE()
      this.cancel()
    }
  }
}
</script>

<style>

</style>
