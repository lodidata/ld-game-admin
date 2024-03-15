<template>
  <div id="MemberLog">
    <Spin v-if="loading" size="large" fix></Spin>
    <Card dis-hover class="query_box">
      <div class="query_con">
        <div class="item">
          <span>{{i18n_lang.memberLog0}}</span>
          <Select v-model="query.type" style="width:150px">
            <Option value>{{i18n_lang.memberLog1}}</Option>
            <Option v-for="it in typeList" :key="it.id" :value="it.id">{{ it.name }}</Option>
          </Select>
        </div>
        <div class="item">
          <span>{{i18n_lang.memberLog2}}</span>
          <Select v-model="query.status" style="width:100px">
            <Option value>{{i18n_lang.memberLog3}}</Option>
            <Option value="1">{{i18n_lang.memberLog4}}</Option>
            <Option value="0">{{i18n_lang.memberLog5}}</Option>
          </Select>
        </div>

        <div class="item">
          <span>{{i18n_lang.memberLog6}}</span>
          <Input v-model="query.username" placeholder style="width: 100px"/>
        </div>
        <div class="item">
          <span>ip</span>
          <Input v-model="query.ip" placeholder style="width: 100px"/>
        </div>
        <div class="item">
          <span>{{i18n_lang.memberLog7}}</span>
          <Input v-model="query.domain" placeholder style="width: 100px"/>
        </div>

        <div class="item">
          <span>{{i18n_lang.memberLog8}}</span>
          <DatePicker v-model="query.date_begin" type="date" placeholder style="width: 120px" :options="dateOpt" :editable="false"></DatePicker>
          <span>-</span>
          <DatePicker v-model="query.date_end" type="date" placeholder style="width: 120px" :options="dateOpt" :editable="false"></DatePicker>
        </div>
      </div>
      <div class="query_btns">
        <Button type="primary" icon="ios-search" @click="getData()">{{i18n_lang.memberLog9}}</Button>
        <Button type="primary" icon="md-refresh" @click="reset">{{i18n_lang.memberLog10}}</Button>
      </div>
    </Card>
    <Table style="margin-top:20px" :columns="columns" :data="dataSource" border></Table>
    <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{ `${i18n_lang.memberLog34}${page.total}${i18n_lang.memberLog35}` }}</div>
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
import { mapActions } from 'vuex'
import columns from './columns'

const initQuery = {
  username: '', // 用户名
  ip: '', // ip
  domain: '', // 域名
  type: '', // 类型
  status: '', // 状态
  date_begin: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`, // 开始时间
  date_end: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}` // 结束时间
}

export default {
  data() {
    const i18n_lang = this.$t('memberLog');
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
      typeList: [
        { id: 1, name: i18n_lang.memberLog11 },
        { id: 2, name: i18n_lang.memberLog12 },
        { id: 3, name: i18n_lang.memberLog13 },
        { id: 4, name: i18n_lang.memberLog14 },
        { id: 5, name: i18n_lang.memberLog15 },
        { id: 6, name: i18n_lang.memberLog16 },
        { id: 7, name: i18n_lang.memberLog17 },
        { id: 8, name: i18n_lang.memberLog18 },
        { id: 9, name: i18n_lang.memberLog19 },
        { id: 10, name: i18n_lang.memberLog20 },
        { id: 11, name: i18n_lang.memberLog21 },
        { id: 12, name: i18n_lang.memberLog22 }
      ]
    }
  },
  created() {
    this.getData()
  },
  methods: {
    ...mapActions({
      getUserDetail: 'detail/info'
    }),
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
    async getData(i = 1) {
      this.page.currentPage = i

      this.loading = true
      this.dataSource = []

      const query = {
        page: this.page.currentPage,
        page_size: this.page.pageSize,
        ...this.query
      }
      if (query.date_begin && query.date_end) {
        query.date_begin = this.$dateFormat(query.date_begin)
        query.date_end = this.$dateFormat(query.date_end)
      }
      const res = await this.$axios.request({
        url: '/system/log/user/operation',
        method: 'GET',
        params: query
      })

      this.loading = false

      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      this.page.total = res.attributes ? res.attributes.total : 0
      res.data.forEach((item, index) => {
        this.typeList.forEach((items, indexs) => {
          if(item.log_type == items.id){
            item.log_type_text = items.name
          }
        })
      })
      this.dataSource = res.data
    },
    // 查看用户详情
    handleUserDetail(row) {
      this.getUserDetail({ username: row.name, id: row.user_id })
    }
  }
}
</script>
<style lang="less" scoped></style>
