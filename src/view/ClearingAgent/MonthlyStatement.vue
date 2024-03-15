<template>
  <div class="Daily">
    <Spin v-if="loading.page" size="large" fix></Spin>
    <Card dis-hover class="query_box">
      <div class="item">
        <span>{{i18n_lang.ClearingAgent0}}</span>
        <Input v-model="searchInfo.user_name" :placeholder="`${i18n_lang.ClearingAgent1}`" clearable style="width: 150px"/>
        <span style="margin-left: 15px;">{{i18n_lang.ClearingAgent50}}</span>
        <Input v-model="searchInfo.agent_name" :placeholder="`${i18n_lang.ClearingAgent51}`" clearable style="width: 150px"/>
        <span style="margin-left: 15px;">{{i18n_lang.ClearingAgent2}}</span>
        <DatePicker
          v-model="searchInfo.month"
          type="month"
          placeholder
          style="width: 200px"
          clearable
          @on-change="selectTime"
        ></DatePicker>
        <Button type="primary" icon="ios-search" @click="screenFn()" class="marginRight" style="margin-left: 15px;">{{i18n_lang.ClearingAgent3}}</Button>
        <Button type="primary" style="margin-left: 5px;" icon="md-refresh" @click="reset">{{i18n_lang.ClearingAgent52}}</Button>
        <Button type="primary" style="margin-left: 5px;" icon="md-download" @click="exportData()" v-if="allRoutes.indexOf('334') > -1">{{i18n_lang.ClearingAgent4}}</Button>
      </div>
    </Card>
    <h3>{{i18n_lang.ClearingAgent5}}</h3>
    <div class="card-box">
      <Card class="card">{{i18n_lang.ClearingAgent6}}{{total_tz}}</Card>
      <Card class="card">{{i18n_lang.ClearingAgent7}}{{total_fj}}</Card>
      <Card class="card">{{i18n_lang.ClearingAgent8}}{{total_yk}}</Card>
      <Card class="card">{{i18n_lang.ClearingAgent9}}{{total_kk}}</Card>
      <Card class="card">{{i18n_lang.ClearingAgent41}}{{total_yl}}</Card>
    </div>
    <div>
      <Table ref="table" border :columns="collectData" :data="collectList"></Table>
    </div>
    <h3 style="margin-top: 20px;">{{i18n_lang.ClearingAgent10}}</h3>
    <div style="margin-top: 20px;" class="detail_of_charges">
      <div v-if="platform_info.bet_ratio_amount">
        <div>{{i18n_lang.ClearingAgent11}}</div>
        <div>{{platform_info.bet_ratio_amount}}</div>
      </div>
      <div v-if="platform_info.deposit_ratio_amount">
        <div>{{i18n_lang.ClearingAgent45}}</div>
        <div>{{platform_info.deposit_ratio_amount}}</div>
      </div>
      <div v-if="platform_info.revenue_ratio_amount">
        <div>{{i18n_lang.ClearingAgent13}}</div>
        <div>{{platform_info.revenue_ratio_amount}}</div>
      </div>
      <div v-if="platform_info.coupon_ratio_amount">
        <div>{{i18n_lang.ClearingAgent47}}</div>
        <div>{{platform_info.coupon_ratio_amount}}</div>
      </div>
      <div v-if="platform_info.manual_ratio_amount">
        <div>{{i18n_lang.ClearingAgent46}}</div>
        <div>{{platform_info.manual_ratio_amount}}</div>
      </div>
    </div>
    <h3 style="margin-top: 20px;">{{i18n_lang.ClearingAgent16}}</h3>
    <div style="margin-top: 20px;">
      <Table ref="table" border :columns="agentDetails" :data="agentList"></Table>
      <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{ `${i18n_lang.ClearingAgent56}${page.total}${i18n_lang.ClearingAgent57}` }}</div>
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
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import { computeDay } from '@/libs/handleDate'
  import { collectData, agentDetails } from './monthlyColumns'
  const searchInfo = {
    model: 2,
    user_name: '',
    agent_name: '',
    month: `${new Date().getFullYear()}-${new Date().getMonth() + 1 <= 9 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1}`
  }
  export default {
    computed: {
      ...mapState({
        allRoutes: state => state.user.allRoutes
      })
    },
    data() {
      const i18n_lang = this.$t('ClearingAgent');
      return {
        i18n_lang: i18n_lang,
        collectData: collectData(this),
        agentDetails: agentDetails(this),
        loading: {
          page: false
        },
        reginTime: [searchInfo.date_start, searchInfo.date_end],
        searchInfo: { ...searchInfo },
        page: {
          pageSize: 20,
          total: 0,
          currentPage: 1,
          pageSizes: [20, 50, 100, 1000]
        },
        total_tz: "",
        total_fj: "",
        total_yk: "",
        total_kk: "",
        total_yl: "",
        platform_info: {},
        collectList: [],
        agentList: []
      }
    },
    created() {
      let parameter = sessionStorage.getItem('parameter') || '{}'
      if(JSON.parse(parameter).MonthlyStatement){
        this.searchInfo = {
          model: 2,
          user_name: JSON.parse(parameter).MonthlyStatement.user_name, // 用户名
          agent_name: JSON.parse(parameter).MonthlyStatement.agent_name,
          month: JSON.parse(parameter).MonthlyStatement.month,
        }
        this.page.currentPage = JSON.parse(parameter).MonthlyStatement.page
        this.page.pageSize = JSON.parse(parameter).MonthlyStatement.page_size
        this.getList(this.page.currentPage)
      }else{
        this.getList()
      }
      //this.getList()
    },
    methods: {
      ...mapActions({
        getUserDetail: 'detail/info'
      }),
      // 查看用户详情
      handleUserDetail(row) {
        this.getUserDetail({ username: row.username, id: row.id })
      },
      // 选择日期
      selectTime(val) {
        this.searchInfo.month = val
      },
      changePageSize(pageSize) {
        this.page.pageSize = pageSize
        this.getList()
      },
      screenFn(){
        this.getList()
      },
      reset(){
        this.searchInfo = { ...searchInfo }
        this.getList()
      },
      async getList(index = 1) {
        this.loading.page = true
        this.page.currentPage = index
        const req = {...this.searchInfo}
        req.month = req.month ? this.$dateFormat(req.month) : ''
        const res = await this.$axios.request({
          url: '/report/agent/shareholder',
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
        let parameterPage = sessionStorage.getItem('parameter') || "{}"
        let parameter = JSON.parse(parameterPage)
        parameter.MonthlyStatement = {
          model: 2,
          user_name: req.user_name,
          agent_name: req.agent_name,
          month: req.month,
          page: this.page.currentPage,
          page_size: this.page.pageSize
        }
        sessionStorage.setItem('parameter', JSON.stringify(parameter))
        this.total_tz = res.data.total_tz
        this.total_fj = res.data.total_fj
        this.total_yk = res.data.total_yk
        this.total_kk = res.data.total_kk
        this.total_yl = res.data.total_yl
        this.platform_info = res.data.platform_info
        // if(res.data.agent_details.length){
        //   res.data.agent_details.forEach((item, index) => {
        //     item.bet_amount_list = JSON.parse(item.bet_amount_list)
        //     item.proportion_list = JSON.parse(item.proportion_list)
        //   })
        // }
        this.collectList = res.data.game_info || []
        this.agentList = res.data.agent_details || []
        this.page.total = res.attributes && res.attributes.total ? res.attributes.total : 0
      },
      async exportData(){
        const res = await this.$axios.request({
          // url: '/report/agent/shareholder',
          url: '/report/agent/shareholder/export',
          method: 'GET',
          responseType: 'blob',
          params: {
            // export: 1,
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
      }
    }
  }
</script>

<style lang="less" scoped>
  .card-box {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    text-align: center;
    margin-top: 20px;
    .card {
      margin-right: 20px;
      margin-bottom: 20px;
      padding: 0;
      min-width: 18%;
      p {
        line-height: 3.8;
      }
      .title {
        line-height: 2.8;
        border-bottom: 1px solid #eee;
      }
      .ivu-card-body {
        padding: 0;
      }
    }
  }
  .detail_of_charges{
    display: table;
    width: 100%;
    vertical-align: inherit;
    border-color: inherit;
    border: 1px solid #e8eaec;
    overflow: hidden;
    &>div{
      display: table-cell;
      text-align: center;
      // float: left;
      &>div{
        font-size: 12px;
        line-height: 35px;
        &:first-child{
          color: #515a6e;
          font-weight: bold;
          border-bottom: 1px solid #e8eaec;
        }
      }
    }
  }
</style>
