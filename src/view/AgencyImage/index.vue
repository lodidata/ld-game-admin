<template>
  <div>
    <Spin v-if="loading.page" size="large" fix></Spin>
    <Form
      ref="info"
      :model="info"
      :rules="ruleValidate"
      :label-width="100">
      <FormItem :label="`${i18n_lang.activeList402_4_3}`" prop="img">
        <UploadImg
          v-model="info.img"
          :batchUrl="true"
          @input="batchUrlFn"
          @clearFile="clearFile"
        ></UploadImg>
      </FormItem>
    </Form>
    <Button type="primary" :loading="loading.btn" @click="Save()">{{i18n_lang.activeList403_4_3}}</Button>
  </div>
</template>

<script>
  import UploadImg from './UploadImg'
  export default {
    data() {
      const i18n_lang = this.$t('activeList');
      return {
        i18n_lang: i18n_lang,
        loading: {
          page: false,
          btn: false
        },
        info: {
          img: ""
        },
        ruleValidate: {}
      }
    },
    created() {
      this.getData()
    },
    components: {
      UploadImg
    },
    methods: {
      batchUrlFn(url){
        this.info.img = url
      },
      clearFile(){
        this.info.img = ''
      },
      async getData() {
        this.loading.page = true
        const res = await this.$axios.request({
          url: '/system/agentdesc',
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
          this.info.img = res.data.img
        }
      },
      async Save(){
        if(!this.info.img) return this.$msg({ type: 'error', message: `${this.i18n_lang.activeList404_4_3}` })
        this.loading.btn = true
        const res = await this.$axios.request({
          url: `/system/agentdesc`,
          method: 'PUT',
          data: {
            img: this.info.img
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
