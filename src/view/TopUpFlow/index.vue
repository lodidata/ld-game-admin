<template>
  <div>
    <Spin v-if="loading.page" size="large" fix></Spin>
    <Card dis-hover class="query_box">
      <div class="query_con">
        <div class="item">
          <span>{{`${i18n_lang.topUpFlow0}：`}}</span>
          <Select v-model="searchInfo.user_type" clearable style="width: 180px">
            <Option :value="0">{{i18n_lang.topUpFlow1}}</Option>
            <Option :value="1">{{i18n_lang.topUpFlow2}}</Option>
            <Option :value="2">{{i18n_lang.topUpFlow3}}</Option>
          </Select>
        </div>
        <div class="item">
          <span>{{`${i18n_lang.topUpFlow4}：`}}</span>
          <DatePicker
            v-model="searchInfo.date_start"
            type="date"
            placeholder
            style="width: 120px"
            clearable
            :options="dateStartOpt"
            @on-change="selectStartTime"
          ></DatePicker>
          -
          <DatePicker
            v-model="searchInfo.date_end"
            type="date"
            placeholder
            style="width: 120px"
            clearable
            :options="dateEndOpt"
            @on-change="selectEndTime"
          ></DatePicker>
        </div>
        <div class="item">
          <Button type="primary" icon="ios-search" class="marginRight" @click="search">{{i18n_lang.topUpFlow5}}</Button>
          <Button type="primary" style="margin-left: 5px;" icon="md-refresh" @click="reset">{{i18n_lang.topUpFlow6}}</Button>
          <Button type="primary" style="margin-left: 5px;" icon="md-download" @click="exportData">{{i18n_lang.topUpFlow17}}</Button>
        </div>
      </div>
    </Card>
    <Table ref="table" border :columns="columns" :data="dataSource" style="margin-top: 20px"></Table>
  </div>
</template>

<script>
  import columns from './columns'
  const searchInfo = {
    date_start: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
    date_end: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
    user_type: 0
  }
  export default {
    data() {
      const i18n_lang = this.$t('topUpFlow');
      return {
        i18n_lang: i18n_lang,
        loading: {
          page: false,
        },
        columns: columns(this),
        reginTime: [searchInfo.date_start, searchInfo.date_end],
        searchInfo: { ...searchInfo },
        dateStartOpt: {},
        dateEndOpt: {},
        page: {
          pageSize: 20,
          total: 0,
          currentPage: 1,
          pageSizes: [20, 50, 100, 1000]
        },
        dataSource: [],
      }
    },
    created() {
      this.getList()
    },
    methods: {
      // 选择日期
      selectTime(val) {
        [this.searchInfo.date_start, this.searchInfo.date_end] = val
      },
      selectStartTime(val){
        const getDay = new Date(val).getDay()
        const getTime = new Date(val).getTime()
        this.dateEndOpt = {
          disabledDate: date => {
            return date.valueOf() < getTime - 86400000 || date.valueOf() >  getTime + (30 * 86400000)
          }
        }
      },
      selectEndTime(val){
        const getDay = new Date(val).getDay()
        const getTime = new Date(val).getTime()
        this.dateStartOpt = {
          disabledDate: date => {
            return date.valueOf() < getTime - (31 * 86400000) || date.valueOf() >  getTime
          }
        }
      },
      // 查询
      search(){
        this.getList()
      },
      // 重置
      reset(){
        this.searchInfo = { ...searchInfo }
        this.reginTime = [searchInfo.date_start, searchInfo.date_end]
        this.getList()
      },
      // 翻页
      changePageSize(pageSize) {
        this.page.pageSize = pageSize
        this.getList()
      },
      // 获取列表
      async getList(index = 1) {
        this.loading.page = true
        // this.page.currentPage = index
        const req = { ...this.searchInfo }
        req.date_start = req.date_start ? this.$dateFormat(req.date_start) : ''
        req.date_end = req.date_end ? this.$dateFormat(req.date_end) : ''
        const res = await this.$axios.request({
          url: '/report/deposit_ratio',
          method: 'GET',
          params: {
            ...req,
            // page: this.page.currentPage,
            // page_size: this.page.pageSize
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
        this.dataSource = []
        Object.keys(res.data).forEach((key)=>{
          this.dataSource.push({
            key: key,
            ...res.data[key]
          })
        })
        // this.dataSource = res.data || []
        // this.page.total = res.attributes && res.attributes.total ? res.attributes.total : 0
      },
      async exportData(){
        const req = { ...this.searchInfo }
        req.date_start = req.date_start ? this.$dateFormat(req.date_start) : ''
        req.date_end = req.date_end ? this.$dateFormat(req.date_end) : ''
        const res = await this.$axios.request({
          url: '/report/deposit_ratio/export',
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
