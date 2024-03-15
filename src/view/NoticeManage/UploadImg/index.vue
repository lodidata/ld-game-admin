<template>
  <div id="UploadImg">
    <Upload :before-upload="handleUpload" action>
      <Button type="primary" icon="ios-cloud-upload-outline">{{i18n_lang.activeList0}}</Button>
    </Upload>
    <div class="handleBox">
      <img v-if="!fileData.fileName" :src="value" alt>
      <img v-if="fileData.fileName" :src="fileValue" alt>
      <Button
        v-if="fileData.fileName"
        type="success"
        :loading="loading"
        @click="upload"
      >{{ loading ? i18n_lang.activeList1 : i18n_lang.activeList2 }}</Button>
    </div>
    <p>{{i18n_lang.activeList3}}</p>
    <p>{{i18n_lang.activeList4}}</p>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
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
      }

      // let windowURL = window.URL || window.webkitURL;
      // createObjectURL创建一个指向该参数对象(图片)的URL
      // this.fileValue = windowURL.createObjectURL(file);

      // lrz(file)
      //   .then(res => {
      //     console.log('xxxxx', res);
      //     this.origin = false;

      //     this.fileData.base64 = res.base64;
      //     this.fileData.file = res.file;
      //     this.fileData.fileName = res.origin.name;
      //     res.formData.append('name', res.file.name);
      //     this.fileData.formData = res.formData;
      //   })
      //   .catch(err => {
      //     this.$Message.error('请选择正确的图片');
      //   });
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
