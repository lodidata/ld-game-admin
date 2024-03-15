<template>
  <div>
    <Spin v-if="loading.page" size="large" fix></Spin>
    <Card dis-hover class="query_box">
      <div class="query_con">
        <div class="item">
          <span>{{i18n_lang.gameOperations0}}</span>
          <DatePicker v-model="searchInfo.start_time" type="date" placeholder style="width: 120px" :editable="false"></DatePicker>
          <span>-</span>
          <DatePicker v-model="searchInfo.end_time" type="date" placeholder style="width: 120px" :editable="false"></DatePicker>
        </div>
        <div class="item">
          <span>{{i18n_lang.gameOperations3}}</span>
          <Select v-model="searchInfo.game_operator" style="width:100px" clearable>
            <Option value>{{i18n_lang.gameOperations2}}</Option>
            <Option v-for="(item, index) in gameOperator" :value="item.type" :key="item.type">{{item.rename}}</Option>
          </Select>
        </div>
        <div class="item">
          <span>{{i18n_lang.gameOperations1}}</span>
          <Select v-model="searchInfo.game_type" style="width:100px" clearable>
            <Option value>{{i18n_lang.gameOperations2}}</Option>
            <Option v-for="(item, index) in gameType" :value="item.type" :key="item.type">{{item.rename}}</Option>
          </Select>
        </div>
        <div class="item">
          <span>{{i18n_lang.gameOperations8}}</span>
          <Select v-model="searchInfo.status" style="width:100px" clearable>
            <Option value>{{i18n_lang.gameOperations2}}</Option>
            <Option value="enabled">{{i18n_lang.gameOperations4}}</Option>
            <Option value="disabled">{{i18n_lang.gameOperations5}}</Option>
          </Select>
        </div>
        <div class="item">
          <Button type="primary" icon="ios-search" @click="search">{{i18n_lang.gameOperations6}}</Button>
          <Button type="primary" style="margin-left: 5px;" icon="md-refresh" @click="reset">{{i18n_lang.gameOperations7}}</Button>
        </div>
      </div>
    </Card>
    <Table ref="table" border :columns="dataList" :data="dataSource" @on-sort-change="sortTable"></Table>
    <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{ `${i18n_lang.gameOperations28}${dataPage.total}${i18n_lang.gameOperations29}` }}</div>
    <Page
      class="page_box"
      show-sizer
      :current="dataPage.currentPage"
      :page-size-opts="dataPage.pageSizes"
      :page-size="dataPage.pageSize"
      :total="dataPage.total"
      @on-change="getList"
      @on-page-size-change="changeDataPageSize"
    ></Page>
    <!-- 详情 -->
    <Modal
      v-model="visible.details"
      :title="`${searchInfo.start_time ? $dateFormat(searchInfo.start_time) : ''}${searchInfo.start_time && searchInfo.end_time ? '-' : ''}${searchInfo.end_time ? $dateFormat(searchInfo.end_time) : ''}${i18n_lang.gameOperations9}`"
      :width="1250"
      :footer-hide="true">
      <Spin v-if="loading.detailsPage" size="large" fix></Spin>
      <Card dis-hover class="query_box">
        <div class="query_con">
          <div class="item">
            <span>{{i18n_lang.gameOperations3}}</span>
            <Select v-model="detailsInfo.game_operator" style="width:100px" clearable>
              <Option value>{{i18n_lang.gameOperations2}}</Option>
              <Option v-for="(item, index) in gameOperator" :value="item.type" :key="item.type">{{item.rename}}</Option>
            </Select>
          </div>
          <div class="item">
            <span>{{i18n_lang.gameOperations10}}</span>
            <Input v-model="detailsInfo.game_name" :placeholder="` `" clearable style="width: 150px"/>
          </div>
          <div class="item">
            <span>{{i18n_lang.gameOperations8}}</span>
            <Select v-model="detailsInfo.status" style="width:100px" clearable>
              <Option value>{{i18n_lang.gameOperations2}}</Option>
              <Option value="enabled">{{i18n_lang.gameOperations4}}</Option>
              <Option value="disabled">{{i18n_lang.gameOperations5}}</Option>
            </Select>
          </div>
          <div class="item">
            <Button type="primary" icon="ios-search" @click="searchDetails">{{i18n_lang.gameOperations6}}</Button>
            <Button type="primary" style="margin-left: 5px;" icon="md-refresh" @click="resetDetails">{{i18n_lang.gameOperations7}}</Button>
          </div>
        </div>
      </Card>
      <Table ref="table" border :columns="detailsList" :data="detailsSource" @on-sort-change="sortDetailsTable"></Table>
      <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{ `${i18n_lang.gameOperations28}${detailsPage.total}${i18n_lang.gameOperations29}` }}</div>
      <Page
        class="page_box"
        show-sizer
        :current="detailsPage.currentPage"
        :page-size-opts="detailsPage.pageSizes"
        :page-size="detailsPage.pageSize"
        :total="detailsPage.total"
        @on-change="getDetailsList"
        @on-page-size-change="changeDetailsPageSize"
      ></Page>
    </Modal>
  </div>
