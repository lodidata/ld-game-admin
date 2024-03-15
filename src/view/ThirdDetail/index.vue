<template>
  <div id="ThirdDetail">
    <Spin v-if="loading.page" size="large" fix></Spin>
    <Button style="margin-bottom:20px" @click="$router.push('/cash/thirdPayment?back')">{{i18n_lang.thirdDetail0}}</Button>
    <Card dis-hover class="query_box">
      <div class="query_con">
        <div class="item" style="margin-left:0px;">
          <span>{{i18n_lang.thirdDetail1}}</span>
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
      </div>
      <div class="query_btns">
        <Button type="primary" icon="ios-search" @click="getData()">{{i18n_lang.thirdDetail2}}</Button>
        <Button type="primary" icon="md-refresh" @click="reset">{{i18n_lang.thirdDetail3}}</Button>
      </div>
    </Card>
    <!-- table -->
    <div style="marginTop:10px">
      <span>{{ $route.params.name }}{{i18n_lang.thirdDetail4}}</span>
      <MyTable :columns="columns" :data="dataSource" border></MyTable>
      <Page
        class="page_box"
        :current="page.currentPage"
        :page-size="page.pageSize"
        :page-size-opts="page.pageSizes"
        :total="page.total"
        show-sizer
        @on-change="getData"
        @on-page-size-change="changePageSize"
      ></Page>
    </div>
  </div>
</template>
<script>
import lotteryDateOption from '@/libs/lotteryDateOption'
import columns from './columns'
import MyTable from '_c/MyTable'

const initQuery = {
  timeArr: ['', ''], // 时间
  start_time: '', // 开始时间
  end_time: '' // 结束时间
}
const initTotal = {
  lastTime: '',
  moneyStop: 0,
  totalMoney: 0,
  total: 0
}

export default {
  components: {
    MyTable
  },
  data() {
    const i18n_lang = this.$t('thirdDetail');
    return {
      i18n_lang: i18n_lang,
      loading: {
        page: false
      },
      query: { ...initQuery },
      dataSource: [],
      dateOpt: lotteryDateOption, // 时间数据,
      page: {
        pageSize: 20,
        total: 0,
        currentPage: 1,
        pageSizes: [20, 100, 1000, 2000]
      },
      columns: columns(this),
      name: '',
      totalInfo: { ...initTotal },
      id: ''
    }
  },
  created() {
    this.id = this.$route.params.id
    this.getData()
  },
  methods: {
    // 设置每页条数
    changePageSize(pageSize) {
      this.page.pageSize = pageSize
      this.getData()
    },
    // 获取数据
    async getData(i = 1) {
      this.loading.page = true
      this.page.currentPage = i
      this.dataSource = []

      const req = {
        page: this.page.currentPage,
        page_size: this.page.pageSize,
        ...this.query
      }

      // 处理时间
      if (req.timeArr[0] !== '') {
        req.start_time = this.$dateFormat(new Date(req.timeArr[0]))
        req.end_time = this.$dateFormat(new Date(req.timeArr[1]))
      }

      delete req.timeArr

      const res = await this.$axios.request({
        url: `/cash/deposit/status/${this.id}`,
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
      this.totalInfo = res.attributes
      this.dataSource = res.data
    },
    reset() {
      this.query = Object.assign({}, initQuery)
      this.getData()
    }
  }
}
</script>
