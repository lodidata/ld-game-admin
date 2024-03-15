<template>
  <div id="AdminLog">
    <Spin v-if="loading" size="large" fix></Spin>
    <Card dis-hover class="query_box">
      <div class="query_con">
        <div class="item">
          <span>{{i18n_lang.adminLog0}}</span>
          <DatePicker v-model="query.date_from" type="date" placeholder style="width: 120px" :options="dateOpt" :editable="false"></DatePicker>
          <span>-</span>
          <DatePicker v-model="query.date_to" type="date" placeholder style="width: 120px" :options="dateOpt" :editable="false"></DatePicker>
        </div>
        <div class="item">
          <span>ip</span>
          <Input v-model="query.ip" placeholder style="width: 100px" />
        </div>
        <div class="item">
          <span>{{i18n_lang.adminLog1}}</span>
          <Input v-model="query.uname" placeholder style="width: 100px" />
        </div>
        <div class="item">
          <span>{{i18n_lang.adminLog2}}</span>
          <Input v-model="query.uname2" placeholder style="width: 100px" />
        </div>
        <div class="item">
          <span>{{i18n_lang.adminLog3}}</span>
          <Select v-model="query.module" style="width:100px">
            <Option value>{{i18n_lang.adminLog4}}</Option>
            <Option v-for="(it,i) in moduleList" :key="i" :value="it.id">{{ it.name }}</Option>
          </Select>
        </div>
        <div class="item">
          <span>{{i18n_lang.adminLog5}}</span>
          <Select v-model="query.status" style="width:100px">
            <Option value>{{i18n_lang.adminLog4}}</Option>
            <Option value="1">{{i18n_lang.adminLog6}}</Option>
            <Option value="0">{{i18n_lang.adminLog7}}</Option>
          </Select>
        </div>
      </div>
      <div class="query_btns">
        <Button type="primary" icon="ios-search" @click="getData()">{{i18n_lang.adminLog8}}</Button>
        <Button type="primary" icon="md-refresh" @click="reset">{{i18n_lang.adminLog9}}</Button>
      </div>
    </Card>
    <Table style="margin-top:20px" :columns="columns" :data="dataSource" border></Table>
    <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{ `${i18n_lang.adminLog22}${page.total}${i18n_lang.adminLog23}` }}</div>
    <Page
      class="page_box"
      :current="page.currentPage"
      :page-size="page.pageSize"
      :page-size-opts="page.pageSizes"
      :total="page.total"
      show-sizer
      @on-change="getData"
      @on-page-size-change="changePageSize"
    ></Page>
  </div>
</template>
<script>
import columns from './columns'

const initQuery = {
  uname: '', // 操作者
  ip: '', // ip
  uname2: '', // 被操作者
  module: '', // 类型
  status: '', // 状态
  date_from: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 00:00:00`, // 开始时间
  date_to: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 23:59:59` // 结束时间
}

export default {
  data() {
    const i18n_lang = this.$t('adminLog');
    return {
      i18n_lang: i18n_lang,
      columns: columns(this),
      loading: false,
      query: { ...initQuery },
      dateOpt: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now() - 4320000000
        }
      },
      page: {
        pageSize: 20,
        total: 0,
        currentPage: 1,
        pageSizes: [20, 100, 1000, 2000]
      },
      dataSource: [],
      moduleList: []
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getData()
      this.getModuleName()
    },
    // 重置查询条件
    reset() {
      this.query = Object.assign({}, initQuery)
      this.getData()
    },
    // 设置每页条数
    changePageSize(pageSize) {
      this.page.pageSize = pageSize
      this.getData()
    },
    // 获取模块名称
    async getModuleName() {
      this.moduleList = []
      const res = await this.$axios.request({
        url: '/admin/log/module',
        method: 'GET'
      })
      this.moduleList = res.data
    },
    async getData(i) {
      this.page.currentPage = i

      this.loading = true
      this.dataSource = []

      const query = {
        page: this.page.currentPage,
        page_size: this.page.pageSize,
        ...this.query
      }
      if (query.date_from && query.date_to) {
        query.date_from = this.$dateFormat(query.date_from)
        query.date_to = this.$dateFormat(query.date_to)
      }
      const res = await this.$axios.request({
        url: '/admin/log',
        method: 'GET',
        params: query
      })
      this.loading = false

      this.page.total = res.attributes ? res.attributes.total : 0
      this.dataSource = res.data
    }
  }
}
</script>
<style lang="less" scoped>
</style>
