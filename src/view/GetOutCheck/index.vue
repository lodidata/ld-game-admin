<template>
  <div id="getOutCheck">
    <Spin v-if="loading.page" fix></Spin>
    <!-- query -->
    <Card dis-hover class="query_box">
      <div class="query_con">
        <div class="item">
          <span>{{i18n_lang.getOutCheck0}}</span>
          <Input v-model="query.member_name" placeholder style="width: 100px" />
        </div>

        <div class="item">
          <span>{{i18n_lang.getOutCheck1}}</span>
          <Input v-model="query.trade_no" placeholder style="width: 100px" />
        </div>

        <div class="item">
          <span>{{i18n_lang.getOutCheck2}}</span>
          <Select v-model="query.status" style="width:100px">
            <Option value>{{i18n_lang.getOutCheck3}}</Option>
            <Option value="pending">{{i18n_lang.getOutCheck4}}</Option>
            <Option value="paid">{{i18n_lang.getOutCheck5}}</Option>
            <Option value="rejected">{{i18n_lang.getOutCheck6}}</Option>
            <Option value="canceled">{{i18n_lang.getOutCheck7}}</Option>
            <Option value="confiscate">{{i18n_lang.getOutCheck123}}</Option>
            <Option value="obligation">{{i18n_lang.getOutCheck136}}</Option>
            <Option value="lock">{{i18n_lang.getOutCheck137}}</Option>
            <!-- refused:已取消，prepare:准备支付, failed：支付失败,:,: -->
          </Select>
        </div>

        <div class="item">
          <span>{{i18n_lang.getOutCheck8}}</span>
          <Select v-model="query.is_new" style="width:100px">
            <Option value>{{i18n_lang.getOutCheck9}}</Option>
            <Option value="yes">{{i18n_lang.getOutCheck10}}</Option>
            <Option value="no">{{i18n_lang.getOutCheck11}}</Option>
          </Select>
        </div>

        <div class="item">
          <span>{{i18n_lang.getOutCheck125}}</span>
          <Select v-model="query.type" style="width:100px">
            <Option value>{{i18n_lang.getOutCheck9}}</Option>
            <Option value="1">{{i18n_lang.getOutCheck126}}</Option>
            <Option value="2">{{i18n_lang.getOutCheck127}}</Option>
          </Select>
        </div>

        <div class="item">
          <span>{{i18n_lang.getOutCheck128}}</span>
          <Select v-model="query.transfer_id" style="width:100px">
            <Option value>{{i18n_lang.getOutCheck9}}</Option>
            <Option v-for="(item, index) in transferList" :key="index" :value="item.id">{{item.name}}</Option>
          </Select>
        </div>

        <div class="item">
          <span>{{i18n_lang.getOutCheck138}}</span>
          <Select v-model="query.bank_id" style="width:100px">
            <Option value>{{i18n_lang.getOutCheck9}}</Option>
            <Option v-for="(item, index) in bankList" :key="item.id" :value="item.id">{{item.name}}</Option>
          </Select>
        </div>

        <div class="item">
          <span>{{i18n_lang.getOutCheck12}}</span>
          <DatePicker v-model="query.register_from" type="datetime" placeholder style="width: 180px" :options="dateOpt" :editable="false"></DatePicker>
          <span>-</span>
          <DatePicker v-model="query.register_to" type="datetime" placeholder style="width: 180px" :options="dateOpt" :editable="false"></DatePicker>
        </div>
      </div>

      <div class="query_btns">
        <Button type="primary" icon="ios-search" style="margin-right: 5px;" @click="getData()">{{i18n_lang.getOutCheck13}}</Button>
        <Button type="primary" icon="md-refresh" @click="reset">{{i18n_lang.getOutCheck14}}</Button>
        <Button type="primary" style="margin-left: 5px;" icon="ios-download-outline" @click="exportData" v-if="allRoutes.indexOf('329') > -1">{{i18n_lang.getOutCheck114}}</Button>
      </div>
    </Card>
    <Card dis-hover class="query_box">
      <div class="statistics">
        <div>
          <div>{{i18n_lang.getOutCheck130}}</div>
        </div>
        <div>
          <div>{{i18n_lang.getOutCheck131}}{{totalInfo.total_money}}</div>
        </div>
        <div>
          <div>{{i18n_lang.getOutCheck132}}{{totalInfo.successful_money}}</div>
        </div>
        <div>
          <div>{{i18n_lang.getOutCheck133}}{{totalInfo.failure_money}}</div>
        </div>
        <div>
          <div>{{i18n_lang.getOutCheck134}}{{totalInfo.confiscated_money}}</div>
        </div>
      </div>
    </Card>
    <!-- table -->
    <div style="marginTop:10px;padding-bottom: 76px;">
      <MyTable
        filter
        :columns="dataList"
        :data="dataSource"
        :get-row-class-name="getRowClassName"
        :checkedKey="checkedKey"
        @handleSelect="handleSelect"
        @handleCancel="handleCancel"
        @handleSelectAll="handleSelectAll"
        border
      ></MyTable>
      <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{ `${i18n_lang.getOutCheck150}${page.total}${i18n_lang.getOutCheck151}` }}</div>
      <!-- <Page class="page_box" :current="page.currentPage" :page-size="page.pageSize" :total="page.total" show-sizer @on-change="getData" @on-page-size-change="changePageSize"></Page> -->
      <MyPage
        class="page_box"
        :current="page.currentPage"
        :page-size="page.pageSize"
        :total="page.total"
        show-sizer
        @onChange="getData"
        @changePageSize="changePageSize"
      ></MyPage>
      <div v-if="dataSource.length && selectList.length" style="width: 100%;padding-bottom: 20px;;position: fixed;bottom: 0;background: #fff;z-index: 10;">
        <span style="font-size: 24px;">{{i18n_lang.getOutCheck139}}</span>
        <!-- <Poptip confirm :title="`${i18n_lang.getOutCheck145}`" @on-ok="handleSuc('', 'obligation')">
          <Button type='success' size='small' style='margin-left:5px'>{{i18n_lang.getOutCheck146}}</Button>
        </Poptip> -->
        <Button type='success' size='small' style='margin-left:5px' @click="handleSuc('', 'obligation')">{{i18n_lang.getOutCheck146}}</Button>
        <Button type='error' size='small' style='margin-left:5px' @click="handleRefuse('', 'rejected')">{{i18n_lang.getOutCheck88}}</Button>
        <!-- <Button type='warning' size='small' style='margin-left:5px' @click="handleRefuse('', 'lock')">{{i18n_lang.getOutCheck147}}</Button> -->
        <Button type='primary' size='small' style='margin-left:5px;' @click="handleRefuse('', 'confiscate')">{{i18n_lang.getOutCheck123}}</Button>
        <Button type='primary' size='small' @click="handlePay()">{{i18n_lang.getOutCheck85}}</Button>
        <Button type='success' size='small' @click="handleRefuse('', 'paid')" style='margin-left:5px'>{{i18n_lang.getOutCheck87}}</Button>
        <!-- <Poptip confirm :title="`${i18n_lang.getOutCheck148}`" @on-ok="handleSuc('', 'unlock')"> -->
          <Button type='success' size='small' style='margin-left:5px'>
            {{i18n_lang.getOutCheck149}}
          </Button>
        </Poptip>
      </div>
    </div>
    <!-- 拒绝 -->
    <Modal
      v-model="visible"
      :title="alterTitle"
      :width="800"
      :styles="{top: '20px'}"
      @on-cancel="handleCloseModal"
    >
      <Form v-if="visible" ref="editForm" :model="editInfo" :label-width="80">
        <!-- <FormItem :label="i18n_lang.getOutCheck16" prop="user_name">
          <Input v-model="editInfo.user_name" disabled />
        </FormItem>
        <FormItem :label="i18n_lang.getOutCheck17" prop="bank_name">
          <Input v-model="editInfo.receive_bank_info.name" disabled />
        </FormItem>
        <FormItem :label="i18n_lang.getOutCheck18" prop="bank">
          <Input v-model="editInfo.receive_bank_info.bank" disabled />
        </FormItem>
        <FormItem :label="i18n_lang.getOutCheck19" prop="bank_card">
          <Input v-model="editInfo.receive_bank_info.card" disabled />
        </FormItem>
        <FormItem :label="i18n_lang.getOutCheck20" prop="money">
          <Input v-model="editInfo.money" disabled />
        </FormItem> -->
        <MyTable
          :columns="payList"
          :data="checkedList"
          border
        ></MyTable>
        <FormItem></FormItem>
        <FormItem :label="editInfo.statusAlter == 'rejected' ? i18n_lang.getOutCheck21 : `${i18n_lang.getOutCheck140}`" prop="comment">
          <Input type="textarea" :rows="3" v-model="editInfo.memo" />
        </FormItem>
      </Form>

      <div slot="footer">
        <Button @click="handleCloseModal">{{i18n_lang.getOutCheck22}}</Button>
        <Button type="primary" :loading="loading.btn.modal" @click="handleSave">{{alterTitle == i18n_lang.getOutCheck87 ? i18n_lang.getOutCheck87 : i18n_lang.getOutCheck23}}</Button>
      </div>
    </Modal>

    <!-- 代付 -->
    <Modal
      v-model="payModal"
      :title="i18n_lang.getOutCheck24"
      :width="800"
      :styles="{top: '100px'}"
      @on-cancel="closePayModal"
    >
      <Spin v-if="loading.pay" fix></Spin>
      <Form v-if="payModal" ref="editForm" :model="payInfo" :label-width="90">
        <FormItem :label="i18n_lang.getOutCheck25" prop="user_name">
          <Select v-model="payInfo.third_id" style="width:100px" @on-change="changeTird">
            <Option v-for="it in thirdAdvance" :key="it.id" :value="it.id">{{ it.name }}</Option>
          </Select>
        </FormItem>
        <FormItem :label="i18n_lang.getOutCheck26" prop="bank_name">
          {{ loading.balanceBtn?'':payInfo.balance }}
          <Button type="primary" :loading="loading.balanceBtn" @click="getThirdBalance">{{i18n_lang.getOutCheck27}}</Button>
        </FormItem>
        <MyTable
          :columns="payList"
          :data="checkedList"
          border
        ></MyTable>
        <FormItem></FormItem>
        <FormItem :label="`${i18n_lang.getOutCheck141}`" prop="comment">{{ payInfo.money }}</FormItem>
        <FormItem :label="i18n_lang.getOutCheck33" prop="comment">{{i18n_lang.getOutCheck34}}</FormItem>
      </Form>
      <div slot="footer">
        <!-- <Button @click="handleCloseModal">取消</Button> -->
        <Button type="primary" :loading="loading.payBtn" @click="savePay">{{i18n_lang.getOutCheck35}}</Button>
      </div>
    </Modal>

    <!-- 检查数据弹窗 -->
    <Modal
      v-model="checkModal"
      :title="i18n_lang.getOutCheck36"
      :width="900"
      :styles="{top: '100px'}"
      @on-cancel="checkModal = false"
    >
      <div class="searchBox">
        <div class="item">
          <span>{{i18n_lang.getOutCheck37}}</span>
          <Input v-model="search.ip" :placeholder="i18n_lang.getOutCheck38" style="width: 120px" />
        </div>

        <div class="item">
          <span>{{i18n_lang.getOutCheck39}}</span>
          <DatePicker
            v-model="search.start_time"
            type="date"
            :placeholder="i18n_lang.getOutCheck40"
            style="width: 120px"
            clearable
          ></DatePicker>
          <span>-</span>
          <DatePicker
            v-model="search.end_time"
            type="date"
            :placeholder="i18n_lang.getOutCheck41"
            style="width: 120px"
            clearable
          ></DatePicker>
        </div>

        <div class="item">
          <span>{{i18n_lang.getOutCheck42}}</span>
          <Select v-model="search.log_type" style="width:120px">
            <Option value>{{i18n_lang.getOutCheck43}}</Option>
            <Option value="1">{{i18n_lang.getOutCheck44}}</Option>
            <Option value="2">{{i18n_lang.getOutCheck45}}</Option>
            <Option value="3">{{i18n_lang.getOutCheck46}}</Option>
            <Option value="4">{{i18n_lang.getOutCheck47}}</Option>
            <Option value="5">{{i18n_lang.getOutCheck48}}</Option>
            <Option value="6">{{i18n_lang.getOutCheck49}}</Option>
            <Option value="7">{{i18n_lang.getOutCheck50}}</Option>
            <Option value="8">{{i18n_lang.getOutCheck51}}</Option>
            <Option value="9">{{i18n_lang.getOutCheck52}}</Option>
            <Option value="10">{{i18n_lang.getOutCheck53}}</Option>
            <Option value="11">{{i18n_lang.getOutCheck54}}</Option>
            <Option value="12">{{i18n_lang.getOutCheck55}}</Option>
          </Select>
        </div>
        <Button type="primary" @click="handleSearch">{{i18n_lang.getOutCheck56}}</Button>
      </div>

      <MyTable :columns="columnsCheck" :data="checkData" border></MyTable>
      <div slot="footer">
        <MyPage
          class="page_box"
          :current="Cpage.currentPage"
          :page-size="Cpage.pageSize"
          :total="Cpage.total"
          @onChange="getCheckData"
        ></MyPage>
      </div>
    </Modal>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { dataList, payList } from './columns'
