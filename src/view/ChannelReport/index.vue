<template>
  <div>
    <Spin v-if="loading.page" size="large" fix></Spin>
    <div v-show="!isDetails">
      <Card dis-hover class="query_box">
        <div class="item">
          <span>{{i18n_lang.channelReport0}}</span>
          <Input v-model="searchInfo.channel_no" :placeholder="`${i18n_lang.channelReport1}`" clearable style="width: 150px"/>
          <span style="margin-left: 15px;">{{i18n_lang.channelReport2}}</span>
          <Input v-model="searchInfo.channel_name" :placeholder="`${i18n_lang.channelReport3}`" clearable style="width: 150px"/>
          <span style="margin-left: 15px;">{{i18n_lang.channelReport4}}</span>
          <DatePicker
            v-model="reginTime"
            type="daterange"
            placeholder
            style="width: 200px"
            clearable
            @on-change="selectTime"
          ></DatePicker>
          <Button type="primary" icon="ios-search" @click="inquire" class="marginRight" style="margin-left: 15px;">{{i18n_lang.channelReport5}}</Button>
          <Button type="primary" style="margin-left: 5px;" icon="md-refresh" @click="reset">{{i18n_lang.channelReport6}}</Button>
          <Button type="primary" style="margin-left: 5px;" icon="md-download" @click="exportBtn">{{i18n_lang.channelReport7}}</Button>
        </div>
      </Card>
      <h3>{{i18n_lang.channelReport27}} <span style="color:#2d8cf0;cursor: pointer;" @click="visible.hint = true">{{i18n_lang.channelReport38}}</span></h3>
      <!-- <Table ref="table" border :columns="columns" :data="dataSource" style="margin-top: 20px"></Table> -->
      <!-- <Page
        class="page_box"
        show-sizer
        :current="page.currentPage"
        :page-size-opts="page.pageSizes"
        :page-size="page.pageSize"
        :total="page.total"
        @on-change="getList"
        @on-page-size-change="changePageSize"
      ></Page> -->
      <MyTable
        filter
        :columns="columns"
        :data="dataSource"
        :current="page.currentPage"
        :page-size="page.pageSize"
        :total="page.total"
        show-sizer
        border
        :checkboxKey="true"
      ></MyTable>
      <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{ `${i18n_lang.channelReport57}${page.total}${i18n_lang.channelReport58}` }}</div>
      <MyPage
        class="page_box"
        :current="page.currentPage"
        :page-size="page.pageSize"
        :total="page.total"
        show-sizer
        @onChange="getList"
        @changePageSize="changePageSize"
      ></MyPage>
      <Modal
        v-model="visible.hint"
        :title="`${i18n_lang.channelReport39}`"
        :width="550"
        :footer-hide="true"
        :styles="{ top: '100px' }"
      >
        <p class="hintText">{{i18n_lang.channelReport40}}</p>
        <p class="hintText">{{i18n_lang.channelReport41}}</p>
        <p class="hintText">{{i18n_lang.channelReport42}}</p>
        <p class="hintText">{{i18n_lang.channelReport43}}</p>
        <p class="hintText">{{i18n_lang.channelReport44}}</p>
        <p class="hintText">{{i18n_lang.channelReport45}}</p>
        <p class="hintText">{{i18n_lang.channelReport46}}</p>
        <p class="hintText">{{i18n_lang.channelReport52}}</p>
        <p class="hintText">{{i18n_lang.channelReport53}}</p>
        <p class="hintText">{{i18n_lang.channelReport54}}</p>
        <p class="hintText">{{i18n_lang.channelReport55}}</p>
        <p class="hintText">{{i18n_lang.channelReport56}}</p>
      </Modal>
      <Modal
        v-model="visible.visit"
        :title="visitType == 1 ?  `${i18n_lang.channelReport47}` : `${i18n_lang.channelReport48}`"
        :width="550"
        :footer-hide="true"
        :styles="{ top: '100px' }"
      >
        <p class="hintText">{{visitType == 1 ?  `${i18n_lang.channelReport47}:` : `${i18n_lang.channelReport48}:`}}{{visitData}}</p>
      </Modal>
    </div>
    <div v-show="isDetails">
      <Button type="primary" @click="isDetails = false">{{i18n_lang.channelReport28}}</Button>
      <Card dis-hover class="query_box" style="margin-top: 15px;">
        <div class="item">
          <!-- <span>{{i18n_lang.channelReport0}}</span>
          <Input v-model="searchInfo.channel_no" :placeholder="`${i18n_lang.channelReport1}`" clearable style="width: 150px"/>
          <span style="margin-left: 15px;">{{i18n_lang.channelReport2}}</span>
          <Input v-model="searchInfo.channel_name" :placeholder="`${i18n_lang.channelReport3}`" clearable style="width: 150px"/> -->
          <span style="margin-left: 15px;">{{i18n_lang.channelReport4}}</span>
          <DatePicker
            v-model="reginDetailsTime"
            type="daterange"
            placeholder
            style="width: 200px"
            clearable
            @on-change="selectDetailsTime"
          ></DatePicker>
          <Button type="primary" icon="ios-search" @click="inquireDetails" class="marginRight" style="margin-left: 15px;">{{i18n_lang.channelReport5}}</Button>
          <!-- <Button type="primary" style="margin-left: 5px;" icon="md-refresh" @click="reset">{{i18n_lang.channelReport6}}</Button> -->
          <Button type="primary" style="margin-left: 5px;" icon="md-download" @click="exportDetailsBtn">{{i18n_lang.channelReport7}}</Button>
        </div>
      </Card>
      <Table ref="table" border :columns="detailsColumns" :data="detailsDataSource" style="margin-top: 20px"></Table>
      <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{ `${i18n_lang.channelReport57}${detailsPage.total}${i18n_lang.channelReport58}` }}</div>
      <Page
        class="page_box"
        show-sizer
        :current="detailsPage.currentPage"
        :page-size-opts="detailsPage.pageSizes"
        :page-size="detailsPage.pageSize"
        :total="detailsPage.total"
        @on-change="getDetailsList"
        @on-page-size-change="changeDetailsPageSize"
      ></Page>
    </div>
  </div>
