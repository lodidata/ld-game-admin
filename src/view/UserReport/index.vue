<template>
  <div id="UserReport">
    <Spin v-if="loading.page" size="large" fix></Spin>
    <Card dis-hover class="query_box">
      <div class="query_con">
        <div class="item">
          <span>{{i18n_lang.userReport0}}</span>
          <DatePicker
            v-model="query.timeArr"
            type="daterange"
            :options="dateOpt"
            :editable="false"
            format="yyyy-MM-dd"
            placement="top-start"
            placeholder
            style="width: 200px"
          ></DatePicker>
        </div>
        <div class="item">
          <span>{{i18n_lang.userReport1}}</span>
          <Input v-model="query.user_name" :placeholder="i18n_lang.userReport2" style="width: 120px" />
        </div>
        <div class="item">
          <span>{{i18n_lang.userReport36}}</span>
          <Input v-model="query.agent_name" :placeholder="i18n_lang.userReport2" style="width: 120px" />
        </div>
        <div class="item">
          <span>{{i18n_lang.userReport50}}</span>
          <Input v-model="query.channel_id" :placeholder="i18n_lang.userReport51" style="width: 120px" />
        </div>
        <div class="item">
          <span>{{i18n_lang.userReport52}}</span>
          <Input v-model="query.amount_start" :placeholder="` `" style="width: 80px" /> -
          <Input v-model="query.amount_end" :placeholder="` `" style="width: 80px" />
        </div>
      </div>
      <div class="query_btns">
        <Button type="primary" icon="ios-search" @click="handleSearch">{{i18n_lang.userReport3}}</Button>
        <Button type="primary" style="margin-left: 5px;" icon="md-refresh" @click="reset">{{i18n_lang.userReport4}}</Button>
        <Button
          type="primary"
          style="margin-left: 5px;"
          icon="ios-download-outline"
          @click="exportData"
          v-if="allRoutes.indexOf('260') > -1"
        >{{i18n_lang.userReport5}}</Button>
      </div>
    </Card>

    <!-- <Table style="margin-top:10px" filter border
      :columns="columns"
      :data="dataSource"
      @on-sort-change="sortTable"
    ></Table> -->
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
      @sortTable="sortTable"
      @checkboxKeyFn="checkboxKeyFn"
    ></MyTable>
    <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{ `${i18n_lang.userReport53}${page.total}${i18n_lang.userReport54}` }}</div>
    <MyPage
      class="page_box"
      :current="page.currentPage"
      :page-size="page.pageSize"
      :total="page.total"
      show-sizer
      @onChange="getData"
      @changePageSize="changePageSize"
    ></MyPage>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import columns from './columns'
import lotteryDateOption from '@/libs/lotteryDateOption'
import config from '@/config'
import { getToken } from '@/libs/util'
import { computeDay } from '@/libs/handleDate'
import { formatDateToString } from '@/libs/date'
import MyTable from '_c/MyTable'
import MyPage from '_c/MyPage'

const initQuery = {
  user_name: '', // 用户名
  agent_name: '',//上级账号
  timeArr: [computeDay(), computeDay()],
  date_start: '',
  date_end: '',
  sort_way: '',
  field_id: '',
  channel_id: '',//渠道号
  amount_start: '',//充值金额最小值
  amount_end: ''//充值金额最大值
}