import columnsCheck from './columnsCheck'
import MyTable from '../../components/MyTable'
import MyPage from '../../components/MyPage'
import { MathDiv, MathMul } from '@/libs/formatMath'
import { computeDay } from '@/libs/handleDate'
const initQuery = {
  member_name: '',
  trade_no: '',
  status: '',
  is_new: '',
  type: '',
  register_from: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 00:00:00`,
  register_to: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 23:59:59`,
  transfer_id: '',
  bank_id: ''
  // register_from: computeDay(),
  // register_to: computeDay()
}

const initEdit = {
  user_name: '',
  money: '',
  memo: '',
  receive_bank_info: {
    bank: '',
    card: '',
    name: ''
  }
}

const initSearch = {
  ip: '',
  start_time: '',
  end_time: '',
  log_type: ''
}

const initTotal = {
  // 待处理
  pending_count: 0,
  pending_sum: 0,
  // 提款成功
  paid_count: 0,
  paid_sum: 0,
  // 提款失败
  rejected_count: 0,
  rejected_sum: 0
}
export default {
  components: {
    MyTable,
    MyPage
  },
  computed: {
    ...mapState({
      allRoutes: state => state.user.allRoutes
    })
  },
  data() {
    const i18n_lang = this.$t('getOutCheck');
    return {
      i18n_lang: i18n_lang,
      loading: {
        page: false,
        pay: false,
        btn: {
          modal: false
        },
        payBtn: false,
        balanceBtn: false
      },
      dateOpt: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now() - 4320000000
        }
      },
      payModal: false, // 代付弹框
      checkModal: false, // 检查弹窗
      payInfo: {
        third_id: '',
        balance: ''
      },
      thirdAdvance: [], // 第三方代付
      query: { ...initQuery },
      page: {
        pageSize: 20,
        total: 0,
        currentPage: 1
      },
      search: { ...initSearch },
      Cpage: {
        pageSize: 10,
        total: 0,
        currentPage: 1
      },
      checkData: [],
      dataSource: [],
      dataList: dataList(this),
      payList: payList(this),
      columnsCheck: columnsCheck(this),
      visible: false,
      editInfo: { ...initEdit },
      totalInfo: { ...initTotal },
      isTips: false,
      transferList: [],
      selectList: [],
      checkedList: [],
      alterTitle: '',
      bankList: [],
      checkedKey: ['selection']
    }
  },
  created() {
    this.init()
  },
  methods: {
    ...mapActions({
      getUserDetail: 'detail/info'
    }),
    init() {
      this.getThirdAdvance()
      this.getTransfer()
      this.getBank()
    },
    handleSelect(data){
      this.selectList.push(data)
    },
    handleCancel(data){
      this.selectList.forEach((item,index) => {
        if(item.id == data.id){
          this.selectList.splice(index, 1)
        }
      })
    },
    handleSelectAll(data){
      this.selectList = data
    },
    // 风控警告
    riskConfirm() {
      return new Promise((r, f) => {
        this.$Modal.confirm({
          title: this.i18n_lang.getOutCheck57,
          content: this.i18n_lang.getOutCheck58,
          onOk: () => {
            r(true)
          },
          onCancel: () => {
            r(false)
          }
        })
      })
    },
    // 确认提款
    async handleSuc(row, text) {
      let ids = ''
      if(row){
        ids = row.id
      }else{
        if(!this.selectList.length) return this.$Message.warning(`${this.i18n_lang.getOutCheck142}`)
        this.selectList.forEach((item, index) => {
          ids += index == 0 ? `${item.id}` : `,${item.id}`
        })
      }
      if(text == 'paid'){
        // 风控提示
        if (row && row.tags === this.i18n_lang.getOutCheck59) {
          const risk = await this.riskConfirm()
          if (!risk) {
            return
          }
        }
      }
      this.loading.page = true
      const req = {
        ids: ids,
        status: text
      }
      let url = ''
      if(text == 'obligation'){
        url = `/cash/newwithdraw/obligation`
      }
      if(text == 'paid'){
        url = `/cash/newwithdraw/paid`
      }
      if(text == 'unlock' || text == 'obunlock'){
        url = `/cash/newwithdraw/unlock`
      }
      const res = await this.$axios.request({
        // url: `/cash/newwithdraw/${row.id}`,
        // url: `/cash/newwithdraw`,
        url: `${url}`,
        method: 'PATCH',
        params: req
      })
      this.loading.page = false
      if (res.status !== 200) { //|| res.state != 0
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      this.$Message.success(res.message)
      this.getData(this.page.currentPage)
    },
    // 拒绝打款
    handleRefuse(data, text) {
      if(text == 'paid'){
        this.alterTitle = this.i18n_lang.getOutCheck87
      }
      if(text == 'rejected'){
        this.alterTitle = this.i18n_lang.getOutCheck15
      }
      if(text == 'lock' || text == 'oblock'){
        this.alterTitle = `${this.i18n_lang.getOutCheck143}`
      }
      if(text == 'confiscate'){
        this.alterTitle = `${this.i18n_lang.getOutCheck144}`
      }
      // const editData = { ...data }
      // this.editInfo = Object.assign({}, editData)
      this.editInfo.statusAlter = text
      // this.editInfo.money = MathDiv(this.editInfo.money, 100)
      this.editInfo.memo = ''
      this.checkedList = []
      if(data){
        this.checkedList.push({
          id: data.id,
          user_name: data.user_name,
          name: data.receive_bank_info.name,
          bank_code: data.receive_bank_info.bank_code,
          card: data.receive_bank_info.card,
          address: data.receive_bank_info.address,
          money: MathDiv(data.money, 1),
          trade_no: data.trade_no
        })
      }else{
        if(!this.selectList.length) return this.$Message.warning(`${this.i18n_lang.getOutCheck142}`)
        this.selectList.forEach((item, index) => {
          this.checkedList.push({
            id: item.id,
            user_name: item.user_name,
            name: item.receive_bank_info.name,
            bank_code: item.receive_bank_info.bank_code,
            card: item.receive_bank_info.card,
            address: item.receive_bank_info.address,
            money: MathDiv(item.money, 1),
            trade_no: item.trade_no
          })
        })
      }
      this.visible = true
    },
    // 保存
    async handleSave() {
      this.loading.btn.modal = true
      const { statusAlter, memo } = this.editInfo
      let ids = ''
      this.checkedList.forEach((item, index) => {
        ids += index == 0 ? `${item.id}` : `,${item.id}`
      })
      // console.log(this.editInfo)
      const req = {
        // status: 'rejected',
        ids: ids,
        status: statusAlter,
        comment: memo
      }
      let url = ''
      if(req.status == 'paid'){
        url = `/cash/newwithdraw/paid`
      }
      if(req.status == 'rejected'){
        url = `/cash/newwithdraw/rejected`
      }
      if(req.status == 'lock' || req.status == 'oblock'){
        url = `/cash/newwithdraw/lock`
      }
      if(req.status == 'confiscate'){
        url = `/cash/newwithdraw/confiscate`
      }
      const res = await this.$axios.request({
        // url: `/cash/newwithdraw/${id}`,
        // url: `/cash/newwithdraw`,
        url: `${url}`,
        method: 'PATCH',
        params: req
      })
      this.loading.btn.modal = false
      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      this.visible = false
      this.getData(this.page.currentPage)
    },
    // 关闭拒绝提现模态框
    handleCloseModal() {
      this.visible = false
      this.$refs['editForm'].resetFields()
    },
    // 设置每页条数
    changePageSize(pageSize) {
      let parameter = sessionStorage.getItem('parameter') || '{}'
      if(JSON.parse(parameter).getOutCheck){
        this.query = {
          member_name: JSON.parse(parameter).getOutCheck.member_name ? JSON.parse(parameter).getOutCheck.member_name : '',
          trade_no: JSON.parse(parameter).getOutCheck.trade_no ? JSON.parse(parameter).getOutCheck.trade_no : '',
          status: JSON.parse(parameter).getOutCheck.status ? JSON.parse(parameter).getOutCheck.status : '',
          is_new: JSON.parse(parameter).getOutCheck.is_new ? JSON.parse(parameter).getOutCheck.is_new : '',
          type: JSON.parse(parameter).getOutCheck.type ? JSON.parse(parameter).getOutCheck.type : '',
          register_from: JSON.parse(parameter).getOutCheck.register_from ? JSON.parse(parameter).getOutCheck.register_from : '',
          register_to: JSON.parse(parameter).getOutCheck.register_to ? JSON.parse(parameter).getOutCheck.register_to : '',
          transfer_id: JSON.parse(parameter).getOutCheck.transfer_id ? JSON.parse(parameter).getOutCheck.transfer_id : '',
          bank_id: JSON.parse(parameter).getOutCheck.bank_id ? JSON.parse(parameter).getOutCheck.bank_id : '',
        }
        this.page.pageSize = pageSize
        this.getData(JSON.parse(parameter).getOutCheck.page)
      }else{
        this.page.pageSize = pageSize
        this.getData()
      }
    },
    // 获取数据
    async getData(i) {
      this.page.currentPage = i

      this.loading.page = true
      this.dataSource = []

      const query = {
        page: this.page.currentPage,
        page_size: this.page.pageSize,
        ...this.query
      }
      if (query.register_from && query.register_to) {
        query.register_from = this.$dateTimeFormat(query.register_from)
        query.register_to = this.$dateTimeFormat(query.register_to)
      }
      const res = await this.$axios.request({
        url: `/cash/newwithdraw`,
        method: 'GET',
        params: query
      })
      this.loading.page = false

      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
      } else {
        // console.log(res)
        let parameterPage = sessionStorage.getItem('parameter') || "{}"
        let parameter = JSON.parse(parameterPage)
        parameter.getOutCheck = {
          ...query,
          page: this.page.currentPage,
          page_size: this.page.pageSize
        }
        sessionStorage.setItem('parameter', JSON.stringify(parameter))
        this.page.total = res.attributes ? res.attributes.total : 0
        this.dataSource = Object.assign([], res.data)
        const total = Object.assign([], res.attributes)
        this.selectList = []
        delete total.number
        delete total.size
        delete total.total
        this.totalInfo = total
      }
    },
    // 重置
    reset() {
      this.query = Object.assign({}, initQuery)
      this.getData()
    },
    // 打开代付弹框
    async handlePay(data) {
      this.checkedList = []
      if(data){
        // 风控提示
        if (data.tags === this.i18n_lang.getOutCheck59) {
          const risk = await this.riskConfirm()
          if (!risk) {
            return
          }
        }
        this.checkedList.push({
          user_name: data.user_name,
          name: data.receive_bank_info.name,
          bank_code: data.receive_bank_info.bank_code,
          card: data.receive_bank_info.card,
          address: data.receive_bank_info.address,
          money: MathDiv(data.money, 1),
          trade_no: data.trade_no
        })
      }else{
        if(!this.selectList.length) return this.$Message.warning(`${this.i18n_lang.getOutCheck142}`)
        this.selectList.forEach((item, index) => {
          this.checkedList.push({
            user_name: item.user_name,
            name: item.receive_bank_info.name,
            bank_code: item.receive_bank_info.bank_code,
            card: item.receive_bank_info.card,
            address: item.receive_bank_info.address,
            money: MathDiv(item.money, 1),
            trade_no: item.trade_no
          })
        })
      }
      if (!this.thirdAdvance.length) {
        this.$Message.warning(this.i18n_lang.getOutCheck60)
        return
      }
      this.payInfo.third_id = this.thirdAdvance.length ? this.thirdAdvance[0].id : ''
      this.getThirdBalance()

      this.payModal = !this.payModal
      this.payInfo.money = 0
      this.checkedList.forEach((item, index) => {
        this.payInfo.money += Number(item.money)
      })
    },
    // 关闭弹框
    closePayModal() {
      this.payModal = false
    },
    // 切换代付
    changeTird() {
      this.getThirdBalance()
    },
    // 获取第三方代付数据
    async getThirdAdvance() {
      this.loading.pay = true
      this.thirdAdvance = []
      const res = await this.$axios.request({
        url: '/thirdAdvance',
        method: 'GET'
      })
      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      this.thirdAdvance = res.data ? res.data : []
    },
    // 获取第三方代付数据
    async getTransfer() {
      this.loading.pay = true
      this.thirdAdvance = []
      const res = await this.$axios.request({
        url: '/cash/third/transfer',
        method: 'GET'
      })
      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      // console.log('transfer', res.data)
      this.transferList = res.data ? res.data : [],
      this.transferList.push({
        id: 0,
        name: `${this.i18n_lang.getOutCheck135}`
      })
    },
    // 获取代付余额
    async getThirdBalance() {
      this.loading.balanceBtn = true
      this.payInfo.balance = ''
      const res = await this.$axios.request({
        url: `/thirdAdvance/balance/${this.payInfo.third_id}`,
        method: 'GET'
      })
      this.loading.balanceBtn = false
      this.loading.pay = false
      if (res.status !== 200) {
        this.payInfo.balance = this.i18n_lang.getOutCheck61
        this.$Message.error(res.message)
      } else {
        this.payInfo.balance = res.data ? MathDiv(res.data.balance, 1) : this.i18n_lang.getOutCheck61
      }
    },
    // 提交转账
    async savePay() {
      if (!Number(this.payInfo.balance)) {
        this.$Message.warning(this.i18n_lang.getOutCheck62)
        return
      }
      // if (this.payInfo.money > MathMul(this.payInfo.balance, 100)) {
      if (this.payInfo.money > Number(this.payInfo.balance)) {
        this.$Message.warning(this.i18n_lang.getOutCheck63)
        return
      }
      let withdraw_order = ''
      this.checkedList.forEach((item, index) => {
        withdraw_order += index == 0 ? `${item.trade_no}` : `,${item.trade_no}`
      })
      const obj = {
        third: this.payInfo.third_id,
        withdraw_order: withdraw_order
      }
      this.loading.payBtn = true
      const res = await this.$axios.request({
        url: '/thirdAdvance/transfer',
        method: 'PUT',
        params: obj
      })
      this.loading.payBtn = false

      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      this.payModal = false
      this.$Message.success(res.message)
      this.getData(this.page.currentPage)
    },
    // 获取检查列表数据
    async getCheckData(i) {
      this.Cpage.currentPage = i
      const params = {
        ...this.search,
        page: this.Cpage.currentPage,
        page_size: this.Cpage.pageSize
      }
      const res = await this.$axios.request({
        url: '/cash/ipcheck',
        method: 'GET',
        params
      })
      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      console.log(res, '---')
      this.checkData = res.data
      this.Cpage.total = res.attributes ? res.attributes.total : 0
    },
    // 检查
    handleCheck(row) {
      console.log(row.ip)
      this.search = { ...initSearch }
      this.checkModal = true
      this.search.ip = row.ip
      this.getCheckData()
    },
    // 搜索
    handleSearch() {
      this.getCheckData()
    },
    getRowClassName(row) {
      if (row.tags === this.i18n_lang.getOutCheck59) {
        return 'red'
      }
      return null
    },
    // 查看用户详情
    handleUserDetail(row) {
      this.getUserDetail({ username: row.user_name, id: row.user_id })
    },
    async exportData() {
      const query = {
        ...this.query
      }
      if (query.register_from && query.register_to) {
        query.register_from = this.$dateTimeFormat(query.register_from)
        query.register_to = this.$dateTimeFormat(query.register_to)
      }
      const res = await this.$axios.request({
        url: '/cash/newwithdraw/export',
        method: 'GET',
        responseType: 'blob',
        params: query
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
    async getBank(){
      const res = await this.$axios.request({
        url: '/banks',
        method: 'GET'
      })
      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      this.bankList = res.data
      // console.log('bank', res.data)
    }
  }
}
</script>
<style lang="less" scoped>
.searchBox {
  display: flex;
  .item {
    margin-right: 20px;
  }
}
.statistics{
  overflow: hidden;
  &>div{
    display: inline-block;
    margin-left: 20px;
    float: left;
    &>div:first-child{
      height: 18px;
    }
    &>div:nth-child(2){
      margin-top: 5px;
    }
    &:first-child{
      text-align: right;
      margin-left: 0;
    }
  }
}
</style>
