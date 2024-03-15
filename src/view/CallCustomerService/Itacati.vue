<template>
  <div>
    <Spin v-if="loading.page" size="large" fix></Spin>
    <Card dis-hover class="query_box">
      <div class="query_con">
        <!-- <div class="item">
          <span>{{i18n_lang.callCustomerService1}}</span>
          <DatePicker v-model="searchInfo.start_time" type="datetime" placeholder style="width: 180px" :editable="false"></DatePicker>
          <span>-</span>
          <DatePicker v-model="searchInfo.end_time" type="datetime" placeholder style="width: 180px" :editable="false"></DatePicker>
        </div> -->
        <div class="item">
          <span>{{i18n_lang.callCustomerService2}}</span>
          <Input v-model="searchInfo.name" :placeholder="`${i18n_lang.callCustomerService3}`" clearable style="width: 150px"/>
        </div>
        <div class="item">
          <Button type="primary" icon="ios-search" class="marginRight" @click="search">{{i18n_lang.callCustomerService4}}</Button>
          <Button type="primary" style="margin-left: 5px;" icon="md-refresh" @click="reset">{{i18n_lang.callCustomerService5}}</Button>
        </div>
      </div>
    </Card>
    <div style="margin-bottom: 15px;">
      <Button type="primary" icon="md-add" @click="serviceListAmend()">{{i18n_lang.callCustomerService6}}</Button>
    </div>
    <Table ref="table" border :columns="serviceList" :data="serviceSource"></Table>
    <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{ `${i18n_lang.callCustomerService59}${servicePage.total}${i18n_lang.callCustomerService60}` }}</div>
    <Page
      class="page_box"
      show-sizer
      :current="servicePage.currentPage"
      :page-size-opts="servicePage.pageSizes"
      :page-size="servicePage.pageSize"
      :total="servicePage.total"
      @on-change="getList"
      @on-page-size-change="changeServicePageSize"
    ></Page>
    <!-- 新增客服 -->
    <Modal v-model="visible.add" :title="`${i18n_lang.callCustomerService7}`">
      <Form ref="addForm" :model="addInfo" :label-width="80" :rules="addRule">
        <FormItem :label="`${i18n_lang.callCustomerService8}`" prop="name">
          <Input v-model="addInfo.name" :placeholder="`${i18n_lang.callCustomerService9}`"></Input>
        </FormItem>
        <FormItem :label="`${i18n_lang.callCustomerService45}`" prop="telecom_name">
          <Input v-model="addInfo.telecom_name" :placeholder="`${i18n_lang.callCustomerService46}`"></Input>
        </FormItem>
        <FormItem :label="`${i18n_lang.callCustomerService10}`" prop="batch_url">
          <UploadImg
            v-model="addInfo.batch_url"
            :batchUrl="true"
            style="width: 408px;background-color: transparent; border: 1px solid #ddd;"
            @input="batchUrlFn"
            @getTable="getTable"
            @clearFile="clearFile"
          ></UploadImg>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" :loading="loading.btn" @click="saveService()">{{i18n_lang.callCustomerService11}}</Button>
      </div>
    </Modal>
    <!-- 名单列表 -->
    <Modal v-model="visible.nameList" :title="`${i18n_lang.callCustomerService12}`" :width="1200" :footer-hide="true">
      <Card dis-hover class="query_box">
        <div class="query_con">
          <div class="item">
            <span>{{i18n_lang.callCustomerService13}}</span>
            <DatePicker v-model="nameInfo.start_time" type="datetime" placeholder style="width: 180px" :editable="false"></DatePicker>
            <span>-</span>
            <DatePicker v-model="nameInfo.end_time" type="datetime" placeholder style="width: 180px" :editable="false"></DatePicker>
          </div>
          <div class="item">
            <span>{{i18n_lang.callCustomerService14}}</span>
            <Select v-model="nameInfo.telecom_id" clearable style="width: 180px">
              <Option value=''>{{i18n_lang.callCustomerService15}}</Option>
              <Option v-for="(item, index) in nameTelecomId" :key="index" :value="item.id">{{item.name}}</Option>
            </Select>
          </div>
          <div class="item">
            <Button type="primary" icon="ios-search" class="marginRight" @click="searchName">{{i18n_lang.callCustomerService4}}</Button>
            <Button type="primary" style="margin-left: 5px;" icon="md-refresh" @click="resetName">{{i18n_lang.callCustomerService5}}</Button>
          </div>
        </div>
      </Card>
      <Table ref="table" border :columns="nameList" :data="nameSource"></Table>
      <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{ `${i18n_lang.callCustomerService59}${namePage.total}${i18n_lang.callCustomerService60}` }}</div>
      <Page
        class="page_box"
        show-sizer
        :current="namePage.currentPage"
        :page-size-opts="namePage.pageSizes"
        :page-size="namePage.pageSize"
        :total="namePage.total"
        @on-change="getNameList"
        @on-page-size-change="changeNamePageSize"
      ></Page>
    </Modal>
    <Modal v-model="visible.telephoneList" :title="`${i18n_lang.callCustomerService7}`" :width="1200" :footer-hide="true">
      <Card dis-hover class="query_box">
        <div class="query_con">
          <div class="item">
            <span>{{`${i18n_lang.callCustomerService47}`}}</span>
            <DatePicker v-model="telephoneInfo.start_time" type="datetime" placeholder style="width: 180px" :editable="false"></DatePicker>
            <span>-</span>
            <DatePicker v-model="telephoneInfo.end_time" type="datetime" placeholder style="width: 180px" :editable="false"></DatePicker>
          </div>
          <div class="item">
            <span>{{i18n_lang.callCustomerService14}}</span>
            <Select v-model="telephoneInfo.telecom_id" clearable style="width: 180px">
              <Option value=''>{{i18n_lang.callCustomerService15}}</Option>
              <Option v-for="(item, index) in telephoneTelecomId" :key="index" :value="item.id">{{item.name}}</Option>
            </Select>
          </div>
          <div class="item">
            <Button type="primary" icon="ios-search" class="marginRight" @click="searchTelephone">{{i18n_lang.callCustomerService4}}</Button>
            <Button type="primary" style="margin-left: 5px;" icon="md-refresh" @click="resetTelephone">{{i18n_lang.callCustomerService5}}</Button>
            <Button type="primary" style="margin-left: 5px;" icon="md-download" @click="exportDataAjax">{{i18n_lang.callCustomerService17}}</Button>
          </div>
        </div>
      </Card>
      <p style="font-size: 18px;margin-bottom: 15px;">{{i18n_lang.callCustomerService18}}</p>
      <Table ref="table" border :columns="telecomDetails" :data="detailsData"></Table>
      <p style="font-size: 18px;margin-top:10px;margin-bottom: 15px;">{{i18n_lang.callCustomerService19}}</p>
      <Table ref="table" border :columns="telecomList" :data="telephoneSource"></Table>
      <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{ `${i18n_lang.callCustomerService59}${telephonePage.total}${i18n_lang.callCustomerService60}` }}</div>
      <Page
        class="page_box"
        show-sizer
        :current="telephonePage.currentPage"
        :page-size-opts="telephonePage.pageSizes"
        :page-size="telephonePage.pageSize"
        :total="telephonePage.total"
        @on-change="getTelephoneList"
        @on-page-size-change="changeTelephonePageSize"
      ></Page>
    </Modal>
  </div>
