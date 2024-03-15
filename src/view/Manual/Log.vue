<template>
  <div id="Log">
    <Spin v-if="loading.page" fix></Spin>
    <!-- query -->
    <Card dis-hover class="query_box">
      <div class="query_con">
        <div class="item">
          <span>{{i18n_lang.manual79}}</span>
          <Input v-model="query.username" placeholder style="width: 100px" />
        </div>
        <div class="item">
          <span>{{i18n_lang.manual80}}</span>
          <Select v-model="query.type" style="width:100px">
            <Option value>{{i18n_lang.manual81}}</Option>
            <Option v-for="(it,i) in typeList" :key="i" :value="it.id">{{ it.name }}</Option>
          </Select>
        </div>
        <div class="item">
          <span>{{i18n_lang.manual82}}</span>
          <DatePicker
            v-model="query.timeArr"
            type="daterange"
            :options="dateOpt"
            :editable="false"
            placement="bottom-end"
            placeholder
            style="width: 200px"
          ></DatePicker>
        </div>
      </div>
      <div class="query_btns">
        <Button type="primary" icon="ios-search" style="margin-right: 5px" @click="getData()">{{i18n_lang.manual83}}</Button>
        <Button type="primary" icon="md-refresh" @click="reset">{{i18n_lang.manual84}}</Button>
        <Button type="primary" icon="md-download" @click="exportData" v-if="allRoutes.indexOf('326') > -1">{{i18n_lang.manual96}}</Button>
      </div>
    </Card>
    <!-- <div class="total">{{`${i18n_lang.manual118_v_1_2_4_6}:`}}{{ total_money != '--' ? total_money / 100 : total_money }}</div> -->
    <div class="total">{{`${i18n_lang.manual118_v_1_2_4_6}:`}}{{ total_money != '--' ? total_money : total_money }}</div>
    <Table style="margin-top:10px" border :columns="columns" :data="dataSource"></Table>
    <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{ `${i18n_lang.manual105}${page.total}${i18n_lang.manual106}` }}</div>
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
import columns from './columns/log'
import lotteryDateOption from '@/libs/lotteryDateOption'
import MyPage from '../../components/MyPage'
import { computeDay } from '@/libs/handleDate'

const initQuery = {
  username: '', // 用户名
  time_begin: '', // 起始时间
  time_end: '', // 结束时间
  timeArr: [computeDay(), computeDay()], // 时间数组
  type: '' // 调整类型
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
    const i18n_lang = this.$t('manual');
    return {
      i18n_lang: i18n_lang,
      columns: columns(this),
      loading: {
        page: 0
      },
      typeList: [],
      dateOpt: lotteryDateOption,
      query: { ...initQuery },
      dataSource: [],
      total_money: '',
      page: {
        pageSize: 20,
        total: 0,
        currentPage: 1
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getTypes()
    },
    // 获取调整类型
    async getTypes() {
      this.loading.page++
      const res = await this.$axios.request({
        url: `/cash/manual/record/type`,
        method: 'GET'
      })
      this.loading.page--
      if (res.status !== 200) {
        this.$Message.error(res.message)
      } else {
        this.typeList = res.data
      }
    },
    // 切换条数
    changePageSize(pageSize) {
      let parameter = sessionStorage.getItem('parameter') || '{}'
      if(JSON.parse(parameter).manualLog){
        this.query = {
          username: JSON.parse(parameter).manualLog.username ? JSON.parse(parameter).manualLog.username : '', // 用户名
          time_begin: JSON.parse(parameter).manualLog.time_begin ? JSON.parse(parameter).manualLog.time_begin : '', // 起始时间
          time_end: JSON.parse(parameter).manualLog.time_end ? JSON.parse(parameter).manualLog.time_end : '', // 结束时间
          timeArr: JSON.parse(parameter).manualLog.timeArr ? JSON.parse(parameter).manualLog.timeArr : [computeDay(), computeDay()], // 时间数组
          type: JSON.parse(parameter).manualLog.type ? JSON.parse(parameter).manualLog.type : '' // 调整类型
        }
        this.page.pageSize = pageSize
        this.getData(JSON.parse(parameter).manualLog.page)
      }else{
        this.page.pageSize = pageSize
        this.getData()
      }
    },
    async getData(index) {
      this.loading.page++
      this.page.currentPage = index || 1
      this.dataSource = []
      const req = {
        page: this.page.currentPage,
        page_size: this.page.pageSize,
        ...this.query
      }
      // 处理时间
      if (req.timeArr[0] !== '') {
        req.time_begin = this.$dateFormat(req.timeArr[0])
        req.time_end = this.$dateFormat(req.timeArr[1])
      }
      delete req.timeArr
      const res = await this.$axios.request({
        url: `/cash/manual/records`,
        method: 'GET',
        params: req
      })
      this.loading.page--
      if (res.status !== 200) {
        this.$Message.error(res.message)
      } else {
        this.query.timeArr = [req.time_begin, req.time_end]
        let parameterPage = sessionStorage.getItem('parameter') || "{}"
        let parameter = JSON.parse(parameterPage)
        parameter.manualLog = {
          ...this.query,
          page: this.page.currentPage,
          page_size: this.page.pageSize,
        }
        sessionStorage.setItem('parameter', JSON.stringify(parameter))
        this.page.total = res.attributes ? res.attributes.total : 0
        this.total_money = (res.attributes && res.attributes.total_money) || res.attributes.total_money == 0 ? res.attributes.total_money : `--`
        this.dataSource = res.data
      }
    },
    reset() {
      this.query = Object.assign({}, initQuery)
      this.getData()
    },
    // 查看用户详情
    handleUserDetail(row) {
      this.$store.dispatch('detail/info', { username: row.username, id: row.user_id })
    },
    async exportData(){
      const req = {
        ...this.query
      }
      // 处理时间
      if (req.timeArr[0] !== '') {
        req.time_begin = this.$dateFormat(req.timeArr[0])
        req.time_end = this.$dateFormat(req.timeArr[1])
      }
      delete req.timeArr
      const res = await this.$axios.request({
        url: '/cash/manual/records/export',
        method: 'GET',
        responseType: 'blob',
        params: req
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
  }
}
</script>
<style lang="less" scoped>
  .total{
    font-size: 16px;
    text-align: right;
    color: #e1792f;
    margin-bottom: 10px;
  }
</style>
