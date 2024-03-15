<template>
  <div id="MoneyDetail">
    <Spin v-if="loading.page" fix></Spin>
    <Card dis-hover class="query_box">
      <div class="query_con">
        <div class="item">
          <span>{{i18n_lang.moneyDetail0}}</span>
          <Input v-model="query.username" placeholder style="width: 100px" />
        </div>
        <div class="item">
          <span>{{i18n_lang.moneyDetail1}}</span>
          <Input v-model="query.order_number" placeholder style="width: 120px" />
        </div>
        <div class="item">
          <span>{{i18n_lang.moneyDetail2}}</span>
          <DatePicker
            v-model="query.timeArr"
            type="daterange"
            :options="dateOpt"
            :editable="false"
            placement="bottom-end"
            placeholder
            style="width: 200px"
            clearable
            @on-change="selectTime"
          ></DatePicker>
        </div>
        <div class="item">
          <span>{{i18n_lang.moneyDetail3}}</span>
          <Select v-model="query.deal_category" style="width:120px" @on-change="categoryChange">
            <Option value>{{i18n_lang.moneyDetail4}}</Option>
            <Option :value="1">{{i18n_lang.moneyDetail5}}</Option>
            <Option :value="2">{{i18n_lang.moneyDetail6}}</Option>
            <Option :value="3">{{i18n_lang.moneyDetail7}}</Option>
          </Select>
        </div>
        <div v-if="!query.deal_category" class="item">
          <span>{{i18n_lang.moneyDetail8}}</span>
          <Select v-model="query.deal_type" style="width:120px">
            <Option value>{{i18n_lang.moneyDetail9}}</Option>
            <Option v-for="(it,i) in allType" :key="i" :value="it.id">{{ it.name }}</Option>
          </Select>
        </div>
        <div v-if="query.deal_category === 1" class="item">
          <span>{{i18n_lang.moneyDetail8}}</span>
          <Select v-model="query.deal_type" style="width:120px">
            <Option value>{{i18n_lang.moneyDetail9}}</Option>
            <Option v-for="(it,i) in inTypes" :key="i" :value="it.id">{{ it.name }}</Option>
          </Select>
        </div>

        <div v-if="query.deal_category === 2" class="item">
          <span>{{i18n_lang.moneyDetail8}}</span>
          <Select v-model="query.deal_type" style="width:120px">
            <Option value>{{i18n_lang.moneyDetail9}}</Option>
            <Option v-for="(it,i) in outTypes" :key="i" :value="it.id">{{ it.name }}</Option>
          </Select>
        </div>

        <div v-if="query.deal_category === 3" class="item">
          <span>{{i18n_lang.moneyDetail8}}</span>
          <Select v-model="query.deal_type" style="width:120px">
            <Option value>{{i18n_lang.moneyDetail9}}</Option>
            <Option v-for="(it,i) in changeTypes" :key="i" :value="it.id">{{ it.name }}</Option>
          </Select>
        </div>

        <Row></Row>
      </div>
      <div class="query_btns">
        <Button type="primary" icon="ios-search" style="margin-right: 5px;" @click="getData()">{{i18n_lang.moneyDetail13}}</Button>
        <Button type="primary" icon="md-refresh" @click="reset">{{i18n_lang.moneyDetail14}}</Button>
        <Button type="primary" style="margin-left: 5px;" icon="ios-download-outline" @click="exportData" v-if="allRoutes.indexOf('331') > -1">{{i18n_lang.moneyDetail31}}</Button>
      </div>
    </Card>
    <Table style="margin-top:10px" border :columns="columns" :data="dataSource" @on-sort-change="sortTable"></Table>
    <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{ `${i18n_lang.moneyDetail32}${page.total}${i18n_lang.moneyDetail33}` }}</div>
    <!-- <Page class="page_box" :current="page.currentPage" :page-size="page.pageSize" :total="page.total" @on-change="getData"></Page> -->
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
import { mapState, mapActions } from 'vuex'
import columns from './columns'
import lotteryDateOption from '@/libs/lotteryDateOption'
import MyPage from '@/components/MyPage'
import { computeDay } from '@/libs/handleDate'

