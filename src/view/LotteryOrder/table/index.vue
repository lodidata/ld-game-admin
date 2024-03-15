<template>
  <div>
    <Spin v-if="loading.page" size="large" fix></Spin>
    <Card dis-hover class="query_box">
      <div class="query_con">
        <div class="item">
          <span>{{i18n_lang.lotteryOrder28}}</span>
          <Input v-model="query.user_name" :placeholder="i18n_lang.lotteryOrder29" style="width: 100px" />
        </div>
        <div class="item">
          <span>{{i18n_lang.lotteryOrder30}}</span>
          <Input v-model="query.order_number" :placeholder="i18n_lang.lotteryOrder31" style="width: 100px" />
        </div>
        <div class="item">
          <span>{{i18n_lang.lotteryOrder32}}</span>
          <Input v-model="query.lottery_number" :placeholder="i18n_lang.lotteryOrder33" style="width: 100px" />
        </div>
        <div class="item">
          <span>{{i18n_lang.lotteryOrder34}}</span>
          <Select v-model="query.key" style="width:100px">
            <Option v-for="(game, i) in gameList" :key="i" :value="game.key">{{ game.name }}</Option>
          </Select>
          <!-- <Select v-model="query.lottery_id" placeholder style="width:200px">
            <Option key="" value="">{{i18n_lang.lotteryOrder35}}</Option>
            <OptionGroup v-for="(it,i) in lotteryList" :key="i" :label="it.name">
              <Option v-for="(is,j) in it.children" :key="j" :value="is.id">{{ is.name }}</Option>
            </OptionGroup>
          </Select> -->
        </div>
        <!-- <div class="item">
          <span>{{i18n_lang.lotteryOrder36}}</span>
          <Select v-model="query.hall_level" style="width:100px">
            <Option value="all">{{i18n_lang.lotteryOrder37}}</Option>
            <Option value="1">{{i18n_lang.lotteryOrder38}}</Option>
            <Option value="5">{{i18n_lang.lotteryOrder39}}</Option>
            <Option value="6">直播模式</Option>
          </Select>
        </div>
        <div class="item">
          <span>{{i18n_lang.lotteryOrder40}}</span>
          <Select v-model="query.state" style="width:100px">
            <Option value="all">{{i18n_lang.lotteryOrder41}}</Option>
            <Option value="noopen">{{i18n_lang.lotteryOrder42}}</Option>
            <Option value="open">{{i18n_lang.lotteryOrder43}}</Option>
            <Option value="canceled">{{i18n_lang.lotteryOrder44}}</Option>
          </Select>
        </div> -->
        <div class="item">
          <span>{{i18n_lang.lotteryOrder45}}</span>
          <Select v-model="query.order_origin" placeholder style="width:100px">
            <Option value>{{i18n_lang.lotteryOrder46}}</Option>
            <Option value="1">PC</Option>
            <Option value="2">H5</Option>
            <!-- <Option value="3">APP</Option> -->
          </Select>
        </div>
        <div class="item">
          <span>{{i18n_lang.lotteryOrder47}}</span>
          <!-- <DatePicker
            v-model="query.timeArr"
            type="daterange"
            :options="dateOpt"
            :editable="false"
            placement="bottom-start"
            placeholder
            style="width: 200px"
          ></DatePicker> -->
          <DatePicker v-model="query.start_time" type="datetime" placeholder style="width: 180px" :options="dateOpt" :editable="false"></DatePicker>
          <span>-</span>
          <DatePicker v-model="query.end_time" type="datetime" placeholder style="width: 180px" :options="dateOpt" :editable="false"></DatePicker>
        </div>
      </div>
      <div class="query_btns">
        <Button type="primary" icon="ios-search" style="margin-right: 5px;" @click="getData()">{{i18n_lang.lotteryOrder48}}</Button>
        <Button type="primary" icon="md-refresh" @click="reset">{{i18n_lang.lotteryOrder49}}</Button>
      </div>
    </Card>

    <!-- <MyTable :columns="columns" :data="tableData" @on-sort-change="sortTable" border style="margin-top: 20px"></MyTable> -->
    <Table ref="table" border :columns="columns" :data="tableData" @on-sort-change="sortTable" style="margin-top: 20px"></Table>
    <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{ `${i18n_lang.lotteryOrder103}${page.total}${i18n_lang.lotteryOrder104}` }}</div>
    <Page
      class="page_box"
      show-sizer
      split-panels
      :current="page.currentPage"
      :page-size="page.pageSize"
      :page-size-opts="page.pageSizes"
      :total="page.total"
      @on-change="getData"
      @on-page-size-change="changePageSize"
    ></Page>

    <!-- 订单详情 -->
    <Modal v-model="visible" :title="i18n_lang.lotteryOrder105_lottery" @on-visible-change="handleCloseModal">
      <Spin v-if="loading.modal" size="large" fix></Spin>
      <div v-for="(item, i) in orderInfo" :key="i" class="order-info">
        <span class="item-key" v-html="renderKey(item.key)"></span>
        <span v-if="item.value">{{ item.value }}</span>
        <div v-else>
          <img v-for="(li, j) in item.list" :key="j" :src="li.img" alt>
        </div>
      </div>
      <div slot="footer">
        <Button type="primary" @click="visible = false">{{i18n_lang.lotteryOrder107_lottery}}</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import MyTable from '_c/MyTable'
