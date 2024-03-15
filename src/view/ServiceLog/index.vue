<template>
  <div id="ServiceLog">
    <Spin v-if="loading.page" fix></Spin>
    <div>
      <Card dis-hover class="query_box">
        <div class="query_con">
          <div class="item">
            <span>{{i18n_lang.serviceLog0}}</span>
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
            <span>{{i18n_lang.serviceLog1}}</span>
            <Input v-model="query.operator_name" style="width: 180px" />
          </div>
          <div class="item">
            <span>{{i18n_lang.serviceLog2}}</span>
            <Input v-model="query.account" style="width: 180px" />
          </div>
        </div>
        <div class="query_btns">
          <Button type="primary" @click="getData()">{{i18n_lang.serviceLog3}}</Button>
        </div>
      </Card>
    </div>
    <Table style="margin-top:10px" border :columns="columns" :data="dataSource"></Table>
    <Page
      class="page_box"
      :current="page.currentPage"
      :page-size="page.pageSize"
      :total="page.total"
      show-sizer
      @on-change="getData"
      @on-page-size-change="changePageSize"
    ></Page>
  </div>
</template>
<script>
import columns from './columns'
import { computeDay } from '../../libs/handleDate.js'
import lotteryDateOption from '@/libs/lotteryDateOption'
const initQuery = {
  operator_name: '', // 客服名称
  timeArr: [computeDay(), computeDay()],
  start_time: '',
  end_time: '',
  account: ''
}

export default {
  data() {
    const i18n_lang = this.$t('serviceLog');
    return {
      i18n_lang: i18n_lang,
      columns: columns(this),
      loading: {
        page: false
      },
      dateOpt: lotteryDateOption,
      query: {
        ...initQuery
      },
      dataSource: [],
      page: {
        pageSize: 10,
        total: 0,
        currentPage: 1
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    // 分页
    changePageSize(pageSize) {
      this.page.pageSize = pageSize
      this.getData()
    },
    // 查询数据
    async getData(index) {
      this.page.currentPage = index || 1
      this.loading.page = true
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
        url: `/servicemanage/performance`,
        method: 'GET',
        params: req
      })
      this.loading.page = false

      if (res.status !== 200) {
        this.$Message.error(res.message)
      } else {
        this.page.total = res.attributes ? res.attributes.total : 0
        this.dataSource = res.data
        // console.log(res)
      }
    }
  }
}
</script>
<style lang="less" scoped>
</style>
