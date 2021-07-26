<template>
  <el-dialog
    title="Edit stuff"
    :visible.sync="dialogVisible"
    width="40%"
    align="center"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    @open="dialogOpened"
  >
    <el-form ref="newStuffRef" :model="newStuff" :rules="rules">
      <el-form-item>
        <el-col :span="12">
          <el-form-item prop="firstName">
            <el-input v-model="newStuff.firstName" placeholder="First name" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="lastName">
            <el-input v-model="newStuff.lastName" placeholder="Last name" />
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="12">
          <el-form-item prop="address">
            <el-input v-model="newStuff.address" placeholder="Address" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="phon">
            <el-input v-model="newStuff.phone" placeholder="Phone" />
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="12">
          <el-form-item prop="shopId" label="Shop">
            <el-select v-model="newStuff.shopId" style="width: 100%">
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
      <el-button @click="cancel()">Cancel</el-button>
      <el-button type="primary" @click="save()">Save</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import edit from './mixins/edit'
import { Message } from 'element-ui'
export default {
  mixins: [edit],
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
    ...mapState('stuffs', ['currentStuff']),
    ...mapState('shops', ['tableData']),
    shops() {
      return this.tableData
    }
  },
  mounted() {
    this.GET_SHOPS()
  },
  methods: {
    ...mapActions('stuffs', ['EDIT_STUFF']),
    ...mapActions('shops', ['GET_SHOPS']),
    dialogOpened() {
      this.newStuff = {
        id: this.currentStuff._id,
        firstName: this.currentStuff.firstName,
        lastName: this.currentStuff.lastName,
        address: this.currentStuff.address,
        phone: this.currentStuff.phone,
        shopId: this.currentStuff.shop._id
      }
    },
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
      this.$refs.newStuffRef.validate(valid => {
        if (valid) {
          this.EDIT_STUFF({
            firstName: this.newStuff.firstName,
            lastName: this.newStuff.lastName,
            address: this.newStuff.address,
            phone: this.newStuff.phone,
            shopId: this.newStuff.shopId,
            id: this.newStuff.id
          }).then(() => {
            this.cancel()
          }).catch(err => {
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
