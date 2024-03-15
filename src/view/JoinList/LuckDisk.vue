<template>
  <div class="luck-disk">
    <Spin v-if="loading.page" size="large" fix></Spin>
    <Card dis-hover class="query_box mb30">
      <div class="query_con">
        <div class="item">
          <span>{{i18n_lang.joinList16}}</span>
          <Input v-model="query.user_name" placeholder style="width:150px;"></Input>
        </div>
        <div class="item">
          <span>{{i18n_lang.joinList17}}</span>
          <DatePicker
            v-model="query.apply_time"
            type="date"
            format="yyyy-MM-dd"
            :placeholder="i18n_lang.joinList17"
            style="width: 150px"
            @on-change="changeStartTime"
          ></DatePicker>
        </div>
      </div>
      <div class="query_btns">
        <Button type="primary" icon="ios-search" @click="doQuery">{{i18n_lang.joinList18}}</Button>
        <Button type="primary" icon="md-refresh" @click="reset">{{i18n_lang.joinList19}}</Button>
      </div>
    </Card>
    <Table :data="dataSource" border :columns="columns" style="margin-top: 30px"></Table>
    <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{ `${i18n_lang.joinList37}${page.total}${i18n_lang.joinList38}` }}</div>
    <Page
      class="page_box"
      :current="page.currentPage"
      :page-size="page.pageSize"
      :page-size-opts="page.pageSizes"
      :total="page.total"
      show-sizer
      @on-change="changePage"
      @on-page-size-change="changePageSize"
    ></Page>
  </div>
</template>
<script>
import columns from './luckDiskColumns.js'
export default {
  name: 'LuckDisk',
  data() {
    const i18n_lang = this.$t('joinList');
    return {
      i18n_lang: i18n_lang,
      loading: {
        page: false,
        modalButton: false
      },
      query: {
        user_name: '',
        apply_time: ''
      },
      columns: columns(this),
      page: {
        pageSize: 20,
        total: 0,
        currentPage: 1,
        pageSizes: [20, 100, 1000, 2000]
      },
      dataSource: []
    }
  },
  created() {
    let parameter = sessionStorage.getItem('parameter') || '{}'
    if(JSON.parse(parameter).LuckDisk){
      this.query = {
        user_name: JSON.parse(parameter).LuckDisk.user_name ? JSON.parse(parameter).LuckDisk.user_name : '',
        apply_time: JSON.parse(parameter).LuckDisk.apply_time ? JSON.parse(parameter).LuckDisk.apply_time : ''
      }
      this.page.currentPage = JSON.parse(parameter).LuckDisk.page ? JSON.parse(parameter).LuckDisk.page : 1
      this.doQuery()
    }else{
      this.doQuery()
    }
  },
  methods: {
    changeStartTime(date) {
      this.query.apply_time = date
    },
    reset() {
      this.query.user_name = ''
      this.query.apply_time = ''
    },
    async doQuery() {
      this.loading.page = true
      const query = {
        ...this.query,
        page: this.page.currentPage,
        page_size: this.page.pageSize,
        type_id: 6
      }
      query.apply_time = this.$dateFormat(query.apply_time) ? query.apply_time : ''
      const res = await this.$axios.request({
        // url: '/active/applys',
        url: `/active/applys/fortune`,
        method: 'GET',
        params: query
      })
      this.loading.page = false
      if (res.state === 0) {
        this.query.apply_time = query.apply_time
        let parameterPage = sessionStorage.getItem('parameter') || "{}"
        let parameter = JSON.parse(parameterPage)
        parameter.LuckDisk = {
          ...this.query,
          page: this.page.currentPage,
          page_size: this.page.pageSize
        }
        sessionStorage.setItem('parameter', JSON.stringify(parameter))
        this.dataSource = res.data
        if (res.attributes) {
          this.page.total = res.attributes.total
        }
      }else{
         this.$Message.error(res.message)
      }
    },
    changePage(currentPage) {
      this.page.currentPage = currentPage
      this.doQuery()
    },
    changePageSize(pageSize) {
      this.page.pageSize = pageSize
      this.doQuery()
    }
  }
}
</script>
