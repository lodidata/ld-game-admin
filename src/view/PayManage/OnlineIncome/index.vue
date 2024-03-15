<template>
  <div id="OnlineIncome">
    <Spin v-if="loading.page" fix></Spin>

    <!-- query -->
    <Card dis-hover class="query_box">
      <div class="query_con">
        <div class="item">
          <span>{{i18n_lang.payManage58}}</span>
          <Input v-model="query.user_name" placeholder style="width: 100px"></Input>
        </div>

        <div class="item">
          <span>{{i18n_lang.payManage59}}</span>
          <Input v-model="query.trade_no" placeholder style="width: 100px"></Input>
        </div>

        <div class="item">
          <span>{{i18n_lang.payManage60}}</span>
          <Select v-model="query.status" style="width:100px">
            <Option value>{{i18n_lang.payManage61}}</Option>
            <Option value="paid">{{i18n_lang.payManage62}}</Option>
            <Option value="pending">{{i18n_lang.payManage63}}</Option>
            <Option value="failed">{{i18n_lang.payManage64}}</Option>
          </Select>
        </div>

        <div class="item">
          <span>{{i18n_lang.payManage65}}</span>
          <Select v-model="query.pay_scence" style="width:100px">
            <Option value>{{i18n_lang.payManage66}}</Option>
            <Option v-for="(it,i) in thirdType" :key="i" :value="it.pay_scene">{{ it.name }}</Option>
          </Select>
        </div>
        <div class="item">
          <span>{{i18n_lang.payManage67}}</span>
          <Select v-model="query.pay_channel" style="width:100px">
            <Option value>{{i18n_lang.payManage68}}</Option>
            <Option v-for="(it,i) in thirdContact" :key="i" :value="it.code">{{ it.name }}</Option>
          </Select>
        </div>

        <div class="item">
          <span>{{i18n_lang.payManage69}}</span>
          <DatePicker v-model="query.date_from" type="datetime" placeholder style="width: 180px" :options="dateOpt" :editable="false"></DatePicker>
          <span>-</span>
          <DatePicker v-model="query.date_to" type="datetime" placeholder style="width: 180px" :options="dateOpt" :editable="false"></DatePicker>
        </div>

        <div class="item">
          <span>{{i18n_lang.payManage70}}</span>
          <Select v-model="query.ranting" style="width:100px">
            <Option value>{{i18n_lang.payManage71}}</Option>
            <Option v-for="(it,i) in memberLevel" :key="i" :value="it.level">{{ it.name }}</Option>
          </Select>
        </div>
      </div>

      <div class="query_btns">
        <Button type="primary" icon="ios-search" @click="getData()">{{i18n_lang.payManage72}}</Button>
        <Button type="primary" icon="md-refresh" @click="reset">{{i18n_lang.payManage73}}</Button>
        <Button type="primary" style="margin-left: 5px;" icon="ios-download-outline" @click="exportData" v-if="allRoutes.indexOf('327') > -1">{{i18n_lang.payManage161}}</Button>
      </div>
    </Card>
    <Card dis-hover class="query_box">
      <div class="statistics">
        <div>
          <div>{{i18n_lang.payManage162}}</div>
          <!-- <div>{{i18n_lang.payManage163}}</div> -->
        </div>
        <div>
          <div>{{i18n_lang.payManage164}}{{totalInfo.current_paid_count}}</div>
          <!-- <div>{{i18n_lang.payManage164}}{{totalInfo.all_paid_count}}</div> -->
        </div>
        <div>
          <!-- <div>{{i18n_lang.payManage165}}{{totalInfo.current_money_count ? Number(totalInfo.current_money_count) / 100 : 0}}</div> -->
          <div>{{i18n_lang.payManage165}}{{totalInfo.current_money_count ? Number(totalInfo.current_money_count) : 0}}</div>
          <!-- <div>{{i18n_lang.payManage165}}{{totalInfo.all_money_count ? Number(totalInfo.all_money_count) / 100 : 0}}</div> -->
        </div>
        <div>
          <div>{{i18n_lang.payManage166}}{{totalInfo.current_paid_fail_count}}</div>
          <!-- <div>{{i18n_lang.payManage166}}{{totalInfo.all_paid_fail_count}}</div> -->
        </div>
        <div>
          <!-- <div>{{i18n_lang.payManage167}}{{totalInfo.current_money_fail_count ? Number(totalInfo.current_money_fail_count) / 100 : 0}}</div> -->
          <div>{{i18n_lang.payManage167}}{{totalInfo.current_money_fail_count ? Number(totalInfo.current_money_fail_count) : 0}}</div>
          <!-- <div>{{i18n_lang.payManage167}}{{totalInfo.all_money_fail_count ? Number(totalInfo.all_money_fail_count) / 100 : 0}}</div> -->
        </div>
        <div>
          <!-- <div>{{i18n_lang.payManage168}}{{totalInfo.current_coupon_money_count ? Number(totalInfo.current_coupon_money_count) / 100 : 0}}</div> -->
          <div>{{i18n_lang.payManage168}}{{totalInfo.current_coupon_money_count ? Number(totalInfo.current_coupon_money_count) : 0}}</div>
          <!-- <div>{{i18n_lang.payManage168}}{{totalInfo.all_coupon_count ? Number(totalInfo.all_coupon_count) / 100 : 0}}</div> -->
        </div>
        <div>
          <!-- <div>{{i18n_lang.payManage169}}{{totalInfo.current_account_count ? Number(totalInfo.current_account_count) / 100 : 0}}</div> -->
          <div>{{i18n_lang.payManage169}}{{totalInfo.current_account_count ? Number(totalInfo.current_account_count) : 0}}</div>
          <!-- <div>{{i18n_lang.payManage169}}{{totalInfo.all_account_count ? Number(totalInfo.all_account_count) / 100 : 0}}</div> -->
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
      <MyPage
        class="page_box"
        :current="page.currentPage"
        :page-size="page.pageSize"
        :total="page.total"
        show-sizer
        @onChange="getData"
        @changePageSize="changePageSize"
      ></MyPage>
    </div>

    <!-- detail -->
    <Modal
      v-model="visible.detail"
      class="onlineincomodal"
      :width="800"
      :title="i18n_lang.payManage74"
      :styles="{top: '20px'}"
    >
      <Spin v-if="loading.detail" size="large" fix></Spin>
      <div v-if="Object.keys(detailData).length" class="tab_box">
        <p class="title">
          <span>{{i18n_lang.payManage75}}</span>
        </p>
        <div class="content">
          <Row>
            <Col span="8">
              <div class="item">
                <p>{{i18n_lang.payManage76}}</p>
                <span>{{ detailData.trade_no }}</span>
              </div>
            </Col>

            <Col span="8">
              <div class="item">
                <p>{{i18n_lang.payManage77}}</p>
                <span>{{ detailData.is_new == '1' ? i18n_lang.payManage78 : i18n_lang.payManage79 }}</span>
              </div>
            </Col>

            <Col span="8">
              <div class="item">
                <p>{{i18n_lang.payManage80}}</p>
                <span>{{ detailData.user_name }}</span>
              </div>
            </Col>

            <Col span="8">
              <div class="item">
                <p>{{i18n_lang.payManage81}}</p>
                <span>{{ detailData.ranting }}</span>
              </div>
            </Col>

            <Col span="8">
              <div class="item">
                <p>{{i18n_lang.payManage82}}</p>
                <span>{{ detailData.true_name }}</span>
              </div>
            </Col>

            <Col span="8">
              <div class="item">
                <p>{{i18n_lang.payManage83}}</p>
                <span>{{ detailData.register_time }}</span>
              </div>
            </Col>
            <Col span="8">
              <div class="item">
                <p>{{i18n_lang.payManage84}}</p>
                <span>{{ detailData.agent_name || '-' }}</span>
              </div>
            </Col>

            <Col span="8">
              <div class="item">
                <p>{{i18n_lang.payManage85}}</p>
                <span>{{ detailData.total_deposit_times }}/{{ detailData.total_deposit_money }}</span>
              </div>
            </Col>
          </Row>
        </div>

        <p class="title">
          <span>{{i18n_lang.payManage87}}</span>
        </p>
        <div class="content">
          <Row>
            <Col span="8">
              <div class="item">
                <p>{{i18n_lang.payManage88}}</p>
                <span>{{ detailData.money }}</span>
              </div>
            </Col>

            <Col span="8">
              <div class="item">
                <p>{{i18n_lang.payManage89}}</p>
                <span>{{ detailData.pay_no }}</span>
              </div>
            </Col>

            <Col span="8">
              <div class="item">
                <p>{{i18n_lang.payManage90}}</p>
                <span>{{ JSON.parse(detailData.channel_name).pay }}</span>
              </div>
            </Col>

            <Col span="8">
              <div class="item">
                <p>{{i18n_lang.payManage91}}</p>
                <span>{{ detailData.trade_no }}</span>
              </div>
            </Col>

            <Col span="8">
              <div class="item">
                <p>{{i18n_lang.payManage92}}</p>
                <span>{{ detailData.ip }}</span>
              </div>
            </Col>

            <Col span="8">
              <div class="item">
                <p>{{i18n_lang.payManage93}}</p>
                <span>{{ detailData.recharge_time }}</span>
              </div>
            </Col>
          </Row>
        </div>

        <p class="title">
          <span>{{i18n_lang.payManage94}}</span>
        </p>
        <div class="content">
          <Row>
            <Col span="8">
              <div class="item">
                <p>{{i18n_lang.payManage95}}</p>
                <span>{{ detailData.coupon_money }}</span>
              </div>
            </Col>

            <Col span="8">
              <div class="item">
                <p>{{i18n_lang.payManage96}}</p>
                <span>{{ detailData.withdraw_bet }}</span>
              </div>
            </Col>

            <Col span="8">
              <div class="item">
                <p>{{i18n_lang.payManage97}}</p>
                <span>{{ detailData.active_name || i18n_lang.payManage98 }}</span>
              </div>
            </Col>
          </Row>
        </div>

        <p class="title">
          <span>{{i18n_lang.payManage99}}</span>
        </p>
        <div class="content">
          <Row>
            <Col>
              <div class="item">
                <span style="word-wrap: anywhere;word-break: break-all;}">{{ detailData.memo || '-' }}</span>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <div slot="footer">
        <Button @click="visible.detail=false">{{i18n_lang.payManage100}}</Button>
      </div>
    </Modal>
    <Modal
      v-model="visible.replacement_order"
      :width="800"
      :title="i18n_lang.payManage101"
      :styles="{top: '20px'}"
      @on-ok="handleSupplement"
    >
      <div>{{`${i18n_lang.payManage102}${replenishment.user_name}${i18n_lang.payManage103}${replenishment.trade_no}${i18n_lang.payManage104}`}}</div>
    </Modal>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import columns from './columns'
