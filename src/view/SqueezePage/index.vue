<template>
  <div>
    <Spin v-if="loading.page" size="large" fix></Spin>
    <Tabs v-model="curTab" @on-click="handleTabRemove">
      <TabPane :label="`${i18n_lang.activeList410_4_4}`" name="H5">
        <Form
          ref="info"
          :model="info"
          :rules="ruleValidate"
          :label-width="150">
          <FormItem :label="`${i18n_lang.activeList405_4_3}`" prop="img">
            <UploadImg
              v-model="info.img"
              :batchUrl="true"
              :updataType="'img'"
              @input="batchUrlFn"
              @clearFile="clearFile"
            ></UploadImg>
          </FormItem>
          <FormItem :label="`${i18n_lang.activeList411_4_4}`" prop="video">
            <UploadImg
              v-model="info.video"
              :batchUrl="true"
              :updataType="'video'"
              @input="batchUrlVideoFn"
              @clearFile="clearFileVideo"
            ></UploadImg>
          </FormItem>
          <FormItem :label="`${i18n_lang.activeList434_4_4}`" prop="button">
            <UploadImg
              v-model="info.button"
              :batchUrl="true"
              :updataType="'button'"
              @input="batchUrlButtonFn"
              @clearFile="clearFileButton"
            ></UploadImg>
          </FormItem>
          <FormItem :label="`${i18n_lang.activeList406_4_3}`" prop="jump_url">
            <Input v-model="info.jump_url" :placeholder="` `" style="width: 500px;"/>
          </FormItem>
        </Form>
        <Button type="primary" :loading="loading.btn" @click="Save()">{{i18n_lang.activeList403_4_3}}</Button>
      </TabPane>
      <TabPane :label="`${i18n_lang.activeList412_4_4}`" name="APP">
        <Form
          ref="info"
          :model="infoApp"
          :rules="ruleValiDateApp"
          :label-width="150">
          <FormItem :label="`${i18n_lang.activeList438_4_4}`" prop="type">
            <RadioGroup v-model="infoApp.type">
              <Radio :label="1">{{`${i18n_lang.activeList414_4_4}`}}</Radio>
              <span @click="handleView(style_one)" style="color: #2d8cf0;cursor: pointer;vertical-align: middle;margin: 0 20px;">{{`${i18n_lang.activeList415_4_4}`}}</span>
              <!-- app_boot_style_img.one -->
              <Radio :label="2">{{`${i18n_lang.activeList416_4_4}`}}</Radio>
              <!-- app_boot_style_img.two -->
              <span @click="handleView(style_two)" style="color: #2d8cf0;cursor: pointer;vertical-align: middle;margin: 0 20px;">{{`${i18n_lang.activeList415_4_4}`}}</span>
            </RadioGroup>
          </FormItem>
          <FormItem :label="`${i18n_lang.activeList417_4_4}`" prop="top_img">
            <UploadImg
              v-model="infoApp.top_img"
              :batchUrl="true"
              :updataType="'top_img'"
              :textShow="true"
              @input="batchUrlTopImgFn"
              @clearFile="clearFileTopImg"
            ></UploadImg>
          </FormItem>
          <FormItem :label="`${i18n_lang.activeList418_4_4}`" prop="live_url">
            <UploadImg
              v-model="infoApp.live_url"
              :batchUrl="true"
              :updataType="'live_url'"
              @input="batchUrlLiveUrlFn"
              @clearFile="clearFileLiveUrl"
            ></UploadImg>
          </FormItem>
          <FormItem :label="`${i18n_lang.activeList419_4_4}`" prop="download_img">
            <UploadImg
              v-model="infoApp.download_img"
              :batchUrl="true"
              :updataType="'img'"
              @input="batchUrlDownloadImgFn"
              @clearFile="clearFileDownloadImg"
            ></UploadImg>
          </FormItem>
          <!-- <FormItem :label="`引导图片`" prop="app_boot">
            <UploadImg
              v-model="infoApp.app_boot"
              :batchUrl="true"
              @input="batchUrlAppFn"
              @clearFile="clearFileApp"
            ></UploadImg>
          </FormItem> -->
        </Form>
        <Button type="primary" :loading="loading.btn" @click="Save()">{{i18n_lang.activeList403_4_3}}</Button>
      </TabPane>
    </Tabs>
    <!-- 查看图片 -->
    <image-preview ref="imgPreviewRef"></image-preview>
  </div>
</template>

