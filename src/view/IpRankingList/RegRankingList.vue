<template>
  <div>
    <Spin v-if="loading.page" size="large" fix></Spin>
    <Card dis-hover class="query_box">
      <div class="query_con">
        <div class="item">
          <span>{{`${i18n_lang.ipRankingList2}`}}</span>
          <DatePicker
            v-model="reginTime"
            type="daterange"
            placeholder
            style="width: 200px"
            clearable
            @on-change="selectTime"
          ></DatePicker>
        </div>
        <div class="item">
          <Button type="primary" icon="ios-search" class="marginRight" @click="search">{{`${i18n_lang.ipRankingList3}`}}</Button>
          <Button type="primary" style="margin-left: 5px;" icon="md-refresh" @click="reset">{{`${i18n_lang.ipRankingList4}`}}</Button>
          <Button type="primary" style="margin-left: 5px;" icon="md-download" @click="exportDataAjax">{{`${i18n_lang.ipRankingList5}`}}</Button><!--  v-if="allRoutes.indexOf('325') > -1"-->
        </div>
      </div>
    </Card>
    <Table ref="table" border :columns="regList" :data="dataSource" @on-sort-change="sortTable"></Table>
    <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{ `${i18n_lang.ipRankingList19}${page.total}${i18n_lang.ipRankingList20}` }}</div>
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
    <Modal v-model="visible.details" :title="`${i18n_lang.ipRankingList6}`" :width="1200" :footer-hide="true">
      <Table ref="table" border :columns="detailsList" :data="detailsSource"></Table>
      <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{ `${i18n_lang.ipRankingList19}${detailsPage.total}${i18n_lang.ipRankingList20}` }}</div>
      <Page
        class="page_box"
        show-sizer
        :current="detailsPage.currentPage"
        :page-size-opts="detailsPage.pageSizes"
        :page-size="detailsPage.pageSize"
        :total="detailsPage.total"
        @on-change="detail"
        @on-page-size-change="changeDetailPageSize"
      ></Page>
    </Modal>
  </div>
</template>

<script>
  const searchInfo = {
    date_start: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
    date_end: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
    field_id: 'num',
    sort_way: ''
  }
  import { mapActions } from 'vuex'
  import { regList, detailsList} from './columnsReg'
  export default {
    data() {
      const i18n_lang = this.$t('ipRankingList');
      return {
        i18n_lang: i18n_lang,
        regList: regList(this),
        detailsList: detailsList(this),
        loading: {
          page: false,
        },
        visible: {
          details: false
        },
        searchInfo: { ...searchInfo },
        reginTime: [searchInfo.date_start, searchInfo.date_end],
        dataSource: [],
        page: {
          pageSize: 20,
          total: 0,
          currentPage: 1,
          pageSizes: [20, 50, 100, 1000]
        },
        ip: '',
        detailsSource: [],
        detailsPage: {
          pageSize: 10,
          total: 0,
          currentPage: 1,
          pageSizes: [20, 50, 100, 1000]
        },
      }
    },
    created() {
      this.getList()
    },
    methods: {
      ...mapActions({
        getUserDetail: 'detail/info'
      }),
      // 选择日期
      selectTime(val) {
        [this.searchInfo.date_start, this.searchInfo.date_end] = val
      },
      // 排序
      sortTable(key) {
        this.searchInfo.sort_way = key.order
        this.getList()
      },
      changePageSize(pageSize) {
        this.page.pageSize = pageSize
        this.getList()
      },
      changeDetailPageSize(pageSize){
        this.detailsPage.pageSize = pageSize
        this.detail()
      },
      //查询
      search(){
        this.getList()
      },
      //重置
      reset(){
        this.searchInfo = { ...searchInfo }
        this.reginTime = [this.searchInfo.date_start, this.searchInfo.date_end]
        this.getList()
      },
      //获取列表
      async getList(index = 1) {
        this.loading.page = true
        this.page.currentPage = index
        const res = await this.$axios.request({
          url: '/report/iprank/recharge',
          method: 'GET',
          params: {
            ...this.searchInfo,
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
        this.dataSource = res.data
        this.page.total = res.attributes && res.attributes.total ? res.attributes.total : 0
      },
      // 排行榜列表
      handleDetail(row){
        this.ip = row.ip
        this.detail()
      },
      // 查看用户详情
      handleUserDetail(row) {
        this.visible.details = false
        this.getUserDetail({ username: row.username, id: row.user_id })
      },
      async detail(index = 1){
        this.detailsPage.currentPage = index
        const res = await this.$axios.request({
          url: '/report/iprank/recharge/detail',
          method: 'GET',
          params: {
            date_start: this.searchInfo.date_start,
            date_end: this.searchInfo.date_end,
            ip: this.ip,
            page: this.detailsPage.currentPage,
            page_size: this.detailsPage.pageSize
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
        this.detailsSource = res.data
        this.detailsPage.total = res.attributes && res.attributes.total ? res.attributes.total : 0
        this.visible.details = true
      },
      //导出
      async exportDataAjax(){
        const res = await this.$axios.request({
          url: '/report/iprank/recharge/export',
          method: 'GET',
          responseType: 'blob',
          params: {
            ...this.searchInfo
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
      },
    }
  }
</script>

<style lang="less" scoped>
</style>
