<template>
  <div id="OutInReport">
    <Spin v-if="loading.page" fix size="large"></Spin>
    <!-- 主表 -->
    <div v-if="!detail.visible && visible.channel == 1">
      <Card dis-hover class="query_box">
        <div class="query_con">
          <div class="item">
            <span>{{i18n_lang.outInReport0}}</span>
            <DatePicker
              v-model="query.timeArr"
              type="daterange"
              :options="dateOpt"
              :editable="false"
              format="yyyy-MM-dd"
              placement="left-start"
              placeholder
              style="width: 200px"
            ></DatePicker>
          </div>
        </div>
        <div class="query_btns">
          <Button type="primary" style="margin-right: 5px;" icon="ios-search" @click="getData">{{i18n_lang.outInReport1}}</Button>
          <Button type="primary" icon="md-refresh" @click="reset">{{i18n_lang.outInReport2}}</Button>
        </div>
      </Card>
      <Table
        style="margin-top:10px"
        border
        :columns="columns.mainColumns"
        :data="dataSource"
      ></Table>
      <div class="title">
        {{i18n_lang.outInReport36}}
        <Icon type="ios-help-circle-outline" style="cursor: pointer;" @click="visible.hint = true"/>
      </div>
      <div class="statistics">
      	<div>
          <div>{{i18n_lang.outInReport37}}</div>
          <div>{{statistics.user_num}}</div>
        </div>
        <div>
          <div>{{i18n_lang.outInReport38}}</div>
          <div class="no_border">{{statistics.new_user_num}}</div>
        </div>
        <div>
          <div>{{i18n_lang.outInReport39}}</div>
          <div>{{statistics.deposit_user_num}}</div>
        </div>
        <div>
          <div>{{i18n_lang.outInReport40}}</div>
          <div class="no_border">{{statistics.new_deposit_user_num}}</div>
        </div>
        <div>
          <div>{{i18n_lang.outInReport41}}</div>
          <div>{{statistics.deposit_amount}}</div>
        </div>
        <div>
          <div>{{i18n_lang.outInReport42}}</div>
          <div class="no_border">{{statistics.new_register_deposit_amount}}</div>
        </div>
        <div>
          <div>{{i18n_lang.outInReport43}}</div>
          <div>{{statistics.new_register_avg}}</div>
        </div>
        <div>
          <div>{{i18n_lang.outInReport44}}</div>
          <div>{{statistics.new_valid_agent_num}}</div>
        </div>
        <div>
          <div>{{i18n_lang.outInReport45}}</div>
          <div>{{statistics.agent_first_deposit_num}}</div>
        </div>
        <div>
          <div>{{i18n_lang.outInReport52}}</div>
          <div>{{statistics.confiscate_amount}}({{statistics.confiscate_cnt}}{{i18n_lang.outInReport33}})</div>
        </div>
      </div>
    </div>
    <!-- 出款金额 -->
    <div v-if="!detail.visible && visible.channel == 2">
      <Button @click="visible.channel = 1">{{i18n_lang.outInReport3}}</Button>
      <span>{{ detail.query.name }}</span>
      <Table
        style="margin-top:10px"
        border
        :columns="columns.channelList"
        :data="channelSource"
      ></Table>
      <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{ `${i18n_lang.outInReport71}${channelPage.total}${i18n_lang.outInReport72}` }}</div>
      <Page
        class="page_box"
        :current="channelPage.currentPage"
        :page-size="channelPage.pageSize"
        :page-size-opts="channelPage.pageSizes"
        :total="channelPage.total"
        @on-change="profitChannel"
      ></Page>
    </div>
    <!-- 详情 -->
    <div v-if="detail.visible && visible.channel == 3">
      <Button @click="goReturn">{{i18n_lang.outInReport3}}</Button>
      <span>{{ detail.query.name }}</span>
      <Button v-if="isShowExport" type="primary" style="margin-left: 5px;" icon="md-download" @click="exportData">{{i18n_lang.outInReport73}}</Button>
      <Table
        style="margin-top:10px"
        border
        :columns="columns.moneyColumns"
        :data="detail.dataSource"
      ></Table>
      <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{ `${i18n_lang.outInReport71}${detail.page.total}${i18n_lang.outInReport72}` }}</div>
      <Page
        class="page_box"
        :current="detail.page.currentPage"
        :page-size="detail.page.pageSize"
        :page-size-opts="detail.page.pageSizes"
        :total="detail.page.total"
        @on-change="getDetail"
      ></Page>
    </div>
    <!-- 总彩金 -->
    <Modal
      v-model="visible.modal"
      :title="i18n_lang.outInReport47"
      :width="550"
      :styles="{ top: '100px' }"
    >
      <Table
        border
        :columns="columns.totalColumns"
        :data="totalWinnings"
        v-if="visible.modal"
      >
      </Table>
      <div slot="footer">
        <!-- <Button>取消</Button> -->
      </div>
    </Modal>
    <!-- 回水金额 -->
    <Modal
      v-model="visible.backwater"
      :title="i18n_lang.outInReport63"
      :width="550"
      :styles="{ top: '100px' }"
    >
      <Table
        border
        :columns="columns.backwaterColumns"
        :data="backwaterList"
        v-if="visible.backwater"
      >
      </Table>
      <div slot="footer">
        <!-- <Button>取消</Button> -->
      </div>
    </Modal>
    <!-- 统计提示 -->
    <Modal
      v-model="visible.hint"
      :title="``"
      :width="550"
      :footer-hide="true"
      :styles="{ top: '100px' }">
      <p class="hintText">{{i18n_lang.outInReport54}}</p>
      <p class="hintText">{{i18n_lang.outInReport55}}</p>
      <p class="hintText">{{i18n_lang.outInReport56}}</p>
      <p class="hintText">{{i18n_lang.outInReport57}}</p>
      <P class="hintText">{{i18n_lang.outInReport58}}</P>
      <P class="hintText">{{i18n_lang.outInReport59}}</P>
      <P class="hintText">{{i18n_lang.outInReport60}}</P>
      <P class="hintText">{{i18n_lang.outInReport61}}</P>
      <P class="hintText">{{i18n_lang.outInReport62}}</P>
    </Modal>
  </div>