</template>

<script>
  import MyTable from '_c/MyTable'
  import MyPage from '_c/MyPage'
  import { dataList, dataDetailsList } from './columns'
  const searchInfo = {
    // date_start: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date(new Date().getTime()-24*60*60*1000).getDate()}`,
    // date_end: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date(new Date().getTime()-24*60*60*1000).getDate()}`,
    date_start: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
    date_end: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
    channel_no: '',
    channel_name: ''
  }
  const searchDetailsInfo = {
    // date_start: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date(new Date().getTime()-24*60*60*1000).getDate()}`,
    // date_end: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date(new Date().getTime()-24*60*60*1000).getDate()}`
    date_start: '',
    date_end: ''
  }
  export default {
    components: {
      MyTable,
      MyPage
    },
    data() {
      const i18n_lang = this.$t('channelReport');
      return {
        i18n_lang: i18n_lang,
        columns: dataList(this),
        detailsColumns: dataDetailsList(this),
        loading: {
          page: false
        },
        visible: {
          hint: false,
          visit: false
        },
        reginTime: [searchInfo.date_start, searchInfo.date_end],
        searchInfo: { ...searchInfo },
        page: {
          pageSize: 20,
          total: 0,
          currentPage: 1,
          pageSizes: [20, 50, 100, 1000]
        },
        dataSource: [],
        isDetails: false,
        channel_id: '',
        reginDetailsTime: [searchDetailsInfo.date_start, searchDetailsInfo.date_end],
        searchDetailsInfo: { ...searchDetailsInfo },
        detailsPage: {
          pageSize: 20,
          total: 0,
          currentPage: 1,
          pageSizes: [20, 50, 100, 1000]
        },
        detailsDataSource: [],
        visitType: 1,
        visitData: ''
      }
    },
    created() {
      // this.getList()
    },
    methods: {
      // 选择日期
      selectTime(val) {
        [this.searchInfo.date_start, this.searchInfo.date_end] = val
      },
      selectDetailsTime(val){
        [this.searchDetailsInfo.date_start, this.searchDetailsInfo.date_end] = val
      },
      // 查询
      inquire(){
        this.getList()
      },
      inquireDetails(){
        this.getDetailsList()
      },
      // 重置
      reset(){
        this.searchInfo = { ...searchInfo }
        this.reginTime = [searchInfo.date_start, searchInfo.date_end]
        this.getList()
      },
      // 导出
      exportBtn(){
        this.exportDataAjax()
      },
      exportDetailsBtn(){
        this.exportDetailsDataAjax()
      },
      // 翻页
      changePageSize(pageSize) {
        this.page.pageSize = pageSize
        this.getList()
      },
      changeDetailsPageSize(pageSize) {
        this.detailsPage.pageSize = pageSize
        this.getDetailsList()
      },
      // 查看详情
      handleDetails(row){
        this.channel_id = row.channel_id
        this.reginDetailsTime = [this.searchInfo.date_start, this.searchInfo.date_end],
        this.searchDetailsInfo = { ...searchDetailsInfo }
        this.searchDetailsInfo.date_start = this.searchInfo.date_start
        this.searchDetailsInfo.date_end = this.searchInfo.date_end
        this.getDetailsList()
      },
      // 查看访问次数
      lookNunber(row, type){
        this.visitType = type
        this.getTeportClick(row.channel_id, type)
      },
      // 获取列表
      async getList(index = 1) {
        this.loading.page = true
        this.page.currentPage = index
        const req = { ...this.searchInfo }
        req.date_start = req.date_start ? this.$dateFormat(req.date_start) : ''
        req.date_end = req.date_end ? this.$dateFormat(req.date_end) : ''
        const res = await this.$axios.request({
          url: '/channel/report',
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
        req.date_start = req.date_start ? this.$dateFormat(req.date_start) : ''
        req.date_end = req.date_end ? this.$dateFormat(req.date_end) : ''
        const res = await this.$axios.request({
          url: '/channel/report/export',
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
      },
      // 查看访问次数
      async getTeportClick(channel_id, type){
        const res = await this.$axios.request({
          url: `/channel/report/click`,
          method: 'GET',
          params: {
            channel_id: channel_id,
            type: type
          }
        })
        if (res.status !== 200) {
          this.$msg({
            type: 'error',
            message: res.message
          })
          return false
        }
        this.visitData = res.data
        this.visible.visit = true
      },
      // 获取详情列表
      async getDetailsList(index = 1) {
        this.loading.page = true
        this.detailsPage.currentPage = index
        const req = { ...this.searchDetailsInfo }
        req.date_start = req.date_start ? this.$dateFormat(req.date_start) : ''
        req.date_end = req.date_end ? this.$dateFormat(req.date_end) : ''
        const res = await this.$axios.request({
          url: `/channel/report/detail`,
          method: 'GET',
          params: {
            ...req,
			channel: this.channel_id,
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
        this.isDetails = true
        this.detailsDataSource = res.data || []
        this.detailsPage.total = res.attributes && res.attributes.total ? res.attributes.total : 0
      },
      // 导出详情
      async exportDetailsDataAjax(){
        const req = { ...this.searchDetailsInfo }
        req.date_start = req.date_start ? this.$dateFormat(req.date_start) : ''
        req.date_end = req.date_end ? this.$dateFormat(req.date_end) : ''
        const res = await this.$axios.request({
          url: `/channel/report/detail/export`,
          method: 'GET',
          responseType: 'blob',
          params: {
            ...req,
			channel: this.channel_id,
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
  .hintText{
    font-size: 16px;
  }
</style>
