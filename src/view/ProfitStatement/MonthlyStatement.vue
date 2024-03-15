<template>
  <div class="Daily">
    <Spin v-if="loading.page" size="large" fix></Spin>
    <Card dis-hover class="query_box">
      <div class="item">
        <span>{{i18n_lang.profitStatement0}}</span>
        <Input v-model="searchInfo.user_name" :placeholder="`${i18n_lang.profitStatement1}`" clearable style="width: 150px"/>
        <span style="margin-left: 15px;">{{i18n_lang.profitStatement2}}</span>
        <Input v-model="searchInfo.agent_name" :placeholder="`${i18n_lang.profitStatement3}`" clearable style="width: 150px"/>
        <span style="margin-left: 15px;">{{i18n_lang.profitStatement4}}</span>
        <DatePicker
          v-model="searchInfo.month"
          type="month"
          placeholder
          style="width: 200px"
          clearable
          @on-change="selectTime"
        ></DatePicker>
        <Button type="primary" icon="ios-search" @click="screenFn()" class="marginRight" style="margin-left: 15px;">{{i18n_lang.profitStatement5}}</Button>
        <!-- <Button type="primary" style="margin-left: 5px;" icon="md-refresh" @click="reset">{{i18n_lang.profitStatement6}}</Button> -->
        <Button type="primary" style="margin-left: 5px;" icon="md-download" @click="exportData()">{{i18n_lang.profitStatement7}}</Button>
      </div>
    </Card>
    <h3>{{i18n_lang.profitStatement8}}</h3>
    <div class="card-box">
      <Card class="card">{{i18n_lang.profitStatement9}}{{ total_tz }}</Card>
      <Card class="card">{{i18n_lang.profitStatement10}}{{ total_fj }}</Card>
      <Card class="card">{{i18n_lang.profitStatement11}}{{ total_ys }}</Card>
      <Card class="card">{{i18n_lang.profitStatement12}}{{ total_cb }}</Card>
      <Card class="card">{{i18n_lang.profitStatement13}}{{ total_jyl }}</Card>
    </div>
    <div>
      <Table ref="table" border :columns="collectData" :data="collectList"></Table>
    </div>
    <h3 style="margin-top: 20px;">{{i18n_lang.profitStatement14}}</h3>
    <div style="margin-top: 20px;" class="detail_of_charges">
      <div v-if="cb_details.lose_earn">
        <div>{{i18n_lang.profitStatement15}}</div>
        <div>{{cb_details.lose_earn}}</div>
      </div>
      <div v-if="cb_details.deposit_ratio_amount">
        <div>{{i18n_lang.profitStatement16}}</div>
        <div>{{cb_details.deposit_ratio_amount}}</div>
      </div>
      <div v-if="cb_details.withdrawal_ratio_amount">
        <div>{{`${i18n_lang.profitStatement50}`}}</div>
        <div>{{cb_details.withdrawal_ratio_amount}}</div>
      </div>
      <div v-if="cb_details.revenue_ratio_amount">
        <div>{{`${i18n_lang.profitStatement51}`}}</div>
        <div>{{cb_details.revenue_ratio_amount}}</div>
      </div>
      <div v-if="cb_details.coupon_ratio_amount">
        <div>{{i18n_lang.profitStatement17}}</div>
        <div>{{cb_details.coupon_ratio_amount}}</div>
      </div>
      <div v-if="cb_details.manual_ratio_amount">
        <div>{{i18n_lang.profitStatement18}}</div>
        <div>{{cb_details.manual_ratio_amount}}</div>
      </div>
    </div>
    <h3 style="margin-top: 20px;">{{i18n_lang.profitStatement19}}</h3>
    <div style="margin-top: 20px;">
      <Table ref="table" border :columns="agentDetails" :data="agentList"></Table>
      <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{ `${i18n_lang.profitStatement55}${page.total}${i18n_lang.profitStatement56}` }}</div>
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
    <Modal v-model="visible.agent" :title="`${i18n_lang.profitStatement58}`" :width="1200" :footer-hide="true">
      <Table ref="table" border :columns="agentCntList" :data="agentCntData"></Table>
      <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{ `${i18n_lang.profitStatement55}${agentPage.total}${i18n_lang.profitStatement56}` }}</div>
      <Page
        class="page_box"
        show-sizer
        :current="agentPage.currentPage"
        :page-size-opts="agentPage.pageSizes"
        :page-size="agentPage.pageSize"
        :total="agentPage.total"
        @on-change="getAgentCnt"
        @on-page-size-change="changeAgentPageSize"
      ></Page>
    </Modal>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import { computeDay } from '@/libs/handleDate'
  import { collectData, agentDetails, agentCntList } from './monthlyColumns'
  let month = ''
  let getMonth = new Date().getMonth() + 1
  month = getMonth <= 9 ? `0${getMonth}` : `${getMonth}`
  const searchInfo = {
    model: 2,
    user_name: '',
    agent_name: '',
    month: `${new Date().getFullYear()}-${month}`
  }
  export default {
    data() {
      const i18n_lang = this.$t('profitStatement');
      return {
        i18n_lang: i18n_lang,
        collectData: collectData(this),
        agentDetails: agentDetails(this),
        agentCntList: agentCntList(this),
        loading: {
          page: false
        },
        visible: {
          agent: false
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
        total_ys: "",
        total_cb: "",
        total_jyl: "",
        cb_details: {},
        collectList: [],
        agentList: [],
        user_name: '',
        agentPage: {
          pageSize: 20,
          total: 0,
          currentPage: 1,
          pageSizes: [20, 50, 100, 1000]
        },
        agentCntData: []
      }
    },
    created() {
      // let parameter = sessionStorage.getItem('parameter') || '{}'
      // if(JSON.parse(parameter).MonthlyStatement1){
      //   this.searchInfo = {
      //     model: 2,
      //     user_name: JSON.parse(parameter).MonthlyStatement1.user_name, // 用户名
      //     agent_name: JSON.parse(parameter).MonthlyStatement1.agent_name,
      //     month: JSON.parse(parameter).MonthlyStatement1.month,
      //   }
      //   this.page.currentPage = JSON.parse(parameter).MonthlyStatement1.page
      //   this.page.pageSize = JSON.parse(parameter).MonthlyStatement1.page_size
      //   this.getList(this.page.currentPage)
      // }else{
      //   this.getList()
      // }
      this.getList()
    },
    methods: {
      ...mapActions({
        getUserDetail: 'detail/info'
      }),
      // 查看用户详情
      handleUserDetail(row) {
        this.getUserDetail({ username: row.user_name, id: row.user_id })
      },
      // 选择日期
      selectTime(val) {
        this.searchInfo.month = val
      },
      changePageSize(pageSize) {
        this.page.pageSize = pageSize
        this.getList()
      },
      changeAgentPageSize(){
        this.page.pageSize = pageSize
        this.getAgentCnt()
      },
      lookAgentCnt(row){
        this.user_name = row.user_name
        this.getAgentCnt()
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
        let month = ''
        let getMonth = new Date(req.month).getMonth() + 1
        month = getMonth <= 9 ? `0${getMonth}` : `${getMonth}`
        req.month = req.month ? `${new Date(req.month).getFullYear()}-${month}` : ''
        const res = await this.$axios.request({
          url: '/report/agent/profit',
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
        // let parameterPage = sessionStorage.getItem('parameter') || "{}"
        // let parameter = JSON.parse(parameterPage)
        // parameter.MonthlyStatement1 = {
        //   model: 2,
        //   user_name: req.user_name,
        //   agent_name: req.agent_name,
        //   month: req.month,
        //   page: this.page.currentPage,
        //   page_size: this.page.pageSize
        // }
        // sessionStorage.setItem('parameter', JSON.stringify(parameter))
        this.total_tz = res.data.total_tz
        this.total_fj = res.data.total_fj
        this.total_ys = res.data.total_ys
        this.total_cb = res.data.total_cb
        this.total_jyl = res.data.total_jyl
        this.cb_details = res.data.cb_details
        this.collectList = res.data.game_info || []
        this.agentList = res.data.agent_details || []
        this.page.total = res.attributes && res.attributes.total ? res.attributes.total : 0
      },
      async getAgentCnt(index = 1){
        this.agentPage.currentPage = index
        const req = {...this.searchInfo}
        req.date_start = req.date_start ? this.$dateFormat(req.date_start) : ''
        req.date_end = req.date_end ? this.$dateFormat(req.date_end) : ''
        req.user_name = this.user_name
        const res = await this.$axios.request({
          url: '/report/agent/profit/details',
          method: 'GET',
          params: {
            ...req,
            page: this.agentPage.currentPage,
            page_size: this.agentPage.pageSize
          }
        })
        if (res.status !== 200) {
          this.$msg({
            type: 'error',
            message: res.message
          })
          return false
        }
        this.visible.agent = true
        this.agentCntData = res.data.agent_details
        this.agentPage.total = res.attributes && res.attributes.total ? res.attributes.total : 0
      },
      async exportData(){
        const res = await this.$axios.request({
          url: '/report/agent/profit/export',
          method: 'GET',
          responseType: 'blob',
          params: {
            export: 1,
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
