<template>
  <el-row :gutter="10" class="stepOne">
    <el-col :span="24" class="step-header">
      <h2>{{ product_name }}</h2>
    </el-col>
    <el-col class="selectType" :span="24">
      <el-select
        v-model="currentType"
        placeholder="Types"
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
              <el-input v-model="formTwo.code" placeholder="Code" />
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12">
            <el-form-item label="Base price">
              <el-input v-model="formTwo.code" placeholder="Base price" />
            </el-form-item>
          </el-col> -->
        </el-form-item>

        <el-form-item>
          <el-col :span="12">
            <el-form-item label="Height (cm)">
              <el-input v-model="formTwo.height" placeholder="Height (cm)" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Width (cm)">
              <el-input v-model="formTwo.width" placeholder="Width (cm)" />
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
        <el-button size="small" type="primary">Click to upload</el-button>
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
      >save</el-button>
    </el-col>
  </el-row>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      objectURL: null,
      currentType: '',
      code: '',
      size: '',
      photo: [],
      formTwo: {
        code: '',
        height: '',
        width: ''
      }
    }
  },
  computed: {
    ...mapState('others/newProduct', ['types', 'product_name']),
    currentTypeName() {
      return this.types.find((t) => t.id + '' === this.currentType + '') !==
        undefined
        ? this.types.find((t) => t.id + '' === this.currentType + '').name
        : ''
    }
  },
  methods: {
    ...mapMutations('others/newProduct', ['SET_NAME', 'SET_TYPE']),
    save() {
      console.log('TYPES: ', this.types)
      const type = this.types.find(
        (typ) => typ.id + '' === this.currentType + ''
      )
      console.log('TYPE: ', type)
      type.code = this.formTwo.code + ''
      type.height = parseFloat(this.formTwo.height)
      type.width = parseFloat(this.formTwo.width)
      type.photo = this.photo[0]
      const index = this.types.findIndex((typ) => typ.id + '' === type.id + '')
      this.SET_TYPE({ index: index, type })
      this.formTwo = {
        code: '',
        height: '',
        width: ''
      }
      this.photo = []
      this.currentType = ''
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
      console.log(val)
      const type = this.types.find((typ) => typ.id === val)
      if (type) {
        this.formTwo = {
          code: type.code ? type.code : '',
          height: type.height ? type.height : '',
          width: type.width ? type.width : ''
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