const initQuery = {
  // user_type: '', // 体系
  order_number: '',
  username: '', // 用户名
  deal_category: '', // 交易类别
  deal_type: '', // 交易类型
  start_time: computeDay(), // 开始时间
  end_time: computeDay(), // 结束时间
  timeArr: [computeDay(), computeDay()],
  field_id: '',
  sort_way: ''
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
    const i18n_lang = this.$t('moneyDetail');
    return {
      i18n_lang: i18n_lang,
      columns: columns(this),
      loading: {
        page: 0
      },
      dateOpt: lotteryDateOption,
      query: { ...initQuery },
      dataSource: [],
      page: {
        pageSize: 20,
        total: 0,
        currentPage: 1
      },
      // 所有交易类型
      allType: [],
      // 交易类型 收入
      inTypes: [],
      // 交易类型 支出
      outTypes: [],
      // 交易类型 额度转换
      changeTypes: []
    }
  },
  created() {
    this.init()
  },
  methods: {
    ...mapActions({
      getUserDetail: 'detail/info'
    }),
    // 排序
    sortTable(key) {
      if(key.key == 'deal_money'){
        this.query.field_id = 1
      }
      if(key.key == 'withdraw_bet'){
        this.query.field_id = 2
      }
      if(key.key == 'balance'){
        this.query.field_id = 3
      }
      if(key.key == 'total_bet'){
        this.query.field_id = 4
      }
      if(key.key == 'total_require_bet'){
        this.query.field_id = 5
      }
      if(key.key == 'free_money'){
        this.query.field_id = 6
      }
      this.query.sort_way = key.order
      this.getData()
    },
    // 类别改变时清掉类型的值
    categoryChange() {
      this.query.deal_type = ''
    },
    init() {
      if (this.$route.query.username) {
        this.query.username = this.$route.query.username
      }
      this.getAllTypes()
    },
    // 获取所有类型
    async getAllTypes() {
      this.loading.page++
      const res = await this.$axios.request({
        url: `/funds/type`,
        method: 'GET'
      })
      this.loading.page--
      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
      } else {
        res.data.map(x => {
          x.children.map(v => {
            // 全部类型
            this.allType.push(v)
          })
          // 1 收入
          if (x.id === 1) {
            this.inTypes = x.children
          }
          // 2 支出
          if (x.id === 2) {
            this.outTypes = x.children
          }
          // 3 额度转换
          if (x.id === 3) {
            this.changeTypes = x.children
          }
        })
      }
    },
    // 选择时间
    selectTime(val) {
      [this.query.start_time, this.query.end_time] = val
    },
    // 切换条数
    changePageSize(pageSize) {
      this.page.pageSize = pageSize
      let parameter = sessionStorage.getItem('parameter') || '{}'
      if(JSON.parse(parameter).MoneyDetail){
        this.query = {
          order_number: JSON.parse(parameter).MoneyDetail.order_number ? JSON.parse(parameter).MoneyDetail.order_number : "",
          username: JSON.parse(parameter).MoneyDetail.username ? JSON.parse(parameter).MoneyDetail.username : "", // 用户名
          deal_category: JSON.parse(parameter).MoneyDetail.deal_category ? JSON.parse(parameter).MoneyDetail.deal_category : "", // 交易类别
          deal_type: JSON.parse(parameter).MoneyDetail.deal_type ? JSON.parse(parameter).MoneyDetail.deal_type : "", // 交易类型
          start_time: JSON.parse(parameter).MoneyDetail.start_time ? JSON.parse(parameter).MoneyDetail.start_time : computeDay(), // 开始时间
          end_time: JSON.parse(parameter).MoneyDetail.end_time ? JSON.parse(parameter).MoneyDetail.end_time : computeDay(), // 结束时间
          timeArr: JSON.parse(parameter).MoneyDetail.timeArr ? JSON.parse(parameter).MoneyDetail.timeArr : [computeDay(), computeDay()],
          field_id: JSON.parse(parameter).MoneyDetail.field_id ? JSON.parse(parameter).MoneyDetail.field_id : "",
          sort_way: JSON.parse(parameter).MoneyDetail.sort_way ? JSON.parse(parameter).MoneyDetail.sort_way : ""
        }
        this.getData(JSON.parse(parameter).MoneyDetail.page)
      }else{
        this.getData()
      }
    },
    async getData(index) {
      this.page.currentPage = index || 1
      this.loading.page++

      const req = {
        page: this.page.currentPage,
        page_size: this.page.pageSize,
        ...this.query
      }
      req.start_time = req.start_time ? this.$dateFormat(req.start_time) : ''
      req.end_time = req.end_time ? this.$dateFormat(req.end_time) : ''
      delete req.timeArr
      const res = await this.$axios.request({
        url: `/funds/flow`,
        method: 'GET',
        params: req
      })

      this.loading.page--

      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          method: 'GET'
        })
        return
      }
      this.query.start_time = req.start_time
      this.query.end_time = req.end_time
      this.query.timeArr = [req.start_time, req.end_time]
      let parameterPage = sessionStorage.getItem('parameter') || "{}"
      let parameter = JSON.parse(parameterPage)
      parameter.MoneyDetail = {
        ...this.query,
        page: this.page.currentPage,
        page_size: this.page.pageSize
      }
      sessionStorage.setItem('parameter', JSON.stringify(parameter))
      this.page.total = res.attributes ? res.attributes.total : 0
      this.dataSource = res.data ? res.data : []
      // console.log(this.dataSource)
    },
    reset() {
      this.query = Object.assign({}, initQuery)
      this.getData()
    },
    // 查看用户详情
    handleUserDetail(row) {
      this.getUserDetail({ username: row.username, id: row.user_id })
    },
    async exportData() {
      const query = {
        ...this.query
      }
      delete query.timeArr
      const res = await this.$axios.request({
        url: '/funds/flow/export',
        method: 'GET',
        responseType: 'blob',
        params: query
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
