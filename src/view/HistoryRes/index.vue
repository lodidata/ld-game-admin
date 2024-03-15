<template>
  <div id="historyRes">
    <Spin v-if="loading.page" size="large" fix></Spin>
    <Card dis-hover class="query_box mb30">
      <div class="dis-flex">
        <span>{{i18n_lang.historyRes0}}</span>
        <RadioGroup
          v-if="typeList"
          v-model="query.type_index"
          type="button"
          size="large"
          @on-change="lotteryTypeChange"
        >
          <Radio v-for="(it, i) in typeList" :key="i" :label="i">{{ it.name }}{{i18n_lang.historyRes1}}</Radio>
        </RadioGroup>
      </div>
      <div class="dis-flex mt10">
        <span>{{i18n_lang.historyRes2}}</span>
        <RadioGroup
          v-if="lottery && typeList[query.type_index]"
          v-model="query.lottery_index"
          type="button"
          size="large"
          @on-change="lotteryChange"
        >
          <Radio v-for="(it, i) in lottery[typeList[query.type_index].id]" :key="i" :label="i">
            <span>{{ it.name }}</span>
          </Radio>
        </RadioGroup>
      </div>
    </Card>

    <Table :columns="columns" :data="dataSource" border></Table>
    <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{ `${i18n_lang.historyRes21}${page.total}${i18n_lang.historyRes22}` }}</div>
    <Page
      class="page_box"
      show-sizer
      :current="page.currentPage"
      :page-size-opts="page.pageSizes"
      :page-size="page.pageSize"
      :total="page.total"
      @on-change="getData"
      @on-page-size-change="changePageSize"
    ></Page>
    <!-- 名次查询弹窗 -->
    <Modal
      v-model="visible.modal"
      :title="`${i18n_lang.historyRes13}`"
      :width="800"
      :styles="{ top: '66px' }"
      :footer-hide="true"
    >
      <Table :columns="ranking" :data="insertNumber"></Table>
    </Modal>
  </div>
</template>

<script>
import columns from './columns'
import ranking  from './ranking'
import { pidSortAndGroup } from './format.js'

export default {
  data() {
    const i18n_lang = this.$t('historyRes');
    return {
      i18n_lang: i18n_lang,
      loading: {
        page: false
      },
      page: {
        pageSize: 20,
        total: 0,
        currentPage: 1,
        pageSizes: [20, 100, 1000, 2000]
      },
      query: {
        lottery_index: 0,
        type_index: 0
      },
      dataSource: [],
      columns: columns(this),
      ranking: ranking(this),
      lottery: {},
      typeList: [],
      visible: {
        modal: false
      },
      insertNumber: []
    }
  },
  created() {
    this.init()
  },
  methods: {
    // 每页条数切换
    changePageSize(i) {
      this.page.pageSize = i
      this.getData()
    },
    // 初始化
    async init() {
      await this.getlottery()
      this.getData()
    },
    // 获取彩种
    async getlottery() {
      this.loading.page = true
      this.dataSource = []
      const res = await this.$axios.request({
        url: '/lotteryImg',
        method: 'GET'
      })
      this.loading.page = false
      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      const result = pidSortAndGroup(res.data)
      this.typeList = result.typeList
      this.lottery = result.group
    },
    // 当前彩种开奖历史
    async getData(i = 1) {
      this.page.currentPage = i
      const params = {
        lottery_id: this.lottery[this.typeList[this.query.type_index].id][this.query.lottery_index]
          .id,
        page: this.page.currentPage,
        page_size: this.page.pageSize
      }
      this.loading.page = true

      const res = await this.$axios.request({
        url: '/lottery/result',
        method: 'get',
        params
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
      this.dataSource = res.data ? res.data : []
    },
    // 切换彩种类型
    lotteryTypeChange() {
      this.query.lottery_index = 0
      this.lotteryChange()
    },
    // 切换彩种
    lotteryChange() {
      this.page.currentPage = 1
      this.getData()
    },
    //名次查询
    async handleInquire(row) {
      if(row.state !== "open") return
      const params = {
        lottery_id: this.lottery[this.typeList[this.query.type_index].id][this.query.lottery_index].id,
        lottery_number: row.lottery_number
      }
      const res = await this.$axios.request({
        url: '/lottery/insertNumber',
        method: 'GET',
        params
      })
      if (res.status !== 200 || res.state !== 0) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      this.insertNumber = res.data || []
      this.visible.modal = true
    }
  }
}
</script>
<style lang="less" scoped>
@import url('./index.less');
</style>
