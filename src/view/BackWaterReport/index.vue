<template>
  <div id="AdList" class="card">
    <Spin v-if="loading.page" size="large" fix></Spin>
    <Card dis-hover class="query_box">
      <div class="query_con">
        <div class="item">
          <span>{{i18n_lang.backWaterReport0}}</span>
          <Select v-model="query.game_id" style="width:100px" clearable>
            <Option value>{{i18n_lang.backWaterReport1}}</Option>
            <Option v-for="item in games" :key="item.id" :value="item.id">{{ item.name }}</Option>
          </Select>
        </div>
        <div class="item">
          <span>{{i18n_lang.backWaterReport2}}</span>
          <DatePicker
            v-model="query.timeArr"
            type="daterange"
            :options="dateOpt"
            :editable="false"
            placement="bottom-start"
            placeholder
            style="width: 200px"
          ></DatePicker>
        </div>
      </div>
      <div class="query_btns">
        <Button type="primary" icon="ios-search" @click="getData()">{{i18n_lang.backWaterReport3}}</Button>
        <Button type="primary" icon="md-refresh" @click="reset">{{i18n_lang.backWaterReport4}}</Button>
      </div>
    </Card>
    <Table style="margin-top:20px" :columns="columns" :data="dataSource" border></Table>

    <!-- 编辑/新增 -->
    <Modal
      v-model="visible.modal"
      :title="`${game.game_name}${i18n_lang.backWaterReport5}`"
      :width="700"
      :styles="{ top: '20px' }"
      footer-hide
    >
      <Spin v-if="loading.modal" size="large" fix></Spin>
      <Table style="margin-top:20px" :columns="detailColumns" :data="detail" border></Table>
    </Modal>
  </div>
</template>
<script>
import columns from './columns'
import detailColumns from './detailColumns'
import { computeDay } from '@/libs/handleDate'
import lotteryDateOption from '@/libs/lotteryDateOption'

const initQuery = {
  game_id: '', // 游戏id
  timeArr: [computeDay(), computeDay()], // 时间
  start_time: '', // 开始时间
  end_time: '' // 结束时间
}

export default {
  data() {
    const i18n_lang = this.$t('backWaterReport');
    return {
      i18n_lang: i18n_lang,
      loading: {
        page: false,
        modal: false
      },
      visible: {
        modal: false
      },
      query: {
        ...initQuery
      },
      dateOpt: lotteryDateOption,
      columns: columns(this),
      detailColumns: detailColumns(this),
      dataSource: [],
      games: [],
      detail: [],
      game: {} // 当前查询的游戏
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      this.getGames()
      this.getData()
    },
    // 获取所有游戏
    async getGames() {
      this.loading.page = true
      const res = await this.$axios.request({
        url: '/filter/game',
        method: 'GET',
        params: {
          type: 'child'
        }
      })
      this.loading.page = false
      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      // 处理彩票分类，id 置为 0
      // 传统模式、房间模式 pid
      const games = res.data.filter(o => o.pid !== 23)
      games.unshift({
        id: 26,
        name: this.i18n_lang.backWaterReport6
      })
      this.games = games
    },
    // 获取数据
    async getData() {
      const req = {
        ...this.query
      }
      if (req.timeArr[0] === '' || req.timeArr[1] === '') {
        return this.$msg({
          type: 'error',
          message: this.i18n_lang.backWaterReport7
        })
      }

      // 处理时间
      req.start_time = this.$dateFormat(req.timeArr[0])
      req.end_time = this.$dateFormat(req.timeArr[1])
      delete req.timeArr
      this.loading.page = true

      const res = await this.$axios.request({
        url: '/report/rebet',
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
      this.dataSource = res.data
    },
    reset() {
      this.query = { ...initQuery }
      this.getData()
    },
    // 获取回水详情
    async getDetail(id) {
      const req = {
        ...this.query,
        plat_id: id
      }
      if (req.timeArr[0] === '' || req.timeArr[1] === '') {
        return this.$msg({
          type: 'error',
          message: this.i18n_lang.backWaterReport7
        })
      }
      this.visible.modal = true
      // 处理时间
      req.count_date_start = this.$dateFormat(req.timeArr[0])
      req.count_date_end = this.$dateFormat(req.timeArr[1])
      delete req.timeArr
      this.loading.modal = true

      const res = await this.$axios.request({
        url: '/lottery/hall/rebateMoney',
        method: 'GET',
        params: req
      })
      this.detail = res.data
      this.loading.modal = false
    },
    // 打开详情
    handleOpenModal(row) {
      this.detail = []
      const id = row.game_id === 26 ? 0 : row.game_id
      this.game = row
      this.getDetail(id)
    }
  }
}
</script>
<style lang="less" scoped>
@import url('./index.less');
</style>
