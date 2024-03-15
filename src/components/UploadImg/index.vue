<template>
  <div id="UploadImg">
    <Upload :before-upload="handleUpload" action>
      <Button icon="ios-cloud-upload-outline">{{i18n_lang.components165}}</Button>
    </Upload>
    <div class="handleBox">
      <img v-if="!fileData.fileName" :src="value" alt>
      <img v-if="fileData.fileName" :src="fileValue" alt>
      <Button v-if="fileData.fileName" type="success" :loading="loading" @click="upload">{{ loading ? i18n_lang.components166 : i18n_lang.components167 }}</Button>
    </div>
    <Button v-if="value" type="error" @click="delImg()">{{i18n_lang.components168}}</Button>
    <slot>
      <p>{{i18n_lang.components169}}</p>
    </slot>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    const i18n_lang = this.$t('components');
    return {
      i18n_lang: i18n_lang,
      loading: false,
      origin: this.value,
      fileValue: '',
      fileData: {
        base64: this.value || null,
        formData: null,
        fileName: '',
        file: this.value || null
      }
    }
  },
  methods: {
    // 选择图片
    handleUpload(file) {
      this.fileData.fileName = file.name
      this.fileData.formData = new FormData()
      this.fileData.formData.append('file', file)
      this.fileData.formData.append('name', file.name)

      // 读取文件
      const reader = new FileReader()
      // 读取文件的url
      reader.readAsDataURL(file)
      reader.onload = e => {
        // 读取成功
        this.fileValue = e.target.result
        this.upload()
      }
      return false
    },
    // 上传图片
    async upload() {
      if (!this.fileData.fileName) {
        return
      }
      this.loading = true
      const res = await this.$axios.request({
        url: '/upload',
        method: 'POST',
        data: this.fileData.formData
      })
      this.loading = false
      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      this.fileData.fileName = ''
      this.$emit('input', res.data.url)
    },
    delImg() {
      this.fileData.fileName = ''
      this.$emit('input', '')
    }
  }
}
</script>
<style lang="less" scoped>
#UploadImg {
  background-color: #f8f8f9;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 6px;
  .handleBox {
    img {
      width: 200px;
    }
  }
}
</style>
