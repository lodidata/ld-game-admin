<template>
  <div>
    <Spin v-if="loading.page" size="large" fix></Spin>
    <Card dis-hover class="query_box">
      <div class="query_con">
        <div class="item">
          <span><em style="color: red;">*</em>{{i18n_lang.agencyRelation0}}</span>
          <Input v-model="searchInfo.url" :placeholder="`${i18n_lang.agencyRelation1}`" clearable style="width: 150px"/>
        </div>
        <div class="item">
          <span><em style="color: red;">*</em>{{i18n_lang.agencyRelation2}}</span>
          <Input v-model="searchInfo.name" :placeholder="`${i18n_lang.agencyRelation3}`" clearable style="width: 150px"/>
        </div>
        <div class="item">
          <Button type="primary" icon="md-add" @click="addChannel()">{{i18n_lang.agencyRelation4}}</Button>
          <Button type="primary" style="margin-left: 5px;" icon="md-refresh" @click="getList(page.currentPage)">{{i18n_lang.agencyRelation21}}</Button>
        </div>
      </div>
    </Card>
    <div>{{i18n_lang.agencyRelation5}}</div>
    <Table style="margin-top:10px" filter border :columns="downloadList" :data="dataSource" ></Table>
    <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{ `${i18n_lang.agencyRelation6}${page.total}${i18n_lang.agencyRelation7}` }}</div>
    <Page
      class="page_box"
      :current="page.currentPage"
      :page-size="page.pageSize"
      :total="page.total"
      show-sizer
      @on-change="getList"
      @on-page-size-change="changePageSize"
    ></Page>
    <!-- 渠道生成 -->
    <Modal v-model="visible.channel" :title="`${i18n_lang.agencyRelation4}`" :width="800">
      <Table ref="table" border :columns="channelList" :data="channelDataSource"
        @on-select="handleSelect"
        @on-select-cancel="handleCancel"
        @on-select-all="handleSelectAll"
        @on-select-all-cancel="handleSelectAll"
      ></Table>
      <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{ `${i18n_lang.agencyRelation6}${channelPage.total}${i18n_lang.agencyRelation7}` }}</div>
      <Page
        class="page_box"
        :current="channelPage.currentPage"
        :page-size="channelPage.pageSize"
        :total="channelPage.total"
        show-sizer
        @on-change="getChannel"
        @on-page-size-change="channelChangePageSize"
      ></Page>
      <div slot="footer">
        <Button type="primary" :loading="loading.btn" @click="saveBtn(1)">{{i18n_lang.agencyRelation8}}</Button>
        <Button type="primary" :loading="loading.btn" @click="saveBtn(2)">{{i18n_lang.agencyRelation9}}</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import { DownloadList, ChannelList } from './columns'
  const searchInfo = {
    url: "",
    name: ""
  }
  export default {
    data() {
      const i18n_lang = this.$t('agencyRelation');
      return {
        i18n_lang: i18n_lang,
        downloadList: DownloadList(this),
        channelList: ChannelList(this),
        loading: {
          page: false,
          btn: false,
          modalButton: false
        },
        visible: {
          channel: false
        },
        searchInfo: { ...searchInfo },
        dataSource: [],
        page: {
          pageSize: 20,
          total: 0,
          currentPage: 1,
          pageSizes: [20, 50, 100, 1000]
        },
        channelId: [],
        channelDataSource: [],
        channelPage: {
          pageSize: 10,
          total: 0,
          currentPage: 1,
          pageSizes: [20, 50, 100, 1000]
        },
      }
    },
    created() {
      this.getList()
    },
    methods: {
      // 添加渠道
      addChannel(){
        if(!this.searchInfo.url){
          return this.$msg({
            type: 'error',
            message: `${this.i18n_lang.agencyRelation10}`
          })
        }
        if(!this.searchInfo.name){
          return this.$msg({
            type: 'error',
            message: `${this.i18n_lang.agencyRelation11}`
          })
        }
        this.channelPage = {
          pageSize: 10,
          total: 0,
          currentPage: 1,
          pageSizes: [20, 50, 100, 1000]
        }
        this.channelId = []
        this.getChannel()
      },
      handleSelect(slection, row){
        this.channelId.push(row.channel_id)
      },
      handleCancel(slection, row){
        this.channelId.forEach((item, index) => {
          if(item == row.channel_id){
            this.channelId.splice(index, 1)
          }
        })
      },
      handleSelectAll(slection){
        if(slection.length){
          slection.forEach(item => {
            this.channelId.push(item.channel_id)
          })
        }else{
          this.channelId = []
        }
      },
      // 渠道下载翻页
      changePageSize(pageSize) {
        this.page.pageSize = pageSize
        this.getList()
      },
      async getList(index = 1) {
        this.loading.page = true
        this.page.currentPage = index
        const res = await this.$axios.request({
          url: '/channel/package',
          method: 'GET',
          params: {
            page: this.page.currentPage,
            page_size: this.page.pageSize
          }
        })
        this.loading.page = false
        // this.loading.modalButton = false
        if (res.status !== 200) {
          this.$msg({
            type: 'error',
            message: res.message
          })
          return false
        }
        res.data.forEach((item, index) => {
          item.loading = false
        })
        this.dataSource = res.data
        this.page.total = res.attributes && res.attributes.total ? res.attributes.total : 0
      },
      // 渠道列表翻页
      channelChangePageSize(pageSize) {
        this.page.pageSize = pageSize
        this.getChannel()
      },
      async getChannel(index = 1) {
        this.channelPage.currentPage = index
        const res = await this.$axios.request({
          url: '/channel/package/list',
          method: 'GET',
          params: {
            page: this.channelPage.currentPage,
            page_size: this.channelPage.pageSize
          }
        })
        if (res.status !== 200) {
          this.$msg({
            type: 'error',
            message: res.message
          })
          return false
        }
        this.visible.channel = true
        this.channelDataSource = res.data
        this.channelPage.total = res.attributes && res.attributes.total ? res.attributes.total : 0
      },
      // 列表生成
      async handleProduce(row, index){
        // this.loading.modalButton = true
        this.$set(this.dataSource[index], 'loading', true)
        const res = await this.$axios.request({
          url: `/channel/package/${row.id}`,
          method: 'PUT'
        })
        this.$msg({
          type: res.status !== 200 ? 'error' : 'success',
          message: res.message
        })
        if (res.status !== 200) return
        this.getList()
      },
      // 列表删除
      async handleDetele(row){
        const res = await this.$axios.request({
          url: `/channel/package/${row.id}`,
          method: 'DELETE'
        })
        this.$msg({
          type: res.status !== 200 ? 'error' : 'success',
          message: res.message
        })
        if (res.status !== 200) return
        this.getList()
      },
      // 添加/生成
      async saveBtn(number){
        if(!this.channelId.length){
          return this.$msg({
            type: 'error',
            message: `${this.i18n_lang.agencyRelation12}`
          })
        }
        this.loading.btn = true
        const res = await this.$axios.request({
          url: '/channel/package',
          method: 'POST',
          data: {
            url: this.searchInfo.url,
            name: this.searchInfo.name,
            type: number,
            channel_id: this.channelId
          }
        })
        this.loading.btn = false
        if (res.status !== 200 || res.state != 0) {
          this.$msg({
            type: 'error',
            message: res.message
          })
          return false
        }
        this.visible.channel = false
        this.getList()
      }
    }
  }
</script>

<style lang="less" scoped>
</style>