</template>

<script>
  import UploadImg from './UploadImg'
  import { serviceList, nameList, telecomDetails, telecomList } from './columnsItacati'
  const searchInfo = {
    name: "",
    start_time: "",
    end_time: ""
  }
  const nameInfo = {
    kefu_id: "",
    telecom_id : "",
    start_time: "",
    end_time: ""
  }
  const telephoneInfo = {
    kefu_id: "",
    telecom_id : "",
    start_time: "",
    end_time: ""
  }
  export default {
    data() {
      const i18n_lang = this.$t('callCustomerService');
      return {
        i18n_lang: i18n_lang,
        serviceList: serviceList(this),
        nameList: nameList(this),
        telecomDetails: telecomDetails(this),
        telecomList: telecomList(this),
        loading: {
          page: false,
          btn: false
        },
        visible: {
          add: false,
          nameList: false,
          telephoneList: false
        },
        searchInfo: { ...searchInfo },
        reginTime: [searchInfo.start_time, searchInfo.end_time],
        addInfo: {
          kefu_id: "",
          name: "",
          telecom_name: "",
          batch_url: ""
        },
        addRule: {
          name: [{ required: true, message: `${i18n_lang.callCustomerService20}`, trigger: 'blur' }],
          telecom_name: [{ required: true, message: `${i18n_lang.callCustomerService48}`, trigger: 'blur' }],
          batch_url: [{ required: true, message: `${i18n_lang.callCustomerService49}`, trigger: 'blur' }]
        },
        servicePage: {
          pageSize: 20,
          total: 0,
          currentPage: 1,
          pageSizes: [20, 50, 100, 1000]
        },
        namePage: {
          pageSize: 10,
          total: 0,
          currentPage: 1,
          pageSizes: [20, 50, 100, 1000]
        },
        telephonePage: {
          pageSize: 10,
          total: 0,
          currentPage: 1,
          pageSizes: [20, 50, 100, 1000]
        },
        serviceSource: [],
        nameInfo: { ...nameInfo },
        nameSource: [],
        nameTelecomId: [],
        telephoneInfo: { ...telephoneInfo },
        detailsData: [],
        telephoneSource: [],
        telephoneTelecomId: []
      }
    },
    created() {
      this.getList()
    },
    components: {
      UploadImg
    },
    methods: {
      // 选择日期
      selectTime(val) {
        [this.searchInfo.start_time, this.searchInfo.end_time] = val
      },
      //选择文件
      batchUrlFn(url){
        this.addInfo.batch_url = url
      },
      //下载名单文件
      getTable(){
        this.upTemlate()
      },
      //清除文件
      clearFile(){
        this.addInfo.batch_url = ''
      },
      //修改客服列表页码
      changeServicePageSize(pageSize) {
        this.servicePage.pageSize = pageSize
        this.getList()
      },
      //修改名单列表页码
      changeNamePageSize(pageSize) {
        this.namePage.pageSize = pageSize
        this.getNameList()
      },
      //修改电访列表页码
      changeTelephonePageSize(pageSize) {
        this.telephonePage.pageSize = pageSize
        // this.getList()
      },
      // 查询
      search() {
        this.getList()
      },
      searchName() {
        this.getNameList()
      },
      searchTelephone() {
        this.getTelephoneList()
      },
      // 重置
      reset(){
        this.searchInfo = { ...searchInfo }
        this.getList()
      },
      resetName(){
        this.nameInfo.telecom_id = ""
        this.nameInfo.start_time = ""
        this.nameInfo.end_time = ""
        this.getNameList()
      },
      resetTelephone(){
        this.telephoneInfo.telecom_id = ""
        this.telephoneInfo.start_time = ""
        this.telephoneInfo.end_time = ""
        this.getTelephoneList()
      },
      //添加修改弹窗
      serviceListAmend(row){
        if(row){
          this.addInfo = {
            kefu_id: row.kefu_id,
            name: row.name,
            telecom_name: row.telecom_name,
            batch_url: ""
          }
        }else{
          this.addInfo = {
            kefu_id: "",
            name: "",
            telecom_name: "",
            batch_url: ""
          }
        }
        this.loading.btn = false
        this.visible.add = true
      },
      lookNameList(row){
        this.nameInfo.kefu_id = row.kefu_id
        this.telecomListFn(row.kefu_id, 'name')
        this.getNameList()
      },
      lookTelephoneList(row){
        this.telecomListFn(row.kefu_id, 'telephone')
        this.telephoneInfo.kefu_id = row.kefu_id
        this.telephoneInfo.telecom_id = row.telecom_id ? row.telecom_id : ""
        this.visible.nameList = false
        this.getTelephoneList()
      },
      //获取客服列表
      async getList(index = 1) {
        this.loading.page = true
        this.servicePage.currentPage = index
        const req = { ...this.searchInfo }
        req.start_time = req.start_time ? this.$dateTimeFormat(req.start_time) : ''
        req.end_time = req.end_time ? this.$dateTimeFormat(req.end_time) : ''
        const res = await this.$axios.request({
          url: '/kefu/telecom/user',
          method: 'GET',
          params: {
            ...req,
            page: this.servicePage.currentPage,
            page_size: this.servicePage.pageSize
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
        this.serviceSource = res.data
        this.servicePage.total = res.attributes && res.attributes.total ? res.attributes.total : 0
      },
      // 删除名单
      async handleListDelete(row){
        // return console.log(`delete`, row)
        const res = await this.$axios.request({
          url: `/kefu/telecom/user/${row.kefu_id}`,
          method: 'DELETE'
        })
        this.loading.modalButton = false
        this.$msg({
          type: res.status !== 200 ? 'error' : 'success',
          message: res.message
        })
        if (res.status !== 200) return
        this.getList()
      },
      // 添加编辑客服列表
      async saveService(){
        this.$refs['addForm'].validate(async valid => {
          if (valid) {
            this.loading.btn = true
            const res = await this.$axios.request({
              url: '/kefu/telecom/export',
              method: 'POST',
              params: {
                ...this.addInfo
              }
            })
            this.loading.btn = false
            if (res.status !== 200 || res.state !== 0) {
              this.$msg({
                type: 'error',
                message: res.message
              })
              return false
            }
            this.visible.add = false
            this.getList()
          }
        })
      },
      // 获取下载模板
      async upTemlate() {
        const res = await this.$axios.request({
          url: '/kefu/telecom/export',
          method: 'GET',
          responseType: 'blob',
          params: {}
        })
        if (res.status !== 200) {
          this.$Message.error(res.message)
          return
        };
        const url = window.URL.createObjectURL(new Blob([res], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}))
        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', 'template file.txt')
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      },
      //获取名单列表
      async getNameList(index = 1) {
        // this.loading.page = true
        this.namePage.currentPage = index
        const req = { ...this.nameInfo }
        req.start_time = req.start_time ? this.$dateTimeFormat(req.start_time) : ''
        req.end_time = req.end_time ? this.$dateTimeFormat(req.end_time) : ''
        const res = await this.$axios.request({
          url: '/kefu/telecom',
          method: 'GET',
          params: {
            ...req,
            page: this.namePage.currentPage,
            page_size: this.namePage.pageSize
          }
        })
        // this.loading.page = false
        if (res.status !== 200) {
          this.$msg({
            type: 'error',
            message: res.message
          })
          return false
        }
        this.visible.nameList = true
        this.nameSource = res.data
        this.namePage.total = res.attributes && res.attributes.total ? res.attributes.total : 0
      },
      // 删除名单
      async handleDelete(row){
        // return console.log(`delete`, row)
        const res = await this.$axios.request({
          url: `/kefu/telecom/${row.telecom_id}`,
          method: 'DELETE'
        })
        this.loading.modalButton = false
        this.$msg({
          type: res.status !== 200 ? 'error' : 'success',
          message: res.message
        })
        if (res.status !== 200) return
        this.getNameList()
      },
      //获取名单导入列表
      async telecomListFn(kefu_id, text) {
        const res = await this.$axios.request({
          url: '/kefu/telecom/list',
          method: 'GET',
          params: {
            kefu_id: kefu_id
          }
        })
        // this.loading.page = false
        if (res.status !== 200) {
          this.$msg({
            type: 'error',
            message: res.message
          })
          return false
        }
        text=='name' ? this.nameTelecomId = res.data : this.telephoneTelecomId = res.data
      },
      //获取详情列表
      async getTelephoneList(index = 1) {
        // this.loading.page = true
        this.telephonePage.currentPage = index
        const req = { ...this.telephoneInfo }
        req.start_time = req.start_time ? this.$dateTimeFormat(req.start_time) : ''
        req.end_time = req.end_time ? this.$dateTimeFormat(req.end_time) : ''
        const res = await this.$axios.request({
          url: '/kefu/telecom/item',
          method: 'GET',
          params: {
            ...req,
            page: this.telephonePage.currentPage,
            page_size: this.telephonePage.pageSize
          }
        })
        // this.loading.page = false
        if (res.status !== 200) {
          this.$msg({
            type: 'error',
            message: res.message
          })
          return false
        }
        this.visible.telephoneList = true
        this.detailsData = []
        this.detailsData.push(res.attributes)
        this.telephoneSource = res.data
        this.telephonePage.total = res.attributes && res.attributes.total ? res.attributes.total : 0
      },
      // 导出
      async exportDataAjax(){
        const res = await this.$axios.request({
          url: '/kefu/telecom/item/export',
          method: 'GET',
          responseType: 'blob',
          params: {
            ...this.telephoneInfo
          }
        })
        if (res.status !== 200) {
          this.$msg({
            type: 'error',
            message: res.message
          })
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

<style lang="less" scoped>
</style>
