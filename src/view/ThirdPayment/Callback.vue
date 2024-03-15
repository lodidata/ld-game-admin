<template>
  <div id="Callback">
    <Spin v-if="loading.page" size="large" fix></Spin>
    <Card dis-hover class="query_box">
      <div class="query_con">
        <div class="item">
          <span>{{i18n_lang.thirdPayment74}}</span>
          <DatePicker v-model="query.start_time" type="datetime" placeholder style="width: 180px" :editable="false"></DatePicker>
          <span>-</span>
          <DatePicker v-model="query.end_time" type="datetime" placeholder style="width: 180px" :editable="false"></DatePicker>
        </div>
        <div class="item">
          <span>{{i18n_lang.thirdPayment2}}</span>
          <Input v-model="query.order_number" placeholder="" style="width: 100px"></Input>
        </div>
        <div class="item">
          <Button type="primary" icon="ios-search" @click="getData()">{{i18n_lang.thirdPayment3}}</Button>
        </div>
      </div>
      <!-- <div class="query_btns">
        <Button type="primary" icon="ios-search" @click="getData()">{{i18n_lang.thirdPayment3}}</Button>
      </div> -->
    </Card>
    <MyTable :columns="columns" :data="dataSource" border></MyTable>
    <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{ `${i18n_lang.thirdPayment72}${page.total}${i18n_lang.thirdPayment73}` }}</div>
    <Page
      class="page_box"
      show-sizer
      :current="page.currentPage"
      :page-size-opts="page.pageSizes"
      :page-size="page.pageSize"
      :total="page.total"
      @on-change="getData"
      @on-page-size-change="changePageSize"
    ></Page>
  </div>
</template>
<script>
import columns from './columns/callBack.js'
import MyTable from '_c/MyTable'
export default {
  components: {
    MyTable
  },
  data() {
    const i18n_lang = this.$t('thirdPayment');
    return {
      i18n_lang: i18n_lang,
      loading: {
        page: false
      },
      query: {
        start_time: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 00:00:00`,
        end_time: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 23:59:59`,
        order_number: ''
      },
      dataSource: [],
      columns: columns(this),
      page: {
        pageSize: 20,
        total: 0,
        currentPage: 1,
        pageSizes: [20, 50, 100, 1000]
      }
    }
  },
  methods: {
    // 翻页
    changePageSize(pageSize) {
      this.page.pageSize = pageSize
      this.getData()
    },
    // 获取数据
    async getData(index = 1) {
      if (this.query.order_number === '') {
        this.$Message.warning(this.i18n_lang.thirdPayment4)
        return
      }
      this.loading.page = true
      this.page.currentPage = index

      const req = {
        start_time: this.$dateTimeFormat(new Date(this.query.start_time)),
        end_time: this.$dateTimeFormat(new Date(this.query.end_time)),
        order_number: this.query.order_number,
        page: this.page.currentPage,
        page_size: this.page.pageSize
      }
      const res = await this.$axios.request({
        url: '/thirdLog',
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
      this.dataSource = res.data
      this.page.total = res.attributes && res.attributes.total ? res.attributes.total : 0
    }
  }
}
</script>
