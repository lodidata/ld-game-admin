<template>
  <div>
    <Spin v-if="loading.page" size="large" fix></Spin>
    <Card dis-hover class="query_box">
      <div class="query_con">
        <div class="item">
          <span>{{i18n_lang.activeList361}}</span>
          <DatePicker
            v-model="query.start_time"
            :editable="false"
            type="datetime"
            placeholder=""
            style="width: 180px"
          ></DatePicker>
          <span>-</span>
          <DatePicker
            v-model="query.end_time"
            :editable="false"
            type="datetime"
            placeholder=""
            style="width: 180px"
          ></DatePicker>
        </div>
        <div class="item">
          <span>{{i18n_lang.activeList362}}</span>
          <Select v-model="query.status" style="width:100px" clearable>
            <Option value>{{i18n_lang.activeList363}}</Option>
            <Option value="sending">{{i18n_lang.activeList371}}</Option>
            <Option value="disabled">{{i18n_lang.activeList372}}</Option>
            <Option value="success">{{i18n_lang.activeList373}}</Option>
            <Option value="fail">{{i18n_lang.activeList374}}</Option>
          </Select>
        </div>
        <div class="item">
          <Button type="primary" icon="ios-search" class="marginRight" @click="search">{{i18n_lang.activeList366}}</Button>
          <!-- <Button type="primary" style="margin-left: 5px;" icon="md-refresh" @click="reset">{{i18n_lang.activeList367}}</Button> -->
        </div>
      </div>
    </Card>
    <Card dis-hover class="query_box mb30">
      <Button type="primary" icon="md-add" class="mb30" @click="handleOpenModal()">{{i18n_lang.activeList78}}</Button>
      <!-- <Button type="primary" icon="md-add" class="mb30" style="margin-left: 5px" @click="addTypes">
        <span>{{i18n_lang.activeList79}}</span>
      </Button>
      <div class="query_con">
        <div class="item">
          <span>{{i18n_lang.activeList80}}</span>
          <Select v-model="query.template_id" style="width:100px" clearable>
            <Option value>{{i18n_lang.activeList81}}</Option>
            <Option v-for="(item, i) in activeType" :key="i" :value="item.id">{{ item.name }}</Option>
          </Select>
        </div>
        <div class="item">
          <span>{{i18n_lang.activeList82}}</span>
          <Select v-model="query.status" style="width:100px" clearable>
            <Option value>{{i18n_lang.activeList81}}</Option>
            <Option v-for="(item, i) in activeState" :key="i" :value="item.value">{{ item.name }}</Option>
          </Select>
        </div>
      </div>
      <div class="query_btns">
        <Button type="primary" icon="ios-search" style="margin-right: 5px;" @click="search">{{i18n_lang.activeList83}}</Button>
        <Button type="primary" icon="md-refresh" @click="reset">{{i18n_lang.activeList84}}</Button>
      </div> -->
    </Card>
    <Table border :columns="columns" :data="activeList"></Table>
    <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{ `${i18n_lang.activeList385}${page.total}${i18n_lang.activeList386}` }}</div>
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
    <Modal
      v-model="visible.modal"
      :title="editType === 'add' ? `${i18n_lang.activeList85}${i18n_lang.activeList87}` : `${i18n_lang.activeList86}${i18n_lang.activeList87}`"
      :width="1000"
      :styles="{ top: '20px' }"
      :footer-hide="true"
    >
      <Spin v-if="loading.modal" size="large" fix></Spin>
      <div class="mytabs_tb" v-if="editType === 'add'">
        <ul class="mytabs">
          <li :class="{'active': tabType == 'fixation'}" @click="tabTypeCat(`fixation`)">
            <span>{{i18n_lang.activeList322}}</span>
          </li>
          <li :class="{'active': tabType == 'ambulatory'}" @click="tabTypeCat(`ambulatory`)">
            <span>{{i18n_lang.activeList323}}</span>
          </li>
        </ul>
      </div>
      <Form ref="parentForm" :model="editInfo" :rules="ruleValidate" :label-width="100">
        <FormItem :label="`${i18n_lang.activeList274}`" prop="msg_title"><!-- 消息标题 -->
          <Input v-model="editInfo.msg_title" :placeholder="`${i18n_lang.activeList275}`"></Input>
        </FormItem>
        <FormItem :label="`${i18n_lang.activeList276}`" prop="msg_content"><!-- 消息内容 -->
          <Input v-model="editInfo.msg_content" type="textarea" :rows="3" :placeholder="`${i18n_lang.activeList277}`"></Input>
        </FormItem>
        <FormItem :label="`${i18n_lang.activeList278}`" prop="give_away" v-if="tabType == 'fixation'"><!-- 赠送条件 -->
          <RadioGroup v-model="editInfo.give_away" size="large">
            <Radio :label="1">{{i18n_lang.activeList279}}</Radio>
            <Radio :label="2">{{i18n_lang.activeList280}}</Radio>
            <Radio :label="3">{{i18n_lang.activeList281}}</Radio>
            <Radio :label="5">{{i18n_lang.activeList369}}</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem :label="`${i18n_lang.activeList282}`" prop="phone_list" v-if="editInfo.give_away == 1"><!-- 指定手机号 -->
          <Input v-model="editInfo.phone_list" type="textarea" :rows="3" :placeholder="`${i18n_lang.activeList283}`"></Input>
        </FormItem>
        <FormItem :label="`${i18n_lang.activeList284}`" prop="user_level" v-if="editInfo.give_away == 2"><!-- 指定等级 -->
          <Select v-model="user_level" multiple @on-change="getUserLevel($event)" :placeholder="`${i18n_lang.activeList285}`" style="width:500px;">
            <Option :key="''" :value="''">{{i18n_lang.activeList286}}</Option>
            <Option v-for="item in levelList" :key="item.level" :value="item.level">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem :label="`${i18n_lang.activeList287}`" prop="batch_url" v-if="editInfo.give_away == 3"><!-- 批量赠送 -->
          <UploadImg
            v-model="editInfo.batch_url"
            :batchUrl="true"
            style="width: 500px;background-color: transparent; border: 1px solid #ddd;"
            @input="batchUrlFn"
            @getTable="getTable"
            @clearFile="clearFile"
          ></UploadImg>
        </FormItem>
        <FormItem :label="`${i18n_lang.activeList369}`" prop="uid_list" v-if="editInfo.give_away == 5"><!-- 指定用户ID -->
          <Input v-model="editInfo.uid_list" type="textarea" :rows="3" :placeholder="`${i18n_lang.activeList370}`"></Input>
        </FormItem>
        <FormItem :label="`${i18n_lang.activeList323}`" prop="unfixed_url" v-if="editInfo.give_away == 4"><!-- 非固定彩金 -->
          <UploadImg
            v-model="editInfo.unfixed_url"
            :batchUrl="true"
            style="width: 500px;background-color: transparent; border: 1px solid #ddd;"
            @input="unfixedUrlFn"
            @getTable="getUnfixedTable"
            @clearFile="clearUnfixedUrlFile"
          ></UploadImg>
        </FormItem>
        <FormItem :label="`${i18n_lang.activeList288}`" prop="give_amount" v-if="tabType == 'fixation'"><!-- 赠送彩金 -->
          <Input v-model="editInfo.give_amount" :placeholder="``"></Input>
        </FormItem>
        <FormItem :label="`${i18n_lang.activeList289}`" prop="dm_num" v-if="tabType == 'fixation'"><!-- 设置打码量 -->
          <Input v-model="editInfo.dm_num" :placeholder="``"></Input>
        </FormItem>
        <FormItem :label="`${i18n_lang.activeList319}`" v-if="tabType == 'fixation'"><!-- 指定分类 -->
          <Select v-model="game_menu_name" multiple :placeholder="` `" style="width:500px;">
            <Option v-for="item in gameChannels" :key="item.type" :value="item.type">{{ item.rename }}</Option>
          </Select>
        </FormItem>
        <FormItem :label="`${i18n_lang.activeList320}`" prop="recharge_num" v-if="tabType == 'fixation'"><!-- 充值金额 -->
          <Input v-model="editInfo.recharge_num" :placeholder="``"></Input>
        </FormItem>
        <FormItem :label="`${i18n_lang.activeList290}`" prop="notice_type"><!-- 消息通知 -->
          <RadioGroup v-model="editInfo.notice_type" size="large">
            <Radio :label="`3`">{{i18n_lang.activeList293}}</Radio>
            <!-- <Radio :label="`1`">{{i18n_lang.activeList291}}</Radio>
            <Radio :label="`2`">{{i18n_lang.activeList292}}</Radio> -->
          </RadioGroup>
        </FormItem>
        <FormItem :label="`${i18n_lang.activeList294}`" prop="is_now_give"><!-- 是否立即赠送 -->
          <RadioGroup v-model="editInfo.is_now_give" size="large">
            <Radio :label="1">{{i18n_lang.activeList295}}</Radio>
            <Radio :label="0">{{i18n_lang.activeList296}}</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem :label="`${i18n_lang.activeList327}`" prop="recharge_limit" v-if="editInfo.receive_way != 2"><!-- 充值领取 -->
          <RadioGroup v-model="editInfo.recharge_limit" size="large">
            <Radio :label="1">{{i18n_lang.activeList295}}</Radio>
            <Radio :label="0">{{i18n_lang.activeList296}}</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem :label="`${i18n_lang.activeList328}`" prop="recharge_coin" v-if="editInfo.recharge_limit == 1 && editInfo.receive_way != 2"><!-- 充值金额 -->
          <Input v-model="editInfo.recharge_coin" :placeholder="``"></Input>
          <RadioGroup v-model="editInfo.recharge_type" size="large">
            <Radio :label="1">{{`${i18n_lang.activeList329}`}}</Radio>
            <Radio :label="2">{{`${i18n_lang.activeList330}`}}</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem :label="`${i18n_lang.activeList324}`" prop="receive_way" v-show="tabType == 'ambulatory'"><!-- 赠送方式 -->
          <RadioGroup v-model="editInfo.receive_way" size="large">
            <Radio :label="2">{{i18n_lang.activeList325}}</Radio>
            <Radio :label="1">{{i18n_lang.activeList326}}</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem :label="`${i18n_lang.activeList297}`" prop="give_amount_time"><!-- 定时赠送时间 -->
          <DatePicker
            v-model="editInfo.give_amount_time"
            type="datetime"
            :placeholder="`${i18n_lang.activeList298}`"
            format="yyyy-MM-dd HH:mm:ss"
            style="width: 160px"
            @on-change="changeTime"
          ></DatePicker>
        </FormItem>
        <FormItem :label="`${i18n_lang.activeList321}`" prop="valid_time"><!-- 彩金有效时间 -->
          <DatePicker
            v-model="editInfo.valid_time"
            type="datetime"
            :placeholder="``"
            format="yyyy-MM-dd HH:mm:ss"
            style="width: 160px"
            @on-change="changeValidTime"
          ></DatePicker>
        </FormItem>
        <!-- <FormItem :label="i18n_lang.activeList10" prop="begin_time">有效时间
          <Row>
            <Col span="11">
              <FormItem prop="begin_time">
                <DatePicker
                  v-model="editInfo.begin_time"
                  type="datetime"
                  :placeholder="i18n_lang.activeList11"
                  format="yyyy-MM-dd HH:mm:ss"
                  style="width: 160px"
                  @on-change="changeStartTime"
                ></DatePicker>
              </FormItem>
            </Col>
            <Col span="2" style="text-align: center">-</Col>
            <Col span="11">
              <FormItem prop="end_time">
                <DatePicker
                  v-model="editInfo.end_time"
                  type="datetime"
                  :placeholder="i18n_lang.activeList11"
                  format="yyyy-MM-dd HH:mm:ss"
                  style="width: 160px"
                  @on-change="changeEndTime"
                ></DatePicker>
              </FormItem>
            </Col>
          </Row>
        </FormItem> -->
        <FormItem>
          <Button
              type="primary"
              :loading="loading.modalButton"
              @click="submit"
            >{{i18n_lang.activeList299}}</Button>
          </FormItem>
        </FormItem>
      </Form>
    </Modal>

  </div>
