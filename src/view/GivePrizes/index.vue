<template>
  <div class="givePrizes">
    <Spin v-if="loading.page" size="large" fix></Spin>
    <Card dis-hover class="query_box">
      <div class="item">
        <span style="margin-right: 10px;">{{i18n_lang.GivePrizes0}}</span>
        <DatePicker
          v-model="searchInfo.date_start"
          type="datetime"
          :placeholder="``"
          format="yyyy-MM-dd HH:mm:ss"
          style="width: 160px"
          @on-change="changeStartTime"
        ></DatePicker>
        -
        <DatePicker
          v-model="searchInfo.date_end"
          type="datetime"
          :placeholder="``"
          format="yyyy-MM-dd HH:mm:ss"
          style="width: 160px"
          @on-change="changeEndTime"
        ></DatePicker>
        <span style="margin: 0 10px;">{{`${i18n_lang.GivePrizes30_4_3}`}}</span>
        <Input v-model="searchInfo.user_name" placeholder style="width: 100px" />
        <Button @click="search" type="primary" icon="ios-search" style="margin-left: 10px;">{{i18n_lang.GivePrizes1}}</Button>
        <Button @click="reset" type="primary" icon="md-refresh" style="margin-left: 10px;">{{i18n_lang.GivePrizes2}}</Button>
        <Button @click="exportData" type="primary" icon="md-download" style="margin-left: 10px;" v-if="allRoutes.indexOf('333') > -1">{{i18n_lang.GivePrizes3}}</Button>
      </div>
    </Card>
    <Table ref="table" border :columns="dataList" :data="dataSource"></Table>
    <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{ `${i18n_lang.GivePrizes26}${page.total}${i18n_lang.GivePrizes27}` }}</div>
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
    <Modal v-model="visible.details" :title="`${i18n_lang.GivePrizes21}`" :width="1200" :footer-hide="true">
      <Card dis-hover class="query_box">
        <div class="item">
          <span style="margin-right: 10px;">{{i18n_lang.GivePrizes0}}</span>
          <DatePicker
            v-model="detailsInfo.date_start"
            type="datetime"
            :placeholder="``"
            format="yyyy-MM-dd HH:mm:ss"
            style="width: 160px"
            @on-change="changeDetailsStartTime"
          ></DatePicker>
          -
          <DatePicker
            v-model="detailsInfo.date_end"
            type="datetime"
            :placeholder="``"
            format="yyyy-MM-dd HH:mm:ss"
            style="width: 160px"
            @on-change="changeDetailsEndTime"
          ></DatePicker>
          <span>{{`${i18n_lang.GivePrizes22}`}}</span>
          <Input v-model="detailsInfo.user_name" :placeholder="`${i18n_lang.GivePrizes23}`" clearable style="width: 150px"/>
          <Button @click="searchDetails" type="primary" icon="ios-search" style="margin-left: 10px;">{{i18n_lang.GivePrizes1}}</Button>
          <Button @click="resetDetails" type="primary" icon="md-refresh" style="margin-left: 10px;">{{i18n_lang.GivePrizes2}}</Button>
          <Button @click="exportDetailsData" type="primary" icon="md-download" style="margin-left: 10px;">{{i18n_lang.GivePrizes3}}</Button>
        </div>
      </Card>
      <div class="popText">
        <span>{{`${i18n_lang.GivePrizes24}`}}{{receive_num}}</span><span>{{`${i18n_lang.GivePrizes25}`}}{{ Number(give_num) - Number(receive_num)}}</span>
      </div>
      <Table ref="table" border :columns="detailsList" :data="detailsSource"></Table>
      <Page
        class="page_box"
        show-sizer
        :current="detailsPage.currentPage"
        :page-size-opts="detailsPage.pageSizes"
        :page-size="detailsPage.pageSize"
        :total="detailsPage.total"
        @on-change="getList"
        @on-page-size-change="changePageSize"
      ></Page>
    </Modal>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { dataList, detailsList } from './columns'
  export default {
    computed: {
      ...mapState({
        allRoutes: state => state.user.allRoutes
      })
    },
    data() {
      const i18n_lang = this.$t('GivePrizes');
      return {
        i18n_lang: i18n_lang,
        loading: {
          page: false,
        },
        visible: {
          details: false
        },
        dataList: dataList(this),
        detailsList: detailsList(this),
        dataSource: [],
        detailsSource: [],
        searchInfo: {
          date_start: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 00:00:00`,
          date_end: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 23:59:59`,
          user_name: ''
        },
        page: {
          pageSize: 20,
          total: 0,
          currentPage: 1,
          pageSizes: [20, 50, 100, 1000]
        },
        detailsInfo: {
          id: '',
          user_name: '',
          date_start: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 00:00:00`,
          date_end: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 23:59:59`
        },
        detailsPage: {
          pageSize: 20,
          total: 0,
          currentPage: 1,
          pageSizes: [20, 50, 100, 1000]
        },
        give_num: '',
        receive_num: ''
      }
    },
    created() {
      this.getList()
    },
    methods: {
      changeStartTime(data){
        this.searchInfo.date_start = data
      },
      changeEndTime(data){
        this.searchInfo.date_end = data
      },
      changeDetailsStartTime(data){
        this.detailsInfo.date_start = data
      },
      changeDetailsEndTime(data){
        this.detailsInfo.date_end = data
      },
      changePageSize(pageSize) {
        this.page.pageSize = pageSize
        this.getList()
      },
      search(){
        this.getList()
      },
      searchDetails(){
        this.getDetailsList()
      },
      reset(){
        this.searchInfo = {
          date_start: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 00:00:00`,
          date_end: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 23:59:59`
        }
        this.getList()
      },
      resetDetails(){
        this.detailsInfo.user_name = ''
        this.detailsInfo.date_start = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 00:00:00`
        this.detailsInfo.date_end = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 23:59:59`
        this.getDetailsList()
      },
      handleTransfer(row){
        this.give_num = row.give_num
        this.receive_num = row.receive_num
        this.detailsInfo.id = row.id
        this.visible.details = true
        this.detailsInfo.date_start = `${this.$dateTimeFormat(this.searchInfo.date_start)}`
        this.detailsInfo.date_end = `${this.$dateTimeFormat(this.searchInfo.date_end)}`
        this.getDetailsList()
      },
      async getList(index = 1) {
        this.loading.page = true
        this.page.currentPage = index
        let req = { ...this.searchInfo }
        req.date_start = req.date_start ? this.$dateTimeFormat(req.date_start) : ''
        req.date_end = req.date_start ? this.$dateTimeFormat(req.date_end) : ''
        const res = await this.$axios.request({
          url: '/report/handsel',
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
        res.data.forEach((item, index) => {
          switch (item.notice_away){
            case '1':
              item.notice_away_text = `${this.i18n_lang.GivePrizes13}`
              break;
            case '2':
              item.notice_away_text = `${this.i18n_lang.GivePrizes14}`
              break;
            case '3':
              item.notice_away_text = `${this.i18n_lang.GivePrizes15}`
              break;
            default:
              break;
          }
        })
        this.dataSource = res.data
        this.page.total = res.attributes ? res.attributes.total : 0
      },
      async exportData(){
        let req = { ...this.searchInfo }
        req.date_start = req.date_start ? this.$dateTimeFormat(req.date_start) : ''
        req.date_end = req.date_start ? this.$dateTimeFormat(req.date_end) : ''
        const res = await this.$axios.request({
          url: '/report/handsel/export',
          method: 'GET',
          responseType: 'blob',
          params: {
            ...req,
            // export: 1
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
      async getDetailsList(index = 1) {
        this.detailsPage.currentPage = index
        let req = { ...this.detailsInfo }
        req.date_start = req.date_start ? this.$dateTimeFormat(req.date_start) : ''
        req.date_end = req.date_start ? this.$dateTimeFormat(req.date_end) : ''
        const res = await this.$axios.request({
          url: '/report/handsel/receiveLog',
          method: 'GET',
          params: {
            ...req,
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
        this.detailsPage.total = res.attributes ? res.attributes.total : 0
      },
      async exportDetailsData(){
        let req = { ...this.detailsInfo }
        req.date_start = req.date_start ? this.$dateTimeFormat(req.date_start) : ''
        req.date_end = req.date_start ? this.$dateTimeFormat(req.date_end) : ''
        req.export = 1
        const res = await this.$axios.request({
          url: '/report/handsel/receiveLog/export',
          method: 'GET',
          responseType: 'blob',
          params: {
            ...req,
            export: 1
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
  .GivePrizes{

  }
  .popText{
      font-size: 20px;
      margin-bottom: 15px;
  }
</style>
