<template>
  <div>
    <Spin v-if="loading.page" size="large" fix></Spin>
    <!-- <Card dis-hover class="query_box">
      <div class="query_con">
        <div class="item">
          <span>{{ i18n_lang.application0 }}</span>
          <Input v-model="searchInfo.name" :placeholder="``" clearable style="width: 150px"/>
        </div>
        <div class="item">
          <span>{{ i18n_lang.application1 }}</span>
          <Select v-model="searchInfo.contact_type" clearable style="width:150px">
            <Option value>{{ i18n_lang.application2 }}</Option>
            <Option v-for="item in contactType" :key="item.key" :value="item.key">{{ item.name }}</Option>
          </Select>
        </div>
        <div class="item">
          <span>{{ i18n_lang.application3 }}</span>
          <Select v-model="searchInfo.status" clearable style="width:150px">
            <Option value>{{ i18n_lang.application2 }}</Option>
            <Option v-for="item in statusList" :key="item.key" :value="item.key">{{ item.name }}</Option>
          </Select>
        </div>
        <div class="item">
          <span>{{ i18n_lang.application4 }}</span>
          <DatePicker
            v-model="timeText"
            type="daterange"
            placeholder
            style="width: 200px"
            clearable
            @on-change="selectTime"
          ></DatePicker>
          <DatePicker v-model="searchInfo.start" type="datetime" placeholder style="width: 180px"></DatePicker>
          <span>-</span>
          <DatePicker v-model="searchInfo.end" type="datetime" placeholder style="width: 180px"></DatePicker>
        </div>
        <div class="item">
          <Button type="primary" icon="ios-search" class="marginRight" @click="search">{{ i18n_lang.application5 }}</Button>
          <Button type="primary" style="margin-left: 5px;" icon="md-refresh" @click="reset">{{ i18n_lang.application6 }}</Button>
          <Button type="primary" style="margin-left: 5px;" icon="md-download" @click="exportDataAjax">{{i18n_lang.application36}}</Button>exportData exportDataAjax v-if="allRoutes.indexOf('325') > -1"
        </div>
      </div>
    </Card>
    <Table ref="table" border :columns="level_1_list" :data="dataSource" style="margin-top: 20px"></Table> -->
    <!-- <Page
      class="page_box"
      show-sizer
      :current="page.currentPage"
      :page-size-opts="page.pageSizes"
      :page-size="page.pageSize"
      :total="page.total"
      @on-change="getList"
      @on-page-size-change="changePageSize"
    ></Page> -->
    <Tabs v-model="curTab" @on-click="tabsFn">
      <TabPane :label="`${i18n_lang.application37}`" name="1">
        <Card dis-hover class="query_box">
          <div class="query_con">
            <div class="item">
              <span>{{ i18n_lang.application0 }}</span>
              <Input v-model="searchInfo.name" :placeholder="``" clearable style="width: 150px"/>
            </div>
            <div class="item">
              <span>{{ i18n_lang.application1 }}</span>
              <Select v-model="searchInfo.contact_type" clearable style="width:150px">
                <Option value>{{ i18n_lang.application2 }}</Option>
                <Option v-for="item in contactType" :key="item.key" :value="item.key">{{ item.name }}</Option>
              </Select>
            </div>
            <div class="item">
              <span>{{ i18n_lang.application3 }}</span>
              <Select v-model="searchInfo.status" clearable style="width:150px">
                <Option value>{{ i18n_lang.application2 }}</Option>
                <Option v-for="item in statusList" :key="item.key" :value="item.key">{{ item.name }}</Option>
              </Select>
            </div>
            <div class="item">
              <span>{{ i18n_lang.application4 }}</span>
              <DatePicker v-model="searchInfo.start" type="datetime" placeholder style="width: 180px"></DatePicker>
              <span>-</span>
              <DatePicker v-model="searchInfo.end" type="datetime" placeholder style="width: 180px"></DatePicker>
            </div>
            <div class="item">
              <Button type="primary" icon="ios-search" class="marginRight" @click="search">{{ i18n_lang.application5 }}</Button>
              <Button type="primary" style="margin-left: 5px;" icon="md-refresh" @click="reset">{{ i18n_lang.application6 }}</Button>
              <Button type="primary" style="margin-left: 5px;" icon="md-download" @click="exportDataAjax">{{i18n_lang.application36}}</Button>
            </div>
          </div>
        </Card>
        <Table ref="table" border :columns="level_1_list" :data="dataSource" style="margin-top: 20px"></Table>
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
      </TabPane>
      <TabPane :label="`${i18n_lang.application38}`" name="2">
        <Card dis-hover class="query_box">
          <div class="query_con">
            <div class="item">
              <span>{{ i18n_lang.application0 }}</span>
              <Input v-model="searchInfo.name" :placeholder="``" clearable style="width: 150px"/>
            </div>
            <div class="item">
              <span>{{i18n_lang.application39}}</span>
              <Input v-model="searchInfo.agent_name" :placeholder="``" clearable style="width: 150px"/>
            </div>
            <div class="item">
              <span>{{ i18n_lang.application1 }}</span>
              <Select v-model="searchInfo.contact_type" clearable style="width:150px">
                <Option value>{{ i18n_lang.application2 }}</Option>
                <Option v-for="item in contactType" :key="item.key" :value="item.key">{{ item.name }}</Option>
              </Select>
            </div>
            <div class="item">
              <span>{{ i18n_lang.application3 }}</span>
              <Select v-model="searchInfo.status" clearable style="width:150px">
                <Option value>{{ i18n_lang.application2 }}</Option>
                <Option v-for="item in statusList" :key="item.key" :value="item.key">{{ item.name }}</Option>
              </Select>
            </div>
            <div class="item">
              <span>{{ i18n_lang.application4 }}</span>
              <DatePicker v-model="searchInfo.start" type="datetime" placeholder style="width: 180px"></DatePicker>
              <span>-</span>
              <DatePicker v-model="searchInfo.end" type="datetime" placeholder style="width: 180px"></DatePicker>
            </div>
            <div class="item">
              <Button type="primary" icon="ios-search" class="marginRight" @click="search">{{ i18n_lang.application5 }}</Button>
              <Button type="primary" style="margin-left: 5px;" icon="md-refresh" @click="reset">{{ i18n_lang.application6 }}</Button>
              <Button type="primary" style="margin-left: 5px;" icon="md-download" @click="exportDataAjax">{{i18n_lang.application36}}</Button>
            </div>
          </div>
        </Card>
        <Table ref="table" border :columns="subordinate_list" :data="dataSource" style="margin-top: 20px"></Table>
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
      </TabPane>
      <TabPane :label="`${i18n_lang.application42_v1_2_4_9}`" name="3">
        <div class="moban_content">
          <div>
            <span class="fontsize">{{`${i18n_lang.application43_v1_2_4_9}：`}}</span>
            <Input style="width: 60%;" v-model="moban.desc" :placeholder="``"/>
          </div>
          <div v-for="(item, index) in moban.question" :key="index">
            <span class="fontsize">{{`${i18n_lang.application44_v1_2_4_9}：`}}</span>
            <span class="fontsize margin_left">{{`${i18n_lang.application45_v1_2_4_9}：`}}</span>
            <Select v-model="item.type" style="width:100px">
              <Option :value="1">{{`${i18n_lang.application46_v1_2_4_9}`}}</Option>
              <Option :value="2">{{`${i18n_lang.application47_v1_2_4_9}`}}</Option>
              <Option :value="3">{{`${i18n_lang.application48_v1_2_4_9}`}}</Option>
            </Select>
            <span class="fontsize margin_left">{{`${i18n_lang.application49_v1_2_4_9}：`}}</span>
            <Select v-model="item.required" style="width:100px">
              <Option :value="1">{{`${i18n_lang.application50_v1_2_4_9}`}}</Option>
              <Option :value="2">{{`${i18n_lang.application51_v1_2_4_9}`}}</Option>
            </Select>
            <span class="fontsize margin_left">{{`${i18n_lang.application59_v1_2_4_9}`}}</span>
            <Input style="width: 50px;" v-model="item.sort" :placeholder="``"/>
            <Button type='error' size='small' style='margin-left:10px' @click="issueHandle(index + 1)">{{`${i18n_lang.application52_v1_2_4_9}`}}</Button>
            <div style="margin-top: 10px;">
              <span class="fontsize">{{`${i18n_lang.application53_v1_2_4_9}：`}}</span>
              <Input style="width: 60%;" v-model="item.title" :placeholder="``"/>
            </div>
            <div style="margin-top: 10px;" v-if="item.type != 3">
              <div class="fontsize">{{`${i18n_lang.application57_v1_2_4_9}：`}}<Button type='primary' size='small' style='margin-left:10px' @click="selectRegulationHandle(index, 'add')">{{`${i18n_lang.application54_v1_2_4_9}`}}</Button></div>
              <div class="issue" style="margin-top: 10px;">
                <span v-for="(items, indexs) in item.option" :key="indexs" style="display: inline-block; width: 120px;">
                  <Input v-model="items.text"></Input>
                </span>
                <Button type='error' size='small' style='margin-left:10px' v-if="item.option.length > 1" @click="selectRegulationHandle(index, 'delete')">{{`${i18n_lang.application52_v1_2_4_9}`}}</Button>
              </div>
            </div>
          </div>
          <div>
            <Button type='primary' @click="issueHandle()">{{`${i18n_lang.application55_v1_2_4_9}`}}</Button>
            <Button :loading="loading.btn" type='primary' style="float: right;" @click="saveIssue()">{{`${i18n_lang.application56_v1_2_4_9}`}}</Button>
          </div>
        </div>
      </TabPane>
    </Tabs>
    <!-- 审核 -->
    <Modal v-model="visible.handle" :title="`${i18n_lang.application7}`">
      <Form
        ref="handleInfo"
        :model="handleInfo"
        :label-width="100"
        :rules="ruleValidate"
      >
        <FormItem :label="`${i18n_lang.application8}`" prop="name">
          <Input v-model="handleInfo.name" disabled :placeholder="``"/>
        </FormItem>
        <FormItem :label="`${i18n_lang.application9}`" prop="level">
          <Input v-model="handleInfo.level" disabled :placeholder="``"/>
        </FormItem>
        <FormItem :label="`${i18n_lang.application58_v1_2_4_9}`" v-if="handleInfo.question.length">
          <div v-for="(item, index) in handleInfo.question" :key="index">
            <div style="font-size: 14px;font-weight: bold;word-wrap: break-word;">
              <span style="color: red;" v-if="item.required == 1">*</span>
              {{item.title}}
            </div>
            <div style="word-wrap: break-word;" v-for="(items, indexs) in item.selected" :key="indexs" v-if="item.type != 3">
              <div style="overflow: hidden;">
                <span class="radio" v-if="item.type == 1"></span>
                <span class="checkbox" v-if="item.type == 2"></span>
                <span style="display: inline-block;width: calc(100% - 15px);float: left;margin-left: 5px;" v-for="itemss in items">{{itemss}}</span>
              </div>
            </div>
            <Input type="textarea" :rows="3" v-model="item.selected" disabled v-if="item.type == 3"/>
          </div>
        </FormItem>
        <FormItem :label="`${i18n_lang.application10}`" prop="contact_value" v-if="!handleInfo.question.length">
          <!-- <span>{{handleInfo.contact_type}} ---</span>
          <Input v-model="handleInfo.contact_value" disabled :placeholder="``" style="width: 300px;float: right;"/> -->
        </FormItem>
        <FormItem :label="`${handleInfo.contact_type}`" prop="contact_value" v-if="!handleInfo.question.length">
          <Input v-model="handleInfo.contact_value" disabled :placeholder="``"/>
        </FormItem>
        <FormItem :label="`${i18n_lang.application19}`" prop="reason" v-if="!handleInfo.question.length">
          <Input type="textarea" :rows="3" v-model="handleInfo.reason" disabled :placeholder="``"/>
        </FormItem>
        <!-- <FormItem :label="`${i18n_lang.application11}`" prop="remark">
          <Input type="textarea" :rows="3" v-model="handleInfo.remark" :placeholder="`${i18n_lang.application12}`"/>
        </FormItem> -->
        <FormItem :label="`${i18n_lang.application34}`" prop="reply">
          <Input type="textarea" :rows="3" v-model="handleInfo.reply" :placeholder="` `"/>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" :loading="loading.btn" @click="handleSave('2')">{{ i18n_lang.application13 }}</Button>
        <Button :loading="loading.btn" @click="handleSave('1')">{{ i18n_lang.application14 }}</Button>
      </div>
    </Modal>
    <!-- 修改调整 -->
    <Modal v-model="visible.look" :title="`${i18n_lang.application7}`">
      <Form
        ref="handleInfo"
        :model="handleInfo"
        :label-width="100"
        :rules="ruleValidate"
      >
        <FormItem :label="`${i18n_lang.application8}`" prop="name">
          <Input v-model="handleInfo.name" disabled :placeholder="``"/>
        </FormItem>
        <FormItem :label="`${i18n_lang.application9}`" prop="level">
          <Input v-model="handleInfo.level" disabled :placeholder="``"/>
        </FormItem>
        <FormItem :label="`${i18n_lang.application58_v1_2_4_9}`" v-if="handleInfo.question.length">
          <div v-for="(item, index) in handleInfo.question" :key="index">
            <div style="font-size: 14px;font-weight: bold;word-wrap: break-word;">
              <span style="color: red;" v-if="item.required == 1">*</span>
              {{item.title}}
            </div>
            <div style="word-wrap: break-word;" v-for="(items, indexs) in item.selected" :key="indexs" v-if="item.type != 3">
              <span v-for="itemss in items">{{itemss}}</span>
            </div>
            <Input type="textarea" :rows="3" v-model="item.selected" disabled v-if="item.type == 3"/>
          </div>
        </FormItem>
        <FormItem :label="`${i18n_lang.application10}`" prop="contact_value" v-if="!handleInfo.question.length">
          <!-- <span>{{handleInfo.contact_type}} ---</span>
          <Input v-model="handleInfo.contact_value" disabled :placeholder="``" style="width: 300px;float: right;"/> -->
        </FormItem>
        <FormItem :label="`${handleInfo.contact_type}`" prop="contact_value" v-if="!handleInfo.question.length">
          <Input v-model="handleInfo.contact_value" disabled :placeholder="``"/>
        </FormItem>
        <FormItem :label="`${i18n_lang.application19}`" prop="reason" v-if="!handleInfo.question.length">
          <Input type="textarea" :rows="3" v-model="handleInfo.reason" disabled :placeholder="``"/>
        </FormItem>
        <FormItem :label="`${i18n_lang.application34}`" prop="reply" v-if="!handleInfo.question.length">
          <Input type="textarea" :rows="3" v-model="handleInfo.reply" disabled :placeholder="``"/>
        </FormItem>
        <FormItem :label="`${i18n_lang.application11}`" prop="remark">
          <Input type="textarea" :rows="3" v-model="handleInfo.remark" :placeholder="`${i18n_lang.application12}`"/>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" :loading="loading.btn" @click="saveData()">{{i18n_lang.application32}}</Button>
        <Button :loading="loading.btn" @click="visible.look = false">{{i18n_lang.application33}}</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import { level_1_list, subordinate_list } from './columns'
  const searchInfo = {
    name: "",
    contact_type: "",
    status: "",
    start: "",
    end: "",
    type: "",
    agent_name: ""
  }
  export default {
    data() {
      const i18n_lang = this.$t('application');
      return {
        i18n_lang: i18n_lang,
        level_1_list: level_1_list(this),
        subordinate_list: subordinate_list(this),
        loading: {
          page: false,
          btn: false
        },
        visible: {
          handle: false,
          look: false
        },
        contactType: [
          {
            key: '1',
            name: 'Phone'
          },
          {
            key: '2',
            name: 'Line'
          },
          {
            key: '3',
            name: 'Email'
          },
          {
            key: '4',
            name: 'Ws'
          },
          {
            key: '5',
            name: 'FB'
          },
          {
            key: '6',
            name: 'IG'
          },
          {
            key: '7',
            name: 'WeChat'
          },
          {
            key: '8',
            name: 'Viber'
          },
          {
            key: '9',
            name: 'Other'
          }
        ],
        statusList: [
          {
            name: `${i18n_lang.application22}`,
            key: '0'
          },
          {
            name: `${i18n_lang.application13}`,
            key: '2'
          },
          {
            name: `${i18n_lang.application14}`,
            key: '1'
          }
        ],
        searchInfo: { ...searchInfo },
        timeText: [ searchInfo.start, searchInfo.end ],
        page: {
          pageSize: 10,
          total: 0,
          currentPage: 1,
          pageSizes: [20, 50, 100, 1000]
        },
        dataSource: [],
        handleInfo: {
          id: '',
          name: '',
          level: '',
          contact_type: '',
          contact_value: '',
          reason: '',
          remark: '',
          reply: '',
          question: []
        },
        ruleValidate: {},
        curTab: "1",
        moban: {
          desc: '',
          question: [
            {
              title:"",
              type: 1,
              required: 1,
              option: [],
              sort: ''
            }
          ]
        },
        radio: 'true'
      }
    },
    created() {
      this.getList()
      this.agentTemplete()
    },
    methods: {
      // tabs切换
      tabsFn(name){
        // console.log(name, this.curTab)
        if(name != 3){
          this.searchInfo = { ...searchInfo }
          this.searchInfo.type = name
          this.getList()
        }else{
          this.agentTemplete()
        }
      },
      // 选择日期
      selectTime(val) {
        [ this.searchInfo.start, this.searchInfo.end ] = val
      },
      // 查询
      search() {
        this.getList()
      },
      reset(){
        this.timeText = [ searchInfo.start, searchInfo.end ],
        this.searchInfo = { ...searchInfo }
        this.getList()
      },
      //操作
      handle(row){
        this.handleInfo = {
          id: row.id,
          name: row.name,
          level: row.level,
          contact_type: row.contact_type,
          contact_value: row.contact_value,
          reason: row.reason,
          remark: '',
          reply: row.reply ? row.reply : '',
          question: row.question ? row.question : []
        }
        this.visible.handle = true
      },
      //详情
      handleLook(row){
        this.handleInfo = {
          id: row.id,
          name: row.name,
          level: row.level,
          contact_type: row.contact_type,
          contact_value: row.contact_value,
          reason: row.reason,
          remark: row.remark,
          reply: row.reply ? row.reply : '',
          question: row.question ? row.question : []
        }
        this.visible.look = true
      },
      // 代理问题模板增加删除
      issueHandle(index){
        if(index){
          this.moban.question.splice(index - 1, 1)
        }else{
          let obj = {
              title: "",
              type: 1,
              required: 1,
              option: [],
              sort: ''
            }
          this.moban.question.push(obj)
        }
      },
      // 代理问题选择增加删除
      selectRegulationHandle(index, text){
        if(text == 'add'){
          let obj = {
            text: ''
          }
          this.moban.question[index].option.push(obj)
        }
        if(text == 'delete'){
          this.moban.question[index].option.pop()
        }
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
        req.start = req.start ? this.$dateTimeFormat(new Date(req.start)) : ''
        req.end = req.end ? this.$dateTimeFormat(new Date(req.end)) : ''
        const res = await this.$axios.request({
          url: '/user/agent/apply',
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
      },
      // 审核操作
      async handleSave(number){
        this.loading.btn = true
        const req = {
          status: number,
          // remark: this.handleInfo.remark,
          reply: this.handleInfo.reply
        }
        const res = await this.$axios.request({
          url: `/user/agent/apply/${this.handleInfo.id}`,
          method: 'PUT',
          data: {
            ...req
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
        this.visible.handle = false
        this.getList()
      },
      //修改编辑
      async saveData(){
        this.loading.btn = true
        const req = {
          remark: this.handleInfo.remark
        }
        const res = await this.$axios.request({
          url: `/user/agent/apply/${this.handleInfo.id}`,
          method: 'POST',
          data: {
            ...req
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
        this.visible.look = false
        this.getList()
      },
      // 删除
      async handleDelete(row){
        const res = await this.$axios.request({
          url: `user/agent/apply/${row.id}`,
          method: 'DELETE',
          data: {}
        })
        if (res.status !== 200 || res.state != 0) {
          this.$msg({
            type: 'error',
            message: res.message
          })
          return false
        }
        this.getList()
      },
      // 导出
      async exportDataAjax(){
        const req = { ...this.searchInfo }
        req.start = req.start ? this.$dateTimeFormat(new Date(req.start)) : ''
        req.end = req.end ? this.$dateTimeFormat(new Date(req.end)) : ''
        const res = await this.$axios.request({
          url: '/user/agent/apply/export',
          method: 'GET',
          responseType: 'blob',
          params: {
            ...req
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
      },
      // 代理申请模板获取
      async agentTemplete(){
        const res = await this.$axios.request({
          url: '/user/agent/templete',
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
        res.data.question.forEach((item, index) => {
          let option = []
          item.option.forEach((items, indexs) => {
            option.push({
              text: items
            })
          })
          item.option = option
        })
        this.moban = res.data
      },
      // 代理问题保存
      async saveIssue(){
        this.loading.btn = true
        const req = {
          ...this.moban
        }
        req.question.forEach((item, index) => {
          let option = []
          item.option.forEach((items, indexs) => {
            option.push(items.text)
          })
          item.option = option
        })
        const res = await this.$axios.request({
          url: `/user/agent/templete`,
          method: 'POST',
          data: {
            ...req
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
        this.agentTemplete()
      }
    }
  }
</script>

<style lang="less" scoped>
  .moban_content{
    width: 60%;
    &>div{
      margin-top: 20px;
      padding-bottom: 20px;
      border-bottom: 1px dashed #ccc;
      &:first-child{
        margin-top: 0;
        border: none;
      }
      &:last-child{
        border: none;
      }
    }
  }
  .fontsize{
    font-size: 14px;
    &.margin_left{
      margin-left: 10px;
    }
  }
  .issue{
    &>span{
      margin-left: 10px;
      margin-top: 5px;
      &:nth-child(5n + 1){
        margin-left: 0;
      }
      &:nth-child(1), &:nth-child(2), &:nth-child(3), &:nth-child(4), &:nth-child(5){
        margin-top: 0;
      }
    }
  }
  .radio{
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 1px solid #ccc;
    float: left;
    margin-top: 12px;
    position: relative;
    &:before {
      content: '';
      display: inline-block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #ccc;
      position: absolute;
      left: 1px;
      top: 1px;
    }
  }
  .checkbox{
    display: inline-block;
    width: 10px;
    height: 10px;
    border: 1px solid #ccc;
    float: left;
    margin-top: 12px;
    position: relative;
    &:before {
      content: '\2714';
      color: black;
      position: absolute;
      top: -13px;
    }
  }
</style>
