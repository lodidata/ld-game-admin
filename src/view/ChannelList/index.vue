<template>
  <div>
    <Spin v-if="loading.page" size="large" fix></Spin>
    <Card dis-hover class="query_box">
      <div class="item">
        <span>{{i18n_lang.channelList0}}</span>
        <DatePicker
          v-model="reginTime"
          type="daterange"
          placeholder
          style="width: 200px"
          clearable
          @on-change="selectTime"
        ></DatePicker>
        <span style="margin-left: 15px;">{{i18n_lang.channelList1}}</span>
        <Input v-model="searchInfo.name" :placeholder="`${i18n_lang.channelList2}`" clearable style="width: 150px"/>
        <Button type="primary" icon="ios-search" @click="inquire" class="marginRight" style="margin-left: 15px;">{{i18n_lang.channelList3}}</Button>
        <Button type="primary" style="margin-left: 5px;" icon="md-refresh" @click="reset">{{i18n_lang.channelList4}}</Button>
      </div>
    </Card>
    <div>
      <Button type="primary" icon="md-add" class="mb30" @click="handle()">{{i18n_lang.channelList5}}</Button>
    </div>
    <Table ref="table" border :columns="columns" :data="dataSource" style="margin-top: 20px"></Table>
    <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{ `${i18n_lang.channelList32}${page.total}${i18n_lang.channelList33}` }}</div>
    <Page
      class="page_box"
      show-sizer
      :current="page.currentPage"
      :page-size-opts="page.pageSizes"
      :page-size="page.pageSize"
      :total="page.total"
      @on-change="getList"
      @on-page-size-change="changePageSize"
    ></Page>
    <Modal v-model="visible.handle" :title="`${handleInfo.id ? i18n_lang.channelList6 : i18n_lang.channelList5}${i18n_lang.channelList7}`">
      <Form
        ref="handleInfo"
        :model="handleInfo"
        :label-width="100"
        :rules="ruleValidate">
        <FormItem :label="`${i18n_lang.channelList8}`" prop="number">
          <Input v-model="handleInfo.number" :disabled="handleInfo.id ? true : false" :placeholder="`${i18n_lang.channelList9}`"/>
        </FormItem>
        <FormItem :label="`${i18n_lang.channelList10}`" prop="name">
          <Input v-model="handleInfo.name" :placeholder="`${i18n_lang.channelList11}`"/>
        </FormItem>
        <!-- <FormItem :label="`${i18n_lang.channelList12}`">
          <Input v-model="channelIdUrl" disabled :placeholder="`${i18n_lang.channelList13}`"/>
        </FormItem> -->
        <FormItem v-for="(item, index) in urlList" :key="index" :label="`${i18n_lang.channelList12}${index + 1}`">
          <Input v-model="item.url" :placeholder="`${i18n_lang.channelList13}`" style="width: 300px;"/>
          <Button type="primary" @click="handleUrl(index == 0 ? `add` : `delete`, index)">{{index == 0 ? `${i18n_lang.channelList29}` : `${i18n_lang.channelList30}`}}</Button>
        </FormItem>
        <FormItem :label="`${i18n_lang.channelList14}`" prop="remark">
          <Input type="textarea" :rows="3" v-model="handleInfo.remark" :placeholder="`${i18n_lang.channelList15}`"/>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" :loading="loading.btn" @click="handleSave()">{{i18n_lang.channelList16}}</Button>
      </div>
    </Modal>
    <Modal v-model="visible.url" :title="` `" :footer-hide="true">
      <Form>
        <FormItem v-for="(item, index) in urlList" :key="index" :label="`${i18n_lang.channelList12}${index + 1}`">
          <Input v-model="item.url" :placeholder="`${i18n_lang.channelList13}`" disabled style="width: 300px;"/>
          <Button type="primary" @click="handleCopy(item.url)">{{i18n_lang.channelList31}}</Button>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
  import columns from './columns'
  const searchInfo = {
    // start_time: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
    // end_time: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
    start_time: ``,
    end_time: ``,
    name: "",
  }
  export default {
    data() {
      const i18n_lang = this.$t('channelList');
      return {
        i18n_lang: i18n_lang,
        columns: columns(this),
        loading: {
          page: false,
          btn: false
        },
        visible: {
          handle: false,
          url: false
        },
        reginTime: [searchInfo.start_time, searchInfo.end_time],
        searchInfo: { ...searchInfo },
        page: {
          pageSize: 20,
          total: 0,
          currentPage: 1,
          pageSizes: [20, 50, 100, 1000]
        },
        dataSource: [],
        handleInfo: {
          id: '',
          number: '',
          name: '',
          url: '',
          remark: ''
        },
        ruleValidate: {
          number: [{ required: true, message: `${i18n_lang.channelList17}`, trigger: 'blur' }],
          name: [{ required: true, message: `${i18n_lang.channelList18}`, trigger: 'blur' }],
          remark: [{ required: true, message: `${i18n_lang.channelList19}`, trigger: 'blur' }]
        },
        url: '',
        channelIdUrl: '',
        urlList: []
      }
    },
    created() {
      this.getList()
    },
    watch: {
      'handleInfo.number'(newName, oldName){
        if(this.handleInfo.id){
          this.channelIdUrl = this.handleInfo.url + `?channel_id=${newName}`
        }else{
          this.channelIdUrl = this.url + `?channel_id=${newName}`
        }
      }
    },
    methods: {
      // 选择日期
      selectTime(val) {
        [this.searchInfo.start_time, this.searchInfo.end_time] = val
      },
      // 查询
      inquire(){
        this.getList()
      },
      // 重置
      reset(){
        this.searchInfo = { ...searchInfo }
        this.reginTime = [searchInfo.start_time, searchInfo.end_time]
        this.getList()
      },
      // 推广地址优化
      handleUrl(test, index){
        if(test == 'add'){
          this.urlList.push({
            url: ''
          })
        }
        if(test == 'delete'){
          this.urlList.splice(index, 1)
        }
      },
      //添加、编辑
      handle(row){
        if(row){
          this.handleInfo = {
            id: row.id,
            number: row.number,
            name: row.name,
            url: row.url,
            remark: row.remark
          }
          this.urlList = []
          if(row.url){
            row.url.split(',').forEach((item, index) => {
              this.urlList.push({
                url: item
              })
            })
          }else{
            this.urlList.push({
              url: ''
            })
          }
        }else{
          this.handleInfo = {
            id: '',
            number: '',
            name: '',
            url: '',
            remark: ''
          }
          this.urlList = []
          this.urlList.push({
            url: this.url
          })
        }
        this.visible.handle = true
      },
      // 显示地址
      handleShowUrl(row){
        this.urlList = []
        if(row.url){
          row.url.split(',').forEach((item, index) => {
            this.urlList.push({
              url: `${item}?channel_id=${row.number}`
            })
          })
          this.visible.url = true
        }
      },
      // 复制
      handleCopy(url){
        let that=this;
        this.$copyText(`${url}`).then(function (e) {
          that.$Message.success(`${that.i18n_lang.channelList28}`)
        }, function (err) {})
      },
      // 翻页
      changePageSize(pageSize) {
        this.page.pageSize = pageSize
        this.getList()
      },
      // 获取列表
      async getList(index = 1) {
        this.loading.page = true
        this.page.currentPage = index
        const req = { ...this.searchInfo }
        req.start_time = req.start_time ? this.$dateFormat(req.start_time) : ''
        req.end_time = req.end_time ? this.$dateFormat(req.end_time) : ''
        const res = await this.$axios.request({
          url: '/channel',
          method: 'GET',
          params: {
            ...req,
            page: this.page.currentPage,
            page_size: this.page.pageSize
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
        this.dataSource = res.data || []
        this.page.total = res.attributes && res.attributes.total ? res.attributes.total : 0
        this.url = res.attributes && res.attributes.url ? res.attributes.url : ''
      },
      // 添加编辑
      async handleSave(){
        this.$refs['handleInfo'].validate(async valid => {
          if (valid) {
            this.loading.btn = true
            const req = { ...this.handleInfo }
            const listId = this.handleInfo.id
            req.url = ''
            this.urlList.forEach((item, index) => {
              req.url += index == 0 ? `${item.url}` : `,${item.url}`
            })
            delete req.id
            // delete req.url
            const res = await this.$axios.request({
              url: `/channel/edit${listId ? '/' + listId : '/0'}`,//+ listId ? `/${listId}` : ''
              method: 'PUT',
              data: {
                ...req
              }
            })
            this.loading.btn = false
            if (res.status !== 200 || res.state != 0) {
              this.$Message.error(res.message)
            } else {
              this.$Message.success(res.message)
              this.visible.handle = false
              this.getList()
            }
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
</style>
