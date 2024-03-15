<template>
  <div id="AgentReport">
    <Spin v-if="loading.page" size="large" fix></Spin>
    <Card dis-hover class="query_box">
      <div class="query_con">
        <div class="item">
          <span>{{i18n_lang.agentReport0}}</span>
          <DatePicker
            v-model="query.timeArr"
            type="daterange"
            :options="dateOpt"
            :editable="false"
            placement="top-start"
            placeholder
            style="width: 200px"
          ></DatePicker>
        </div>
        <div class="item">
          <span>{{i18n_lang.agentReport1}}</span>
          <Input v-model="query.user_name" :placeholder="i18n_lang.agentReport2" style="width: 120px" />
        </div>
        <div class="item">
          <span>{{i18n_lang.agentReport38}}</span>
          <Select v-model="query.proportion_status" clearable style="width:150px">
            <Option value>{{i18n_lang.agentReport39}}</Option>
            <Option :key="1" :value="1">{{i18n_lang.agentReport40}}</Option>
            <Option :key="2" :value="2">{{i18n_lang.agentReport41}}</Option>
          </Select>
        </div>
      </div>
      <div class="query_btns">
        <Button type="primary" icon="ios-search" @click="resetGetData">{{i18n_lang.agentReport3}}</Button>
        <Button type="primary" style="margin-left: 5px;" icon="md-refresh" @click="reset">{{i18n_lang.agentReport4}}</Button>
        <Button
          type="primary"
          style="margin-left: 5px;"
          icon="ios-download-outline"
          @click="exportData"
          v-if="allRoutes.indexOf('261') > -1"
        >{{i18n_lang.agentReport5}}</Button>
      </div>
    </Card>

    <Button
      v-if="stack.length"
      type="primary"
      icon="md-arrow-back"
      style="margin-left: 5px;"
      @click="goBack"
    >{{i18n_lang.agentReport6}}</Button>

    <Card dis-hover class="query_box">
      <div>{{`${i18n_lang.agentReport63_4_3}：`}}</div>
      <div class="query_con">
        <div class="item">{{`${i18n_lang.agentReport55_4_3}：`}}{{ statistics.all_agent_num }}</div>
        <div class="item">{{`${i18n_lang.agentReport56_4_3}：`}}{{ statistics.new_agent_num }}</div>
        <div class="item">{{`${i18n_lang.agentReport57_4_3}：`}}{{ statistics.active_agent_num }}</div>
        <div class="item">{{`${i18n_lang.agentReport58_4_3}：`}}{{ statistics.sub_new_num }}</div>
        <div class="item">{{`${i18n_lang.agentReport59_4_3}：`}}{{ statistics.cz_people }}</div>
        <div class="item">{{`${i18n_lang.agentReport60_4_3}：`}}{{ statistics.cz_amount }}</div>
        <div class="item">{{`${i18n_lang.agentReport61_4_3}：`}}{{ statistics.cr }}</div>
        <div class="item">{{`${i18n_lang.agentReport62_4_3}：`}}{{ statistics.avg_pay }}</div>
      </div>
    </Card>

    <Table style="margin-top:10px" filter border
      :columns="columns"
      :data="dataSource"
      @on-sort-change="sortTable"
    ></Table>
    <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{ `${i18n_lang.agentReport53}${page.total}${i18n_lang.agentReport54}` }}</div>
    <MyPage
      class="page_box"
      :current="page.currentPage"
      :page-size="page.pageSize"
      :total="page.total"
      show-sizer
      @onChange="getData"
      @changePageSize="changePageSize"
    ></MyPage>
    <!-- 占成 -->
    <Modal  v-model="visible.accounted" :title="`${i18n_lang.agentReport43}`">
      <Form
        :label-width="100"
        style="width: 400px">
        <FormItem v-for="(item, index) in gameArrar" :key="index" :label="item.rename">
          <Input v-model="item.text" disabled></Input>
        </FormItem>
      </Form>
      <div slot="footer"></div>
    </Modal>
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
import MyPage from '_c/MyPage'