</template>
<script>
import { mainColumns, moneyColumns, totalColumns, backwaterColumns, channelList } from './columns'
import { handleMainData } from './format'
import lotteryDateOption from '@/libs/lotteryDateOption'
import { computeDay } from '@/libs/handleDate'
import { formatDateToString } from '@/libs/date'

const initQuery = {
  timeArr: ['', ''],
  day_begin: '',
  day_end: ''
}

export default {
  data() {
    const i18n_lang = this.$t('outInReport');
    return {
      i18n_lang: i18n_lang,
      columns: {
        mainColumns: mainColumns(this),
        moneyColumns: moneyColumns(this),
        totalColumns: totalColumns(this),
        backwaterColumns: backwaterColumns(this),
        channelList: channelList(this)
      },
      visible: {
        modal: false,
        hint: false,
        backwater: false,
        channel: 1
      },
      loading: {
        page: false,
        time: false
      },
      showMore: false,
      dateOpt: lotteryDateOption,
      query: { ...initQuery },
      dataSource: [],
      type: 'out_in',
      detail: {
        visible: false,
        query: {
          deal_type: '',
          name: ''
        },
        dataSource: [],
        page: {
          pageSize: 20,
          total: 0,
          currentPage: 1,
          pageSizes: [20, 100, 1000, 2000]
        }
      },
      statistics: {
        user_num: "",
        new_user_num: "",
        deposit_user_num: "",
        new_deposit_user_num: "",
        deposit_amount: "",
        new_register_deposit_amount: "",
        new_register_avg: "",
        new_valid_agent_num: "",
        agent_first_deposit_num: "",
        confiscate_amount: "",
        confiscate_cnt: ""
      },
      totalWinnings: [],
      backwaterList: [],
      isShowExport: false,
      channelSource: [],
      third_id: '',
      channelPage: {
        pageSize: 20,
        total: 0,
        currentPage: 1,
        pageSizes: [20, 100, 1000, 2000]
      }
    }
  },
  created() {
    this.reset()
  },
  methods: {
    goReturn(){
      if(this.detail.query.name == this.i18n_lang.outInReport20){
        this.detail.visible=false
        this.visible.channel=2
      }else{
        this.detail.visible=false
        this.visible.channel=1
      }
    },
    // 获取出入款表数据
    async getData() {
      if (!this.query.timeArr[0]) {
        return this.$msg({
          type: 'error',
          message: this.i18n_lang.outInReport4
        })
      }
      this.loading.page = true
      this.dataSource = []
      const req = { ...this.query }
      // 处理时间
      if (req.timeArr[0] !== '') {
        req.date_start = this.$dateFormat(new Date(req.timeArr[0]))
        req.date_end = this.$dateFormat(new Date(req.timeArr[1]))
      }

      delete req.timeArr
      const res = await this.$axios.request({
        url: '/report/master/profit',
        method: 'GET',
        params: req
      })
      this.loading.page = false
      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      this.dataSource = handleMainData(res.data)
      this.statistics = {
        user_num: res.data.user_num,
        new_user_num: res.data.new_user_num,
        deposit_user_num: res.data.deposit_user_num,
        new_deposit_user_num: res.data.new_deposit_user_num,
        deposit_amount: res.data.deposit_amount,
        new_register_deposit_amount: res.data.new_register_deposit_amount,
        new_register_avg: res.data.new_register_avg,
        new_valid_agent_num: res.data.new_valid_agent_num,
        agent_first_deposit_num: res.data.agent_first_deposit_num,
        confiscate_amount: res.data.confiscate_amount,
        confiscate_cnt: res.data.confiscate_cnt
      }
      this.totalWinnings = []
      this.totalWinnings.push({
        classify: this.i18n_lang.outInReport22,
        nnt: res.data.coupon_num,
        coupon_amount: res.data.coupon_amount,
        coupon_cnt: res.data.coupon_cnt
      })
      this.totalWinnings.push({
        classify: this.i18n_lang.outInReport27,
        nnt: res.data.promotion_num,
        coupon_amount: res.data.promotion_winnings,
        coupon_cnt: res.data.promotion_winnings_cnt
      })
      this.totalWinnings.push({
        classify: this.i18n_lang.outInReport28,
        nnt: res.data.turn_card_num,
        coupon_amount: res.data.turn_card_winnings,
        coupon_cnt: res.data.turn_card_winnings_cnt
      })
      // this.returnAmount(req)
    },
    // 出款金额列表
    async profitChannel(i = 1){
      this.detail.page.currentPage = i
      this.loading.page = true
      const req = { 
        ...this.query,
        page: this.channelPage.currentPage,
        page_size: this.channelPage.pageSize,
      }
      // 处理时间
      if (req.timeArr[0] !== '') {
        req.start_time = this.$dateFormat(new Date(req.timeArr[0]))
        req.end_time = this.$dateFormat(new Date(req.timeArr[1]))
      }

      delete req.timeArr
      const res = await this.$axios.request({
        url: '/report/master/profit/channel',
        method: 'GET',
        params: req
      })
      this.loading.page = false
      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      this.channelSource = res.data
      this.channelPage.total = res.attributes ? res.attributes.total : 0
    },
    reset() {
      this.query = { ...initQuery }
      this.query.timeArr = [computeDay(), computeDay()]
      this.getData()
    },
    // 点击获取详情
    async handleDetail(type, name, third_id) {
      // console.log('type, name', type, name)
      this.isShowExport = false
      if(name == this.i18n_lang.outInReport19){
        this.detail.query.deal_type = '102'
      }else if(name == this.i18n_lang.outInReport21){
        this.detail.query.deal_type = '101'
      }else if(name == this.i18n_lang.outInReport23){
        this.detail.query.deal_type = '106'
      }else if(name == this.i18n_lang.outInReport20){
        this.detail.query.deal_type = '201,218'
      }else if(name == this.i18n_lang.outInReport22){
        this.detail.query.deal_type = '105,114'
        this.isShowExport = true
      }else if(name == this.i18n_lang.outInReport24){
        this.detail.query.deal_type = '107,109,113'
      }else if(name == this.i18n_lang.outInReport25){
        this.detail.query.deal_type = '204'
      }else if(name == this.i18n_lang.outInReport26){
        this.detail.query.deal_type = '108'
      }else if(name == this.i18n_lang.outInReport27){
        this.detail.query.deal_type = '308'
      }else if(name == this.i18n_lang.outInReport28){
        this.detail.query.deal_type = '309'
      }else if(name == this.i18n_lang.outInReport29){
        this.detail.query.deal_type = '501'
      }else if(name == this.i18n_lang.outInReport64){
        this.detail.query.deal_type = '701'
      }else if(name == this.i18n_lang.outInReport65){
        this.detail.query.deal_type = '702'
      }else if(name == this.i18n_lang.outInReport66){
        this.detail.query.deal_type = '703'
      }
      if(name == this.i18n_lang.outInReport47){
        this.visible.modal = true
      }
      else if(name == this.i18n_lang.outInReport20 && !third_id && third_id !== 0){
        this.detail.query.name = name
        this.visible.channel = 2
        this.profitChannel()
      }
      else if(name == this.i18n_lang.outInReport24){
        // this.visible.backwater = true
        const req = { ...this.query }
        // 处理时间
        if (req.timeArr[0] !== '') {
          req.date_start = this.$dateFormat(new Date(req.timeArr[0]))
          req.date_end = this.$dateFormat(new Date(req.timeArr[1]))
        }
        delete req.timeArr
        this.returnAmount(req)
      }else{
        // this.detail.query.deal_type = type
        this.detail.query.name = name
        this.visible.modal = false
        this.visible.backwater = false
        this.detail.visible = true
        this.visible.channel = 3
        third_id != undefined && name == this.i18n_lang.outInReport20 ? this.third_id = third_id : this.third_id = ''
        this.getDetail()
      }
    },
    async getDetail(i = 1) {
      this.detail.page.currentPage = i
      this.loading.page = true

      const req = {
        page: this.detail.page.currentPage,
        page_size: this.detail.page.pageSize,
        is_test: false,
        deal_type: this.detail.query.deal_type,
        third_id: this.third_id
      }

      if (this.query.timeArr[0] !== '') {
        req.start_time = formatDateToString(new Date(this.query.timeArr[0]))
        req.end_time = formatDateToString(new Date(this.query.timeArr[1]))
      }

      const res = await this.$axios.request({
        url: '/funds/flow',
        method: 'GET',
        params: req
      })

      this.loading.page = false

      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      this.detail.page.total = res.attributes ? res.attributes.total : 0
      this.detail.dataSource = res.data || []
    },
    handleTirdDetail(name) {
      this.$router.push({
        path: '/report/outInReportDetail',
        query: {
          username: name,
          startTime: formatDateToString(new Date(this.query.timeArr[0])),
          endTime: formatDateToString(new Date(this.query.timeArr[1]))
        }
      })
    },
    // 查看用户详情
    handleUserDetail(row) {
      this.$store.dispatch('detail/info', {
        username: row.username,
        id: row.user_id
      })
    },
    // 回水数据
    async returnAmount(req){
      const res = await this.$axios.request({
        url: '/report/master/returnAmount',
        method: 'GET',
        params: req
      })
      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      // console.log('res.data', res.data)
      this.backwaterList = []
      this.backwaterList.push({
        classify: `${this.i18n_lang.outInReport64}`,
        people: res.data.day.people,
        amount: res.data.day.amount,
        num: res.data.day.num
      })
      this.backwaterList.push({
        classify: `${this.i18n_lang.outInReport65}`,
        people: res.data.week.people,
        amount: res.data.week.amount,
        num: res.data.week.num
      })
      this.backwaterList.push({
        classify: `${this.i18n_lang.outInReport66}`,
        people: res.data.month.people,
        amount: res.data.month.amount,
        num: res.data.month.num
      })
      // this.backwaterList.push({
      //   classify: `${this.i18n_lang.outInReport67}`,
      //   people: res.data.other.people,
      //   amount: res.data.other.amount,
      //   num: res.data.other.num
      // })
      this.visible.backwater = true
    },
    // 导出
    async exportData(){
      const req = {
        is_test: false,
        deal_type: this.detail.query.deal_type
      }

      if (this.query.timeArr[0] !== '') {
        req.start_time = formatDateToString(new Date(this.query.timeArr[0]))
        req.end_time = formatDateToString(new Date(this.query.timeArr[1]))
      }
      const res = await this.$axios.request({
        url: '/funds/flow/export',
        method: 'GET',
        responseType: 'blob',
        params: {
          ...req,
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
#OutInReport {
  .desc {
    font-size: 14px;
    margin: 10px 0;
    color: #333;
    font-weight: bold;
  }
  .title {
    font-size: 16px;
    margin: 50px 0 20px;
    padding-left: 10px;
    border-left: 3px solid #3080fe;
    color: #666;
  }
  .statistics{
    color: #515a6e;
    font-size: 12px;
    border: 1px solid #e8eaec;
    border-bottom: none;
    overflow: hidden;
    &>div{
      width: 50%;
      height: 48px;
      border-bottom: 1px solid #e8eaec;
      float: left;
      overflow: hidden;
      &>div{
        width: 50%;
        height: 48px;
        text-align: center;
        line-height: 48px;
        border-right: 1px solid #e8eaec;
        float: left;
        &.no_border{
          border: none;
        }
      }
    }
  }
}
.hintText{
  font-size: 16px;
}
</style>
