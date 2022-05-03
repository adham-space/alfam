<template>
  <el-dialog
    title="Ҳодим қўшиш"
    :visible.sync="dialogVisible"
    width="50%"
    align="center"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
  >
    <el-form ref="newStuffRef" :model="newStuff" :rules="rules">
      <el-form-item>
        <el-col :span="12">
          <el-form-item prop="firstName" label="Исми">
            <el-input v-model="newStuff.firstName" placeholder="Исми" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="lastName" label="Фамиляси">
            <el-input v-model="newStuff.lastName" placeholder="Фамиляси" />
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="12">
          <el-form-item prop="address" label="Адрес">
            <el-input v-model="newStuff.address" placeholder="Адрес" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="phone" label="Тел. рақам">
            <el-input v-model="newStuff.phone" placeholder="Тел. рақам" />
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="12">
          <el-form-item prop="shopId" label="Дўкон">
            <el-select
              v-model="newStuff.shopId"
              style="width: 100%"
              placeholder="Дўкон"
            >
              <el-option
                v-for="shop in shops"
                :key="shop._id"
                :value="shop._id"
                :label="shop.name"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel()">Отменить</el-button>
      <el-button type="primary" @click="save()">Сохранить</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import add from './mixins/add'
import request from '@/utils/request'
import { Message } from 'element-ui'
export default {
  mixins: [add],
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapState('shops', ['tableData']),
    shops() {
      return this.tableData
    }
  },
  mounted() {
    this.GET_SHOPS()
  },
  methods: {
    ...mapMutations('stuffs', ['SET_QUERY']),
    ...mapActions('shops', ['GET_SHOPS']),
    ...mapActions('stuffs', ['GET_STUFFS']),
    cancel() {
      this.$emit('closeDialog')
      this.$refs.newStuffRef.resetFields()
      this.newStuff = {
        firstName: '',
        lastName: '',
        address: '',
        phone: '',
        shopId: ''
      }
    },
    save() {
      this.$refs.newStuffRef.validate((valid) => {
        if (valid) {
          console.log('new stuff:', this.newStuff)
          request({
            url: '/info/add-stuff',
            method: 'POST',
            data: this.newStuff
          })
            .then((res) => {
              Message({
                message: res.data,
                type: 'success',
                duration: 2000
              })
              this.cancel()
            })
            .catch((err) => {
              Message({
                message: err.response.data,
                type: 'error',
                duration: 2000
              })
            })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style>
</style>
