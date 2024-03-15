<template>
  <div>
    <Spin v-if="loading.page" size="large" fix></Spin>
    <!-- <Card dis-hover class="query_box">
      <div class="query_con">
        <div class="item">
          <span>{{i18n_lang.newThirdPayment47}}</span>
          <Input v-model="searchInfo.pay_channel_id" :placeholder="` `" clearable style="width: 150px"/>
        </div>
        <div class="item">
          <span>{{i18n_lang.newThirdPayment48}}</span>
          <Input v-model="searchInfo.name" :placeholder="` `" clearable style="width: 150px"/>
        </div>
        <div class="item">
          <Button type="primary" icon="ios-search" class="marginRight" @click="search">{{i18n_lang.newThirdPayment49}}</Button>
          <Button type="primary" style="margin-left: 5px;" icon="md-refresh" @click="reset">{{i18n_lang.newThirdPayment50}}</Button>
        </div>
      </div>
    </Card> -->
    <Card dis-hover class="query_box">
      <div class="query_con">
        <div class="item">
          <span>{{i18n_lang.thirdPayment7}}</span>
          <Select v-model="initQuery.pay_config_id" style="width:100px">
            <Option value="">{{i18n_lang.thirdPayment6}}</Option>
            <Option v-for="(it,i) in payType" :key="i" :value="it.third_id">{{ it.name }}</Option>
          </Select>
        </div>
        <div class="item">
          <Button type="primary" icon="ios-search" @click="getList()">{{i18n_lang.thirdPayment11}}</Button>
        </div>
      </div>
    </Card>
    <Table ref="table" border :columns="columns" :data="dataSource" style="margin-top: 20px"></Table>
    <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{ `${i18n_lang.thirdPayment72}${page.total}${i18n_lang.thirdPayment73}` }}</div>
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
    <Modal v-model="visible.modal" :width="900" :title="`${i18n_lang.newThirdPayment51}`">
      <Form
        ref="handleInfo"
        :model="handleInfo"
        :label-width="120"
        :rules="ruleValidate">
        <!-- <FormItem :label="`${i18n_lang.newThirdPayment58}：`">
          <Input :value="handleInfo.pay_config_type" :placeholder="` `" disabled/>
        </FormItem>
        <FormItem :label="`${i18n_lang.newThirdPayment52}`" prop="name">
          <Input v-model="handleInfo.name" :placeholder="` `"/>
        </FormItem>
        <FormItem :label="`${i18n_lang.newThirdPayment57}`" prop="logo">
          <UploadImg
            v-model="handleInfo.logo"
            :batchUrl="false"
            style="width: 368px;background-color: transparent; border: 1px solid #ddd;"
            type="logo"
            @input="batchLogoUrlFn"
            @clearFile="clearLogoFile"
          ></UploadImg>
        </FormItem>
        <FormItem :label="`${i18n_lang.newThirdPayment4}`" prop="img">
          <UploadImg
            v-model="handleInfo.img"
            :batchUrl="false"
            style="width: 368px;background-color: transparent; border: 1px solid #ddd;"
            @input="batchUrlFn"
            @clearFile="clearFile"
          ></UploadImg>
        </FormItem>
        <FormItem :label="`${i18n_lang.newThirdPayment5}`" prop="text">
          <Input v-model="handleInfo.text" :placeholder="` `"/>
        </FormItem>
        <FormItem :label="`${i18n_lang.newThirdPayment63}`" prop="sort">
          <Input v-model="handleInfo.sort" :placeholder="` `"/>
        </FormItem> -->

        <div>
          <p class="modal_title">{{`${i18n_lang.newThirdPayment63_v_1_2_4_3}`}}</p>
          <div style="overflow: hidden;">
            <FormItem :label="`${i18n_lang.newThirdPayment64_v_1_2_4_3}`" style="width: 260px;float: left;">
              <Input :value="handleInfo.pay_config_type" :placeholder="` `" disabled/>
            </FormItem>
            <FormItem :label="`${i18n_lang.newThirdPayment52}`" style="width: 260px;float: left;" prop="name">
              <Input v-model="handleInfo.name" :placeholder="` `"/>
            </FormItem>
            <FormItem :label="`${i18n_lang.newThirdPayment65_v_1_2_4_3}`" style="width: 260px;float: left;" prop="text">
              <Input v-model="handleInfo.text" :placeholder="` `"/>
            </FormItem>
          </div>
          <div style="overflow: hidden;">
            <FormItem :label="`${i18n_lang.newThirdPayment66_v_1_2_4_3}`" prop="remark" style="width: 260px;float: left;" v-if="!handleInfo.channel_num">
              <Input v-model="handleInfo.remark" :placeholder="` `"/>
            </FormItem>
            <FormItem :label="`${i18n_lang.newThirdPayment63}`" prop="sort" style="width: 260px;float: left;">
              <Input v-model="handleInfo.sort" :placeholder="` `"/>
            </FormItem>
          </div>
        </div>
        <div style="overflow: hidden;">
          <FormItem :label="`${i18n_lang.newThirdPayment57}`" style="width: 400px;float: left;" prop="logo">
            <UploadImg
              v-model="handleInfo.logo"
              :batchUrl="false"
              style="width: 268px;background-color: transparent; border: 1px solid #ddd;"
              type="logo"
              @input="batchLogoUrlFn"
              @clearFile="clearLogoFile"
            ></UploadImg>
          </FormItem>
          <FormItem :label="`${i18n_lang.newThirdPayment4}`" style="width: 400px;float: left;" prop="img">
            <UploadImg
              v-model="handleInfo.img"
              :batchUrl="false"
              style="width: 268px;background-color: transparent; border: 1px solid #ddd;"
              @input="batchUrlFn"
              @clearFile="clearFile"
            ></UploadImg>
          </FormItem>
        </div>
        <!-- <FormItem :label="`${i18n_lang.newThirdPayment6}`" prop="name">
          <Input v-model="handleInfo.name" disabled :placeholder="` `"/>
        </FormItem> -->
        <!-- <FormItem :label="`${i18n_lang.newThirdPayment7}`" v-if="!handleInfo.channel_num"></FormItem> -->
        <div>
          <p class="modal_title">{{`${i18n_lang.newThirdPayment67_v_1_2_4_3}`}}</p>
          <div style="overflow: hidden;">
            <FormItem :label="`${i18n_lang.newThirdPayment8}`" style="width: 260px;float: left;" prop="min_money" v-if="!handleInfo.channel_num">
              <Input v-model="handleInfo.min_money" :placeholder="` `"/>
            </FormItem>
            <FormItem :label="`${i18n_lang.newThirdPayment9}`" style="width: 260px;float: left;" prop="max_money" v-if="!handleInfo.channel_num">
              <Input v-model="handleInfo.max_money" :placeholder="` `"/>
            </FormItem>
          </div>
          <div style="overflow: hidden;">
            <FormItem :label="`${i18n_lang.newThirdPayment10}`" style="width: 260px;float: left;" prop="money_day_stop" v-if="!handleInfo.channel_num">
              <Input v-model="handleInfo.money_day_stop" :placeholder="` `"/>
            </FormItem>
            <FormItem :label="`${i18n_lang.newThirdPayment11}`" style="width: 260px;float: left;" prop="money_stop" v-if="!handleInfo.channel_num">
              <Input v-model="handleInfo.money_stop" :placeholder="` `"/>
            </FormItem>
          </div>
        </div>
        <!-- <FormItem :label="`${i18n_lang.newThirdPayment13}`" prop="payurl" v-if="!handleInfo.channel_num">
          <Input v-model="handleInfo.payurl" :placeholder="` `"/>
        </FormItem>
        <FormItem :label="`${i18n_lang.newThirdPayment14}`" prop="ip" v-if="!handleInfo.channel_num">
          <Input v-model="handleInfo.ip" :placeholder="` `"/>
        </FormItem> -->
        <div>
          <p class="modal_title">{{`${i18n_lang.newThirdPayment68_v_1_2_4_3}`}}</p>
          <FormItem :label="`${i18n_lang.newThirdPayment69_v_1_2_4_3}`" prop="give" v-if="!handleInfo.channel_num">
            <!-- <Select v-model="handleInfo.give" style="width:100px" :placeholder="` `">
              <Option :value="1">{{i18n_lang.newThirdPayment19}}</Option>
              <Option :value="0">{{i18n_lang.newThirdPayment20}}</Option>
            </Select> -->
            <RadioGroup v-model="handleInfo.give">
              <Radio :label="1">{{`${i18n_lang.newThirdPayment70_v_1_2_4_3}`}}</Radio>
              <Radio :label="0">{{`${i18n_lang.newThirdPayment71_v_1_2_4_3}`}}</Radio>
            </RadioGroup>
          </FormItem>
          <div style="overflow: hidden;">
            <FormItem :label="`${i18n_lang.newThirdPayment72_v_1_2_4_3}`" style="width: 260px;float: left;" prop="give_protion" v-if="!handleInfo.channel_num">
              <Input v-model="handleInfo.give_protion" :placeholder="` `" style="width: 100px"/>%
            </FormItem>
            <FormItem :label="`${i18n_lang.newThirdPayment60}`" style="width: 260px;float: left;" prop="give_lottery_dml" v-if="!handleInfo.channel_num">
              <Input v-model="handleInfo.give_lottery_dml" :placeholder="` `" style="width: 100px"/>{{`${i18n_lang.newThirdPayment73_v_1_2_4_3}`}}
              <!-- <div style="color: #515a6e;">{{`${i18n_lang.newThirdPayment62}`}}</div> -->
            </FormItem>
          </div>
          <div style="overflow: hidden;">
            <FormItem :label="`${i18n_lang.newThirdPayment59}`" style="width: 260px;float: left;" prop="give_recharge_dml" v-if="!handleInfo.channel_num">
              <Input v-model="handleInfo.give_recharge_dml" :placeholder="` `" style="width: 100px"/>{{`${i18n_lang.newThirdPayment73_v_1_2_4_3}`}}
              <!-- <div style="color: #515a6e;">{{`${i18n_lang.newThirdPayment61}`}}</div> -->
            </FormItem>
          </div>
        </div>
        <div>
          <p class="modal_title">{{`${i18n_lang.newThirdPayment74_v_1_2_4_3}`}}</p>
          <FormItem :label="`${i18n_lang.newThirdPayment75_v_1_2_4_3}`" prop="rechage_money" v-if="!handleInfo.channel_num">
            <Button type="primary" @click="addRechageMoney()">{{i18n_lang.newThirdPayment16}}</Button>
            <div>
              <Input v-for="(item, index) in handleInfo.rechage_money" :key="index" v-model="handleInfo.rechage_money[index]" style="width:80px;"/>
              <Button type="error" v-if="handleInfo.rechage_money.length > 1" @click="deleteRechageMoney()">{{i18n_lang.newThirdPayment17}}</Button>
            </div>
            <!-- <Input v-model="handleInfo.ip" :placeholder="` `"/> handleInfo.rechage_money[index]-->
          </FormItem>
        </div>
        <div>
          <p class="modal_title">{{`${i18n_lang.newThirdPayment76_v_1_2_4_3}`}}</p>
          <FormItem :label="`${i18n_lang.newThirdPayment77_v_1_2_4_3}`" v-if="!handleInfo.channel_num">
            <Select v-model="handleInfo.level" multiple @on-change="getUserLevel($event)" :placeholder="` `" style="width:500px;">
              <!-- <Option :key="''" :value="''">全部</Option> -->
              <Option v-for="item in levelList" :key="item.level" :value="item.level">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </div>
        <!-- <FormItem :label="`${i18n_lang.newThirdPayment22}`" prop="give_dml" v-if="!handleInfo.channel_num">
          <Input v-model="handleInfo.give_dml" :placeholder="` `"/>
        </FormItem> -->
      </Form>
      <div slot="footer">
        <Poptip
          confirm
          :title="`${i18n_lang.newThirdPayment23}`"
          @on-ok="Save()"
        >
          <Button type="primary">{{i18n_lang.newThirdPayment24}}</Button>
        </Poptip>
      </div>
    </Modal>
  </div>