import MyTable from '@/components/MyTable'
import MyPage from '@/components/MyPage'
import { MathDiv } from '@/libs/formatMath'
import { computeDay } from '@/libs/handleDate'
const initQuery = {
  user_name: '',
  trade_no: '',
  status: 'pending',
  pay_scence: '',
  pay_channel: '',
  date_from: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 00:00:00`,
  date_to: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 23:59:59`,
  ranting: '',
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
        detail: false
      },
      visible: {
        detail: false,
        replacement_order: false
      },
      dateOpt: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now() - 4320000000
        }
      },
      query: { ...initQuery },
      thirdType: [], // 第三方支付类型
      thirdContact: [], // 第三方商户名称
      memberLevel: [], // 会员等级
      dataSource: [],
      totalInfo: '', // 统计数据
      page: {
        pageSize: 20,
        total: 0,
        currentPage: 1
      },
      detailData: {},
      replenishment: {
        user_name: '',
        trade_no: ''
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
    sortTable(key){
      // console.log(key)
      this.query.sort_field = key.key
      this.query.sort_type = key.order != 'normal' ? key.order : ''
      this.getData()
    },
    init() {
      this.getQuery()
    },
    async getQuery() {
      this.loading.page++
      const third = this.getThird()
      const level = this.getLevel()
      Promise.all([third, level]).then(res => {
        this.loading.page--
      })
    },

    // 获取支付类型，商户名称
    async getThird() {
      const res = await this.$axios.request({
        url: `/cash/3ths/pay`,
        method: 'GET'
      })
      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      this.thirdType = res.data.pay_scene
      this.thirdContact = res.data.pay_channel
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

    // 设置每页条数
    changePageSize(pageSize) {
      this.page.pageSize = pageSize
      this.getData()
    },

    // 获取数据
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
        url: `/cash/deposit/onlines`,
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
    // 重置查询条件
    reset() {
      this.query = Object.assign({}, initQuery)
      this.getData()
    },
    //
    async handleDetail(row) {
      this.detailData = Object.assign({})
      this.loading.detail = true
      this.visible.detail = true

      const res = await this.$axios.request({
        url: `/cash/deposit/online/${row.id}`,
        method: 'GET'
      })

      this.loading.detail = false
      if (res.status !== 200) {
        this.visible.detail = false
        this.$msg({
          type: 'error',
          message: res.message
        })
      } else {
        this.detailData = Object.assign({}, res.data)
        this.detailData.coupon_money = MathDiv(this.detailData.coupon_money, 1)
        this.detailData.withdraw_bet = MathDiv(this.detailData.withdraw_bet, 1)
        this.detailData.money = MathDiv(this.detailData.money, 1)
        this.detailData.total_deposit_money = MathDiv(this.detailData.total_deposit_money, 1)
        // let is_new = this.detailData.state.indexOf('new') != -1 ? 1 : 0
        // this.detailData.is_new = res.data.is_new ? res.data.is_new : is_new
      }
    },
    // 补单
    async handleSupplement(row) {
      if(row){
        this.replenishment = {
          user_name: row.user_name,
          trade_no: row.trade_no
        }
        this.visible.replacement_order = true
        return
      }
      this.loading.page++
      const res = await this.$axios.request({
        url: `/cash/deposit/online/${this.replenishment.trade_no}`,
        method: 'PATCH'
      })
      this.loading.page--
      if (res.status !== 200) {
        this.visible.detail = false
        this.visible.replacement_order = false
        this.$msg({
          type: 'error',
          message: res.message
        })
      } else {
        this.visible.replacement_order = false
        this.$Message.success(res.message)
        this.getData(this.page.currentPage)
      }
      return
      this.$Modal.confirm({
        title: this.i18n_lang.payManage101,
        content: `${this.i18n_lang.payManage102}${row.user_name}${this.i18n_lang.payManage103}${row.trade_no}${this.i18n_lang.payManage104}`,
        okText: this.i18n_lang.payManage159,
        cancelText: this.i18n_lang.payManage160,
        onOk: async () => {
          this.loading.page++
          const res = await this.$axios.request({
            url: `/cash/deposit/online/${row.trade_no}`,
            method: 'PATCH'
          })
          this.loading.page--
          if (res.status !== 200) {
            this.visible.detail = false
            this.$msg({
              type: 'error',
              message: res.message
            })
          } else {
            this.$Message.success(res.message)
            this.getData(this.page.currentPage)
          }
        },
        onCancel: () => {
          this.$Message.info('Clicked cancel')
        }
      })
    },
    // 查看用户详情
    handleUserDetail(row) {
      this.getUserDetail({ username: row.user_name, id: row.user_id })
    },
    //表格导出
    async exportData() {
      const query = {
        // page: this.page.currentPage,
        // page_size: this.page.pageSize,
        ...this.query
      }
      if (query.date_from) {
        query.date_from = this.$dateTimeFormat(new Date(query.date_from))
      }
      if (query.date_to) {
        query.date_to = this.$dateTimeFormat(new Date(query.date_to))
      }
      const res = await this.$axios.request({
        url: '/cash/deposit/onlines/export',
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
    }
  }
}
</script>
<style lang="less" scoped>
@import url('./index.less');
.onlineincomodal {
  .tab_box .title {
    margin: 10px 0;
  }
  .content {
    .item {
      margin-bottom: 5px;
      p,
      span {
        font-size: 14px;
        display: inline-block;
        line-height: 28px;
        color: rgb(153, 153, 153);
        min-width: 70px;
        margin-right: 5px;
      }
      span {
        color: rgb(51, 51, 51);
        &.detail {
          color: #f33;
          margin-left: 5px;
        }
      }
    }
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
