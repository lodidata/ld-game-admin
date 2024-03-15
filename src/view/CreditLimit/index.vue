<template>
  <div id="CreditLimit">
    <Spin v-if="loading" size="large" fix></Spin>
    <Table :columns="columns" :data="dataSource" height="500"></Table>
    <Page
      class="page_box"
      show-sizer
      split-panels
      :current="page.currentPage"
      :page-size="page.pageSize"
      :page-size-opts="page.pageSizes"
      :total="page.total"
      @on-change="getData"
      @on-page-size-change="changePageSize"
    ></Page>
  </div>
</template>

<script>

import columns from './columns'
export default {
  data() {
    const i18n_lang = this.$t('creditLimit');
    return {
      i18n_lang: i18n_lang,
      columns: columns(this),
      dataSource: [],
      loading: false,
      page: {
        pageSize: 20,
        total: 0,
        currentPage: 0,
        pageSizes: [20, 100, 1000, 2000]
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData(i) {
      this.page.currentPage = i || 1
      this.loading = true
      const req = {
        page: this.page.currentPage,
        page_size: this.page.pageSize
      }
      const res = await this.$axios.request({
        url: '/quota/detail',
        method: 'GET',
        params: req
      })
      this.loading = false
      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      this.dataSource = res.data ? res.data : []
      this.page.total = res.attributes && res.attributes.total ? res.attributes.total : 0
    },
    // 设置每页条数
    changePageSize(pageSize) {
      this.page.currentPage = 1
      this.page.pageSize = pageSize
      this.getData()
    }
  }
}
</script>

<style lang="less" scoped>
@import url('./index.less');
</style>
