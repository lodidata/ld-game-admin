<template>
  <div id="OutInReportDetail">
    <Spin v-if="loading.page" fix size="large"></Spin>
    <!-- 主表 -->
    <div v-if="!visible">
      <Button @click="goBack()">{{i18n_lang.outInReportDetail0}}</Button>
      <span>{{ query.name }}</span>
      <Table
        style="margin-top:10px"
        border
        :columns="columns.thirdColumns"
        :data="thirdDataSource"
      ></Table>
    </div>

    <!-- 副表 -->
    <div v-else>
      <Button @click="visible = false">{{i18n_lang.outInReportDetail0}}</Button>
      <span>{{ query.name }}</span>
      <Table
        style="margin-top:10px"
        border
        :columns="columns.moneyColumns"
        :data="detailDataSource"
      ></Table>
      <Page
        class="page_box"
        :current="page.currentPage"
        :page-size="page.pageSize"
        :total="page.total"
        @on-change="getDetail"
      ></Page>
    </div>
  </div>
</template>
<script>
import { thirdColumns, moneyColumns } from './columns'

export default {
  data() {
    const i18n_lang = this.$t('outInReportDetail');
    return {
      i18n_lang: i18n_lang,
      columns: {
        thirdColumns: thirdColumns(this),
        moneyColumns: moneyColumns(this)
      },
      loading: {
        page: false
      },
      visible: false,
      query: {
        name: this.$route.query.username,
        start_time: this.$route.query.startTime,
        end_time: this.$route.query.endTime,
        thirdparty_id: ''
      },
      thirdDataSource: [],
      detailDataSource: [],
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
    // 获取第三方支付表格数据
    async getData() {
      this.loading.page = true
      const req = {
        start_time: this.query.start_time,
        end_time: this.query.end_time
      }
      const res = await this.$axios.request({
        url: '/cash/channel/statistics',
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
      this.thirdDataSource = res.data
    },

    // 获取第三方下详情表格
    handleDetail(id) {
      this.visible = true
      this.query.thirdparty_id = id
      this.getDetail()
    },

    async getDetail(i = 1) {
      this.page.currentPage = i
      this.loading.page = true

      const req = {
        start_time: this.query.start_time,
        end_time: this.query.end_time,
        thirdparty_id: this.query.thirdparty_id,
        page: this.page.currentPage,
        page_size: this.page.pageSize
      }
      const res = await this.$axios.request({
        url: '/cash/channel/deposit',
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
      this.detailDataSource = res.data
    },
    goBack() {
      if(this.$route.query.source == '2') return this.$router.push('/report/outInReport2')
      this.$router.push('/report/outInReport')
    }
  }
}
</script>