</template>

<script>
  import { dataList, detailsList } from './columns'
  const searchInfo = {
    start_time: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
    end_time: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
    game_type: '',
    game_operator: '',
    status: '',
    field_name: '',
    sort_way: ''
  }
  const detailsInfo = {
    start_time: '',
    end_time: '',
    id: '',
    status: '',
    game_name: '',
    game_operator	: '',
    field_name: '',
    sort_way: ''
  }
  export default {
    data() {
      const i18n_lang = this.$t('gameOperations');
      return {
        i18n_lang: i18n_lang,
        dataList: dataList(this),
        detailsList: detailsList(this),
        loading: {
          page: false,
          detailsPage: false,
          btn: false
        },
        visible: {
          details: false
        },
        reginTime: [searchInfo.start_time, searchInfo.end_time],
        gameType: [],
        gameOperator: [],
        searchInfo: { ...searchInfo },
        dataSource: [],
        dataPage: {
          pageSize: 20,
          total: 0,
          currentPage: 1,
          pageSizes: [20, 50, 100, 1000]
        },
        detailsInfo: { ...detailsInfo },
        detailsSource: [],
        detailsPage: {
          pageSize: 20,
          total: 0,
          currentPage: 1,
          pageSizes: [20, 50, 100, 1000]
        }
      }
    },
    created() {
      this.getGame()
      this.getList()
    },
    methods: {
      // 查询
      search(){
        this.getList()
      },
      // 重置
      reset(){
        this.searchInfo = { ...searchInfo }
        this.getList()
      },
      // 排序
      sortTable(key){
        this.searchInfo.field_name = key.key
        this.searchInfo.sort_way = key.order
        this.getList()
      },
      //修改列表页码
      changeDataPageSize(pageSize) {
        this.dataPage.pageSize = pageSize
        this.getList()
      },
      // 详情
      lookDetails(row){
        this.detailsInfo.start_time = this.searchInfo.start_time
        this.detailsInfo.end_time = this.searchInfo.end_time
        this.detailsInfo.id = row.id
        this.getDetailsList()
        this.visible.details = true
      },
      // 查询详情
      searchDetails(){
        this.getDetailsList()
      },
      // 重置详情
      resetDetails(){
        this.detailsInfo.game_operator = ''
        this.detailsInfo.game_name = ''
        this.detailsInfo.status = ''
        this.getDetailsList()
      },
      // 详情排序
      sortDetailsTable(key){
        this.detailsInfo.field_name = key.key
        this.detailsInfo.sort_way = key.order
        this.getDetailsList()
      },
      //修改详情列表页码
      changeDetailsPageSize(pageSize) {
        this.detailsPage.pageSize = pageSize
        this.getDetailsList()
      },
      //获取游戏
      async getGame() {
        const res = await this.$axios.request({
          url: '/report/operation/opt',
          method: 'GET',
          params: {}
        })
        if (res.status !== 200) {
          this.$msg({
            type: 'error',
            message: res.message
          })
          return false
        }
        this.gameType = []
        Object.keys(res.data.game_type).forEach((key) => {
          this.gameType.push({
            type: res.data.game_type[key],
            rename: key
          })
        })
        this.gameOperator = []
        Object.keys(res.data.game_menu).forEach((key) => {
          this.gameOperator.push({
            type: res.data.game_menu[key],
            rename: key
          })
        })
      },
      //获取列表
      async getList(index = 1) {
        this.loading.page = true
        this.dataPage.currentPage = index
        const req = { ...this.searchInfo }
        req.start_time = req.start_time ? this.$dateFormat(req.start_time) : ''
        req.end_time = req.end_time ? this.$dateFormat(req.end_time) : ''
        const res = await this.$axios.request({
          url: '/report/operation',
          method: 'GET',
          params: {
            ...req,
            page: this.dataPage.currentPage,
            page_size: this.dataPage.pageSize
          }
        })
        this.loading.page = false
        if (res.status !== 200) {
          this.$msg({
            type: 'error',
            message: res.message
          })
          return false
        }
        this.dataSource = res.data
        this.dataPage.total = res.attributes && res.attributes.total ? res.attributes.total : 0
      },
      //获取详情列表
      async getDetailsList(index = 1) {
        this.loading.detailsPage = true
        this.dataPage.currentPage = index
        const req = { ...this.detailsInfo }
        req.start_time = req.start_time ? this.$dateFormat(req.start_time) : ''
        req.end_time = req.end_time ? this.$dateFormat(req.end_time) : ''
        const res = await this.$axios.request({
          url: '/report/operation',
          method: 'GET',
          params: {
            ...req,
            page: this.detailsPage.currentPage,
            page_size: this.detailsPage.pageSize
          }
        })
        this.loading.detailsPage = false
        if (res.status !== 200) {
          this.$msg({
            type: 'error',
            message: res.message
          })
          return false
        }
        this.detailsSource = res.data
        this.detailsPage.total = res.attributes && res.attributes.total ? res.attributes.total : 0
      }
    }
  }
</script>

<style lang="less" scoped>
</style>
