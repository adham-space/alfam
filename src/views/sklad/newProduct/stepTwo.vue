<template>
  <el-row :gutter="10" class="stepOne">
    <el-col :span="24" class="step-header">
      <h2>{{ $store.state.newProduct.product_name }}</h2>
    </el-col>
    <el-col class="selectType" :span="24">
      <el-select
        v-model="currentType"
        placeholder="Турлари"
        @change="typeChoosen"
      >
        <el-option
          v-for="type in types"
          :key="type.id"
          :label="type.type_name"
          :value="type.id"
        />
      </el-select>
    </el-col>
    <el-col class="typeTitle" :span="24">
      <h4>{{ currentTypeName }}</h4>
    </el-col>
    <el-col :span="24">
      <el-form :model="formTwo">
        <el-form-item>
          <el-col :span="12">
            <el-form-item label="Code">
              <el-input v-model="formTwo.code" placeholder="Коди" />
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12">
            <el-form-item label="Base price">
              <el-input v-model="formTwo.code" placeholder="Base price" />
            </el-form-item>
          </el-col> -->
        </el-form-item>

        <el-form-item style="">
          <el-col :span="8">
            <el-form-item label="Бўйига (cм)">
              <el-input v-model="formTwo.height" placeholder="Бўйига (cм)" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Энига (cм)">
              <el-input v-model="formTwo.width" placeholder="Энига (cм)" />
            </el-form-item>
          </el-col>
          <el-col :span="8" style="height: 4.5rem; display: flex; align-items: flex-end">
            <el-form-item label="">
              <el-checkbox v-model="formTwo.isMain">Асоосий размер</el-checkbox>
            </el-form-item>
          </el-col>
        </el-form-item>
      </el-form>

      <el-upload
        class="upload-demo"
        action=""
        :on-change="handleChange"
        :on-remove="handleRemove"
        :file-list="photo"
        :limit="2"
        list-type="picture"
        :on-exceed="handleExceed"
      >
        <el-button size="small" type="primary">Расмни юклаш</el-button>
        <div slot="tip" class="el-upload__tip" />
      </el-upload>
    </el-col>
    <el-col
      style="display: flex; justify-content: center"
      :offset="6"
      :span="12"
    >
      <el-button
        style="color: green; margin-top: 0.5rem"
        icon="el-icon-plus"
        @click="save()"
      >Сақлаш</el-button>
    </el-col>
  </el-row>
</template>

<script>
import { mapState } from 'vuex'
import { Message } from 'element-ui'
export default {
  data() {
    return {
      objectURL: null,
      currentType: '',
      code: '',
      size: '',
      photo: [],
      last_changedId: -1,
      formTwo: {
        code: '',
        height: '',
        width: '',
        isMain: false
      }
    }
  },
  computed: {
    ...mapState('newProduct', ['types']),
    currentTypeName() {
      return this.types.find((t) => t.id + '' === this.currentType + '') !==
        undefined
        ? this.types.find((t) => t.id + '' === this.currentType + '').name
        : ''
    }
  },
  methods: {
    save() {
      const type = this.types.find(
        (typ) => typ.id + '' === this.currentType + ''
      )
      console.log('TYPE: ', type)
      type.code = this.formTwo.code + ''
      type.height = parseFloat(this.formTwo.height)
      type.width = parseFloat(this.formTwo.width)
      type.size = `${type.height}*${type.width}`
      type.isMain = this.formTwo.isMain
      type.photo = this.photo[0]
      this.last_changedId = type.id
      const index = this.types.findIndex((typ) => typ.id + '' === type.id + '')
      const isThereTheCode = this.types.find(typ => typ.id !== type.id && typ.code === type.code)
      if (isThereTheCode) {
        Message({
          message: 'Bir hil Kod Mumkin emas',
          type: 'error',
          duration: 3000
        })
      } else {
        this.$store.commit('newProduct/SET_TYPE', { index: index, type })
        this.formTwo = {
          id: '',
          code: '',
          height: '',
          width: '',
          isMain: false
        }
        this.photo = []
        this.currentType = ''
      }
    },
    handleChange(file, fileList) {
      this.photo = [file]
    },
    handleRemove() {
      this.photo = []
    },
    handleExceed(file, fileList) {
      console.log()
      this.photo = [fileList[0]]
    },
    typeChoosen(val) {
      console.log(val, 'type changed')
      const type = this.types.find((typ) => typ.id === val)
      console.log('types', type)
      if (type && !!type.code === false) {
        this.formTwo = {
          id: type.id,
          code: '',
          height: '',
          width: '',
          isMain: false
        }
        if (this.types.length >= 0 && this.last_changedId > -1) {
          const type = this.types.find(ty => ty.id === this.last_changedId)
          console.log('last_changedId', this.last_changedId)
          this.formTwo = {
            id: type.id ? type.id : '',
            code: type.code,
            height: type.height,
            width: type.width,
            isMain: type.isMain
          }
        }
        this.photo = type.photo ? [type.photo] : []
      } else if (type && !!type.code === true) {
        this.formTwo = {
          id: type.id,
          code: type.code,
          height: type.height,
          width: type.width,
          isMain: type.isMain
        }
        this.photo = type.photo ? [type.photo] : []
      }
    }
  }
}
</script>

<style>
.stepOne {
  /* border: 1px solid red; */
  height: 100%;
  overflow-y: scroll;
}
.newType {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.selectType {
  display: flex;
  align-items: center;
}

.typeTitle {
  display: flex;
  justify-content: center;
  border-bottom: 1px solid rgb(228, 228, 228);
}

.step-header {
  display: flex;
  justify-content: center;
}
</style>
