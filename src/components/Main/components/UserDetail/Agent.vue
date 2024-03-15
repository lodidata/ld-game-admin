<template>
  <div id="Agent">
    <Spin v-if="loading.page" size="large" fix></Spin>
    <Table border :columns="columns" :data="dataSource"></Table>
    <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{ `${i18n_lang.components288}${page.total}${i18n_lang.components289}` }}</div>
    <Page
      class="page_box"
      show-sizer
      :current="page.currentPage"
      :page-size="page.pageSize"
      :page-size-opts="page.pageSizes"
      :total="page.total"
      @on-change="getData"
      @on-page-size-change="changePageSize"
    ></Page>
    <!-- 盈亏占成 -->
    <Modal v-model="visible.profit" :title="`${i18n_lang.components274}`">
      <div style="color: #ccc;margin-bottom: 10px;">{{i18n_lang.components274}}</div>
      <Form
      :label-width="100"
      style="width: 400px"
      >
        <FormItem v-for="(item, index) in gameArrar" :key="index" :label="item.rename">
          <Input v-model="item.text"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" class="btn" @click="saveProfitData()">{{i18n_lang.components265}}</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import columns from './columns/agent'

export default {
  name: 'Agent',
  props: ['id'],
  data() {
    const i18n_lang = this.$t('components');
    return {
      i18n_lang: i18n_lang,
      loading: {
        page: false
      },
      visible: {
        profit: false
      },
      dataSource: [],
      columns: columns(this),
      page: {
        pageSize: 20,
        total: 0,
        currentPage: 1,
        pageSizes: [20, 100, 1000, 2000]
      },
      gameArrar: [],
      profitForm: {
        id: '',
        profit_loss_value: ''
      }
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData(i = 1) {
      this.page.currentPage = i
      this.loading.page = true
      const req = {
        page: this.page.currentPage,
        page_size: this.page.pageSize
      }
      const res = await this.$axios.request({
        url: `/user/agent/list/${this.id}`,
        method: 'GET',
        params: req
      })
      this.loading.page = false
      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      this.page.total = res.attributes ? res.attributes.total : 0
      this.dataSource = res.data
    },
    // 设置每页条数
    changePageSize(pageSize) {
      this.page.pageSize = pageSize
      this.getData()
    },
    // 盈亏占成
    async handleAmendProfit(row){
      const res = await this.$axios.request({
        url: `/profitloss/userprofit/${row.id}`,
        method: 'GET'
      })
      if(res.data.profit_loss_value) {
        this.form = { ...res.data }
        let arrar = []
        if(this.form.profit_loss_value){
          let profit_loss_value = JSON.parse(this.form.profit_loss_value)
          for(let key in profit_loss_value){
            let obj = {
              type: key,
              text: profit_loss_value[key]
            }
            arrar.push(obj)
          }
        }
        this.getGameMenu(arrar.length > 0 ? arrar : '')
      }else{
        this.getGameMenu()
      }
      this.profitForm.id = row.id
      this.visible.profit = true
    },
    // 获取游戏渠道
    async getGameMenu(arrar) {
      const res = await this.$axios.request({
        url: '/game/menu',
        method: 'GET'
      })
      if (res.status !== 200) {
        this.$Message.error(res.message)
        return
      }
      if(res.data && res.data.length){
        this.gameArrar = []
        if(arrar){
          res.data.forEach((item, index) => {
            arrar.forEach((items, indexs) => {
              if(item.type == items.type){
                let obj = {
                  name: item.name,
                  rename: item.rename,
                  type: item.type,
                  text: items.text
                }
                this.gameArrar.push(obj)
              }
            })
          })
        }else{
          res.data.forEach((item, index) => {
            let obj = {
              name: item.name,
              rename: item.rename,
              type: item.type,
              text: ''
            }
            this.gameArrar.push(obj)
          })
        }
      }
    },
    //盈亏占成设置修改
    async saveProfitData(){
      let profit_loss_value = {}
      this.gameArrar.forEach((item, index) => {
        profit_loss_value[item.type] = item.text
      })
      this.profitForm.profit_loss_value = JSON.stringify(profit_loss_value)
      let obj = { ...this.profitForm }
      delete obj.id
      const res = await this.$axios.request({
        url: `/profitloss/userprofit/${this.profitForm.id}`,
        method: 'PUT',
        data: { ...obj }
      })
      this.$msg({
        type: res.status !== 200 || res.state !== 0 ? 'error' : 'success',
        message: res.message
      })
      if (res.status !== 200 || res.state !== 0) return
      this.visible.profit = false
      this.getData()
    }
  }
}
</script>
<style lang="less" scoped>
#Agent {
  position: relative;
}
</style>
