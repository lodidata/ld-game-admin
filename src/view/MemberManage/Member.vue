<template>
  <div id="Member">
    <Spin v-if="loading.page" size="large" fix></Spin>
    <Card dis-hover class="query_box">
      <div class="query_con">
        <div class="item">
          <span>{{i18n_lang.memberManage2}}</span>
          <Input v-model="searchInfo.name" :placeholder="i18n_lang.memberManage3" clearable style="width: 150px"/>
        </div>
        <!-- <div class="item">
          <span>{{i18n_lang.memberManage104}}</span>
          <Input v-model="searchInfo.name" :placeholder="`${i18n_lang.memberManage105}`" clearable style="width: 150px"/>
        </div> -->
        <div class="item">
          <span>{{i18n_lang.memberManage4}}</span>
          <Input v-model="searchInfo.agent" :placeholder="i18n_lang.memberManage5" clearable style="width: 150px"/>
        </div>
        <div class="item">
          <span>{{i18n_lang.memberManage6}}</span>
          <Input v-model="searchInfo.truename" :placeholder="i18n_lang.memberManage7" clearable style="width: 150px"/>
        </div>
        <div class="item">
          <span>{{i18n_lang.memberManage8}}</span>
          <Input v-model="searchInfo.mobile" :placeholder="i18n_lang.memberManage9" clearable style="width: 150px"/>
        </div>
        <div class="item">
          <span>{{i18n_lang.memberManage10}}</span>
          <Select v-model="searchInfo.level" multiple clearable style="width:150px">
            <Option value>{{i18n_lang.memberManage11}}</Option>
            <Option v-for="item in levelList" :key="item.level" :value="item.level">{{ item.name }}</Option>
          </Select>
        </div>
        <div class="item">
          <span>{{i18n_lang.memberManage12}}</span>
          <Select v-model="searchInfo.state" clearable style="width:150px">
            <Option value>{{i18n_lang.memberManage13}}</Option>
            <Option value="0">{{i18n_lang.memberManage14}}</Option>
            <Option value="1">{{i18n_lang.memberManage15}}</Option>
          </Select>
        </div>
        <div class="item">
          <span>{{i18n_lang.memberManage106}}</span>
          <Input v-model="searchInfo.reg_ip" :placeholder="`${i18n_lang.memberManage107}`" clearable style="width: 150px"/>
        </div>
        <div class="item">
          <span>{{i18n_lang.memberManage111}}</span>
          <Input v-model="searchInfo.card" :placeholder="`${i18n_lang.memberManage112}`" clearable style="width: 150px"/>
          <!-- กรุณากรอกหมายเลขบัญชีธนาคาร 请输入银行卡号 -->
        </div>
        <div class="item">
          <span>{{i18n_lang.memberManage74}}</span>
          <Select v-model="searchInfo.origin" clearable style="width:150px">
            <Option value="1">PC</Option>
            <Option value="2">H5</Option>
            <Option value="3">IOS</Option>
            <Option value="4">android</Option>
          </Select>
        </div>
        <div class="item">
          <span>{{i18n_lang.memberManage113}}</span>
          <Input v-model="searchInfo.channel_id" :placeholder="` `" clearable style="width: 150px"/>
        </div>
        <div class="item">
          <span>{{i18n_lang.memberManage115}}</span>
          <Select v-model="searchInfo.agent_switch" clearable style="width:150px">
            <Option value>{{i18n_lang.memberManage13}}</Option>
            <Option value="1">{{i18n_lang.memberManage80}}</Option>
            <Option value="0">{{i18n_lang.memberManage79}}</Option>
          </Select>
        </div>
      </div>
      <div class="query_con">
        <div class="item">
          <span>{{i18n_lang.memberManage16}}</span>
          <DatePicker
            v-model="reginTime"
            type="daterange"
            placeholder
            style="width: 200px"
            clearable
            @on-change="selectTime"
          ></DatePicker>
        </div>
        <div class="item">
          <span>{{`${i18n_lang.memberManage118_4_3}：`}}</span>
          <DatePicker
            v-model="loginTime"
            type="daterange"
            placeholder
            style="width: 200px"
            clearable
            @on-change="selectLoginTime"
          ></DatePicker>
        </div>
        <div class="item">
          <span>{{i18n_lang.memberManage87}}</span>
          <Select v-model="searchInfo.proportion_status" clearable style="width:150px">
            <Option value>{{i18n_lang.memberManage88}}</Option>
            <Option :key="1" :value="1">{{i18n_lang.memberManage89}}</Option>
            <Option :key="2" :value="2">{{i18n_lang.memberManage90}}</Option>
          </Select>
        </div>
        <div class="item">
          <span>{{i18n_lang.memberManage109}}:</span>
          <Select v-model="searchInfo.profit_loss_status" clearable style="width:150px">
            <Option value>{{i18n_lang.memberManage88}}</Option>
            <Option :key="'1'" :value="'1'">{{i18n_lang.memberManage89}}</Option>
            <Option :key="'2'" :value="'2'">{{i18n_lang.memberManage90}}</Option>
          </Select>
        </div>
        <div class="item">
          <span>{{i18n_lang.memberManage114}}：</span>
          <Input v-model="searchInfo.game_account" :placeholder="` `" clearable style="width: 150px"/>
        </div>
        <div class="item">
          <Button type="primary" icon="ios-search" class="marginRight" @click="search">{{i18n_lang.memberManage17}}</Button>
          <Button type="primary" style="margin-left: 5px;" icon="md-refresh" @click="reset">{{i18n_lang.memberManage108}}</Button>
          <Button type="primary" style="margin-left: 5px;" icon="md-download" @click="exportDataAjax" v-if="allRoutes.indexOf('325') > -1">{{i18n_lang.memberManage18}}</Button><!-- exportData exportDataAjax-->
        </div>
      </div>
    </Card>
    <div class="more">
      <Button type="primary" icon="md-add" @click="addUser">{{i18n_lang.memberManage19}}</Button>
    </div>
    <Table ref="table" border :columns="columnsMember" :data="dataSource"
      @on-select="handleSelect"
      @on-select-cancel="handleCancel"
      @on-select-all="handleSelectAll"
      @on-select-all-cancel="handleSelectAll"
      @on-sort-change="sortTable"
    ></Table>
    <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{ `${i18n_lang.memberManage116}${page.total}${i18n_lang.memberManage117}` }}</div>
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

    <!-- 转移 -->
    <Modal v-model="visible.modelBox" :title="i18n_lang.memberManage20">
      <Form ref="madalForm" :model="info" :label-width="80" :rules="ruleValidate1">
        <FormItem :label="i18n_lang.memberManage21" prop="agencyNum">
          <Input
            v-model="info.agencyNum"
            :placeholder="i18n_lang.memberManage22"
            @on-change="func"
            @on-focus="boxShow"
          />
          <ul v-if="agentList.length > 0 && visible.isShow" class="agentListBox">
            <li v-for="item in agentList" :key="item.name" @click="changeCurrentAgent(item)">
              <span>{{ item.name }}</span>
            </li>
          </ul>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" :loading="loading.btn" @click="sureBtn">{{i18n_lang.memberManage23}}</Button>
      </div>
    </Modal>

    <!-- 添加用户 -->
    <Modal v-model="visible.addModal" :loading="true" :title="i18n_lang.memberManage24">
      <Form
        v-if="visible.addModal"
        ref="addInfo"
        :model="addInfo"
        :label-width="80"
        :rules="ruleValidate2"
      >
        <FormItem :label="i18n_lang.memberManage25" prop="user_name">
          <Input v-model="addInfo.user_name" placeholder style="width: 200px"/>
        </FormItem>
        <FormItem :label="i18n_lang.memberManage26" prop="password">
          <Input v-model="addInfo.password" placeholder style="width: 200px" type="password"/>
        </FormItem>
        <FormItem :label="i18n_lang.memberManage27" prop="password1">
          <Input v-model="addInfo.password1" placeholder style="width: 200px" type="password"/>
        </FormItem>
        <FormItem :label="i18n_lang.memberManage28" prop="is_test">
          <RadioGroup v-model="addInfo.is_test">
            <Radio label="1">{{i18n_lang.memberManage29}}</Radio>
            <Radio label="0">{{i18n_lang.memberManage30}}</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem v-for="(tt, j) in rake_back" :key="j" :label="`${tt.key_desc}${i18n_lang.memberManage31}`" prop="GAME">
          <Input v-model="addInfo[tt.key]" placeholder style="width: 200px"/>
          {{ tt.desc }}
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="visible.addModal = false">{{i18n_lang.memberManage32}}</Button>
        <Button type="primary" :loading="loading.add" @click="createUser">{{i18n_lang.memberManage33}}</Button>
      </div>
    </Modal>

    <!-- 占成设置 -->
    <Modal v-model="visible.accounted" :title="`${i18n_lang.memberManage92}`">
      <Form
        :label-width="100"
        style="width: 400px">
        <FormItem :label="`${i18n_lang.memberManage93}`">
          <RadioGroup v-model="accountedForm.proportion_type">
            <Radio :label="1">{{i18n_lang.memberManage94}}</Radio>
            <Radio :label="2">{{i18n_lang.memberManage95}}</Radio>
          </RadioGroup>
        </FormItem>
        <!-- <FormItem :label="`${i18n_lang.memberManage96}`" prop="proportion_value">
          <Input v-model="accountedForm.proportion_value"/>
        </FormItem> -->
        <FormItem v-for="(item, index) in gameArrar" :key="index" :label="item.rename">
          <Input v-model="item.text"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" class="btn" @click="saveAccountedData()">{{i18n_lang.memberManage97}}</Button>
      </div>
    </Modal>
    <!-- 盈亏占成 -->
    <Modal v-model="visible.profit" :title="`${i18n_lang.memberManage109}`">
      <div style="color: #ccc;margin-bottom: 10px;">{{i18n_lang.memberManage110}}</div>
      <Form
      :label-width="100"
      style="width: 400px"
      >
        <FormItem v-for="(item, index) in gameArrar" :key="index" :label="item.rename">
          <Input v-model="item.text"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" class="btn" @click="saveProfitData()">{{i18n_lang.memberManage97}}</Button>
      </div>
    </Modal>

    <!-- 账号停用备注 -->
    <Modal v-model="visible.accountDisabled" :title="`${i18n_lang.memberManage101}`">
      <Form :label-width="100" style="width: 400px">
        <FormItem :label="`${i18n_lang.memberManage102}`">
          <Input type="textarea" :rows="3" v-model="forbidden_des"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" class="btn" :loading="loading.btn" @click="handleState(accountMsg.row, accountMsg.state, 1)">{{i18n_lang.memberManage23}}</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { computeDay } from '@/libs/handleDate'
