<template>
  <div id="Record">
    <Spin v-if="loading" size="large" fix></Spin>
    <Card dis-hover class="query_box">
      <div class="query_con">
        <div class="item">
          <span>{{i18n_lang.memberManage55}}</span>
          <Input
            v-model="searchInfo.user_name"
            :placeholder="i18n_lang.memberManage56"
            clearable
            style="width: 150px"
          ></Input>
        </div>
        <div class="item">
          <span>{{i18n_lang.memberManage57}}</span>
          <Input
            v-model="searchInfo.admin_user"
            :placeholder="i18n_lang.memberManage58"
            clearable
            style="width: 150px"
          ></Input>
        </div>
        <div class="item">
          <span>{{i18n_lang.memberManage59}}</span>
          <DatePicker
            v-model="reginTime"
            type="daterange"
            :placeholder="i18n_lang.memberManage60"
            style="width: 200px"
            clearable
            @on-change="selectDate"
          ></DatePicker>
        </div>
        <div class="item">
          <Button type="primary" icon="ios-search" @click="search">{{i18n_lang.memberManage61}}</Button>
        </div>
      </div>
    </Card>
    <Table border :columns="columnsRecord" :data="dataSource"></Table>
    <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{ `${i18n_lang.memberManage116}${page.total}${i18n_lang.memberManage117}` }}</div>
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
import { mapActions } from 'vuex'
import columnsRecord from './columnsRecord'
const searchInfo = {
  user_name: '',
  admin_user: '',
  created_from: '',
  created_to: ''
}
export default {
  data() {
    const i18n_lang = this.$t('memberManage');
    return {
      i18n_lang: i18n_lang,
      loading: false,
      reginTime: [],
      searchInfo: { ...searchInfo },
      columnsRecord: columnsRecord(this),
      dataSource: [],
      page: {
        pageSize: 20,
        total: 0,
        currentPage: 1,
        pageSizes: [20, 50, 100, 1000]
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    ...mapActions({
      getUserDetail: 'detail/info'
    }),
    async getData(index = 1) {
      this.loading = true
      this.page.currentPage = index
      const res = await this.$axios.request({
        url: '/user/agent/move/log',
        method: 'GET',
        params: {
          ...this.searchInfo,
          page: this.page.currentPage,
          page_size: this.page.pageSize
        }
      })
      this.loading = false
      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return false
      }
      // console.log(res)
      this.dataSource = res.data
      this.page.total = res.attributes && res.attributes.total ? res.attributes.total : 0
    },
    // 选择日期
    selectDate(val) {
      [this.searchInfo.created_from, this.searchInfo.created_to] = val
    },
    // 查询
    search() {
      this.getData()
    },
    // 设置每页条数
    changePageSize(pageSize) {
      this.page.pageSize = pageSize
      this.getData()
    },
    // 查看用户详情
    handleUserDetail(row) {
      this.getUserDetail({ username: row.user_name, id: row.id })
    }
  }
}
</script>

<style lang="less" scoped>
#Record {
  position: relative;
}
</style>
