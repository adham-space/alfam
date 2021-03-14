<template>
  <div>
    <span>{{ init === 'XATO' ? 'XATO' : '' }}</span>
    <el-input v-model="newArea" style="" type="number" @input="newListEditing()" />
  </div>
</template>

<script>
export default {
  props: {
    code: String,
    init: String
  },
  data() {
    return {
      newArea: this.init + ''
    }
  },
  methods: {
    newListEditing() {
      console.log('0-code: ', this.code)
      this.$emit('newAreaChanging', { code: this.code, newValue: this.newArea })
    }
  }
}
</script>

<style>

</style>