export default {
  components: {
    MyTable,
    MyPage
  },
  computed: {
    ...mapState({
      allRoutes: state => state.user.allRoutes
    })
  },
  data() {
    const i18n_lang = this.$t('userReport');
    return {
      i18n_lang: i18n_lang,
      columns: columns(this),
      loading: {
        page: false,
        time: false
      },
      query: { ...initQuery },
      dateOpt: lotteryDateOption,
      dataSource: [],
      type: 'user',
      page: {
        pageSize: 20,
        total: 0,
        currentPage: 1
      },
      export_field: ''
    }
  },
  created() {
    let parameter = sessionStorage.getItem('parameter') || '{}'
    if(JSON.parse(parameter).userReport){
      this.query = {
        user_name: JSON.parse(parameter).userReport.user_name, // 用户名
        agent_name: JSON.parse(parameter).userReport.agent_name,//上级账号
        timeArr: [JSON.parse(parameter).userReport.date_start, JSON.parse(parameter).userReport.date_end],
        date_start: JSON.parse(parameter).userReport.date_start,
        date_end: JSON.parse(parameter).userReport.date_end,
        sort_way: JSON.parse(parameter).userReport.sort_way,
        field_id: JSON.parse(parameter).userReport.field_id
      }
      this.page.currentPage = JSON.parse(parameter).userReport.page
      this.page.pageSize = JSON.parse(parameter).userReport.page_size
    }else{
      this.query = { ...initQuery }
    }
    // this.query = { ...initQuery }
  },
  methods: {
    // 排序
    sortTable(key) {
      if(key.key == 'deposit_user_amount'){
        this.query.field_id = 1
      }
      if(key.key == 'withdrawal_user_amount'){
        this.query.field_id = 2
      }
      if(key.key == 'dw_drop_amount'){
        this.query.field_id = 3
      }
      if(key.key == 'dw_drop_amount'){
        this.query.field_id = 3
      }
      if(key.key == 'bet_user_amount'){
        this.query.field_id = 4
      }
      if(key.key == 'prize_user_amount'){
        this.query.field_id = 5
      }
      if(key.key == 'bs_drop_amount'){
        this.query.field_id = 6
      }
      if(key.key == 'coupon_user_amount'){
        this.query.field_id = 7
      }
      if(key.key == 'return_user_amount'){
        this.query.field_id = 8
      }
      if(key.key == 'promotion_user_winnings'){
        this.query.field_id = 9
      }
      if(key.key == 'turn_card_user_winnings'){
        this.query.field_id = 10
      }
      if(key.key == 'back_user_amount'){
        this.query.field_id = 11
      }
      if(key.key == 'award_amount'){
        this.query.field_id = 12
      }
      if(key.key == 'total_bet_user_amount'){
        this.query.field_id = 13
      }
      if(key.key == 'balance'){
        this.query.field_id = 14
      }
      if(key.key == 'total_deposit_user_amount'){
        this.query.field_id = 15
      }
      if(key.key == 'total_withdrawal_user_amount'){
        this.query.field_id = 16
      }
      if(key.key == 'first_deposit_user_amount'){
        this.query.field_id = 17
      }
      this.query.sort_way = key.order
      // console.log(this.query)
      this.getData()
    },
    //获取多选参数
    checkboxKeyFn(checkbox){
      // console.log('checkbox', checkbox)
      if(checkbox.length){
        this.export_field = ''
        checkbox.forEach((item, index) => {
          if(isNaN(Number(item))){
            if(item != "yk" && item != "cq" && item != "tz" && item != "zs"){
              this.export_field += this.export_field ? `,${item}` : `${item}`
            }
          }
          if(item == "yk"){
            this.export_field += this.export_field ? `,yk_data` : `yk_data`
          }
          if(item == "cq"){
            this.export_field += this.export_field ? `,deposit_user_amount,withdrawal_user_amount,dw_drop_amount,total_deposit_user_amount,total_withdrawal_user_amount,first_deposit_user_amount,first_create_time,recharge_time` : `deposit_user_amount,withdrawal_user_amount,dw_drop_amount,total_deposit_user_amount,total_withdrawal_user_amount,first_deposit_user_amount,first_create_time,recharge_time`
          }
          if(item == "tz"){
            this.export_field += this.export_field ? `,bet_user_amount,prize_user_amount,bs_drop_amount,total_bet_user_amount` : `bet_user_amount,prize_user_amount,bs_drop_amount,total_bet_user_amount`
          }
          if(item == "zs"){
            this.export_field += this.export_field ? `,coupon_user_amount,return_user_amount,promotion_user_winnings,turn_card_user_winnings,back_user_amount,award_amount,total_Winnings` : `coupon_user_amount,return_user_amount,promotion_user_winnings,turn_card_user_winnings,back_user_amount,award_amount,total_Winnings`
          }
        })
        // console.log('export_field', this.export_field)
      }
    },
    // 切换条数
    changePageSize(pageSize) {
      this.page.pageSize = pageSize
      this.getData()
    },
    reset() {
      this.query = { ...initQuery }
      this.getData()
    },
    // 查询
    handleSearch() {
      this.getData()
    },
    async getData(i = 1) {
      if (!this.query.timeArr[0]) {
        return this.$msg({
          type: 'error',
          message: this.i18n_lang.userReport6

        })
      }
      this.page.currentPage = i
      this.loading.page = true
      this.dataSource = []
      const req = {
        page: this.page.currentPage,
        page_size: this.page.pageSize,
        ...this.query
      }
      // 处理时间
      if (req.timeArr[0] !== '') {
        req.date_start = formatDateToString(new Date(req.timeArr[0]))
        req.date_end = formatDateToString(new Date(req.timeArr[1]))
      }
      delete req.timeArr

      const res = await this.$axios.request({
        url: '/report/user/profit',
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
      let parameterPage = sessionStorage.getItem('parameter') || "{}"
      let parameter = JSON.parse(parameterPage)
      parameter.userReport = {
        user_name: this.query.user_name, // 用户名
        agent_name: this.query.agent_name,//上级账号
        date_start: req.date_start,
        date_end: req.date_end,
        sort_way: this.query.sort_way,
        field_id: this.query.field_id,
        page: this.page.currentPage,
        page_size: this.page.pageSize
      }
      sessionStorage.setItem('parameter', JSON.stringify(parameter))
      this.page.total = res.attributes ? res.attributes.total : 0
      this.dataSource = res.data || []
    },
    // 获取报表全部数据
    async reportData(){
      const req = {
        ...this.query
      }
      // 处理时间
      if (req.timeArr[0] !== '') {
        req.date_start = formatDateToString(new Date(req.timeArr[0]))
        req.date_end = formatDateToString(new Date(req.timeArr[1]))
      }
      delete req.timeArr
      const res = await this.$axios.request({
        url: '/report/user/profit/export',
        method: 'GET',
        responseType: 'blob',
        params: {
          ...req,
          export_field: this.export_field
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
    // 查看用户详情
    handleUserDetail(row) {
      this.$store.dispatch('detail/info', { username: row.user_name, id: row.user_id })
    },
    // 导出表格
    exportData() {
      this.reportData()
      // if (this.dataSource.length) {
      //   this.reportData()
      // } else {
      //   this.$msg({
      //     type: 'error',
      //     message: this.i18n_lang.userReport8
      //   })
      // }
    }
  }
}
</script>
<style lang="less" scoped>
#UserReport {
  .desc {
    font-size: 14px;
    margin: 10px 0;
    color: #333;
    font-weight: bold;
  }
}
</style>
