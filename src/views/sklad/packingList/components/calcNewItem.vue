<template>
  <el-input v-model="newArea" type="number" @input="newListEditing()" />
</template>

<script>
export default {
  props: {
    code: String
  },
  data() {
    return {
      newArea: ''
    }
  },
  methods: {
    newListEditing() {
      this.$emit('newAreChanging', { code: this.code, newValue: this.newArea })
    }
  }
}
</script>

<style>

</style>
