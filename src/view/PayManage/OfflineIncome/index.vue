<template>
  <div id="OfflineIncome">
    <Spin v-if="loading.page" fix></Spin>

    <!-- query -->
    <Card dis-hover class="query_box">
      <div class="query_con">
        <div class="item">
          <span>{{i18n_lang.payManage2}}</span>
          <Input v-model="query.user_name" placeholder style="width: 100px" />
        </div>

        <div class="item">
          <span>{{i18n_lang.payManage3}}</span>
          <Select v-model="query.ranting" style="width:100px">
            <Option value>{{i18n_lang.payManage4}}</Option>
            <Option v-for="(it,i) in memberLevel" :key="i" :value="it.level">{{ it.name }}</Option>
          </Select>
        </div>

        <div class="item">
          <span>{{i18n_lang.payManage5}}</span>
          <Select v-model="query.status" style="width:100px">
            <Option value>{{i18n_lang.payManage4}}</Option>
            <Option value="pending">{{i18n_lang.payManage6}}</Option>
            <Option value="paid">{{i18n_lang.payManage7}}</Option>
            <Option value="rejected">{{i18n_lang.payManage8}}</Option>
            <Option value="canceled">{{i18n_lang.payManage9}}</Option>
          </Select>
        </div>

        <div class="item">
          <span>{{i18n_lang.payManage10}}</span>
          <DatePicker v-model="query.date_from" type="datetime" placeholder style="width: 180px" :options="dateOpt"
            :editable="false"></DatePicker>
          <span>-</span>
          <DatePicker v-model="query.date_to" type="datetime" placeholder style="width: 180px" :options="dateOpt"
            :editable="false"></DatePicker>
        </div>

        <div class="item">
          <span>{{i18n_lang.payManage11}}</span>
          <Select v-model="query.pay_type" style="width:100px">
            <Option value>{{i18n_lang.payManage12}}</Option>
            <Option v-for="(it,i) in payType" :key="i" :value="it.id">{{ it.name }}</Option>
          </Select>
        </div>
      </div>

      <div class="query_btns">
        <Button type="primary" icon="ios-search" @click="getData()">{{i18n_lang.payManage13}}</Button>
        <Button type="primary" icon="md-refresh" @click="reset">{{i18n_lang.payManage14}}</Button>
        <Button type="primary" style="margin-left: 5px;" icon="ios-download-outline"
          @click="exportData" v-if="allRoutes.indexOf('328') > -1">{{i18n_lang.payManage161}}</Button>
      </div>
    </Card>

    <Card dis-hover class="query_box">
      <div class="statistics">
        <div>
          <div>{{i18n_lang.payManage171}}{{totalInfo.count}}</div>
        </div>
        <div>
          <div>{{i18n_lang.payManage172}}{{totalInfo.success_count}}</div>
        </div>
        <div>
          <div>{{i18n_lang.payManage173}}{{totalInfo.refuse_count}}</div>
        </div>
        <div>
          <!-- <div>{{i18n_lang.payManage174}}{{totalInfo.success_sum ? +totalInfo.success_sum / 100 : 0}}</div> -->
          <div>{{i18n_lang.payManage174}}{{totalInfo.success_sum ? +totalInfo.success_sum : 0}}</div>
        </div>
        <div>
          <!-- <div>{{i18n_lang.payManage175}}{{totalInfo.refuse_sum ? +totalInfo.refuse_sum / 100 : 0}}</div> -->
          <div>{{i18n_lang.payManage175}}{{totalInfo.refuse_sum ? +totalInfo.refuse_sum : 0}}</div>
        </div>
        <div>
          <!-- <div>{{i18n_lang.payManage176}}{{totalInfo.coupon_sum ? +totalInfo.coupon_sum / 100 : 0}}</div> -->
          <div>{{i18n_lang.payManage176}}{{totalInfo.coupon_sum ? +totalInfo.coupon_sum : 0}}</div>
        </div>
      </div>
    </Card>

    <!-- table -->
    <div style="marginTop:10px">
      <!-- <MyTable filter :columns="columns" :data="dataSource" border></MyTable> -->
      <Table ref="table" :columns="columns" :data="dataSource" border
        @on-sort-change="sortTable"
      ></Table>
      <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{ `${i18n_lang.payManage177}${page.total}${i18n_lang.payManage178}` }}</div>
      <!-- <Page class="page_box" :current="page.currentPage" :page-size="page.pageSize" :total="page.total" show-sizer @on-change="getData" @on-page-size-change="changePageSize"></Page> -->
      <MyPage class="page_box" :current="page.currentPage" :page-size="page.pageSize" :total="page.total" show-sizer
        @onChange="getData" @changePageSize="changePageSize"></MyPage>
      <!-- <Card dis-hover class="query_box" style="width:400px;" v-if="totalInfo">
        <p>
          <span>充值总额:</span>
          <span>共{{totalInfo.count}}笔，{{totalInfo.sum/100}}元</span>
        </p>
        <p>
          <span>已存入:</span>
          <span>共{{totalInfo.success_count}}笔，{{totalInfo.success_sum/100}}元</span>
        </p>
        <p>
          <span>已拒绝:</span>
          <span>共{{totalInfo.refuse_count}}笔，{{totalInfo.refuse_sum/100}}元</span>
        </p>
        <p>
          <span>未处理:</span>
          <span>共{{totalInfo.pending_count}}笔，{{totalInfo.pending_sum/100}}元</span>
        </p>
      </Card>-->
    </div>

    <!-- 详情 -->
    <Modal v-model="visible.detail" class="onlineincomodal" :width="800" :title="i18n_lang.payManage15"
      :styles="{top: '100px'}">
      <Spin v-if="loading.detail" fix></Spin>
      <div v-if="Object.keys(detailData).length" class="tab_box">
        <p class="title">
          <span>{{i18n_lang.payManage16}}</span>
        </p>
        <div class="content">
          <Row>
            <Col span="8">
            <div class="item">
              <p>{{i18n_lang.payManage17}}</p>
              <span>{{ detailData.in_money }}</span>
            </div>
            </Col>

            <Col span="8">
            <div class="item"></div>
            </Col>

            <Col span="8">
            <div class="item">
              <p>{{i18n_lang.payManage18}}</p>
              <span>{{ detailData.trade_no }}</span>
            </div>
            </Col>

            <Col span="8">
            <div class="item">
              <p>{{i18n_lang.payManage19}}</p>
              <span>{{ detailData.is_new == 1 ? i18n_lang.payManage20 : i18n_lang.payManage21 }}</span>
            </div>
            </Col>

            <Col span="8">
            <div class="item">
              <p>{{i18n_lang.payManage22}}</p>
              <span>{{ detailData.user_name }}</span>
            </div>
            </Col>

            <Col span="8">
            <div class="item">
              <p>{{i18n_lang.payManage23}}</p>
              <span>{{ detailData.ranting }}</span>
            </div>
            </Col>

            <Col span="8">
            <div class="item">
              <p>{{i18n_lang.payManage24}}</p>
              <span>{{ detailData.true_name }}</span>
            </div>
            </Col>

            <Col span="8">
            <div class="item">
              <p>{{i18n_lang.payManage25}}</p>
              <span>{{ detailData.generate_time }}</span>
            </div>
            </Col>
            <Col span="8">
            <div class="item">
              <p>{{i18n_lang.payManage26}}</p>
              <span>{{ detailData.agent_name || '-' }}</span>
            </div>
            </Col>

            <Col span="8">
            <div class="item">
              <p>{{i18n_lang.payManage27}}</p>
              <span>{{ detailData.total_deposit_times }}/{{ detailData.total_deposit_money }}</span>
            </div>
            </Col>

            <Col span="8">
            <div class="item">
              <p>{{i18n_lang.payManage28}}</p>
              <span>{{ detailData.recharge_time }}</span>
            </div>
            </Col>

            <Col span="8">
            <div class="item">
              <p>{{i18n_lang.payManage29}}</p>
              <span>{{ detailData.ip }}</span>
            </div>
            </Col>
          </Row>
        </div>

        <p class="title">
          <span>{{i18n_lang.payManage30}}</span>
        </p>
        <div class="content">
          <Row>
            <Col span="8">
            <div class="item">
              <p>{{i18n_lang.payManage31}}</p>
              <span>{{ (detailData.pay_bank_info && detailData.pay_bank_info.bank) || '-' }}</span>
            </div>
            </Col>

            <Col span="8">
            <div class="item">
              <p>{{i18n_lang.payManage32}}</p>
              <span>{{ (detailData.pay_bank_info && detailData.pay_bank_info.card) || '-' }}</span>
            </div>
            </Col>

            <Col span="8">
            <div class="item">
              <p>{{i18n_lang.payManage33}}</p>
              <span>{{ (detailData.pay_bank_info && detailData.pay_bank_info.name) || '-' }}</span>
            </div>
            </Col>

            <Col span="8">
            <div class="item">
              <p>{{i18n_lang.payManage34}}</p>
              <span>{{ (detailData.receive_bank_info && detailData.receive_bank_info.bank) || '-' }}</span>
            </div>
            </Col>

            <Col span="8">
            <div class="item">
              <p>{{i18n_lang.payManage35}}</p>
              <span>{{ (detailData.receive_bank_info && detailData.receive_bank_info.card) || '-' }}</span>
            </div>
            </Col>

            <Col span="8">
            <div class="item">
              <p>{{i18n_lang.payManage36}}</p>
              <span>{{ (detailData.receive_bank_info && detailData.receive_bank_info.accountname) || '-' }}</span>
            </div>
            </Col>
          </Row>
        </div>

        <p class="title">
          <span>{{i18n_lang.payManage37}}</span>
        </p>
        <div class="content">
          <Row>
            <Col span="8">
            <div class="item">
              <p>{{i18n_lang.payManage38}}</p>
              <span>{{ detailData.coupon_money }}</span>
            </div>
            </Col>

            <Col span="8">
            <div class="item">
              <p>{{i18n_lang.payManage39}}</p>
              <span>{{ detailData.withdraw_bet }}</span>
            </div>
            </Col>

            <Col span="8">
            <div class="item">
              <p>{{i18n_lang.payManage40}}</p>
              <span>{{ detailData.active_name || i18n_lang.payManage41 }}</span>
            </div>
            </Col>
          </Row>
        </div>

        <p class="title">
          <span>{{i18n_lang.payManage42}}</span>
        </p>
        <div class="content">
          <Row>
            <Col>
            <div class="item">
              <span>{{ detailData.memo || '-' }}</span>
            </div>
            </Col>
          </Row>
        </div>

        <p class="title">
          <span>{{i18n_lang.payManage43}}</span>
        </p>
        <div class="content">
          <Row>
            <Col>
            <div class="item">
              <span>{{ formatStatus(detailData.status) }}</span>
            </div>
            </Col>
          </Row>
        </div>
      </div>
      <div slot="footer">
        <Button v-if="detailData.status=='pending'" type="success" @click="handlePass(detailData)">
          {{i18n_lang.payManage44}}
        </Button>
        <Button v-if="detailData.status=='pending'" type="warning" @click="handlePass(detailData,true)">
          {{i18n_lang.payManage45}}
        </Button>
        <Button v-if="detailData.status=='pending'" type="error" @click="handleRefuse(detailData)">
          {{i18n_lang.payManage46}}
        </Button>
        <Button @click="visible.detail=false">{{i18n_lang.payManage47}}</Button>
      </div>
    </Modal>

    <!-- 拒绝 -->
    <Modal v-model="visible.refuse" class="onlineincomodal" :width="800" :title="i18n_lang.payManage48"
      :styles="{top: '100px'}">
      <Spin v-if="loading.refuse" fix></Spin>
      <Form v-if="visible.refuse" :model="refuseData" :label-width="80">
        <FormItem :label="i18n_lang.payManage49">{{ refuseData.user_name }}</FormItem>
        <FormItem :label="i18n_lang.payManage50">{{ refuseData.in_money/100 }}</FormItem>
        <FormItem :label="i18n_lang.payManage51">{{ formatDate(new Date) }}</FormItem>
        <FormItem :label="i18n_lang.payManage52">
          <Input v-model="refuseData.memo" placeholder style="width: 200px"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="visible.refuse = false">{{i18n_lang.payManage53}}</Button>
        <Button type="primary" @click="setRefuse">{{i18n_lang.payManage54}}</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import {
    mapState,
    mapActions
  } from 'vuex'
  import columns from './columns'
  import MyTable from '@/components/MyTable'
  import MyPage from '@/components/MyPage'
  import {
    formatDateTimeToString
  } from '@/libs/date'
  import {
    MathDiv
  } from '@/libs/formatMath'
  import {
    computeDay
  } from '@/libs/handleDate'

  const initQuery = {
    user_name: '',
    ranting: '',
    status: 'pending',
    date_from: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 00:00:00`,
    date_to: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 23:59:59`,
    pay_type: '',
    sort_field: '',
    sort_type: ''
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
      const i18n_lang = this.$t('payManage');
      return {
        i18n_lang: i18n_lang,
        columns: columns(this),
        loading: {
          page: 0,
          detail: false,
          refuse: false
        },
        visible: {
          detail: false,
          refuse: false
        },
        dateOpt: {
          disabledDate(date) {
            return date && date.valueOf() < Date.now() - 4320000000
          }
        },
        detailData: {},
        refuseData: {},
        query: {
          ...initQuery
        },
        memberLevel: [], // 会员等级
        payType: [], // 存款类型
        dataSource: [],
        totalInfo: '', // 统计数据
        page: {
          pageSize: 20,
          total: 0,
          currentPage: 1
        }
      }
    },
    created() {
      this.init()
    },
    methods: {
      ...mapActions({
        getUserDetail: 'detail/info'
      }),
      formatStatus(v) {
        switch (v) {
          case 'paid':
            return this.i18n_lang.payManage55
          case 'pending':
            return this.i18n_lang.payManage56
          case 'canceled':
            return this.i18n_lang.payManage57
        }
      },
      sortTable(key){
        // console.log(key)
        this.query.sort_field = key.key
        this.query.sort_type = key.order != 'normal' ? key.order : ''
        this.getData()
      },
      formatDate(val) {
        return formatDateTimeToString(val)
      },
      init() {
        this.getQuery()
      },
      async getQuery() {
        this.loading.page++
        const payType = this.getPayType()
        const level = this.getLevel()
        Promise.all([level, payType]).then(res => {
          this.loading.page--
        })
      },

      // 获取会员等级
      async getLevel() {
        const res = await this.$axios.request({
          url: `/user/level`,
          method: 'GET'
        })
        if (res.status !== 200) {
          this.$msg({
            type: 'error',
            message: res.message
          })
          return
        }
        this.memberLevel = res.data
      },
      // 获取存款类型
      async getPayType() {
        const res = await this.$axios.request({
          url: `/cash/deposit/paytype?type=1`,
          method: 'GET'
        })
        if (res.status !== 200) {
          this.$msg({
            type: 'error',
            message: res.message
          })
          return
        }
        this.payType = res.data
      },
      // 设置每页条数
      changePageSize(pageSize) {
        this.page.pageSize = pageSize
        this.getData()
      },
      async getData(index) {
        this.page.currentPage = index || 1

        this.loading.page++
        this.dataSource = []

        const query = {
          page: this.page.currentPage,
          page_size: this.page.pageSize,
          ...this.query
        }

        if (query.date_from) {
          query.date_from = this.$dateTimeFormat(new Date(query.date_from))
        }
        if (query.date_to) {
          query.date_to = this.$dateTimeFormat(new Date(query.date_to))
        }

        const res = await this.$axios.request({
          url: `/cash/deposit/offlines`,
          method: 'GET',
          params: query
        })

        this.loading.page--

        if (res.status !== 200) {
          this.$msg({
            type: 'error',
            message: res.message
          })
          return
        }
        this.page.total = res.attributes ? res.attributes.total : 0
        this.dataSource = Object.assign([], res.data)
        this.totalInfo = res.attributes
      },
      reset() {
        this.query = Object.assign({}, initQuery)
        this.getData()
      },
      // 详情
      async handleDetail(row) {
        this.detailData = Object.assign({})
        this.visible.detail = true
        this.loading.detail = true
        const res = await this.$axios.request({
          url: `/cash/deposit/offline/${row.id}`,
          method: 'GET'
        })
        if (res.status !== 200) {
          this.$msg({
            type: 'error',
            message: res.message
          })
        } else {
          this.detailData = Object.assign({}, row, res.data)
          this.detailData.in_money = MathDiv(this.detailData.in_money, 1)
          this.detailData.total_deposit_money = MathDiv(this.detailData.total_deposit_money, 1)
          this.detailData.coupon_money = MathDiv(this.detailData.coupon_money, 1)
          this.detailData.withdraw_bet = MathDiv(this.detailData.withdraw_bet, 1)
          this.detailData.is_new = this.detailData.state.indexOf('new') != -1 ? 1 : 0
          this.loading.detail = false
        }
      },
      // 通过
      async handlePass(row, denyRefused) {
        this.loading.page = true
        this.loading.detail = true
        const res = await this.$axios.request({
          url: `/cash/deposit/offline/${row.id}`,
          method: 'PATCH',
          params: {
            coupon: denyRefused ? 0 : 1,
            state: 'paid'
          }
        })
        this.loading.page = false
        this.loading.detail = false
        if (res.status !== 200) {
          this.$msg({
            type: 'error',
            message: res.message
          })
          return
        }
        this.visible.detail = false
        this.$Message.success(res.message)
        this.getData()
      },
      handleRefuse(row) {
        this.refuseData = Object.assign({}, row)
        this.visible.refuse = true
      },
      // 拒绝
      async setRefuse() {
        this.loading.page = true
        this.loading.refuse = true
        const res = await this.$axios.request({
          url: `/cash/deposit/offline/${this.refuseData.id}`,
          method: 'PATCH',
          params: {
            comment: this.refuseData.memo,
            coupon: 0,
            state: 'failed'
          }
        })
        this.loading.page = false
        this.loading.refuse = false
        if (res.status !== 200) {
          this.$msg({
            type: 'error',
            message: res.message
          })
        }
        this.$Message.success(res.message)
        this.visible.detail = false
        this.visible.refuse = false
        this.getData()
      },
      // 查看用户详情
      handleUserDetail(row) {
        this.getUserDetail({
          username: row.user_name,
          id: row.user_id
        })
      },
      //表格导出
      async exportData() {
        const query = {
          ...this.query
        }
        if (query.date_from) {
          query.date_from = this.$dateTimeFormat(new Date(query.date_from))
        }
        if (query.date_to) {
          query.date_to = this.$dateTimeFormat(new Date(query.date_to))
        }
        const res = await this.$axios.request({
          url: '/cash/deposit/offlines/export',
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
        const url = window.URL.createObjectURL(new Blob([res], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        }))
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
  @import url('./index.less');
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
