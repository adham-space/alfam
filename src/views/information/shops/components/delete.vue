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
    <p v-if="!!currentShop">Do you want to delete driver: {{ ` ID: ${currentShop._id}` }} </p>
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
    ...mapState('shops', ['currentShop'])
  },
  methods: {
    ...mapActions('shops', ['DELETE_SHOP']),
    cancel() {
      this.$emit('closeDialog')
    },
    save() {
      console.log(this.currentShop)
      this.DELETE_SHOP(this.currentShop._id)
      this.cancel()
    }
  }
}
</script>

<style>

</style>
