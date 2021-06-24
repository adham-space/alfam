<template>
  <div>
    <span>{{ init === 'XATO' ? 'XATO':'' }}</span>
    <el-input :value="newItemNum" pattern="[0-9]" step.native="1" type="number" @input="newListEditing($event)" />
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
    newListEditing(event) {
      console.log('1-code: ', this.code)
      this.newItemNum = (event + '')[(event + '').length - 1] === '.' || (event + '')[(event + '').length - 1] === ',' ? this.newItemNum : event 
      this.$emit('newItemNumChanging', { code: this.code, newItemNum: this.newItemNum })
    }
  }
}
</script>

<style>

</style>
