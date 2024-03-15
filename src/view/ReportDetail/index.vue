<template>
  <div id="reportDetail">
    <Spin v-if="loading.page" size="large" fix></Spin>
    <Button type="primary" style="margin-left: 5px;margin-bottom: 20px;" icon="md-download" @click="exportDataAjax">{{ i18n_lang.reportDetail20 }}</Button><!-- v-if="allRoutes.indexOf('325') > -1"-->
    <div class="table-box">
      <Table class="table" border
        :columns="getColumns(totalTable.name)"
        :data="totalTable.list"
        @on-sort-change="sortTable"
      ></Table>
    </div>
    <div v-for="(item, i) in dataSource" :key="i" class="table-box">
      <Table
        :key="item.name"
        class="table"
        border
        :columns="getColumns(item.name)"
        :data="item.list"
        @on-sort-change="sortTable"
      ></Table>
    </div>
    <Modal v-model="visible" width="70%" :title="i18n_lang.reportDetail0">
       <Spin v-if="loading.modal" size="large" fix></Spin>
       <Table :data="detailData" :columns="columnsList" border></Table>
        <div slot="footer">
          <Page
            class="page_box"
            :current="page.currentPage"
            :page-size="page.pageSize"
            :total="page.total"
            @on-change="getDetailData"
          ></Page>
        </div>
    </Modal>
  </div>
</template>
<script>
import columns from './columns'
import columnsList from './columnsList'
import { changeTwoDecimal_f } from '../../libs/tools'
const keys = [
  'game_order_user',
  'game_order_cnt',
  'game_bet_amount',
  'game_prize_amount',
  'game_code_amount',
  'game_order_profit'
]

const temp = {}
keys.forEach(k => (temp[k] = 0))

export default {
  name: 'ReportDetail',
  data() {
    const i18n_lang = this.$t('reportDetail');
    const initTotal = {
      name: i18n_lang.reportDetail2,
      list: [temp]
    }
    return {
      i18n_lang: i18n_lang,
      visible: false,
      loading: {
        page: false,
        modal: false
      },
      query: {
        game_type: this.$route.query.game_type,
        start_time: this.$route.query.start_time,
        end_time: this.$route.query.end_time,
        field_id: '',
        sort_way: ''
      },
      detailData: [], // 详情数据
      columns: columns(this),
      columnsList: columnsList(this),
      dataSource: [],
      totalTable: { ...initTotal },
      gameType: '',
      page: {
        pageSize: 10,
        total: 0,
        currentPage: 1
      }
    }
  },
  created() {
    this.getTotal()
  },
  methods: {
    // 排序
    sortTable(key) {
      // console.log(key)
      if(key.key == 'game_order_user'){
        this.query.field_id = 1
      }
      if(key.key == 'game_order_cnt'){
        this.query.field_id = 2
      }
      if(key.key == 'game_bet_amount'){
        this.query.field_id = 3
      }
      if(key.key == 'game_prize_amount'){
        this.query.field_id = 4
      }
      if(key.key == 'game_code_amount'){
        this.query.field_id = 5
      }
      if(key.key == 'game_order_profit'){
        this.query.field_id = 6
      }
      this.query.sort_way = key.order
      this.getTotal()
    },
    getColumns(name) {
      const title = `${name} ${this.query.start_time} ${this.i18n_lang.reportDetail1} ${this.query.end_time}`
      return columns(this, title)
    },
    async getTotal() {
      this.loading.page = true
      const res = await this.$axios.request({
        url: '/report/operates',
        method: 'GET',
        params: this.query
      })
      this.loading.page = false
      this.getData()
      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      this.totalTable = {
        name: this.i18n_lang.reportDetail2,
        list: [res.data]
      }
    },
    async getData() {
      this.loading.page = true
      const res = await this.$axios.request({
        url: '/report/operates/detail',
        method: 'GET',
        params: this.query
      })
      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      this.loading.page = false
      // 生成合计
      res.data.forEach(item => {
        const total = {
          game_name: this.i18n_lang.reportDetail3
        }
        keys.forEach(k => (total[k] = 0))
        item.list.forEach(o => {
          keys.forEach(k => {
            total[k] += +o[k]
          })
        })
        console.log(total)
        Object.keys(total).map(x=>{
          //对金额字段做保留两位小数处理
          if(['game_bet_amount','game_code_amount','game_order_profit','game_prize_amount'].indexOf(x) >= 0){
            total[x] = changeTwoDecimal_f(total[x]);
          }
        })
        item.list.push(total)
      })
      this.dataSource = res.data
      // console.log(this.dataSource)
    },
    async getDetailData(index = 1) {
      this.loading.modal = true
      this.visible = true
      this.page.currentPage = index
      const res = await this.$axios.request({
        url: '/report/operates/userDetail',
        method: 'GET',
        params: {
          page: this.page.currentPage,
          size: this.page.pageSize,
          game_type: this.gameType,
          start_date: this.query.start_time,
          end_date: this.query.end_time
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
      // console.log(res)
      this.detailData = res.data || []
      this.page.total = res.attributes && res.attributes.total ? res.attributes.total : 0
    },
    // 详情
    handleDetail(row) {
      this.gameType = row.game_type
      this.getDetailData()
    },
    async exportDataAjax(){
      const query = {
        ...this.query
      }
      const res = await this.$axios.request({
        url: '/report/operates/detail/export',
        method: 'GET',
        responseType: 'blob',
        params: {
          ...query
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

<style lang="less" scope>
@import './index.less';
</style>