</template>

<script>
  import columns from './columns/aisle.js'
  import UploadImg from './UploadImg'
  import { MathDiv, MathMul } from '@/libs/formatMath'
  const initQuery = {
    pay_config_id: ''
  }
  const searchInfo = {
    pay_channel_id: '',
    name: ''
  }
  const handleInfo = {
    id: '',
    name: '',
    logo: '',
    img: '',
    text: '',
    sort: '',
    min_money: '',
    max_money: '',
    money_day_stop: '',
    money_stop: '',
    remark: '',
    // payurl: '',
    // ip: '',
    rechage_money: [''],
    give: 1,
    give_protion: '',
    give_dml: '',
    channel_num: '',
    give_recharge_dml: '',
    give_lottery_dml: '',
    type: 'payment',
    level: []
  }
  export default {
    components: {
      UploadImg
    },
    data() {
      const i18n_lang = this.$t('thirdPayment');
      return {
        i18n_lang: i18n_lang,
        columns: columns(this),
        loading: {
          page: false,
        },
        visible: {
          modal: false
        },
        initQuery: { ...initQuery },
        payType: [], // 支付类型
        searchInfo: { ...searchInfo },
        page: {
          pageSize: 20,
          total: 0,
          currentPage: 1,
          pageSizes: [20, 50, 100, 1000]
        },
        dataSource: [],
        handleInfo: { ...handleInfo },
        ruleValidate: {
          min_money: [{required: true, message: `${i18n_lang.newThirdPayment25}`, trigger: 'blur' }],
          max_money: [{required: true, message: `${i18n_lang.newThirdPayment26}`, trigger: 'blur' }],
          money_day_stop: [{required: true, message: `${i18n_lang.newThirdPayment27}`, trigger: 'blur' }],
          money_stop: [{required: true, message: `${i18n_lang.newThirdPayment28}`, trigger: 'blur' }]
          // payurl: [{ required: true, message: `${i18n_lang.newThirdPayment29}`, trigger: 'blur' }]
        },
        levelList: []
      }
    },
    created() {
      this.getPayData()
      this.getList()
      this.levelListFn()
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
      // 翻页
      changePageSize(pageSize) {
        this.page.pageSize = pageSize
        this.getList()
      },
      // 列表数据
      handleSave(row){
        this.handleInfo = {
          id: row.id,
          name: row.name,
          logo: row.logo,
          img: row.img,
          text: row.text,
          sort: row.sort,
          // min_money: row.min_money || row.min_money == 0 ? `${row.min_money / 100}` : '',
          min_money: row.min_money || row.min_money == 0 ? `${row.min_money}` : '',
          // max_money: row.max_money || row.max_money == 0 ? `${row.max_money / 100}` : '',
          max_money: row.max_money || row.max_money == 0 ? `${row.max_money}` : '',
          // money_day_stop: row.money_day_stop || row.money_day_stop == 0 ? `${row.money_day_stop / 100}` : '',
          money_day_stop: row.money_day_stop || row.money_day_stop == 0 ? `${row.money_day_stop}` : '',
          // money_stop: row.money_stop || row.money_stop == 0 ? `${row.money_stop / 100}` : '',
          money_stop: row.money_stop || row.money_stop == 0 ? `${row.money_stop}` : '',
          remark: row.remark,
          payurl: row.payurl,
          ip: row.ip,
          rechage_money: [''],
          give: row.give,
          give_protion: row.give_protion,
          give_dml: row.give_dml,
          channel_num: row.channel_num,
          type: 'payment',
          pay_config_type: row.pay_config_type,
          give_recharge_dml: row.give_recharge_dml,
          give_lottery_dml: row.give_lottery_dml,
          level: row.level ? row.level : []
        }
        if (row.rechage_money) {
          let rechage_money = [ ...row.rechage_money ]
          for (let i = 0; i < rechage_money.length; i++) {
            this.handleInfo.rechage_money[i] = MathDiv(rechage_money[i], 1)
          }
        }
        // Reflect.ownKeys(this.handleInfo.rechage_money).forEach(key){
        //   console.log(this.handleInfo.rechage_money[key])
        // }
        this.visible.modal = true
      },
      //选择文件
      batchLogoUrlFn(url){
        this.handleInfo.logo = url
      },
      //清除文件
      clearLogoFile(){
        this.handleInfo.logo = ''
      },
      //选择文件
      batchUrlFn(url){
        this.handleInfo.img = url
      },
      //清除文件
      clearFile(){
        this.handleInfo.img = ''
      },
      // 添加快捷充值
      addRechageMoney(){
        this.handleInfo.rechage_money.push('')
      },
      // 删除快捷充值
      deleteRechageMoney(){
        this.handleInfo.rechage_money.pop()
      },
      getUserLevel(event){
        // console.log(`event`, event)
        // event.forEach((item, index) => {
        //   if(item == ''){
        //     this.user_level = []
        //     this.levelList.forEach((items, indexs) => {
        //       this.user_level.push(items.level)
        //     })
        //   }
        // })
      },
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
        // if(this.editInfo.condition_user_level){
        //   this.user_level = []
        //   this.editInfo.condition_user_level.split(',').forEach((item, index) => {
        //     this.user_level.push( +item )
        //   })
        // }
      },
      // 获取支付渠道和类型
      async getPayData() {
        const res = await this.$axios.request({
          url: '/cash/3ths/pay',
          method: 'GET'
        })
        if (res.status !== 200) {
          // this.payChannel = []
          this.payType = []
          this.$msg({
            type: 'error',
            message: res.message
          })
        } else {
          // this.payChannel = res.data.pay_channel
          this.payType = res.data.pay_scene
        }
      },
      // 获取列表
      async getList(index = 1) {
        this.loading.page = true
        this.page.currentPage = index
        const res = await this.$axios.request({
          url: '/cash/paychannel/payment',
          method: 'GET',
          params: {
            ...this.initQuery,
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
      // 排序
      async swapItems(current, target) {
        const data = this.dataSource
        data[current] = data.splice(target, 1, data[current])[0]
        const req = this.dataSource.map((o, i) => ({ id: o.id, sort: i + 1 }))
        const res = await this.$axios.request({
          url: '/cash/paychannel/sort',
          method: 'PUT',
          data: {
            data: req,
            type: 'payment'
          }
        })
        this.$msg({
          type: res.status !== 200 ? 'error' : 'success',
          message: res.message
        })
        if (res.status !== 200) return
        this.getList()
      },
      // 修改状态
      async handleStatus(row) {
        const res = await this.$axios.request({
          url: `/cash/paychannel/${row.id}`,
          method: 'PATCH',
          data: {
            type: 'payment'
          }
        })
        if (res.status !== 200) {
          return this.$msg({
            type: 'error',
            message: res.message
          })
        }
        this.$msg({
          type: 'success',
          message: res.message
        })
        this.getList()
      },
      // 保存数据
      async Save(){
        this.$refs['handleInfo'].validate(async valid => {
          if (valid) {
            const req = { ...this.handleInfo }
            // req.min_money = req.min_money * 100
            req.min_money = req.min_money
            // req.max_money = req.max_money * 100
            req.max_money = req.max_money
            // req.money_day_stop = req.money_day_stop * 100
            req.money_day_stop = req.money_day_stop
            // req.money_stop = req.money_stop * 100
            req.money_stop = req.money_stop
            const rechage_money = {}
            if (req.rechage_money) {
              for (let i = 0; i < req.rechage_money.length; i++) {
                // req.rechage_money[i] = MathMul(req.rechage_money[i], 100)
                // rechage_money[i] = MathMul(req.rechage_money[i], 100)
                rechage_money[i] = req.rechage_money[i]
              }
            }
            req.rechage_money = JSON.stringify(rechage_money)
            delete req.id
            delete req.channel_num
            const res = await this.$axios.request({
              url: `/cash/paychannel/${this.handleInfo.id}`,
              method: 'PUT',
              data: {
                ...req
              }
            })
            this.$msg({
              type: res.status !== 200 || res.state != 0? 'error' : 'success',
              message: res.message
            })
            if (res.status !== 200 || res.state != 0) return
            this.visible.modal = false
            this.getList()
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .modal_title {
    font-size: 16px;
    margin: 10px 0;
    padding-left: 10px;
    border-left: 3px solid #3080fe;
    color: #666;
  }
</style>
