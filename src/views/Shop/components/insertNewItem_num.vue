<template>
  <div>
    <span>{{ init === 'XATO' ? 'XATO':'' }}</span>
    <el-input v-model="newItemNum" pattern="\d+" step.native="1" type="number" @input="newListEditing()" />
  </div>
</template>

<script>
export default {
  props: {
    // eslint-disable-next-line
    code: String,
    init: String
  },
  data() {
    return {
      newItemNum: this.init + ''
    }
  },
  methods: {
    newListEditing() {
      console.log('1-code: ', this.code)
      this.newItemNum = (this.newItemNum + '').replace('.', '')
      this.$emit('newItemNumChanging', { code: this.code, newItemNum: this.newItemNum })
    }
  }
}
</script>

<style>

</style>
