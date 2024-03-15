<template>
  <div>
    <Spin v-if="loading.page" size="large" fix></Spin>
    <Card dis-hover class="query_box">
      <div class="query_con">
        <div class="item">
          <span>{{i18n_lang.liveOrder0}}</span>
          <Input v-model="query.user_name" :placeholder="i18n_lang.liveOrder1" style="width: 120px" />
        </div>
        <div class="item">
          <span>{{i18n_lang.liveOrder2}}</span>
          <Input v-model="query.order_number" :placeholder="i18n_lang.liveOrder3" style="width: 200px" />
        </div>
        <div class="item">
          <span>{{i18n_lang.liveOrder4}}</span>
          <Select v-model="query.key" style="width:100px">
            <Option v-for="(game, i) in gameList" :key="i" :value="game.key">{{ game.name }}</Option>
          </Select>
        </div>
        <div class="item">
          <span>{{i18n_lang.liveOrder5}}</span>
          <!-- <DatePicker
            v-model="query.timeArr"
            :options="dateOpt"
            :editable="false"
            type="daterange"
            format="yyyy-MM-dd"
            placement="bottom-start"
            :placeholder="i18n_lang.liveOrder6"
            style="width: 200px"
          ></DatePicker> -->
          <DatePicker v-model="query.start_time" type="datetime" placeholder style="width: 180px" :options="dateOpt" :editable="false"></DatePicker>
          <span>-</span>
          <DatePicker v-model="query.end_time" type="datetime" placeholder style="width: 180px" :options="dateOpt" :editable="false"></DatePicker>
        </div>
      </div>
      <div class="query_btns">
        <Button type="primary" icon="ios-search" style="margin-right: 5px;" @click="getData()">{{i18n_lang.liveOrder7}}</Button>
        <Button type="primary" icon="md-refresh" @click="reset">{{i18n_lang.liveOrder8}}</Button>
      </div>
    </Card>

    <!-- <MyTable :columns="columns" :data="tableData" @on-sort-change="sortTable" border style="margin-top: 20px"></MyTable> -->
    <Table ref="table" border :columns="columns" :data="tableData" @on-sort-change="sortTable" style="margin-top: 20px"></Table>
    <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{ `${i18n_lang.liveOrder27}${page.total}${i18n_lang.liveOrder28}` }}</div>
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
    <Modal v-model="visible" :title="i18n_lang.liveOrder9" @on-visible-change="handleCloseModal">
      <Spin v-if="loading.modal" size="large" fix></Spin>
      <div v-for="(item, i) in orderInfo" :key="i" class="order-info">
        <span class="item-key" v-html="renderKey(item.key)"></span>
        <span v-if="item.value">{{ item.value }}</span>
        <div v-else>
          <img v-for="(li, j) in item.list" :key="j" :src="li.img" alt>
        </div>
      </div>
      <div slot="footer">
        <Button type="primary" @click="visible = false">{{i18n_lang.liveOrder10}}</Button>
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

// 选择当日结束时间
const dayTime = (24 * 60 * 60 - 1) * 1000
// 今日凌晨
const todayStart = new Date(new Date().setHours(0, 0, 0, 0))
// 今日结束
const todayEnd = new Date(todayStart.getTime() + dayTime)

const initQuery = {
  user_name: '', // 会员账号
  order_number: '', // 注单号
  category: '', // 筛选列表
  key: '', // 筛选子id
  timeArr: [formatDateToString(todayStart), formatDateToString(todayEnd)],
  start_time:  `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 00:00:00`, // 开始时间
  end_time: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 23:59:59`, // 结束时间
  orderby: '',
  orderbyasc: ''
}

export default {
  name: 'QiPai',
  components: {
    MyTable
  },
  props: ['type'],
  data() {
    const i18n_lang = this.$t('liveOrder');
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
        return [...this.dataSource, this.pageTotal, this.statistics]
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
      total.TableID = `${this.i18n_lang.liveOrder11}${hash.length}${this.i18n_lang.liveOrder12}`
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
      if(JSON.parse(parameter).LiveOrder){
        this.query = {
          user_name: JSON.parse(parameter).LiveOrder.user_name ? JSON.parse(parameter).LiveOrder.user_name : '', // 会员账号
          order_number: JSON.parse(parameter).LiveOrder.order_number ? JSON.parse(parameter).LiveOrder.order_number : '', // 注单号
          category: JSON.parse(parameter).LiveOrder.category ? JSON.parse(parameter).LiveOrder.category : '', // 筛选列表
          key: JSON.parse(parameter).LiveOrder.key ? JSON.parse(parameter).LiveOrder.key : '', // 筛选子id
          timeArr: JSON.parse(parameter).LiveOrder.timeArr ? JSON.parse(parameter).LiveOrder.timeArr : [formatDateToString(todayStart), formatDateToString(todayEnd)],
          start_time: JSON.parse(parameter).LiveOrder.start_time ? JSON.parse(parameter).LiveOrder.start_time : `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 00:00:00`, // 开始时间
          end_time: JSON.parse(parameter).LiveOrder.end_time ? JSON.parse(parameter).LiveOrder.end_time : `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 23:59:59`, // 结束时间
          orderby: JSON.parse(parameter).LiveOrder.orderby ? JSON.parse(parameter).LiveOrder.orderby : '',
          orderbyasc: JSON.parse(parameter).LiveOrder.orderbyasc ? JSON.parse(parameter).LiveOrder.orderbyasc : ''
        }
        this.getData(JSON.parse(parameter).LiveOrder.page)
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
      parameter.LiveOrder = {
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
          TableID: `${this.i18n_lang.liveOrder13}${res.attributes.total_user_count}${this.i18n_lang.liveOrder12}`,
          pay_money: res.attributes.total_all_bet,
          CellScore: res.attributes.total_cell_score,
          Profit: res.attributes.total_send_prize
        }
      }
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
