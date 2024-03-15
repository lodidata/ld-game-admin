<template>
  <div id="ipSet">
    <Spin v-if="loading.page" size="large" fix></Spin>
    <Row>
      <Button @click="ipListFn('add')" size="large" type="primary">{{i18n_lang.systemSet71}}</Button>
    </Row>
    <Row>
      <div class="item" style="margin-top: 10px;" v-for="(item, index) in ipList" :key="index">
        <p>{{i18n_lang.systemSet81}}</p>
        <span>
          <Input v-model="item.ip" :placeholder="i18n_lang.systemSet82" />
        </span>
        <span>
          <Input v-model="item.number" :placeholder="i18n_lang.systemSet83" />
        </span>
        <span>{{i18n_lang.systemSet84}}</span>
        <Button @click="ipListFn('delete', index)" v-if="index > 0" size="large" type="primary">{{i18n_lang.systemSet76}}</Button>
      </div>
    </Row>
    <Row style="margin:20px 0">
      <Button size="large" :loading="loading.btn" type="primary" @click="save">{{i18n_lang.systemSet30}}</Button>
    </Row>
  </div>
</template>

<script>
  export default {
    data() {
      const i18n_lang = this.$t('systemSet');
      return {
        i18n_lang: i18n_lang,
        loading: {
          page: false,
          btn: false
        },
        ipList:[]
      }
    },
    created() {
      this.getData()
    },
    methods: {
      ipListFn(type, index){//ip限制地址操作
        if(type == 'add'){
          this.ipList.push({
            ip: '',
            number: ''
          })
        }
        if(type == 'delete'){
          this.ipList.splice(index, 1)
        }
      },
      async getData() {
        this.loading.page = true
        const res = await this.$axios.request({
          url: '/ip/register',
          method: 'GET'
        })
        this.loading.page = false
        if (res.status !== 200) {
          this.$msg({
            type: 'error',
            message: res.message
          })
          return
        }
        this.ipList = []
        if(res.data.register_limit_ip_list){
          res.data.register_limit_ip_list.split(';').forEach((item,index) => {
            this.ipList.push({
              ip: item.split(',')[0],
              number: item.split(',')[1]
            })
          })
        }else{
          this.ipList.push({
            ip: '',
            number: ''
          })
        }
      },
      async save() {
        this.loading.btn = true
        let register_limit_ip_list = ''
        this.ipList.forEach((item, index) => {
          if(item.ip || item.number){
            register_limit_ip_list += index == 0 ? `${item.ip},${item.number}` : `;${item.ip},${item.number}`
          }
        })
        const res = await this.$axios.request({
          url: '/ip/register',
          method: 'PUT',
          data: {
            system: {
              register_limit_ip_list: register_limit_ip_list
            }
          }
        })
        this.loading.btn = false
        this.$msg({
          type: res.status !== 200 ? 'error' : 'success',
          message: res.message
        })
        if (res.status !== 200) return
        this.getData()
      }
    }
  }
</script>

<style lang="less" scoped>
  #ipSet{
    .title {
      font-size: 16px;
      margin: 20px 0;
      padding-left: 10px;
      border-left: 3px solid #3080fe;
      color: #666;
    }
    .item {
      margin-bottom: 18px;
      & > p,
      & > span {
        font-size: 14px;
        display: inline-block;
        line-height: 28px;
        color: rgb(153, 153, 153);
        min-width: 100px;
        margin-right: 5px;
      }
      & > span {
        color: rgb(51, 51, 51);
        &.detail {
          color: #f33;
          margin-left: 5px;
        }
      }
    }
  }
</style>
