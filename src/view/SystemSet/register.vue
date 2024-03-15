<template>
  <div id="register">
    <ul>
      <li v-for="(item, i) in lists" :key="item.key">
        <Checkbox v-model="item.show" :disabled="item.key === 'password' || item.key === 'user_name'" @click.native="setShow(i)">{{ item.label }}</Checkbox>
        <Checkbox v-model="item.required" :disabled="item.key === 'password' || item.key === 'user_name'" @click.native="setRequired(i)">{{i18n_lang.systemSet56}}</Checkbox>
        <p>{{i18n_lang.systemSet57}}<Input v-model="item.placeholder" style="width: 300px"></Input></p>
      </li>
    </ul>
    <Button size="large" :loading="loading.btn" type="primary" @click="save">{{i18n_lang.systemSet58}}</Button>
  </div>
</template>
<script>
export default {
  data() {
    const i18n_lang = this.$t('systemSet');
    return {
      i18n_lang: i18n_lang,
      loading: {
        btn: false
      },
      lists: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    setRequired(i) {
      this.lists[i].required = !this.lists[i].required
      if(this.lists[i].required){
        this.lists[i].show = true
      }
      console.log(this.lists, 'setRequired')
    },
    setShow(i) {
      this.lists[i].show = !this.lists[i].show
      if(!this.lists[i].show){
        this.lists[i].required = false
      }
      console.log(this.lists, 'setShow')
    },
    async getData() {
      this.loading.page = true
      const res = await this.$axios.request({
        url: '/system/bases',
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
      const { registerCon } = res.data
      registerCon.map(x => {
        x.show = x.show === 1 ? true : false
        x.required = x.required === 1 ? true : false
      })
      this.lists = registerCon
    },
    async save() {
      const req = {
        registerCon: []
      }
      this.lists.map(x => {
        let obj = {
          placeholder: x.placeholder,
          key: x.key,
          label: x.label,
          show: x.show ? 1 : 0,
          required: x.required ? 1 : 0
        }
        req.registerCon.push(obj)
      })
      this.loading.btn = true
      const res = await this.$axios.request({
        url: '/system/bases',
        method: 'PUT',
        data: req
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
#register{
  padding: 15px;
  font-size: 14px;
  & > ul{
    margin-bottom: 20px;
    & > li{
      display: flex;
      .ivu-checkbox-wrapper{
        font-size: 14px;
        min-width: 140px;
        line-height: 35px;
      }
      & > p{
        display: flex;
      }
    }
  }
}
</style>
