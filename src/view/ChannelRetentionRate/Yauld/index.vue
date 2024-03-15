<template>
  <div>
    <Spin v-if="loading.page" size="large" fix></Spin>
    <Card dis-hover class="query_box">
      <div class="item">
        <span>{{i18n_lang.RetentionRate0 + '：'}}</span>
        <DatePicker v-model="query.date_start" type="date" placeholder style="width: 120px" :options="dateOpt" :editable="false"></DatePicker>
        <span>-</span>
        <DatePicker v-model="query.date_end" type="date" placeholder style="width: 120px" :options="dateOpt" :editable="false"></DatePicker>
        <span>{{i18n_lang.RetentionRate60 + '：'}}</span>
        <Input v-model="query.channel_no" :placeholder="i18n_lang.RetentionRate59" clearable style="width: 200px"/>
        <Button type="primary" icon="ios-search" @click="getList()">{{i18n_lang.RetentionRate1}}</Button>
        <Button type="primary" icon="md-refresh" @click="reset()">{{i18n_lang.RetentionRate2}}</Button>
        <Button type="primary" icon="md-download" @click="exportData()">{{i18n_lang.RetentionRate3}}</Button><!-- v-if="allRoutes.indexOf('273') > -1" -->
      </div>
    </Card>
    <Table ref="table" border :columns="columns" :data="dataSource"
      @on-select="handleSelect"
      @on-select-cancel="handleCancel"
      @on-select-all="handleSelectAll"
      @on-select-all-cancel="handleSelectAll"
      @on-sort-change="sortTable"
    ></Table>
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
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import columns from './columns'
  export default {
    computed: {
      ...mapState({
        allRoutes: state => state.user.allRoutes
      })
    },
    data() {
      const i18n_lang = this.$t('RetentionRate');
      return {
        i18n_lang: i18n_lang,
        loading: {
          page: false,
          modal: false
        },
        query: {
          date_start:  `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`, // 开始时间
          date_end: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`, // 结束时间
          sort_field: '',
          sort_type: '',
          channel_no: ''
        },
        dateOpt: {
          disabledDate(date) {
            return date && date.valueOf() < Date.now() - 4320000000
          }
        },
        columns: columns(this),
        dataSource: [],
        page: {
          pageSize: 20,
          total: 0,
          currentPage: 1,
          pageSizes: [20, 50, 100, 1000]
        }
      }
    },
    created() {
      this.getList()
    },
    methods: {
      //重置
      reset(){
        this.query = {
          date_start:  `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`, // 开始时间
          date_end: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`, // 结束时间
          channel_no: '',
          sort_field: '',
          sort_type: ''
        }
        this.getList()
      },
      handleSelect(slection, row){
        //this.uidList.push(row.id)
      },
      handleCancel(slection, row){
        // this.uidList.forEach((item, index) => {
        //   if(item == row.id){
        //     this.uidList.splice(index, 1)
        //   }
        // })
      },
      handleSelectAll(slection){
        // if(slection.length){
        //   slection.forEach(item => {
        //     this.uidList.push(item.id)
        //   })
        // }else{
        //   this.uidList = []
        // }
      },
      // 排序
      sortTable(key) {
        this.query.sort_field = key.key
        this.query.sort_type = key.order
        this.getList()
      },
      changePageSize(pageSize) {
        this.page.pageSize = pageSize
        this.getList()
      },
      async getList(index = 1) {//获取数据
        let req = {...this.query}
        if(req.date_start && req.date_end){
          req.date_start = this.$dateFormat(new Date(req.date_start))
          req.date_end = this.$dateFormat(new Date(req.date_end))
        }
        this.loading.page = true
        // this.page.currentPage = index
        const res = await this.$axios.request({
          url: '/channel/retention/active',
          method: 'GET',
          params: {
            ...req
            // page: this.page.currentPage,
            // page_size: this.page.pageSize,
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
        // this.page.total = res.attributes && res.attributes.total ? res.attributes.total : 0
      },
      async exportData(){
        let req = {...this.query}
        if(req.date_start && req.date_end){
          req.date_start = this.$dateFormat(new Date(req.date_start))
          req.date_end = this.$dateFormat(new Date(req.date_end))
        }
        const res = await this.$axios.request({
          url: '/channel/retention/active/export',
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

<style lang="less" scope>
</style>
