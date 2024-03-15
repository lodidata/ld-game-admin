<template>
  <div id="JoinList">
    <Spin v-if="loading.page" size="large" fix></Spin>
    <Card dis-hover class="query_box mb30">
      <div class="query_con">
        <div class="item">
          <span>{{i18n_lang.joinList2}}</span>
          <Input v-model="query.user_name" placeholder style="width:150px;"/>
        </div>
        <div class="item">
          <span>{{i18n_lang.joinList3}}</span>
          <Input v-model="query.title" placeholder style="width:150px;"/>
        </div>
        <div class="item">
          <span>{{i18n_lang.joinList4}}</span>
          <Select v-model="query.type_id" style="width:100px">
            <Option value>{{i18n_lang.joinList5}}</Option>
            <Option v-for="(item, i) in activeType" :key="i" :value="item.id">{{ item.name }}</Option>
          </Select>
        </div>
        <div class="item">
          <span>{{i18n_lang.joinList6}}</span>
          <Select v-model="query.state" style="width:100px">
            <Option value>{{i18n_lang.joinList5}}</Option>
            <Option v-for="(item, i) in state" :key="i" :value="item.value">{{ item.name }}</Option>
          </Select>
        </div>
        <div class="item">
          <span>{{i18n_lang.joinList35}}</span>
          <DatePicker v-model="query.start_time" type="datetime" placeholder style="width: 180px" :editable="false"></DatePicker>
          <span>-</span>
          <DatePicker v-model="query.end_time" type="datetime" placeholder style="width: 180px" :editable="false"></DatePicker>
        </div>
      </div>
      <div class="query_btns">
        <Button type="primary" icon="ios-search" @click="search">{{i18n_lang.joinList7}}</Button>
        <Button type="primary" icon="md-refresh" @click="reset">{{i18n_lang.joinList8}}</Button>
        <Button type="primary" style="margin-left: 5px;" icon="md-download" @click="exportDataAjax">{{i18n_lang.joinList36}}</Button><!-- v-if="allRoutes.indexOf('325') > -1"-->
      </div>
    </Card>

    <MyTable editting :columns="columns" :data="dataSource" border @editChange="editOddChange"></MyTable>
    <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{ `${i18n_lang.joinList37}${page.total}${i18n_lang.joinList38}` }}</div>
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
</template>

<script>
import columns from './columns.js'
import MyTable from '_c/MyTable'
import { mapActions } from 'vuex'

const initQuery = {
  user_name: '',
  title: '',
  type_id: '',
  state: '',
  start_time: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 00:00:00`,
  end_time: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 23:59:59`
}

export default {
  components: {
    MyTable
  },
  data() {
    const i18n_lang = this.$t('joinList');
    return {
      i18n_lang: i18n_lang,
      columns: columns(this),
      loading: {
        page: false,
        modalButton: false
      },
      visible: {
        modal: false
      },
      dataSource: [],
      query: {
        ...initQuery
      },
      state: [{ name: i18n_lang.joinList9, value: 'manual' }, { name: i18n_lang.joinList10, value: 'auto' }],
      activeType: [
        { id: '1', name: i18n_lang.joinList11 },
        { id: '2', name: i18n_lang.joinList12 },
        { id: '3', name: i18n_lang.joinList13 },
        { id: '4', name: i18n_lang.joinList14 },
        { id: '5', name: i18n_lang.joinList15 },
        { id: '14', name: i18n_lang.joinList83_4_4 }
      ],
      page: {
        pageSize: 20,
        total: 0,
        currentPage: 1,
        pageSizes: [20, 100, 1000, 2000]
      }
    }
  },
  created() {
    let parameter = sessionStorage.getItem('parameter') || '{}'
    if(JSON.parse(parameter).JoinListData){
      this.query = {
        user_name: JSON.parse(parameter).JoinListData.user_name ? JSON.parse(parameter).JoinListData.user_name : '',
        title: JSON.parse(parameter).JoinListData.title ? JSON.parse(parameter).JoinListData.title : '',
        type_id: JSON.parse(parameter).JoinListData.type_id ? JSON.parse(parameter).JoinListData.type_id : '',
        state: JSON.parse(parameter).JoinListData.state ? JSON.parse(parameter).JoinListData.state : '',
        start_time: JSON.parse(parameter).JoinListData.start_time ? JSON.parse(parameter).JoinListData.start_time : '',
        end_time: JSON.parse(parameter).JoinListData.end_time ? JSON.parse(parameter).JoinListData.end_time : ''
      }
      this.getData(JSON.parse(parameter).JoinListData.page)
    }else{
      this.getData()
    }
  },
  methods: {
    ...mapActions({
      getUserDetail: 'detail/info'
    }),
    // 查询
    search() {
      this.page.currentPage = 1
      this.getData()
    },
    // 查看用户详情
    handleUserDetail(row) {
      this.getUserDetail({ username: row.user_name, id: row.user_id })
    },
    async getData(index) {
      this.page.currentPage = index || 1
      // console.log(this.page.currentPage, ' this.page.currentPage')

      this.dataSource = []

      this.loading.page = true

      const query = {
        page: this.page.currentPage,
        page_size: this.page.pageSize,
        ...this.query
      }
      if(query.start_time && query.end_time){
        query.start_time = this.$dateTimeFormat(new Date(query.start_time))
        query.end_time = this.$dateTimeFormat(new Date(query.end_time))
      }
      const res = await this.$axios.request({
        url: '/active/applys',
        method: 'GET',
        params: query
      })
      this.loading.page = false
      if (res.status !== 200 || res.state != 0) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      this.query.start_time = query.start_time
      this.query.end_time = query.end_time
      let parameterPage = sessionStorage.getItem('parameter') || "{}"
      let parameter = JSON.parse(parameterPage)
      parameter.JoinListData = {
        ...this.query,
        page: this.page.currentPage,
        page_size: this.page.pageSize
      }
      sessionStorage.setItem('parameter', JSON.stringify(parameter))
      this.page.total = res.attributes ? res.attributes.total : 0
      this.dataSource = res.data ? res.data : []
    },
    reset() {
      this.query = Object.assign({}, initQuery)
      this.getData()
    },
    // 设置每页条数
    changePageSize(pageSize) {
      this.page.currentPage = 1
      this.page.pageSize = pageSize
      this.getData()
    },

    async editOddChange(val, key, row) {
      const res = await this.$axios.request({
        url: `/active/apply.comment/${row.id}`,
        method: 'PUT',
        data: {
          content: val
        }
      })
      this.$msg({
        type: res.status !== 200 || res.state != 0 ? 'error' : 'success',
        message: res.message
      })
      if (res.status !== 200) return
      this.getData()
    },
    async exportDataAjax(){
      const query = {
        ...this.query
      }
      if(query.start_time && query.end_time){
        query.start_time = this.$dateTimeFormat(new Date(query.start_time))
        query.end_time = this.$dateTimeFormat(new Date(query.end_time))
      }
      const res = await this.$axios.request({
        url: '/active/applys/export',
        method: 'GET',
        responseType: 'blob',
        params: {
          ...query
        }
      })
      if (res.status !== 200) {
        if(res.status == 401){
          this.$Message.error(`${this.i18n_lang.joinList81}`)
        }
        // this.$msg({
        //   type: 'error',
        //   message: res.message
        // })
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
<style lang="less" scoped></style>