<script>
  import UploadImg from './UploadImg'
  import imagePreview from "./image-preview/imagePreview.vue"
  import style_one from 'static/style_one.png'
  import style_two from 'static/style_two.png'
  export default {
    data() {
      const i18n_lang = this.$t('activeList');
      return {
        i18n_lang: i18n_lang,
        style_one,
        style_two,
        loading: {
          page: false,
          btn: false
        },
        curTab: 'H5',
        info: {
          img: "",
          video: "",
          button: "",
          jump_url: ""
        },
        ruleValidate: {},
        infoApp: {
          type: 1,
          top_img: "",
          live_url: "",
          download_img: "",
          app_boot: ""
        },
        ruleValiDateApp: {},
        app_boot_style_img: {
          one: '',
          two: ''
        }
      }
    },
    created() {
      this.getData()
      // this.getDataTwo()
    },
    components: {
      UploadImg,
      imagePreview
    },
    methods: {
      handleTabRemove(name){
        if(name == 'H5'){
          this.getData()
        }
        if(name == 'APP'){
          this.getDataTwo()
        }
      },
      batchUrlFn(url){
        this.info.img = url
      },
      clearFile(){
        this.info.img = ''
      },
      batchUrlVideoFn(url){
        this.info.video = url
      },
      clearFileVideo(){
        this.info.video = ''
      },
      batchUrlButtonFn(url){
        this.info.button = url
      },
      clearFileButton(){
        this.info.button = ''
      },
      batchUrlTopImgFn(url){
        this.infoApp.top_img = url
      },
      clearFileTopImg(){
        this.infoApp.top_img = ''
      },
      batchUrlLiveUrlFn(url){
        this.infoApp.live_url = url
      },
      clearFileLiveUrl(){
        this.infoApp.live_url = ''
      },
      batchUrlDownloadImgFn(url){
        this.infoApp.download_img = url
      },
      clearFileDownloadImg(){
        this.infoApp.download_img = ''
      },
      batchUrlAppFn(url){
        this.infoApp.app_boot = url
      },
      clearFileApp(){
        this.infoApp.app_boot = ''
      },
      // 查看图片
      handleView (image){
        if(!image) return
        let uploadImagesUrlArr = []
        uploadImagesUrlArr.push(image)
        this.$refs.imgPreviewRef.loadImages(uploadImagesUrlArr);
      },
      async getData() {
        this.loading.page = true
        const res = await this.$axios.request({
          url: '/system/landingpage',
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
          this.info.img = res.data.landing_page_config.img
          this.info.video = res.data.landing_page_config.video
          this.info.button = res.data.landing_page_config.button
          this.info.jump_url = res.data.landing_page_config.jump_url

          // this.infoApp.type = res.data.app_boot.type
          // this.infoApp.top_img = res.data.app_boot.top_img
          // this.infoApp.live_url = res.data.app_boot.live_url
          // this.infoApp.download_img = res.data.app_boot.download_img

          // this.app_boot_style_img = JSON.parse(res.data.app_boot_style_img)
        }
      },
      async getDataTwo() {
        this.loading.page = true
        const res = await this.$axios.request({
          url: '/system/landingpage/download',
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
          // this.info.img = res.data.landing_page_config.img
          // this.info.video = res.data.landing_page_config.video
          // this.info.button = res.data.landing_page_config.button
          // this.info.jump_url = res.data.landing_page_config.jump_url

          this.infoApp.type = res.data.app_boot.type
          this.infoApp.top_img = res.data.app_boot.top_img
          this.infoApp.live_url = res.data.app_boot.live_url
          this.infoApp.download_img = res.data.app_boot.download_img

          this.app_boot_style_img = JSON.parse(res.data.app_boot_style_img)
        }
      },
      async Save(){
        let req = {}, url = ``
        if(this.curTab == 'H5'){
          if(!this.info.img) return this.$msg({ type: 'error', message: `${this.i18n_lang.activeList407_4_3}` })
          if(!this.info.button) return this.$msg({ type: 'error', message: `${this.i18n_lang.activeList437_4_4}` })
          if(!this.info.jump_url) return this.$msg({ type: 'error', message: `${this.i18n_lang.activeList408_4_3}` })
          if(this.info.jump_url.indexOf('http://') == -1 && this.info.jump_url.indexOf('https://') == -1) return this.$msg({ type: 'error', message: `${this.i18n_lang.activeList409_4_3}` })
          req = {
            img: this.info.img,
            video: this.info.video,
            button: this.info.button,
            jump_url: this.info.jump_url
          }
          url = `/system/landingpage`
        }
        if(this.curTab == 'APP'){
          // if(!this.infoApp.app_boot) return this.$msg({ type: 'error', message: `请上传引导图片` })
          req = {
            // app_boot: this.infoApp.app_boot
            type: this.infoApp.type,
            top_img: this.infoApp.top_img,
            live_url: this.infoApp.live_url,
            download_img: this.infoApp.download_img,
          }
          url = `/system/landingpage/download`
        }
        this.loading.btn = true
        const res = await this.$axios.request({
          url: `${url}`,
          method: 'PUT',
          data: {
            ...req
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
        this.curTab == 'H5' ? this.getData() : this.getDataTwo()
      }
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
