<template>
  <div>
    <Spin v-if="loading.page" size="large" fix></Spin>
    <Form
      ref="info"
      :model="info"
      :rules="ruleValidate"
      :label-width="100">
      <FormItem :label="`LOGO`" prop="logo_img">
        <UploadImg
          v-model="info.logo_img"
          :batchUrl="true"
          @input="batchUrlFn"
          @clearFile="clearFile"
        ></UploadImg>
      </FormItem>
      <FormItem :label="`${i18n_lang.activeList431_4_4}`" prop="title">
        <Input v-model="info.title" :placeholder="` `" style="width: 700px;"/>
      </FormItem>
      <FormItem :label="`${i18n_lang.activeList422_4_4}`" prop="description">
        <div id="myEdit" style="width:700px;"></div>
      </FormItem>
      <FormItem :label="`${i18n_lang.activeList423_4_4}`" prop="commit">
        <Input v-model="info.commit" :placeholder="` `" style="width: 700px;"/>
      </FormItem>
      <FormItem :label="`${i18n_lang.activeList444_4_4}`" prop="jump_type">
        <RadioGroup v-model="info.jump_type">
          <Radio :label="1">{{`${i18n_lang.activeList445_4_4}`}}</Radio>
          <Radio :label="2">{{`${i18n_lang.activeList446_4_4}`}}</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem :label="`${i18n_lang.activeList424_4_4}`" prop="url" v-if="info.jump_type == 2">
        <Input v-model="info.url" :placeholder="` `" style="width: 700px;"/>
      </FormItem>
      <FormItem :label="`${i18n_lang.activeList425_4_4}`" prop="download">
        <Switch v-model="info.download"></Switch>
      </FormItem>
    </Form>
    <Button type="primary" :loading="loading.btn" @click="Save()">{{i18n_lang.activeList403_4_3}}</Button>
  </div>
</template>

<script>
  import UploadImg from './UploadImg'
  import Editor from 'wangeditor'
  import 'wangeditor/release/wangEditor.min.css'
  export default {
    data() {
      const i18n_lang = this.$t('activeList');
      return {
        i18n_lang: i18n_lang,
        loading: {
          page: false,
          btn: false
        },
        editor: null, // 富文本
        info: {
          logo_img: "",
          description: "",
          title: "",
          commit: "",
          jump_type: "",
          url: "",
          download: false
        },
        ruleValidate: {}
      }
    },
    created() {
      this.getData()
    },
    mounted() {
      this.editor = new Editor(`#myEdit`)
      this.editor.customConfig = this.editor.customConfig ? this.editor.customConfig : this.editor.config;
      this.editor.customConfig.pasteFilterStyle = false
      this.editor.customConfig.pasteIgnoreImg = true
      this.editor.customConfig.customUploadImg = async (files, insert) => {
        let imgUrl
        this.fileData.formData = new FormData()
        this.fileData.formData.append('file', files[0])
        this.fileData.formData.append('name', files[0].name)
        const res = await this.$axios.request({
          url: `/upload`,
          method: 'POST',
          data: this.fileData.formData
        })
        if (res.status !== 200) {
          this.$Message.error(res.message)
        } else {
          imgUrl = res.data.url
        }
        insert(imgUrl)
      }
      this.editor.customConfig.onchange = html => {
        this.info.description = html.replace(/<\/?o:p[^>]*>/gi,'')
      }
      this.editor.customConfig.pasteTextHandle = pasteStr => {
        return pasteStr
      }
      this.editor.customConfig.onchangeTimeout = this.changeInterval
      // create这个方法一定要在所有配置项之后调用
      this.editor.create()
      this.editor.txt.html(this.info.description)
    },
    components: {
      UploadImg
    },
    methods: {
      batchUrlFn(url){
        this.info.logo_img = url
      },
      clearFile(){
        this.info.logo_img = ''
      },
      async getData() {
        this.loading.page = true
        const res = await this.$axios.request({
          url: '/copywriter/topFloat',
          method: 'GET',
          params: {}
        })
        this.loading.page = false
        if (res.status !== 200) {
          this.$msg({
            type: 'error',
            message: res.message
          })
          return false
        }
        if(res.data){
          this.info.logo_img = res.data.logo_img
          this.info.description = res.data.description
          this.info.title = res.data.title
          this.info.commit = res.data.commit
          this.info.jump_type = res.data.jump_type
          this.info.url = res.data.url
          this.info.download = res.data.download ? true : false
          this.editor.txt.html(res.data.description)
        }
      },
      async Save(){
        if(!this.info.logo_img) return this.$msg({ type: 'error', message: `${this.i18n_lang.activeList426_4_4}` })
        // if(!this.info.title) return this.$msg({ type: 'error', message: `${this.i18n_lang.activeList432_4_4}` })
        if(!this.info.description) return this.$msg({ type: 'error', message: `${this.i18n_lang.activeList427_4_4}` })
        if(!this.info.commit) return this.$msg({ type: 'error', message: `${this.i18n_lang.activeList428_4_4}` })
        if(this.info.jump_type == 2){
          if(!this.info.url) return this.$msg({ type: 'error', message: `${this.i18n_lang.activeList429_4_4}` })
          if(this.info.url.indexOf('http://') == -1 && this.info.url.indexOf('https://') == -1) return this.$msg({ type: 'error', message: `${this.i18n_lang.activeList430_4_4}` })
        }
        this.loading.btn = true
        const res = await this.$axios.request({
          url: `/copywriter/topFloat`,
          method: 'PUT',
          data: {
            logo_img: this.info.logo_img,
            description: this.info.description,
            title: this.info.title,
            url: this.info.url,
            commit: this.info.commit,
            download: this.info.download ? 1 : 0,
            jump_type: this.info.jump_type
          }
        })
        this.loading.btn = false
        if (res.status !== 200 || res.state != 0) {
          this.$msg({
            type: 'error',
            message: res.message
          })
          return false
        }
        this.getData()
      },
    }
  }
</script>

<style lang="less" scoped>
  .explain{
    background-color: #f8f8f9;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 6px;
    margin-top: 24px;
  }
</style>