import columns from '../columns'
import { formatDateToString } from '@/libs/date'
import lotteryDateOption from '@/libs/lotteryDateOption'
import { computeDay } from '@/libs/handleDate'
import { MathDiv } from '@/libs/formatMath'

// 选择当日结束时间
const dayTime = (24 * 60 * 60 - 1) * 1000
// 今日凌晨
const todayStart = new Date(new Date().setHours(0, 0, 0, 0))
// 今日结束
const todayEnd = new Date(todayStart.getTime() + dayTime)

const initQuery = {
  user_name: '', // 用户名
  order_number: '', // 注单号
  lottery_number: '', // 期号
  lottery_id: '', // 彩票名称
  hall_level: 'all', // 模式
  state: 'all', // 注单状态
  order_origin: '', // 来源
  timeArr: [computeDay(), computeDay()], // 时间
  start_time:  `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 00:00:00`, // 开始时间
  end_time: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 23:59:59`, // 结束时间
  key: '' // 筛选子id
}

export default {
  name: 'QiPai',
  components: {
    MyTable
  },
  props: ['type'],
  data() {
    const i18n_lang = this.$t('lotteryOrder');
    return {
      i18n_lang: i18n_lang,
      page: {
        pageSize: 20,
        total: 0,
        currentPage: 1,
        pageSizes: [20, 100, 1000, 2000]
      },
      visible: false,
      // dateOpt: lotteryDateOption,
      dateOpt: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now() - 4320000000
        }
      },
      startDateOpt: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now() - 4320000000
        }
      },
      endDateOpt: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now() - 4320000000
        }
      },
      loading: {
        page: false,
        modal: false
      },
      query: {
        ...initQuery
      },
      dataSource: [],
      columns: columns(this),
      kind_id: '', // 筛选id
      gameList: [], // 游戏类型
      orderInfo: [],
      statistics: {} // 注单总计
    }
  },
  computed: {
    // 表格数据
    tableData() {
      if (this.dataSource.length) {
        // return [...this.dataSource, this.pageTotal, this.statistics]
        return this.dataSource
      } else {
        return this.dataSource
      }
    },
    // 小计
    pageTotal() {
      const total = {
        pay_money: 0,
        CellScore: 0,
        Profit: 0,
        Revenue: 0
      }
      const hash = []
      this.dataSource.forEach(item => {
        if (!hash.includes(item.user_name)) {
          hash.push(item.user_name)
        }
        total.pay_money += +item.pay_money
        total.CellScore += +item.CellScore
        total.Profit += +item.Profit
        total.Revenue += +item.Revenue
      })
      Object.keys(total).forEach(k => {
        total[k] = total[k].toFixed(2)
      })
      total.TableID = `${this.i18n_lang.lotteryOrder107_lottery}${hash.length}${this.i18n_lang.lotteryOrder108_lottery}`
      return total
    }
  },
  async created() {
    this.init()
  },
  methods: {
    ...mapActions({
      getUserDetail: 'detail/info'
    }),
    selectStartTime(val){
      if(this.type == 'JILI'){
        const getDay = new Date(val).getDay()
        const getTime = new Date(val).getTime()
        this.endDateOpt = {
          disabledDate: date => {
            return date.valueOf() < getTime || date.valueOf() >  getTime + (6 * 86400000)
          }
        }
        // this.query.end_time = `${new Date(getTime + (6 * 86400000)).getFullYear()}-${new Date(getTime + (6 * 86400000)).getMonth() + 1}-${new Date(getTime + (6 * 86400000)).getDate()} 23:59:59`
        // this.query.end_time = `${new Date(getTime).getFullYear()}-${new Date(getTime).getMonth() + 1}-${new Date(getTime).getDate()} 23:59:59`
      }else{
        this.endDateOpt = {
          disabledDate(date) {
            return date && date.valueOf() < Date.now() - 4320000000
          }
        }
      }
    },
    selectEndTime(val){
      if(this.type == 'JILI'){
        const getDay = new Date(val).getDay()
        const getTime = new Date(val).getTime()
        this.startDateOpt = {
          disabledDate: date => {
            return date.valueOf() < getTime - (6 * 86400000) || date.valueOf() >  getTime
          }
        }
        // this.query.start_time = `${new Date(getTime - (6 * 86400000)).getFullYear()}-${new Date(getTime - (6 * 86400000)).getMonth() + 1}-${new Date(getTime - (6 * 86400000)).getDate()} 00:00:00`
        // this.query.start_time = `${new Date(getTime).getFullYear()}-${new Date(getTime).getMonth() + 1}-${new Date(getTime).getDate()} 00:00:00`
      }else{
        this.startDateOpt = {
          disabledDate(date) {
            return date && date.valueOf() < Date.now() - 4320000000
          }
        }
      }
    },
    // 排序
    sortTable(key) {
      this.query.orderby = key.key
      this.query.orderbyasc = key.order
      this.getData()
    },
    // 设置每页条数
    changePageSize(pageSize) {
      this.page.pageSize = pageSize
      this.getData()
    },
    init() {
      this.getGameType()
      let parameter = sessionStorage.getItem('parameter') || '{}'
      if(JSON.parse(parameter).LotteryOrder){
        this.query = {
          user_name: JSON.parse(parameter).LotteryOrder.user_name ? JSON.parse(parameter).LotteryOrder.user_name : '', // 用户名
          order_number: JSON.parse(parameter).LotteryOrder.order_number ? JSON.parse(parameter).LotteryOrder.order_number : '', // 注单号
          lottery_number: JSON.parse(parameter).LotteryOrder.lottery_number ? JSON.parse(parameter).LotteryOrder.lottery_number : '', // 期号
          lottery_id: JSON.parse(parameter).LotteryOrder.lottery_id ? JSON.parse(parameter).LotteryOrder.lottery_id : '', // 彩票名称
          hall_level: JSON.parse(parameter).LotteryOrder.hall_level ? JSON.parse(parameter).LotteryOrder.hall_level : 'all', // 模式
          state: JSON.parse(parameter).LotteryOrder.state ? JSON.parse(parameter).LotteryOrder.state : 'all', // 注单状态
          order_origin: JSON.parse(parameter).LotteryOrder.order_origin ? JSON.parse(parameter).LotteryOrder.order_origin : '', // 来源
          timeArr: JSON.parse(parameter).LotteryOrder.timeArr ? JSON.parse(parameter).LotteryOrder.timeArr : [computeDay(), computeDay()], // 时间
          start_time:  JSON.parse(parameter).LotteryOrder.start_time ? JSON.parse(parameter).LotteryOrder.start_time : `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 00:00:00`, // 开始时间
          end_time: JSON.parse(parameter).LotteryOrder.end_time ? JSON.parse(parameter).LotteryOrder.end_time : `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 23:59:59`, // 结束时间
          key: JSON.parse(parameter).LotteryOrder.key ? JSON.parse(parameter).LotteryOrder.key : '' // 筛选子id
        }
        this.getData(JSON.parse(parameter).LotteryOrder.page)
      }else{
        this.getData()
      }
    },
    async getData(i = 1) {
      this.page.currentPage = i
      this.loading.page = true
      const req = {
        page: this.page.currentPage,
        page_size: this.page.pageSize,
        type_name: this.type,
        ...this.query
      }

      // 处理游戏类型
      if (req.key) {
        req.category = this.kind_id
      }
      // 处理时间
      // if (req.timeArr[0] && req.timeArr[1]) {
      //   req.start_time = formatDateToString(new Date(req.timeArr[0]))
      //   req.end_time = formatDateToString(new Date(req.timeArr[1]))
      // }
      req.start_time = req.start_time ? this.$dateTimeFormat(new Date(req.start_time)) : ''
      req.end_time = req.end_time ? this.$dateTimeFormat(new Date(req.end_time)) : ''
      delete req.timeArr
      const res = await this.$axios.request({
        url: '/order/third',
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
      this.query.start_time = req.start_time
      this.query.end_time = req.end_time
      this.query.timeArr = [req.start_time, req.end_time]
      let parameterPage = sessionStorage.getItem('parameter') || "{}"
      let parameter = JSON.parse(parameterPage)
      parameter.LotteryOrder = {
        ...this.query,
        type_name: this.type,
        page: this.page.currentPage,
        page_size: this.page.pageSize
      }
      sessionStorage.setItem('parameter', JSON.stringify(parameter))
      this.dataSource = res.data ? res.data : []
      if (res.attributes) {
        this.page.total = res.attributes.total
        this.statistics = {
          TableID: `${this.i18n_lang.lotteryOrder109_lottery}${res.attributes.total_user_count}${this.i18n_lang.lotteryOrder108_lottery}`,
          pay_money: res.attributes.total_all_bet,
          CellScore: res.attributes.total_cell_score,
          Profit: res.attributes.total_send_prize
        }
      }
      // console.log(`this.dataSource`, this.dataSource)
    },
    // 筛选列表
    async getGameType() {
      this.loading.page = true
      const res = await this.$axios.request({
        url: '/order/third/filter',
        method: 'GET',
        params: {
          type_name: this.type
        }
      })
      this.loading.page = false
      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      if (res.data && res.data[0]) {
        this.gameList = res.data[0].list
        this.kind_id = res.data[0].category
      }
    },
    reset() {
      this.query = { ...initQuery }
      this.query.type = this.type
      this.getData()
    },
    // 注单详情
    async getOrderInfo(row) {
      this.visible = true
      this.loading.modal = true
      const res = await this.$axios.request({
        url: '/order/third/info',
        method: 'GET',
        params: {
          type_name: this.type,
          order_number: row.order_number
        }
      })
      this.loading.modal = false
      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      this.orderInfo = res.data.detail
    },
    // 处理key #号标红
    renderKey(str) {
      str = str.replace(/#([^#]*)#/g, '<span style="color: red;">$1</span>')
      str = str.replace(/#/g, '')
      return str
    },
    // 关闭弹窗
    handleCloseModal(visible) {
      if (!visible) {
        this.orderInfo = []
      }
    },
    // 查看用户详情
    handleUserDetail(row) {
      this.getUserDetail({ username: row.user_name, id: row.user_id })
    }
  }
}
</script>
<style lang="less" scoped>
@import './index.less';
</style>