</template>

<script>
  const initQuery = {
    start_time: '',
    end_time: '',
    status: ''
  }
  const editInfo = {
    title: '',
    msg_title: '',           //消息标题 批量赠送彩金相关
    msg_content: '',         //消息内容
    give_away: 1,           //赠送条件：1-指定用户，2-指定等级，3-批量赠送，4-非固定方式赠送彩金， 5-指定用户id
    phone_list: '',          //指定手机号列表，多个手机号码之间英文逗号隔开
    user_level: '',          //指定用户等级列表，多个等级值之间英文逗号隔开
    batch_url: '',           //批量上传时，上传文件后返回的url
    give_amount: '',         //赠送彩金的数量
    dm_num: '',              //打码量
    notice_type: '3',         //通知类型：1-短信，2-邮箱，3-站内信息通知
    is_now_give: 0,         //是否立即赠送: 1-是，0-否
    give_amount_time: ''     ,//赠送彩金时间，格式 2022-07-18 00:00:00
    template_id: '12',
    type_id: '12',
    recharge_num: '',
    begin_time: '',
    end_time: '',
    limit_game: '',
    valid_time: '',
    unfixed_url: '',
    receive_way: 1    ,//赠送彩金方式： 1.手动领取 2.发送至主钱包
    recharge_limit: 0,//是否需要充值金币才能领取彩金：1-是，0-否
    recharge_type: 1,//充值金币类型：1-单笔，2-累计
    recharge_coin: '',//需要充值金币的数量
    uid_list: ''//指定用户id
  }
  import UploadImg from './UploadImg'
  import columns from './columns.js'
  import { splitArr } from './format.js'
  import { formatDateTimeToString } from '@/libs/date'
  export default {
    name: 'GivePrizes',
    props: {},
    components: {
      UploadImg
    },
    data() {
      const i18n_lang = this.$t('activeList');
      const data = {
        i18n_lang: i18n_lang,
        columns: columns(this),
        loading: {
          page: false,
          modalButton: false,
          type: false,
          iconButton: false
        },
        visible: {
          addDialog: false,
          modal: false,
          types: false, // 分类
          icon: false
        },
        query: { ...initQuery },
        activeList: [],
        query: {
          template_id: '',
          status: ''
        },
        page: {
          pageSize: 20,
          total: 0,
          currentPage: 1,
          pageSizes: [20, 100, 1000, 2000]
        },
        editInfo: {
          ...editInfo
        },
        user_level: [],
        levelList: [],
        ruleValidate: {
          msg_title: [{ required: true, message: `${i18n_lang.activeList275}`, trigger: 'blur' }],
          msg_content: [{ required: true, message: `${i18n_lang.activeList277}`, trigger: 'blur' }],
          phone_list: [
            // { required: true, message: `${i18n_lang.activeList217}`, trigger: 'blur'},
            // {
            //   required: true,
            //   validator: (rule, value, cb) => {
            //     if (this.editInfo.phone_list === '' && this.editInfo.give_away === 1) {
            //       return cb(i18n_lang.activeList217)
            //     } else {
            //       return cb()
            //     }
            //   }
            // }
          ],
          user_level: [],//{ required: true, message: `${i18n_lang.activeList285}`, trigger: 'blur' }
        },
        game_menu_name: [],
        gameChannels: [],
        editType: 'add',
        tabType: 'fixation'
      }
      return data
    },
    watch: {},
    mounted() {
      // this.upTemlate()
      this.getData()
    },
    methods: {
      search(){
        this.getData()
      },
      reset(){
        this.query = { ...initQuery }
        this.getData()
      },
      // 设置每页条数
      changePageSize(pageSize) {
        this.page.currentPage = 1
        this.page.pageSize = pageSize
        this.getData()
      },
      // 获取活动列表
      async getData(i = 1) {
        this.page.currentPage = i
        this.loading.page = true
        const req = { ...this.query }
        req.start_time = req.start_time ? this.$dateTimeFormat(req.start_time) : ''
        req.end_time = req.end_time ? this.$dateTimeFormat(req.end_time) : ''
        req.page = this.page.currentPage
        req.page_size = this.page.pageSize
        const res = await this.$axios.request({
          url: '/active/winnings',
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
        this.activeList = res.data ? splitArr(res.data) : []
      },
      // 启用停用
      async handleStop(row) {
        const data = { ...row }
        const res = await this.$axios.request({
          url: '/active/winnings',
          method: 'PATCH',
          data: {
            active_id: data.active_id,
            status: data.status === 'disabled' ? 'enabled' : 'disabled'
          }
        })
        this.$msg({
          type: res.status !== 200 ? 'error' : 'success',
          message: res.message
        })
        if (res.status !== 200) return
        this.getData()
      },
      tabTypeCat(text){
        if(text == 'fixation'){
          this.editInfo.give_away = 1
          this.editInfo.receive_way = 1
        }
        if(text == 'ambulatory'){
          this.editInfo.give_away = 4
        }
        this.tabType = text
      },
      // 编辑
      handleOpenModal(data) {
        // return console.log(data)
        this.getGameMenu()
        this.levelListFn()
        const dataInfo = data ? { ...data } : ''
        this.editType = data ? 'edit' : 'add'
        if(dataInfo.give_away == 4){
          this.tabType = 'ambulatory'
        }else{
          this.tabType = 'fixation'
        }
        if(dataInfo){
          // dataInfo.give_amount = dataInfo ? dataInfo.give_amount / 100 : ''
          dataInfo.give_amount = dataInfo ? dataInfo.give_amount : ''
          // dataInfo.dm_num = dataInfo ? dataInfo.dm_num / 100 : ''
          dataInfo.dm_num = dataInfo ? dataInfo.dm_num : ''
          // dataInfo.recharge_num = dataInfo ? dataInfo.recharge_num / 100 : ''
          dataInfo.recharge_num = dataInfo ? dataInfo.recharge_num : ''
          // dataInfo.recharge_coin = dataInfo.recharge_coin ? dataInfo.recharge_coin / 100 : ''
          dataInfo.recharge_coin = dataInfo.recharge_coin ? dataInfo.recharge_coin : ''
        }
        this.editInfo = dataInfo ? { ...dataInfo } : {
          ...editInfo
        }
        // console.log('this.editInfo', this.editInfo)
        this.game_menu_name = data ? data.limit_game.split(',') : []
        this.visible.modal = true
      },
      // 删除
      async deleteAd(row) {
        const data = { ...row }
        const res = await this.$axios.request({
          url: `/active/winnings`,
          method: 'DELETE',
          data: {
            active_id: data.active_id,
            status: 'deleted'
          }
        })
        this.loading.modalButton = false
        this.$msg({
          type: res.status !== 200 ? 'error' : 'success',
          message: res.message
        })
        if (res.status !== 200) return
        this.getData()
      },
      changeTime(date){
        this.editInfo.give_amount_time = date
      },
      changeValidTime(date){
        this.editInfo.valid_time = date
      },
      // 格式化时间
      changeStartTime(date) {
        this.editInfo.begin_time = date
      },
      changeEndTime(date) {
        this.editInfo.end_time = date
      },
      batchUrlFn(url){
        this.editInfo.batch_url = url
      },
      unfixedUrlFn(url){
        this.editInfo.batchUrlFn = url
      },
      clearFile(){
        this.editInfo.batch_url = ''
      },
      clearUnfixedUrlFile(){
        this.editInfo.batchUrlFn = ''
      },
      getUserLevel(event){
        event.forEach((item, index) => {
          if(item == ''){
            this.user_level = []
            this.levelList.forEach((items, indexs) => {
              this.user_level.push(items.level)
            })
          }
        })
      },
      getTable(){
        this.upTemlate(`/report/handsel/upTemlate`, `.text`)
      },
      getUnfixedTable(){
        this.upTemlate(`/report/handsel/template2`, `.csv`)
      },
      // 获取游戏渠道
      async getGameMenu() {
        const res = await this.$axios.request({
          url: '/game/menu',
          method: 'GET'
        })
        if (res.status !== 200) {
          this.$Message.error(res.message)
          return
        }
        if(res.data && res.data.length){
          this.gameChannels = res.data
        }
      },
      // 获取等级
      async levelListFn() {
        const res = await this.$axios.request({
          url: '/memberslevel/levelList',
          method: 'GET',
          params: {}
        })
        if (res.status !== 200) {
          this.$Message.error(res.message)
          return
        };
        this.levelList = res.data
        if(this.editInfo.user_level){
          this.user_level = []
          this.editInfo.user_level.split(',').forEach((item, index) => {
            this.user_level.push(+item)
          })
        }
      },
      // 获取下载模板
      async upTemlate(apiUrl, format) {
        const res = await this.$axios.request({
          url: `${apiUrl}`,
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
        link.setAttribute('download', `templateFile${format}`)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      },
      // 提交数据
      async submit(){
        // if(this.editInfo.give_away == 1 && !this.editInfo.phone_list) return this.$Message.error(this.i18n_lang.activeList301)
        // if(this.editInfo.give_away == 2 && !this.user_level.length) return this.$Message.error(this.i18n_lang.activeList285)
        // return console.log(this.editInfo, this.user_level.length)
        this.loading.modalButton = true
        this.$refs['parentForm'].validate(async valid => {
          if(valid){
            const req = { ...this.editInfo }
            if(this.user_level.length && req.give_away == 2){
              this.user_level.forEach((item, index) => {
                req.user_level += index == 0 ? `${item}` : `,${item}`
              })
            }
            let game_menu_name = ""
            if(this.game_menu_name.length){
              this.game_menu_name.forEach((item, index) => {
                game_menu_name += index == 0 ? `${item}` : `,${item}`
              })
            }
            req.limit_game = game_menu_name
            req.give_amount_time = req.give_amount_time ? formatDateTimeToString(new Date(req.give_amount_time)) : ''
            req.valid_time = req.valid_time ? formatDateTimeToString(new Date(req.valid_time)) : ''
            req.begin_time = req.begin_time ? formatDateTimeToString(new Date(req.begin_time)) : ''
            req.end_time = req.end_time ? formatDateTimeToString(new Date(req.end_time)) : ''
            // req.give_amount = req.give_amount * 100
            req.give_amount = req.give_amount
            // req.dm_num = req.dm_num * 100
            req.dm_num = req.dm_num
            // req.recharge_num = req.recharge_num * 100
            req.recharge_num = req.recharge_num
            // req.recharge_coin = req.recharge_coin ? req.recharge_coin * 100 : 0
            req.recharge_coin = req.recharge_coin ? req.recharge_coin : 0
            // delete req.bind_info
            // delete req.luckydraw_condition
            if(req.give_away == 4){
              delete req.phone_list
              delete req.user_level
              delete req.batch_url
              delete req.give_amount
              delete req.dm_num
              delete req.recharge_num
            }else{
              delete req.unfixed_url
            }
            let objType = {};
            if (this.editType === 'add') {
              objType = {
                url: '/active/winnings',
                method: 'POST',
                data: req
              }
            } else {
              objType = {
                url: `/active/winnings`,
                method: 'PUT',
                data: req
              }
            }
            const res = await this.$axios.request(objType)
            this.loading.modalButton = false
            if (res.status == 200 && res.state == 0) {
              this.$Message.success(res.message)
              this.visible.modal = false
              this.getData()
            } else {
              this.$Message.error(res.message)
            }
          }else{
            this.loading.modalButton = false
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .ivu-form-item {
    display: flex;
    align-items: center;
  }
  .ivu-form-label-top .ivu-form-item-label {
    padding: 0;
  }
  .ivu-input-wrapper {
    width: 500px;
  }
  .mytabs_tb{
    box-sizing: border-box;
    overflow: hidden;
    overflow-x: auto;
  }
  .mytabs {
    box-sizing: border-box;
    margin-bottom: 45px;
    position: relative;
    // border-top: 1px solid #dcdcdc;
    border-left: 1px solid #dcdcdc;
    li {
      box-sizing: border-box;
      width: 160px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      // border-right: 1px solid #dcdcdc;
      // border-bottom: 1px solid #dcdcdc;
      float: left;
      cursor: pointer;
      &.active {
        color: #2d8cf0;
        border-bottom: 2px solid #2d8cf0;
      }
    }
  }
</style>
