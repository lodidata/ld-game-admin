<template>
  <div id="ChaseOrder">
    <Spin v-if="loading.page" fix></Spin>

    <Card dis-hover class="query_box">
      <div class="query_con">
        <div class="item">
          <span>{{i18n_lang.lotteryOrder2}}</span>
          <Input v-model="query.chase_number" placeholder style="width: 100px" />
        </div>
        <div class="item">
          <span>{{i18n_lang.lotteryOrder3}}</span>
          <Input v-model="query.user_name" placeholder style="width: 100px" />
        </div>
        <div v-if="Object.keys(lotteryList).length" class="item">
          <span>{{i18n_lang.lotteryOrder4}}</span>
          <Select v-model="query.lottery_id" style="width:200px">
            <Option value>{{i18n_lang.lotteryOrder5}}</Option>
            <OptionGroup v-for="(it,i) in lotteryList" :key="i" :label="it.name">
              <Option v-for="(is,j) in it.children" :key="j" :value="is.id">{{ is.name }}</Option>
            </OptionGroup>
          </Select>
        </div>
        <div class="item">
          <span>{{i18n_lang.lotteryOrder6}}</span>
          <DatePicker
            v-model="query.timeArr"
            type="daterange"
            :options="dateOpt"
            :editable="false"
            placement="bottom-end"
            placeholder
            style="width: 200px"
          ></DatePicker>
        </div>

        <div class="item">
          <span>{{i18n_lang.lotteryOrder7}}</span>
          <Select v-model="query.state" style="width:100px">
            <Option value>{{i18n_lang.lotteryOrder8}}</Option>
            <Option value="complete">{{i18n_lang.lotteryOrder9}}</Option>
            <Option value="underway">{{i18n_lang.lotteryOrder10}}</Option>
            <Option value="cancel">{{i18n_lang.lotteryOrder11}}</Option>
          </Select>
        </div>
      </div>
      <div class="query_btns">
        <Button type="primary" icon="ios-search" @click="getData()">{{i18n_lang.lotteryOrder12}}</Button>
        <Button type="primary" icon="md-refresh" @click="reset">{{i18n_lang.lotteryOrder13}}</Button>
      </div>
    </Card>

    <!-- table -->
    <div style="marginTop:10px">
      <MyTable filter :columns="columns" :data="dataSource" border></MyTable>
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
    </div>

    <!-- modal -->
    <Modal v-model="visible" class="chasemodal" :title="i18n_lang.lotteryOrder14" :width="800" :styles="{top: '20px'}">
      <Spin v-if="loading.detail" size="large" fix></Spin>

      <div v-if="Object.keys(detailData).length" class="tab_box">
        <p class="title">
          <span>{{i18n_lang.lotteryOrder15}}</span>
        </p>
        <div class="content">
          <Row>
            <Col span="8">
            <div class="item">
              <p>{{i18n_lang.lotteryOrder16}}</p>
              <span>{{ detailData.lottery_name }}</span>
            </div>
            </Col>
            <Col span="8">
            <div class="item">
              <p>{{i18n_lang.lotteryOrder17}}</p>
              <span>{{ detailData.chase_msg.user_name }}</span>
            </div>
            </Col>
            <Col span="8">
            <div class="item">
              <p>{{i18n_lang.lotteryOrder18}}</p>
              <span>{{ floatMath(detailData.chase_msg.money,1) }}</span>
            </div>
            </Col>
            <Col span="8">
            <div class="item">
              <p>{{i18n_lang.lotteryOrder19}}</p>
              <span>{{ detailData.chase_msg.origin }}</span>
            </div>
            </Col>
            <Col span="8">
            <div class="item">
              <p>{{i18n_lang.lotteryOrder20}}</p>
              <span>{{ floatMath(detailData.chase_msg.money_reward,1) }}</span>
            </div>
            </Col>
            <Col span="8">
            <div class="item">
              <p>{{i18n_lang.lotteryOrder21}}</p>
              <span>{{ floatMath(detailData.chase_msg.money_lose,1) }}</span>
            </div>
            </Col>
          </Row>
          <Row>
            <Col>
            <div class="item">
              <p>{{i18n_lang.lotteryOrder22}}</p>
              <span>{{ detailData.chase_msg.chase_number }}</span>
            </div>
            </Col>
          </Row>
        </div>

        <p class="title">
          <span>{{i18n_lang.lotteryOrder23}}</span>
          <span class="title_des">
            <em style="color:red">{{i18n_lang.lotteryOrder24}}{{ floatMath(detailData.play_desc.total_money,1) }}</em>
          </span>
        </p>
        <div class="content">
          <Table :columns="detailPlayDescColumns" :data="detailData.play_desc.data" border></Table>
        </div>

        <p class="title">
          <span>{{i18n_lang.lotteryOrder25}}</span>
          <span class="title_des">
            {{ detailData.chase_desc.num }}
            <em
              style="color:red"
            >
              ({{ detailData.chase_desc.chase_desc }})
            </em>
          </span>
        </p>
        <div class="content">
          <Table :columns="detailChaseColumns" :data="detailData.chase_desc.data" border></Table>
        </div>
      </div>

      <div slot="footer">
        <Button v-if="detailData.status == 'underway'" type="error" @click="orderCancel()">{{i18n_lang.lotteryOrder26}}</Button>
        <Button @click="visible=false">{{i18n_lang.lotteryOrder27}}</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { chaseColumns, detailPlayDescColumns, detailChaseColumns } from './columns/ChaseOrder'