const initQuery = {
  user_name: '', // 用户名
  agent_id: '',
  // timeArr: [computeDay(-6), computeDay()],
  timeArr: [computeDay(), computeDay()],
  date_start: '',
  date_end: '',
  field_id: '',
  sort_way: '',
  proportion_status: ''
}

export default {
  components: {
    MyPage
  },
  computed: {
    ...mapState({
      allRoutes: state => state.user.allRoutes
    })
  },
  data() {
    const i18n_lang = this.$t('agentReport');
    return {
      i18n_lang: i18n_lang,
      columns: columns(this),
      loading: {
        page: false,
        time: false
      },
      visible: {
        accounted: false
      },
      query: { ...initQuery },
      dateOpt: lotteryDateOption,
      dataSource: [],
      stack: [], // 查询栈
      page: {
        pageSize: 20,
        total: 0,
        currentPage: 1
      },
      gameArrar: [],
      statistics: {}
    }
  },
  created() {
    let parameter = sessionStorage.getItem('parameter') || '{}'
    if(JSON.parse(parameter).agentReport){
      this.query = {
        user_name: JSON.parse(parameter).agentReport.user_name, // 用户名
        agent_id: JSON.parse(parameter).agentReport.agent_id,
        timeArr: [JSON.parse(parameter).agentReport.date_start, JSON.parse(parameter).agentReport.date_end],
        date_start: JSON.parse(parameter).agentReport.date_start,
        date_end: JSON.parse(parameter).agentReport.date_end,
        sort_way: JSON.parse(parameter).agentReport.sort_way,
        field_id: JSON.parse(parameter).agentReport.field_id,
        proportion_status: JSON.parse(parameter).agentReport.proportion_status
      }
      this.page.currentPage = JSON.parse(parameter).agentReport.page
      this.page.pageSize = JSON.parse(parameter).agentReport.page_size
    }else{
      this.query = { ...initQuery }
    }
  },
  methods: {
    // 排序
    sortTable(key) {
      // console.log(key)
      if(key.key == 'agent_cnt'){
        this.query.field_id = 1
      }
      if(key.key == 'agent_inc_cnt'){
        this.query.field_id = 2
      }
      if(key.key == 'first_deposit_cnt'){
        this.query.field_id = 3
      }
      if(key.key == 'deposit_user_num'){
        this.query.field_id = 4
      }
      if(key.key == 'new_register_deposit_amount'){
        this.query.field_id = 5
      }
      if(key.key == 'new_register_deposit_avg'){
        this.query.field_id = 6
      }
      if(key.key == 'balance_amount'){
        this.query.field_id = 7
      }
      if(key.key == 'deposit_agent_amount'){
        this.query.field_id = 8
      }
      if(key.key == 'withdrawal_agent_amount'){
        this.query.field_id = 9
      }
      if(key.key == 'dw_drop_amount'){
        this.query.field_id = 10
      }
      if(key.key == 'bet_agent_amount'){
        this.query.field_id = 11
      }
      if(key.key == 'prize_agent_amount'){
        this.query.field_id = 12
      }
      if(key.key == 'bs_drop_amount'){
        this.query.field_id = 13
      }
      if(key.key == 'coupon_agent_amount'){
        this.query.field_id = 14
      }
      if(key.key == 'return_agent_amount'){
        this.query.field_id = 15
      }
      if(key.key == 'promotion_agent_winnings'){
        this.query.field_id = 16
      }
      if(key.key == 'turn_card_agent_winnings'){
        this.query.field_id = 17
      }
      if(key.key == 'back_agent_amount'){
        this.query.field_id = 18
      }
      if(key.key == 'award'){
        this.query.field_id = 19
      }
      this.query.sort_way = key.order
      this.getData()
    },
    // 切换条数
    changePageSize(pageSize) {
      this.page.pageSize = pageSize
      this.getData()
    },
    reset() {
      this.query = { ...initQuery }
      this.stack = []
      this.dataSource = []
      this.getData()
    },
    // 重新查询
    resetGetData() {
      // 重置参数查询
      this.query.agent_id = ''
      this.stack = []
      this.dataSource = []
      this.getData()
    },
    async getData(i = 1) {
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
        url: '/report/user/agent',
        method: 'GET',
        params: req
      })
      this.loading.page = false
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
      parameter.agentReport = {
        user_name: this.query.user_name, // 用户名
        agent_id: this.query.agent_id,
        date_start: req.date_start,
        date_end: req.date_end,
        sort_way: this.query.sort_way,
        field_id: this.query.field_id,
        proportion_status: this.query.proportion_status,
        page: this.page.currentPage,
        page_size: this.page.pageSize
      }
      sessionStorage.setItem('parameter', JSON.stringify(parameter))
      this.page.total = res.attributes ? res.attributes.total : 0
      this.dataSource = res.data || []
      this.statistics = { ...res.attributes }
    },
    // 获取报表全部数据
    async reportData() {
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
        url: `/report/user/agent/export`,
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
      // try {
      //   // if (!this.query.timeArr[0]) {
      //   //   return this.$msg({
      //   //     type: 'error',
      //   //     message: this.i18n_lang.agentReport7
      //   //   })
      //   // }

      //   const req = {
      //     ...this.query
      //   }
      //   // 处理时间
      //   if (req.timeArr[0] !== '') {
      //     req.date_start = formatDateToString(new Date(req.timeArr[0]))
      //     req.date_end = formatDateToString(new Date(req.timeArr[1]))
      //   }
      //   delete req.timeArr

      //   console.log(req)
      //   var oReq = new XMLHttpRequest()
      //   oReq.open(
      //     'GET',
      //     `${config.baseUrl}/report/user/agent/export?date_start=${req.date_start}&date_end=${req.date_end}&user_name=${req.user_name}&agent_id=${req.agent_id}`,
      //     true
      //   )
      //   oReq.responseType = 'blob'
      //   oReq.setRequestHeader('Authorization', `Bearer ${getToken()}`)
      //   oReq.onload = oEvent => {
      //     if (oReq.status === 401) {
      //       this.$msg({
      //         type: 'error',
      //         message: this.i18n_lang.agentReport8
      //       })
      //       return
      //     }
      //     const content = oReq.response
      //     const elink = document.createElement('a')
      //     elink.download = `userAgentReport.xls` // 保存的文件名
      //     elink.style.display = 'none'

      //     const blob = new Blob([content])
      //     elink.href = URL.createObjectURL(blob)

      //     document.body.appendChild(elink)
      //     elink.click()

      //     document.body.removeChild(elink)
      //   }
      //   oReq.send()
      // } catch (err) {
      //   console.log(err)
      // }
    },
    // 查询下级
    handleSearchAgent(row) {
      this.page.currentPage = 1
      this.stack.push(this.query.agent_id)
      this.query.agent_id = row.user_id
      this.query.user_name = ''
      this.getData()
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
      //     message: this.i18n_lang.agentReport9
      //   })
      // }
    },
    // 返回上级
    goBack() {
      if (this.stack.length) {
        const agent_id = this.stack.pop()
        this.query.agent_id = agent_id
        this.getData()
      }
    },
    // 占成
    proportionValueFn(text){
      if(!text || !JSON.parse(text)) return
      let arrar = []
      for(let key in JSON.parse(text)){
        let obj = {
          type: key,
          text: JSON.parse(text)[key]
        }
        arrar.push(obj)
      }
      this.getGameMenu(arrar)
    },
    // 获取游戏渠道
    async getGameMenu(arrar) {
      const res = await this.$axios.request({
        url: '/game/menu',
        method: 'GET'
      })
      if (res.status !== 200) {
        this.$Message.error(res.message)
        return
      }
      if(res.data && res.data.length){
        this.gameArrar = []
        if(arrar){
          res.data.forEach((item, index) => {
            arrar.forEach((items, indexs) => {
              if(item.type == items.type){
                let obj = {
                  name: item.name,
                  rename: item.rename,
                  type: item.type,
                  text: items.text
                }
                this.gameArrar.push(obj)
              }
            })
          })
          this.visible.accounted = true
        }
      }
    },
  }
}
</script>
<style lang="less" scoped>
#AgentReport {
  .desc {
    font-size: 14px;
    margin: 10px 0;
    color: #333;
    font-weight: bold;
  }
}
</style>
