<template>
  <div id="UploadImg">
    <Upload :before-upload="handleUpload" action style="display: inline-block;">
      <Button type="primary" icon="ios-cloud-upload-outline">{{i18n_lang.activeList0}}</Button>
    </Upload>
    <div class="handleBox">
      <img :src="fileData.fileName ? fileValue : value" alt="">
      <Button
        v-if="fileData.fileName"
        type="success"
        :loading="loading"
        @click="upload"
      >{{ loading ? i18n_lang.activeList1 : i18n_lang.activeList2 }}</Button>
    </div>
    <!-- <Button v-if="value" type="error" @click="delImg()">{{i18n_lang.activeList433_4_4}}</Button> -->
    <p>{{i18n_lang.activeList447_4_4}}</p>
    <p>{{i18n_lang.activeList401_4_3}}</p>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    batchUrl: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const i18n_lang = this.$t('activeList');
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
    delImg() {
      this.fileData.fileName = ''
      this.$emit('input', '')
    },
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
        if(this.batchUrl){
          this.$emit("clearFile")
        }
      }
      return false
    },
    // 上传图片
    async upload() {
      if (!this.fileData.fileName) {
        this.$Message.warning(this.i18n_lang.activeList5)
        return
      }
      this.loading = true
      const res = await this.$axios.request({
        url: `/upload`,
        method: 'POST',
        data: this.fileData.formData
      })
      this.loading = false
      if (res.status !== 200) {
        this.$Message.error(res.message)
      } else {
        this.$Message.success(res.message)
        this.fileData.fileName = ''
        this.$emit('input', res.data.url)
      }
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
