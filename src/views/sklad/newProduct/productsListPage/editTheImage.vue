<template>
  <div>
    <!-- eslint-disable -->
    <el-button icon="el-icon-edit" type="text" @click="dialogVisible = true" />
    <el-dialog
      title="Расмни ўзгартириш"
      :visible.sync="dialogVisible"
      width="40%"
    >
      <span>
        <el-image
          style="width: 100%; height: 90%"
          :src="imageUrl"
          fit="scale-down"
        />
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
          <el-button size="small" type="primary">Янги расмни юклаш</el-button>
          <div slot="tip" class="el-upload__tip" />
        </el-upload>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Отмена</el-button>
        <el-button
          :loading="imageSaving"
          :disabled="imageSaving || photo.length === 0"
          type="primary"
          @click="confirmEditPhoto()"
        >
          Сохранить
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Message } from 'element-ui'
import request from '@/utils/request'
export default {
  /* eslint-disable */
  props: {
    old_image: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String,
      required: true
    },
    product_id: {
      type: String,
      required: true
    },
    type_id: {
      type: String,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      dialogVisible: false,
      photo: [],
      imageSaving: false
    }
  },
  methods: {
    handleChange(file, fileList) {
      this.photo = [file]
    },
    handleRemove() {
      this.photo = []
    },
    handleExceed(file, fileList) {
      this.photo = [fileList[0]]
    },
    async confirmEditPhoto() {
      /* eslint-disable */
      try {
        this.imageSaving = true
        let error = false
        let name = this.imageUrl.split('/')
        name = name[name.length - 1]
        await this.delete_photo(name)
        const photo_path = await this.uploadImages(this.photo[0]).catch(err => {
          Message({
            message: err.response.data,
            type: 'error',
            duration: 3000
          })
          error = true
        })
        await this.uploadToS3(this.photo[0].raw, photo_path.data.signedRequest)
        if (!error) {
          await this.editThePhoto({
            product_id: this.product_id,
            type_id: this.type_id,
            photo: photo_path.data.path,
            index: this.index,
            old_image: this.old_image
          }).catch(err => {
            Message({
              message: err.response.data,
              type: 'error',
              duration: 3000
            })
          })
        }
        
        error = false
        this.imageSaving = false
        this.$emit('updateTable')
      } catch (err) {
        console.error(err)
        this.imageSaving = false
      }
    },
    delete_photo(name) {
      return request({
        url: '/products/delete-image',
        method: 'DELETE',
        data: {name}
      })
    },
    uploadImages(photo) {
      return request({
        url: '/products/upload-images',
        method: 'POST',
        data: {name: photo.raw.name, type:  photo.raw.type}
      })
    },
    editThePhoto(data) {
      return request({
        url: '/products/update-type-photo',
        data,
        method: 'PUT'
      })
    },
    uploadToS3(file, url) {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open('PUT', url)
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              resolve()
            } else {
              reject()
              alert('Could not upload file.')
            }
          }
        }
        xhr.send(file)
      })
    }
  }
}
</script>

<style>

</style>
