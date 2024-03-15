<template>
  <div>
    <Spin v-if="loading.page" size="large" fix></Spin>
    <Card dis-hover class="query_box">
      <div class="query_con">
        <div class="item">
          <span>{{i18n_lang.rebateList0}}</span>
          <!-- <DatePicker v-model="query.month" type="date" placeholder style="width: 120px" :editable="false"></DatePicker>
          -
          <DatePicker v-model="query.month" type="date" placeholder style="width: 120px" :editable="false"></DatePicker> -->
          <DatePicker v-model="query.start_time" type="date" placeholder style="width: 120px" :options="dateOpt" :editable="false"></DatePicker>
          <span>-</span>
          <DatePicker v-model="query.end_time" type="date" placeholder style="width: 120px" :options="dateOpt" :editable="false"></DatePicker>
        </div>
        <div class="item">
          <span>{{i18n_lang.rebateList1}}</span>
          <Input v-model="query.agent_name" style="width: 100px" />
          <Button type="primary" icon="ios-search" style="margin-left: 16px;" @click="getData()">{{i18n_lang.rebateList2}}</Button>
        </div>
      </div>
      <!-- <div class="query_btns">
        <Button type="primary" icon="ios-search" style="margin-right: 5px;" @click="getData()">{{i18n_lang.rebateList2}}</Button>
      </div> -->
    </Card>
    <div style="marginTop:10px">
      <Table border :columns="columns" :data="dataSource"></Table>
      <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{ `${i18n_lang.rebateList15}${page.total}${i18n_lang.rebateList16}` }}</div>
      <MyPage
        class="page_box"
        ikey="lottery"
        :current="page.currentPage"
        :page-size="page.pageSize"
        :total="page.total"
        show-sizer
        @onChange="getData"
        @changePageSize="changePageSize"
      ></MyPage>
    </div>
  </div>
</template>

<script>
  import MyTable from '_c/MyTable'
  import MyPage from '_c/MyPage'
  import columns from './columns'
  const queryData = {
    agent_name: '',
    start_time:  `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`, // 开始时间
    end_time: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`, // 结束时间
    // month: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
    date: ``
  }
  export default {
    components: {
      MyTable,
      MyPage
    },
    data() {
      const i18n_lang = this.$t('rebateList');
      return {
        i18n_lang: i18n_lang,
        columns: columns(this),
        loading: {
          page: false
        },
        query: {
          ...queryData
        },
        dateOpt: {
          disabledDate(date) {
            return date && date.valueOf() < Date.now() - 4320000000
          }
        },
        dataSource: [], // data数据
        page: {
          pageSize: 20,
          total: 0,
          currentPage: 1
        }
      }
    },
    created() {},
    methods: {
      // 设置每页条数
      changePageSize(pageSize) {
        this.page.pageSize = pageSize
        this.getData()
      },
      async getData(i = 1) {
        // if(new Date(this.query.month).getMonth() >= 9){
        //   this.query.date = `${new Date(this.query.month).getFullYear()}${new Date(this.query.month).getMonth() + 1}`
        // }else{
        //   this.query.date = `${new Date(this.query.month).getFullYear()}0${new Date(this.query.month).getMonth() + 1}`
        // }
        if(this.query.start_time){
          this.query.start_time = this.$dateFormat(new Date(this.query.start_time))
        }
        if(this.query.end_time){
          this.query.end_time = this.$dateFormat(new Date(this.query.end_time))
        }
        this.page.currentPage = i
        this.loading.page = true
        const req = {
          page: this.page.currentPage,
          page_size: this.page.pageSize,
          ...this.query
        }
        delete req.month
        const res = await this.$axios.request({
          url: '/active/newBkge/list',
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
        this.dataSource = res.data ? res.data : []
      }
    }
  }
</script>

<style lang="less" scoped>
</style>
