<template>
  <div>
    <Spin v-if="loading.page" size="large" fix></Spin>
    <Card dis-hover class="query_box">
      <div class="query_con">
        <div class="item">
          <span>{{i18n_lang.realTimeReport0}}</span>
          <Input v-model="searchInfo.user_name" :placeholder="`${i18n_lang.realTimeReport1}`" clearable style="width: 150px"/>
        </div>
        <div class="item">
          <span>{{i18n_lang.realTimeReport2}}</span>
          <Select v-model="searchInfo.user_level" clearable style="width:150px">
            <!-- <Option value>全部</Option> -->
            <Option v-for="item in levelList" :key="item.level" :value="item.level">{{ item.name }}</Option>
          </Select>
        </div>
        <div class="item">
          <span>{{i18n_lang.realTimeReport3}}</span>
          <Select v-model="searchInfo.status" :placeholder="` `" clearable style="width:80px">
            <!-- <Option value>全部</Option> -->
            <Option v-for="item in statusList" :key="item.key" :value="item.key">{{ item.name }}</Option>
          </Select>
        </div>
        <div class="item">
          <span>{{i18n_lang.realTimeReport4}}</span>
          <Input v-model="searchInfo.balance_start" :placeholder="` `" clearable style="width: 80px"/>~
          <Input v-model="searchInfo.balance_end" :placeholder="` `" clearable style="width: 80px"/>
        </div>
        <div class="item">
          <span>{{i18n_lang.realTimeReport5}}</span>
          <Input v-model="searchInfo.deposit_amount_start" :placeholder="` `" clearable style="width: 80px"/>~
          <Input v-model="searchInfo.deposit_amount_end" :placeholder="` `" clearable style="width: 80px"/>
        </div>
        <div class="item">
          <span>{{i18n_lang.realTimeReport6}}</span>
          <Input v-model="searchInfo.user_amount_start" :placeholder="` `" clearable style="width: 80px"/>~
          <Input v-model="searchInfo.user_amount_end" :placeholder="` `" clearable style="width: 80px"/>
        </div>
        <div class="item">
          <Button type="primary" icon="ios-search" @click="inquire" class="marginRight">{{i18n_lang.realTimeReport7}}</Button>
          <!-- <Button type="primary" style="margin-left: 5px;" icon="md-refresh" @click="reset">{{i18n_lang.realTimeReport8}}</Button> -->
          <Button type="primary" style="margin-left: 5px;" icon="md-download" @click="exportBtn">{{i18n_lang.realTimeReport9}}</Button>
        </div>
      </div>
    </Card>
    <Table ref="table" border :columns="dataList" :data="dataSource" @on-sort-change="sortTable" style="margin-top: 20px"></Table>
    <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{ `${i18n_lang.realTimeReport28}${page.total}${i18n_lang.realTimeReport29}` }}</div>
    <Page
      class="page_box"
      show-sizer
      :current="page.currentPage"
      :page-size-opts="page.pageSizes"
      :page-size="page.pageSize"
      :total="page.total"
      @on-change="getList"
      @on-page-size-change="changePageSize"
    ></Page>
  </div>
</template>

<script>
  import { dataList } from './columns'
  const searchInfo = {
    user_name: '',
    user_level: 0,
    status: 0,
    balance_start: '',
    balance_end: '',
    deposit_amount_start: '',
    deposit_amount_end: '',
    user_amount_start: '',
    user_amount_end: '',
    field_id: '',
    sort_way: ''
  }
  export default {
    data() {
      const i18n_lang = this.$t('realTimeReport');
      return {
        i18n_lang: i18n_lang,
        dataList: dataList(this),
        loading: {
          page: false
        },
        searchInfo: { ...searchInfo },
        levelList: [],
        statusList: [
          {
            key: 0,
            name: `${i18n_lang.realTimeReport10}`
          },
          {
            key: 1,
            name: `${i18n_lang.realTimeReport11}`
          },
          {
            key: 2,
            name: `${i18n_lang.realTimeReport12}`
          }
        ],
        page: {
          pageSize: 20,
          total: 0,
          currentPage: 1,
          pageSizes: [20, 50, 100, 1000]
        },
        dataSource: []
      }
    },
    created() {
      this.levelListFn()
      this.getList()
    },
    methods: {
      // 查询
      inquire(){
        this.getList()
      },
      // 导出
      exportBtn(){
        this.exportDataAjax()
      },
      // 排序
      sortTable(key) {
        if(key.key == 'balance'){
          this.searchInfo.field_id = 1
        }
        if(key.key == 'deposit_user_amount'){
          this.searchInfo.field_id = 2
        }
        if(key.key == 'withdrawal_user_amount'){
          this.searchInfo.field_id = 3
        }
        if(key.key == 'bet_user_amount'){
          this.searchInfo.field_id = 4
        }
        if(key.key == 'dml'){
          this.searchInfo.field_id = 5
        }
        if(key.key == 'total_deposit_user_amount'){
          this.searchInfo.field_id = 6
        }
        if(key.key == 'total_withdrawal_user_amount'){
          this.searchInfo.field_id = 7
        }
        if(key.key == 'total_dml'){
          this.searchInfo.field_id = 8
        }
        if(key.key == 'total_bet_user_amount'){
          this.searchInfo.field_id = 9
        }
        this.searchInfo.sort_way = key.order
        this.getList()
      },
      // 翻页
      changePageSize(pageSize) {
        this.page.pageSize = pageSize
        this.getList()
      },
      // 获取等级
      async levelListFn() {
        const res = await this.$axios.request({
          url: '/memberslevel/levelList',
          method: 'GET',
          params: {}
        })
        if (res.status !== 200) {
          this.$Message.error(res.message)
          return
        };
        this.levelList = res.data
        this.levelList.unshift({
          level: 0,
          name: `${this.i18n_lang.realTimeReport10}`
        })
        // console.log(this.levelList)
      },
      // 获取列表
      async getList(index = 1) {
        this.loading.page = true
        this.page.currentPage = index
        const req = { ...this.searchInfo }
        req.status = req.status ? req.status : ''
        req.user_level = req.user_level ? req.user_level : ''
        const res = await this.$axios.request({
          url: '/report/realtime/profit',
          method: 'GET',
          params: {
            ...req,
            page: this.page.currentPage,
            page_size: this.page.pageSize
          }
        })
        this.loading.page = false
        if (res.status !== 200) {
          this.$msg({
            type: 'error',
            message: res.message
          })
          return false
        }
        this.dataSource = res.data || []
        this.page.total = res.attributes && res.attributes.total ? res.attributes.total : 0
      },
      // 导出
      async exportDataAjax(){
        const req = { ...this.searchInfo }
        req.status = req.status ? req.status : ''
        req.user_level = req.user_level ? req.user_level : ''
        const res = await this.$axios.request({
          url: '/report/realtime/profit/export',
          method: 'GET',
          responseType: 'blob',
          params: {
            ...req
          }
        })
        if (res.status !== 200) {
          this.$msg({
            type: 'error',
            message: res.message
          })
          return false
        }
        const url = window.URL.createObjectURL(new Blob([res], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}))
        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', 'excel.xls')
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
    }
  }
</script>

<style lang="less" scoped>
</style>