import MyTable from '_c/MyTable'
import lotteryDateOption from '@/libs/lotteryDateOption'
import { computeDay } from '@/libs/handleDate'
import { lotteryToTree } from '@/libs/lottery'
import { MathDiv } from '@/libs/formatMath'

const initQuery = {
  chase_number: '',
  user_name: '',
  lottery_id: '',
  state: '',
  timeArr: [computeDay(), computeDay()]
}

export default {
  components: {
    MyTable
  },
  data() {
    const i18n_lang = this.$t('lotteryOrder');
    return {
      i18n_lang: i18n_lang,
      columns: chaseColumns(this),
      detailPlayDescColumns: detailPlayDescColumns(this),
      detailChaseColumns: detailChaseColumns(this),
      loading: {
        page: 0,
        detail: false
      },
      visible: false,
      query: { ...initQuery },
      lotteryList: {},
      dateOpt: lotteryDateOption,
      dataSource: [], // data数据
      page: {
        pageSize: 20,
        total: 0,
        currentPage: 1,
        pageSizes: [20, 100, 1000, 2000]
      },
      detailData: {}, // 详情
      f: 1
    }
  },
  created() {
    this.init()
  },
  methods: {
    floatMath(a, b) {
      const res = MathDiv(a, b)
      return res
    },
    async init() {
      if (this.$route.query) {
        this.query.user_name = this.$route.query.username || ''
        this.f = this.$route.query.f ? Number(this.$route.query.f) : Number(this.f)
      }
      this.loading.page++
      const data = this.getData()
      const query = this.getLotteryList()
      Promise.all([data, query]).then(res => {
        this.loading.page--
      })
    },
    // 获取彩种列表
    async getLotteryList() {
      const res = await this.$axios.request({
        url: `/lottery/kinds/all`,
        method: 'GET'
      })
      if (res.status !== 200) {
        this.$Message.error(res.message)
      } else {
        this.lotteryList = Object.assign({}, lotteryToTree(res.data))
      }
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

      const req = {
        page: this.page.currentPage,
        page_size: this.page.pageSize,
        ...this.query
      }

      // 处理时间
      if (req.timeArr[0] !== '') {
        req.start_time = this.$dateFormat(new Date(req.timeArr[0]))
        req.end_time = this.$dateFormat(new Date(req.timeArr[1]))
      }
      delete req.timeArr

      const res = await this.$axios.request({
        url: '/lottery/play/chase',
        method: 'GET',
        params: req
      })
      this.loading.page--
      if (res.status !== 200) {
        this.$Message.error(res.message)
      } else {
        this.page.total = res.attributes ? res.attributes.total : 0
        this.dataSource = res.data
      }
    },
    reset() {
      this.query = Object.assign({}, initQuery)
      this.getData()
    },
    handleDetail(row) {
      this.getDetail(row)
      this.visible = true
    },
    async getDetail(row) {
      this.loading.detail = true
      this.detailData = Object.assign({})
      const res = await this.$axios.request({
        url: `/lottery/play/chase/info?chase_number=${row.chase_number}`,
        method: 'GET'
      })
      this.loading.detail = false
      if (res.status !== 200) {
        this.visible = false
        this.$Message.error(res.message)
      } else {
        this.detailData = Object.assign({}, res.data)
      }
    },
    // 手动停止
    async orderCancel(chase_number) {
      this.loading.detail = true
      if (chase_number) {
        this.loading.page++
      }
      const req = {
        chase_number: chase_number || this.detailData.chase_msg.chase_number
      }
      const res = await this.$axios.request({
        url: `/lottery/play/chase/stop`,
        method: 'PUT',
        data: req
      })
      this.loading.detail = false
      if (chase_number) {
        this.loading.page--
      }
      if (res.status !== 200) {
        this.$Message.error(res.message)
      } else {
        this.visible = false
        this.$Message.success(res.message)
        this.getData()
      }
    },
    // 查看用户详情
    handleUserDetail(row) {
      this.$store.dispatch('detail/info', {
        username: row.user_name,
        id: row.user_id
      })
    }
  }
}
</script>
<style lang="less">
.chasemodal {
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
</style>
