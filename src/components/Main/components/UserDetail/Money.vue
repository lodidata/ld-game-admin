<template>
  <div id="MoneyDetail">
    <Spin v-if="loading.page" size="large" fix></Spin>
    <div class="query_con">
      <div class="item">
        <span>{{i18n_lang.components127}}</span>
        <Input v-model="query.order_number" placeholder style="width: 120px" />
      </div>
      <div class="item">
        <span>{{i18n_lang.components128}}</span>
        <Select v-model="query.deal_type" style="width:120px">
          <Option value>{{i18n_lang.components129}}</Option>
          <Option v-for="(it, i) in allType" :key="i" :value="it.id">{{ it.name }}</Option>
        </Select>
      </div>
      <div class="item">
        <span>{{i18n_lang.components130}}</span>
        <!-- <DatePicker
          v-model="query.timeArr"
          type="daterange"
          placement="bottom-end"
          placeholder
          style="width: 200px"
          clearable
          @on-change="selectTime"
        ></DatePicker> -->
        <DatePicker v-model="query.start_time" type="datetime" placeholder style="width: 180px" :options="dateOpt" :editable="false"></DatePicker>
        <span>-</span>
        <DatePicker v-model="query.end_time" type="datetime" placeholder style="width: 180px" :options="dateOpt" :editable="false"></DatePicker>
      </div>
      <div class="item">
        <Button type="primary" icon="ios-search" @click="getData()">{{i18n_lang.components126}}</Button>
      </div>
    </div>
    <Table style="margin-top:10px" border :columns="columns" :data="dataSource"></Table>
    <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{ `${i18n_lang.components288}${page.total}${i18n_lang.components289}` }}</div>
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
</template>
<script>
import columns from './columns/money'
import MyPage from '@/components/MyPage'
import { computeDay, getData } from '@/libs/handleDate'

const initQuery = {
  deal_type: '', // 交易类型
  order_number: '',
  username: '', // 用户名
  start_time: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 00:00:00`,//开始时间 `${getData(-30)} 00:00:00`
  end_time: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 23:59:59`, // 结束时间
  timeArr: [computeDay(), computeDay()]
}

export default {
  components: {
    MyPage
  },
  props: ['id', 'username'],
  data() {
    const i18n_lang = this.$t('components');
    return {
      i18n_lang: i18n_lang,
      columns: columns(this),
      loading: {
        page: false
      },
      timeArr: [initQuery.start_time, initQuery.end_time],
      query: { ...initQuery },
      dateOpt: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now() - 4320000000
        }
      },
      dataSource: [],
      page: {
        pageSize: 20,
        total: 0,
        currentPage: 1
      },
      // 所有交易类型
      allType: []
    }
  },
  created() {
    this.query.username = this.username
    this.getAllTypes()
    // console.log(123, getData(-30))
  },
  methods: {
    // 选择时间
    selectTime(val) {
      [this.query.start_time, this.query.end_time] = val
    },
    // 切换条数
    changePageSize(pageSize) {
      this.page.pageSize = pageSize
      this.getData()
    },
    async getData(i = 1) {
      console.log(i, 'i====')
      this.page.currentPage = i
      this.loading.page = true
      const req = {
        page: this.page.currentPage,
        page_size: this.page.pageSize,
        start_time: this.$dateTimeFormat(new Date(this.query.start_time)),
        end_time: this.$dateTimeFormat(new Date(this.query.end_time)),
        username: this.query.username,
        deal_type: this.query.deal_type,
        user_id: this.id
      }
      const res = await this.$axios.request({
        url: `/funds/flow`,
        method: 'GET',
        params: req
      })
      this.loading.page = false
      if (res.status !== 200 || res.state === 11050 || res.state === 11051) {
        this.$msg({
          type: 'error',
          method: 'GET'
        })
        return
      }
      this.page.total = res.attributes ? res.attributes.total : 0
      this.dataSource = res.data ? res.data : []
    },
    // 获取所有交易类型
    // 获取所有类型
    async getAllTypes() {
      this.loading.page = true
      const res = await this.$axios.request({
        url: '/funds/type',
        method: 'GET'
      })
      this.loading.page = false
      if (res.status !== 200 || res.state === 11050 || res.state === 11051) {
        return this.$msg({
          type: 'error',
          message: res.message
        })
      }
      res.data.map(x => {
        x.children.map(v => {
          // 全部类型
          this.allType.push(v)
        })
      })
      console.log('this.allType', this.allType)
    },
    reset() {
      this.query = { ...initQuery }
      this.getData()
    }
  }
}
</script>
<style lang="less" scoped>
#MoneyDetail {
  position: relative;
  min-height: 400px;
  .query_con {
    display: flex;
    .item {
      margin-right: 20px;
    }
  }
}
</style>
