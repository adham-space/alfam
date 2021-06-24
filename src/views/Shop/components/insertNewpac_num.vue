<template>
  <div>
    <span>{{ init_pack === "XATO" ? "XATO" : "" }}</span>
    <el-form :model="pack_form" :rules="rules">
      <el-form-item prop="pack">
        <el-input
          v-model="pack_form.pack"
          type="number"
          @input="newListEditing()"
        />
      </el-form-item>
      <el-form-item prop="over_pac">
        <el-input
          type="number"
          :value="pack_form.over_pac"
          pattern="[0-9]"
          step.native="1"
          placeholder=""
          @input="newListEditingNumOnly($event)"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    code: String,
    init_pack: String,
    init_over_pack: String,
    max_num: Number
  },
  data() {
    return {
      pack_form: {
        pack: this.init_pack + '',
        over_pac: this.init_over_pack + ''
      },
      rules: {
        over_pac: [
          {
            required: true,
            trigger: 'change',
            validator: (rule, value, callback) => {
              console.log('validator: ', value)
              console.log('validator: ', this.max_num)
              console.log('validator: ', value > this.max_num)
              if (value > this.max_num) {
                callback(
                  new Error('Pachkada ' + this.max_num + ' dona')
                )
              } else {
                callback()
              }
            }
          }
        ]
      }
    }
  },
  methods: {
    newListEditingNumOnly(event) {
      console.log('check: ', (event + '')[(event + '').length - 1])
      this.pack_form.over_pac = (event + '')[(event + '').length - 1] === '.' || (event + '')[(event + '').length - 1] === ',' ? this.pack_form.over_pac : event
      this.newListEditing()
    },
    newListEditing() {
      this.$emit('newPackChanging', {
        code: this.code,
        pack: this.pack_form.pack,
        overPack: this.pack_form.over_pac ? this.pack_form.over_pac : 0
      })
    }
  }
}
</script>

<style>
</style>
