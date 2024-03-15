<template>
  <div id="Login">
    <Spin v-if="loading.page" size="large" fix></Spin>
    <div class="query_con">
      <div class="item">
        <span>{{i18n_lang.components124}}</span>
        <DatePicker
          v-model="query.timeArr"
          type="daterange"
          placement="bottom-start"
          :placeholder="i18n_lang.components125"
          style="width: 200px"
        ></DatePicker>
      </div>
      <div class="item">
        <Button type="primary" icon="ios-search" @click="getData()">{{i18n_lang.components126}}</Button>
      </div>
    </div>
    <Table border :columns="loginList" :data="dataSource"></Table>
    <!-- <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{ `${i18n_lang.components288}${page.total}${i18n_lang.components289}` }}</div> -->
    <Page
      class="page_box"
      show-sizer
      :current="page.currentPage"
      :page-size="page.pageSize"
      :page-size-opts="page.pageSizes"
      :total="page.total"
      @on-change="getData"
      @on-page-size-change="changePageSize"
    ></Page>
    <Modal v-model="visible.details" :title="`${i18n_lang.components279}`" :width="1200" :footer-hide="true">
      <Table ref="table" border :columns="detailsList" :data="detailsSource"></Table>
      <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{ `${i18n_lang.components288}${detailspPage.total}${i18n_lang.components289}` }}</div>
      <Page
        class="page_box"
        show-sizer
        :current="detailspPage.currentPage"
        :page-size="detailspPage.pageSize"
        :page-size-opts="detailspPage.pageSizes"
        :total="detailspPage.total"
        @on-change="detail"
        @on-page-size-change="changeDetailPageSize"
      ></Page>
    </Modal>
  </div>
</template>
<script>
import { loginList, detailsList } from './columns/login'
import { computeDay } from '@/libs/handleDate'

const initQuery = {
  timeArr: [computeDay(), computeDay()] // 时间
}

export default {
  name: 'Login',
  props: ['id'],
  data() {
    const i18n_lang = this.$t('components');
    return {
      i18n_lang: i18n_lang,
      loading: {
        page: false
      },
      visible: {
        details: false
      },
      query: {
        ...initQuery
      },
      dataSource: [],
      loginList: loginList(this),
      detailsList: detailsList(this),
      page: {
        pageSize: 20,
        total: 0,
        currentPage: 1,
        pageSizes: [20, 100, 1000, 2000]
      },
      detailsSource: [],
      detailspPage: {
        pageSize: 10,
        total: 0,
        currentPage: 1,
        pageSizes: [20, 100, 1000, 2000]
      },
      log_ip: ''
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData(i = 1) {
      this.page.currentPage = i
      this.loading.page = true
      const req = {
        page: this.page.currentPage,
        page_size: this.page.pageSize
      }

      if (this.query.timeArr[0]) {
        req.date_begin = this.$dateFormat(this.query.timeArr[0])
      }
      if (this.query.timeArr[1]) {
        req.end_begin = this.$dateFormat(this.query.timeArr[1])
      }
      const res = await this.$axios.request({
        url: `/user/info/log/${this.id}`,
        method: 'GET',
        params: req
      })
      this.loading.page = false
      if (res.status !== 200 || res.state === 11050 || res.state === 11051) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      this.page.total = res.attributes ? res.attributes.total : 0
      this.dataSource = res.data
    },
    // 设置每页条数
    changePageSize(pageSize) {
      this.page.pageSize = pageSize
      this.getData()
    },
    // 排行榜列表
    handleDetail(row){
      this.log_ip = row.log_ip
      this.detail()
    },
    async detail(i = 1){
      this.detailspPage.currentPage = i
      const res = await this.$axios.request({
        url: '/user/info/log/detail',
        method: 'GET',
        params: {
          page: this.detailspPage.currentPage,
          page_size: this.detailspPage.pageSize,
          log_ip: this.log_ip
        }
      })
      this.loading.page = false
      if (res.status !== 200 || res.state === 11050 || res.state === 11051) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return false
      }
      this.detailspPage.total = res.attributes ? res.attributes.total : 0
      this.detailsSource = res.data
      this.visible.details = true
    },
    // 设置每页条数
    changeDetailPageSize(pageSize) {
      this.detailspPage.pageSize = pageSize
      this.detail()
    },
  }
}
</script>
<style lang="less" scoped>
#Login {
  position: relative;
  min-height: 300px;
  .query_con {
    display: flex;
    margin-bottom: 15px;
    .item {
      margin-right: 20px;
    }
  }
}
</style>
