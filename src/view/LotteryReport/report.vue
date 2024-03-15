<template>
  <div id="LotteryReport">
    <Spin v-if="loading.page" fix></Spin>

    <Card dis-hover class="query_box">
      <div class="query_con">
        <div class="item">
          <span>{{i18n_lang.lotteryReport2}}</span>
          <DatePicker
            v-model="query.timeArr"
            type="daterange"
            :options="dateOpt"
            :editable="false"
            placement="left-start"
            placeholder
            style="width: 200px"
          ></DatePicker>
        </div>
      </div>
      <div class="query_btns">
        <Button type="primary" @click="getData">{{i18n_lang.lotteryReport3}}</Button>
        <Button type="primary" @click="reset">{{i18n_lang.lotteryReport4}}</Button>
      </div>
    </Card>

    <Table
      style="margin-top:10px"
      border
      :columns="columns"
      :data="dataSource"
      @on-sort-change="sortTable"
    ></Table>
    <div class="desc">
      <Spin v-if="loading.time" fix></Spin>
      {{i18n_lang.lotteryReport5}} {{ updatedTime }}
    </div>
  </div>
</template>
<script>
import columns from './columns'
import lotteryDateOption from '@/libs/lotteryDateOption'
import { computeDay } from '@/libs/handleDate.js'

const initQuery = {
  timeArr: [computeDay(), computeDay()],
  date_from: '',
  date_to: '',
  order_by: '',
  order_rule: ''
}

export default {
  data() {
    const i18n_lang = this.$t('lotteryReport');
    return {
      i18n_lang: i18n_lang,
      columns: columns(this),
      loading: {
        page: false,
        time: false
      },
      dateOpt: lotteryDateOption,
      query: { ...initQuery },
      dataSource: [],
      updatedTime: '',
      type: 'lottery'
    }
  },
  created() {
    this.reset()
  },
  methods: {
    // 排序
    sortTable(key, type) {
      console.log(key)
      this.query.order_by = key.column.key
      this.query.order_rule = key.order
      this.getData()
    },
    // 获取最近更新时间
    async getUpdatedTime() {
      this.updatedTime = ''
      this.loading.time = true
      const res = await this.$axios.request({
        url: `/report/updated?type=${this.type}`,
        method: 'GET'
      })
      this.loading.time = false
      if (res.status !== 200) {
        this.$Message.error(res.message)
      } else {
        this.updatedTime = res.data.updated
      }
    },
    async getData() {
      if (!this.query.timeArr[0]) return this.$Message.error(this.i18n_lang.lotteryReport6)
      this.loading.page = true
      this.dataSource = []
      const req = { ...this.query }
      // 处理时间
      if (req.timeArr[0] !== '') {
        req.date_from = this.$dateFormat(new Date(req.timeArr[0]))
        req.date_to = this.$dateFormat(new Date(req.timeArr[1]))
      }
      delete req.timeArr
      const res = await this.$axios.request({
        url: `/state/lottery`,
        method: 'GET',
        params: req
      })

      this.loading.page = false
      if (res.status !== 200) {
        this.$Message.error(res.message)
      } else {
        this.dataSource = res.data
      }
    },
    reset() {
      this.query = Object.assign({}, initQuery)
      this.getData()
      this.getUpdatedTime()
    }
  }
}
</script>
<style lang="less" scoped>
#LotteryReport {
  .desc {
    font-size: 14px;
    margin: 10px 0;
    color: #333;
    font-weight: bold;
  }
}
</style>
