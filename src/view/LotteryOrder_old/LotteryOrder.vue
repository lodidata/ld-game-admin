<template>
  <div id="Lottery">
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
        <div v-if="Object.keys(lotteryList).length" class="item">
          <span>{{i18n_lang.lotteryOrder34}}</span>
          <Select v-model="query.lottery_id" placeholder style="width:200px">
            <Option key="" value="">{{i18n_lang.lotteryOrder35}}</Option>
            <OptionGroup v-for="(it,i) in lotteryList" :key="i" :label="it.name">
              <Option v-for="(is,j) in it.children" :key="j" :value="is.id">{{ is.name }}</Option>
            </OptionGroup>
          </Select>
        </div>
        <div class="item">
          <span>{{i18n_lang.lotteryOrder36}}</span>
          <Select v-model="query.hall_level" style="width:100px">
            <Option value="all">{{i18n_lang.lotteryOrder37}}</Option>
            <Option value="1">{{i18n_lang.lotteryOrder38}}</Option>
            <Option value="5">{{i18n_lang.lotteryOrder39}}</Option>
            <!-- <Option value="6">直播模式</Option> -->
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
        </div>
        <div class="item">
          <span>{{i18n_lang.lotteryOrder45}}</span>
          <Select v-model="query.order_origin" placeholder style="width:100px">
            <Option value>{{i18n_lang.lotteryOrder46}}</Option>
            <Option value="1">PC</Option>
            <Option value="2">H5</Option>
            <Option value="3">APP</Option>
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

    <!-- table -->
    <div style="marginTop:10px">
      <MyTable
        v-if="query.hall_level==='all'||query.hall_level==='1'"
        filter
        ikey="lottery"
        :columns="columns"
        :data="dataSource"
        border
      ></MyTable>
      <MyTable v-else filter ikey="lottery2" :columns="lotteryTwo" :data="dataSource" border></MyTable>
      <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{ `${i18n_lang.lotteryOrder103}${page.total}${i18n_lang.lotteryOrder104}` }}</div>
      <MyPage
        class="page_box"
        ikey="lottery"
        :current="page.currentPage"
        :page-size="page.pageSize"
        :total="page.total"
        show-sizer
        @onChange="getData"
        @changePageSize="changePageSize"
      ></MyPage>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import MyTable from '_c/MyTable'
import MyPage from '_c/MyPage'
import columns from './columns/lottery'
import lotteryTwo from './columns/lotteryTwo'
import lotteryDateOption from '@/libs/lotteryDateOption'
import { computeDay } from '@/libs/handleDate'
import { lotteryToTree } from '@/libs/lottery'

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
  end_time: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 23:59:59` // 结束时间
}

export default {
  components: {
    MyTable,
    MyPage
  },
  data() {
    const i18n_lang = this.$t('lotteryOrder');
    return {
      i18n_lang: i18n_lang,
      columns: columns(this),
      lotteryTwo: lotteryTwo(this),
      loading: {
        page: false
      },
      query: {
        ...initQuery
      },
      // dateOpt: lotteryDateOption,
      dateOpt: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now() - 4320000000
        }
      },
      lotteryList: {}, // 彩种列表
      dataSource: [], // data数据
      page: {
        pageSize: 20,
        total: 0,
        currentPage: 1
      },
      f: 1
    }
  },
  created() {
    this.init()
  },
  methods: {
    ...mapActions({
      getUserDetail: 'detail/info'
    }),
    init() {
      if (this.$route.query) {
        this.query.user_name = this.$route.query.username || ''
        this.f = this.$route.query.f ? Number(this.$route.query.f) : Number(this.f)
      }
      this.getLotteryList()
    },
    // 获取彩种列表
    async getLotteryList() {
      this.loading.page = true
      const res = await this.$axios.request({
        url: '/lottery/kinds/all',
        method: 'GET'
      })
      this.loading.page = false
      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      this.lotteryList = { ...lotteryToTree(res.data) }
    },
    // 设置每页条数
    changePageSize(pageSize) {
      this.page.pageSize = pageSize
      this.getData()
    },
    async getData(i = 1) {
      this.page.currentPage = i
      this.loading.page = true
      const req = {
        page: this.page.currentPage,
        page_size: this.page.pageSize,
        ...this.query
      }
      // 处理时间
      // if (req.timeArr[0] !== '') {
      //   // req.start_time = this.$dateFormat(new Date(req.timeArr[0]))
      //   // req.end_time = this.$dateFormat(new Date(req.timeArr[1]))
      //   req.start_time = this.$dateTimeFormat(new Date(req.start_time))
      //   req.end_time = this.$dateTimeFormat(new Date(req.end_time))
      // }
      if(req.start_time && req.end_time){
        req.start_time = this.$dateTimeFormat(new Date(req.start_time))
        req.end_time = this.$dateTimeFormat(new Date(req.end_time))
      }
      delete req.timeArr

      const res = await this.$axios.request({
        url: '/lottery/play/records',
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
      this.page.total = res.attributes ? res.attributes.total : 0
      this.dataSource = res.data
    },
    reset() {
      this.query = { ...initQuery }
      this.getData()
    },
    // 撤单
    async orderCancel(row) {
      this.loading.page = true
      const res = await this.$axios.request({
        url: `/lottery/play/records/stop/${row.id}`,
        method: 'PATCH',
        data: {
          state: 'canceled'
        }
      })
      this.loading.page = false
      this.$msg({
        type: res.status !== 200 ? 'error' : 'success',
        message: res.message
      })
      if (res.status !== 200) return
      this.getData()
    },
    // 查看用户详情
    handleUserDetail(row) {
      this.getUserDetail({ username: row.user_name, id: row.user_id })
    }
  }
}
</script>
<style lang="less" scoped>
#Lottery {
  position: relative;
}
</style>