import excel from '@/libs/excel'
import { throttle } from '@/libs/tools'
import columnsMember from './columnsMember'

const searchInfo = {
  id: '',
  name: '',
  agent: '',
  truename: '',
  mobile: '',
  level: '',
  state: '',
  // register_from: computeDay(-7),
  // register_to: computeDay(),
  register_from: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
  register_to: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
  field_id: '',
  sort_way: '',
  proportion_status: '',
  reg_ip: '',
  profit_loss_status: '',
  card: '',
  origin: '',
  channel_id: '',
  game_account: '',
  agent_switch: '',
  last_login: '',
  last_login_end: ''
}

const initAddData = {
  user_name: '', // 用户名
  password: '', // 密码
  password1: '', // 重复密码
  is_test: '' // 是否测试
}

export default {
  data() {
    const i18n_lang = this.$t('memberManage');
    return {
      i18n_lang: i18n_lang,
      loading: {
        page: false,
        btn: false,
        add: false
      },
      visible: {
        modelBox: false,
        isShow: false,
        addModal: false,
        accounted: false,
        accountDisabled: false,
        profit: false
      },
      reginTime: [searchInfo.register_from, searchInfo.register_to],
      loginTime: [searchInfo.last_login, searchInfo.last_login_end],
      searchInfo: { ...searchInfo },
      uidList: [],
      dataSource: [],
      info: {
        agencyNum: ''
      },
      selectAgent: {},
      agentId: '',
      columnsMember: columnsMember(this),
      agentList: [],
      page: {
        pageSize: 20,
        total: 0,
        currentPage: 1,
        pageSizes: [20, 50, 100, 1000]
      },
      func: null,
      addInfo: { ...initAddData },
      rake_back: [],
      ruleValidate1: {
        agencyNum: [{ required: true, message: i18n_lang.memberManage34 }]
      },
      ruleValidate2: {
        user_name: [{ required: true, message: i18n_lang.memberManage35, trigger: 'blur' }],
        password: [{ required: true, message: i18n_lang.memberManage36, trigger: 'blur' }],
        password1: [{ required: true, message: i18n_lang.memberManage37, trigger: 'blur' }],
        is_test: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error(i18n_lang.memberManage38))
              } else {
                callback()
              }
            }
          }
        ],
        GAME: [
          {
            trigger: 'change',
            required: true,
            validator: (rule, value, callback) => {
              if (value !== '') {
                if (/^([1-9]\d*|[0]{1,1})$/.test(value)) {
                  callback()
                } else {
                  callback(new Error(i18n_lang.memberManage39))
                }
              }
              callback()
            }
          }
        ],
        LIVE: [
          {
            trigger: 'change',
            required: true,
            validator: (rule, value, callback) => {
              if (value !== '') {
                if (/^([1-9]\d*|[0]{1,1})$/.test(value)) {
                  callback()
                } else {
                  callback(new Error(i18n_lang.memberManage39))
                }
              }
              callback()
            }
          }
        ],
        SPORT: [
          {
            trigger: 'change',
            required: true,
            validator: (rule, value, callback) => {
              if (value !== '') {
                if (/^([1-9]\d*|[0]{1,1})$/.test(value)) {
                  callback()
                } else {
                  callback(new Error(i18n_lang.memberManage39))
                }
              }
              callback()
            }
          }
        ],
        CP: [
          {
            trigger: 'change',
            required: true,
            validator: (rule, value, callback) => {
              if (value !== '') {
                if (/^([1-9]\d*|[0]{1,1})$/.test(value)) {
                  callback()
                } else {
                  callback(new Error(i18n_lang.memberManage39))
                }
              }
              callback()
            }
          }
        ],
        QP: [
          {
            trigger: 'change',
            required: true,
            validator: (rule, value, callback) => {
              if (value !== '') {
                if (/^([1-9]\d*|[0]{1,1})$/.test(value)) {
                  callback()
                } else {
                  callback(new Error(i18n_lang.memberManage39))
                }
              }
              callback()
            }
          }
        ]
      },
      accountedForm: {
        id: '',
        proportion_type: 1,
        proportion_value: ''
      },
      gameArrar: [],
      accountMsg: {
        row: '',
        state: ''
      },
      forbidden_des: '',
      profitForm: {
        id: '',
        profit_loss_value: ''
      }
    }
  },
  computed: {
    ...mapState({
      levelList: state => state.common.levelList,
      userAccounted: state => state.detail.userAccounted,
      allRoutes: state => state.user.allRoutes
    })
  },
  watch: {
    userAccounted(oldVal, newVal) {
      this.getList()
    }
  },
  created() {
    let parameter = sessionStorage.getItem('parameter') || '{}'
    if(JSON.parse(parameter).member){
      this.searchInfo = {
        id: JSON.parse(parameter).member.id ? JSON.parse(parameter).member.id : '',
        name: JSON.parse(parameter).member.name ? JSON.parse(parameter).member.name : '',
        agent: JSON.parse(parameter).member.agent ? JSON.parse(parameter).member.agent : '',
        truename: JSON.parse(parameter).member.truename ? JSON.parse(parameter).member.truename : '',
        mobile: JSON.parse(parameter).member.mobile ? JSON.parse(parameter).member.mobile : '',
        level: JSON.parse(parameter).member.level ? JSON.parse(parameter).member.level : '',
        state: JSON.parse(parameter).member.state ? JSON.parse(parameter).member.state : '',
        // register_from: computeDay(-7),
        // register_to: computeDay(),
        register_from: JSON.parse(parameter).member.register_from,
        register_to: JSON.parse(parameter).member.register_to,
        field_id: JSON.parse(parameter).member.field_id ? JSON.parse(parameter).member.field_id : '',
        sort_way: JSON.parse(parameter).member.sort_way ? JSON.parse(parameter).member.sort_way : '',
        proportion_status: JSON.parse(parameter).member.proportion_status ? JSON.parse(parameter).member.proportion_status : '',
        reg_ip: JSON.parse(parameter).member.reg_ip ? JSON.parse(parameter).member.reg_ip : '',
        profit_loss_status: JSON.parse(parameter).member.profit_loss_status ? JSON.parse(parameter).member.profit_loss_status : ''
      }
      this.reginTime = [this.searchInfo.register_from, this.searchInfo.register_to]
      // this.searchInfo.name = this.$route.query.username
      this.page.currentPage = JSON.parse(parameter).member.page
      this.page.pageSize = JSON.parse(parameter).member.page_size
      this.getList(JSON.parse(parameter).member.page)
    }else{
      this.searchInfo.name = this.$route.query.username
      this.getList()
    }
    // this.searchInfo.name = this.$route.query.username
    // this.getList()
    this.searchAgent()
    this.getRegister()
    this.$store.dispatch('common/level')
    this.func = this.OptionAgent()
  },
  methods: {
    ...mapActions({
      getUserDetail: 'detail/info'
    }),
    // 排序
    sortTable(key) {
      // console.log(key)
      if(key.key == 'balance'){
        this.searchInfo.field_id = 1
      }
      if(key.key == 'level'){
        this.searchInfo.field_id = 2
      }
      if(key.key == 'last_login'){
        this.searchInfo.field_id = 3
      }
      if(key.key == 'created'){
        this.searchInfo.field_id = 4
      }
      this.searchInfo.sort_way = key.order
      this.getList()
    },
    async getList(index = 1) {
      this.loading.page = true
      this.page.currentPage = index
      const req = { ...this.searchInfo }
      let level = ''
      if(this.searchInfo.level.length != 0){
        this.searchInfo.level.forEach((item, index) => {
          level += index == 0 ? `${item}` : `,${item}`
        })
      }
      req.level = level
      const res = await this.$axios.request({
        url: '/user/list',
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
      let parameterPage = sessionStorage.getItem('parameter') || "{}"
      let parameter = JSON.parse(parameterPage)
      parameter.member = {
        ...this.searchInfo,
        page: this.page.currentPage,
        page_size: this.page.pageSize
      }
      sessionStorage.setItem('parameter', JSON.stringify(parameter))
      this.dataSource = res.data
      this.page.total = res.attributes && res.attributes.total ? res.attributes.total : 0
    },
    // 新建用户返佣接口
    async getRegister() {
      const res = await this.$axios.request({
        url: '/user/register',
        method: 'GET'
      })
      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return false
      }
      if(res.data){
        this.rake_back = res.data.rake_back
        this.rake_back.forEach(o => {
          this.addInfo[o.key] = o.value
        })
      }
    },
    // 新建会员
    async createUser() {
      // TODO: 新建用户
      const { password, user_name, is_test, GAME, LIVE, SPORT, QP, CP } = this.addInfo
      const user = {
        password,
        user_name,
        is_test,
        rake_back: {
          GAME,
          LIVE,
          SPORT,
          QP,
          CP
        }
      }
      this.loading.add = true
      const res = await this.$axios.request({
        url: '/user/register',
        method: 'POST',
        data: user
      })
      this.loading.add = false
      if (res.status !== 200 || res.state != 0) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return false
      }
      this.visible.addModal = false
      this.getList()
    },
    // 选择日期
    selectTime(val) {
      [this.searchInfo.register_from, this.searchInfo.register_to] = val
    },
    // 选择日期
    selectLoginTime(val) {
      [this.searchInfo.last_login, this.searchInfo.last_login_end] = val
    },
    // 查询
    search() {
      this.getList()
    },
    reset(){
      this.reginTime = [searchInfo.register_from, searchInfo.register_to]
      this.loginTime = [searchInfo.last_login, searchInfo.last_login_end],
      this.searchInfo = { ...searchInfo }
      this.getList()
    },
    // 导出表格
    exportData() {
      if (this.dataSource.length) {
        const excelDate = JSON.parse(JSON.stringify(this.dataSource))
        excelDate.forEach((item, index) => {
          item.state = Number(item.state) === 1 ? this.i18n_lang.memberManage40 : this.i18n_lang.memberManage41
          switch (Number(item.origin)) {
            case 1:
              item.origin = 'pc'
              break
            case 2:
              item.origin = 'h5'
              break
            case 3:
              item.origin = 'ios'
              break
            case 4:
              item.origin = 'android'
              break
            default:
              break
          }
        })

        const params = {
          title: [
            this.i18n_lang.memberManage42,
            this.i18n_lang.memberManage43,
            this.i18n_lang.memberManage44,
            this.i18n_lang.memberManage45,
            this.i18n_lang.memberManage46,
            this.i18n_lang.memberManage47,
            this.i18n_lang.memberManage48,
            this.i18n_lang.memberManage49,
            'ip',
            this.i18n_lang.memberManage50,
            this.i18n_lang.memberManage51,
            this.i18n_lang.memberManage52
          ],
          key: [
            'username',
            'truename',
            'agent',
            'balance',
            'level',
            'state',
            'mobile',
            'created',
            'ip',
            'last_login',
            'last_ip',
            'origin'
          ],
          data: excelDate,
          autoWidth: true,
          filename: this.i18n_lang.memberManage53
        }
        excel.export_array_to_excel(params)
      }
    },
    handleSelect(slection, row){
      this.uidList.push(row.id)
    },
    handleCancel(slection, row){
      this.uidList.forEach((item, index) => {
        if(item == row.id){
          this.uidList.splice(index, 1)
        }
      })
    },
    handleSelectAll(slection){
      if(slection.length){
        slection.forEach(item => {
          this.uidList.push(item.id)
        })
      }else{
        this.uidList = []
      }
    },
    async exportDataAjax(){
      let uid = ''
      if(this.uidList.length){
        this.uidList.forEach(item => {
          if(uid){
            uid += `,${item}`
          }else{
            uid = `${item}`
          }
        })
      }
      const req = { ...this.searchInfo }
      let level = ''
      if(this.searchInfo.level.length != 0){
        this.searchInfo.level.forEach((item, index) => {
          level += index == 0 ? `${item}` : `,${item}`
        })
      }
      req.level = level
      const res = await this.$axios.request({
        url: '/user/list/export',
        method: 'GET',
        responseType: 'blob',
        params: {
          uid: uid,
          ...this.searchInfo,
          // register_from: this.searchInfo.register_from,
          // register_to: this.searchInfo.register_to
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
    handleMore() {},
    // 转移
    handleTransfer(row) {
      this.visible.modelBox = true
      this.agentId = row.id
      this.info.agencyNum = ''
    },
    // 封号/解封/启用/停用
    async handleState(row, state, popType) {
      if(popType && !this.forbidden_des){
        this.$msg({
          type: 'error',
          message: `${this.i18n_lang.memberManage103}`
        })
        return
      }
      if(!state && !this.forbidden_des) {
        this.accountMsg = {
          row: row,
          state: state
        }
        this.visible.accountDisabled = true
        return
      }
      this.loading.page++
      this.loading.btn = true
      const res = await this.$axios.request({
        url: `/user/info/setting/${row.id}`,
        method: 'PUT',
        data: {
          state,
          forbidden_des: this.forbidden_des
        }
      })
      this.loading.page--
      this.loading.btn = false

      if (res.status !== 200 && res.state != 0) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return false
      }
      this.$Message.success(res.message)
      this.forbidden_des = ''
      this.visible.accountDisabled = false
      this.getList()
    },
    // 开启/关闭代理
    async handleAgent(row, state) {
      this.loading.page++
      const res = await this.$axios.request({
        url: `/user/agent/switch/${row.id}`,
        method: 'PUT',
        data: {
          agent_switch: state
        }
      })
      this.loading.page--

      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return false
      }
      this.$Message.success(res.message)
      this.getList()
    },
    // 代理用户查找
    async searchAgent() {
      const name = this.info.agencyNum.replace(/\s+/g, '')
      const res = await this.$axios.request({
        url: '/user/agent/move',
        method: 'GET',
        params: { name }
      })
      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return false
      }
      this.agentList = res.data
    },
    // 选择代理
    OptionAgent() {
      return throttle(this.searchAgent, 300)
    },
    boxShow() {
      this.visible.isShow = true
      this.searchAgent()
    },
    changeCurrentAgent(item) {
      this.selectAgent = item
      this.info.agencyNum = item.name
      this.visible.isShow = false
    },
    // 更新上级代理接口
    async changeAgent() {
      this.loading.btn = true
      const res = await this.$axios.request({
        url: `/user/agent/move/${this.agentId}`,
        method: 'PUT',
        data: {
          id: this.agentId,
          agent_name: this.selectAgent.name,
          agent_id: this.selectAgent.id
        }
      })
      this.loading.btn = false
      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return false
      }
      this.visible.modelBox = false
      this.getList()
      this.$msg({
        type: 'success',
        message: this.i18n_lang.memberManage54
      })
    },
    // 确定
    sureBtn() {
      this.$refs['madalForm'].validate(async valid => {
        if (!valid) return
        this.changeAgent()
      })
    },
    changePageSize(pageSize) {
      this.page.pageSize = pageSize
      this.getList()
    },
    // 查看用户详情
    handleUserDetail(row) {
      this.getUserDetail({ username: row.username, id: row.id })
    },
    // 新增用户弹框
    addUser() {
      this.addInfo = Object.assign({}, initAddData)
      this.rake_back.forEach(o => {
        this.addInfo[o.key] = o.value
      })
      this.visible.addModal = true
    },
    // 占成设置
    async handleAmendAccounted(row){
      const res = await this.$axios.request({
        url: `/user/info/portion/${row.id}`,
        method: 'GET'
      })
      if(res.data.proportion_type) {
        this.accountedForm = { ...res.data }
        let arrar = []
        if(this.accountedForm.proportion_value){
          let proportion_value = JSON.parse(this.accountedForm.proportion_value)
          for(let key in proportion_value){
            let obj = {
              type: key,
              text: proportion_value[key]
            }
            arrar.push(obj)
          }
        }
        this.getGameMenu(arrar.length > 0 ? arrar : '')
      }else{
        this.getGameMenu()
      }
      this.accountedForm.id = row.id
      this.visible.accounted = true
    },
    // 获取游戏渠道
    async getGameMenu(arrar) {
      const res = await this.$axios.request({
        url: '/game/menu',
        method: 'GET'
      })
      if (res.status !== 200) {
        this.$Message.error(res.message)
        return
      }
      if(res.data && res.data.length){
        this.gameArrar = []
        if(arrar){
          res.data.forEach((item, index) => {
            arrar.forEach((items, indexs) => {
              if(item.type == items.type){
                let obj = {
                  name: item.name,
                  rename: item.rename,
                  type: item.type,
                  text: items.text
                }
                this.gameArrar.push(obj)
              }
            })
          })
        }else{
          res.data.forEach((item, index) => {
            let obj = {
              name: item.name,
              rename: item.rename,
              type: item.type,
              text: ''
            }
            this.gameArrar.push(obj)
          })
        }
      }
    },
    //占成设置修改
    async saveAccountedData(){
      let proportion_value = {}
      this.gameArrar.forEach((item, index) => {
        proportion_value[item.type] = item.text
      })
      this.accountedForm.proportion_value = JSON.stringify(proportion_value)
      let obj = { ...this.accountedForm }
      delete obj.id
      const res = await this.$axios.request({
        url: `/user/info/portion/${this.accountedForm.id}`,
        method: 'PUT',
        data: { ...obj }
      })
      this.$msg({
        type: res.status !== 200 ? 'error' : 'success',
        message: res.message
      })
      if (res.status !== 200) return
      this.visible.accounted = false
      this.getList()
    },
    // 盈亏占成
    async handleAmendProfit(row){
      const res = await this.$axios.request({
        url: `/profitloss/userprofit/${row.id}`,
        method: 'GET'
      })
      if(res.data.profit_loss_value) {
        this.form = { ...res.data }
        let arrar = []
        if(this.form.profit_loss_value){
          let profit_loss_value = JSON.parse(this.form.profit_loss_value)
          for(let key in profit_loss_value){
            let obj = {
              type: key,
              text: profit_loss_value[key]
            }
            arrar.push(obj)
          }
        }
        this.getGameMenu(arrar.length > 0 ? arrar : '')
      }else{
        this.getGameMenu()
      }
      this.profitForm.id = row.id
      this.visible.profit = true
    },
    //盈亏占成设置修改
    async saveProfitData(){
      let profit_loss_value = {}
      this.gameArrar.forEach((item, index) => {
        profit_loss_value[item.type] = item.text
      })
      this.profitForm.profit_loss_value = JSON.stringify(profit_loss_value)
      let obj = { ...this.profitForm }
      delete obj.id
      const res = await this.$axios.request({
        url: `/profitloss/userprofit/${this.profitForm.id}`,
        method: 'PUT',
        data: { ...obj }
      })
      this.$msg({
        type: res.status !== 200 || res.state !== 0 ? 'error' : 'success',
        message: res.message
      })
      if (res.status !== 200 || res.state !== 0) return
      this.visible.profit = false
      this.getList()
    }
  }
}
</script>

<style lang="less" scoped>
#Member {
  .query_con {
    .item {
      .marginRight {
        margin-right: 5px;
      }
    }
  }
  .more {
    margin-bottom: 15px;
  }
}
</style>
