<template>
  <el-dialog
    title="Delete stuff"
    :visible.sync="dialogVisible"
    width="50%"
    align="center"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    :destroy-on-close="true"
  >
    <p v-if="!!currentStuff">Do you want to delete driver: {{ `ID: ${currentStuff._id}` }} </p>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel()">No</el-button>
      <el-button type="danger" @click="save()">Yes</el-button>
    </span>
  </el-dialog>
</template>

<script>
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
    ...mapState('stuffs', ['currentStuff'])
  },
  methods: {
    ...mapActions('stuffs', ['DELETE_STUFF']),
    cancel() {
      this.$emit('closeDialog')
    },
    save() {
      this.DELETE_STUFF(this.currentStuff._id).then(() => {
        this.cancel()
      }).catch(err => {
        console.error(err)
      })
    }
  }
}
</script>

<style>

</style>
