<template>
  <div id="hallNotice">
    <Spin v-if="loading.page" size="large" fix></Spin>
    <Card dis-hover class="query_box">
      <div class="query_con">
        <span>{{i18n_lang.hallNotice0}}</span>
        <div class="item">
          <Select
            v-model="query.menu_id"
            style="width: 120px"
            :placeholder="i18n_lang.hallNotice1"
            @on-change="handleChangeMenu"
          >
            <Option v-for="(it, i) in type" :key="i" :value="it.id">{{ it.name }}</Option>
          </Select>
        </div>
        <div class="item">
          <Select v-model="query.game_id" style="width: 120px" :placeholder="i18n_lang.hallNotice1">
            <Option v-for="(it, i) in second" :key="i" :value="it.id">{{ it.name }}</Option>
          </Select>
        </div>
        <div class="item">
          <span>{{i18n_lang.hallNotice2}}</span>
          <DatePicker
            v-model="query.timeArr"
            type="daterange"
            format="yyyy-MM-dd"
            placement="bottom-start"
            placeholder
            style="width: 200px"
          ></DatePicker>
        </div>
        <Button type="primary" style="margin-right: 5px;" icon="ios-search" @click="getData()">{{i18n_lang.hallNotice3}}</Button>
      </div>
    </Card>

    <Table class="table" border :columns="columns" :data="dataSource"></Table>
    <Page
      class="page_box"
      show-sizer
      :current="page.currentPage"
      :page-size="page.pageSize"
      :page-size-opts="page.pageSizes"
      :total="page.total"
      @on-change="getData"
      @on-page-size-change="changePageSize"
    ></Page>
  </div>
</template>

<script>
import columns from './columns'
import { computeDay } from '@/libs/handleDate'
import { formatDateToString } from '@/libs/date'

const initQuery = {
  timeArr: [computeDay(-6), computeDay()],
  s_time: '',
  e_time: '',
  menu_id: '', // 一级菜单
  game_id: '' // 二级菜单
}

export default {
  name: 'HallNotice',
  data() {
    const i18n_lang = this.$t('hallNotice');
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
      query: { ...initQuery },
      columns: columns(this),
      dataSource: [],
      type: []
    }
  },
  computed: {
    second() {
      if (!this.query.menu_id) {
        return []
      }
      const s = this.type.find(o => o.id === this.query.menu_id)
      if (s && s.second) {
        return s.second
      }
      return []
    }
  },
  created() {
    this.getType()
    this.getData()
  },
  methods: {
    // 设置每页条数
    changePageSize(pageSize) {
      this.page.pageSize = pageSize
      this.getData()
    },
    async getType() {
      this.loading.page = true
      const res = await this.$axios.request({
        url: '/hallNotice/type',
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
      this.type = res.data
    },
    async getData(i = 1) {
      this.page.currentPage = i
      this.loading.page = true
      const req = {
        ...this.query,
        page: this.page.currentPage,
        page_size: this.page.pageSize
      }
      // 处理时间
      if (req.timeArr[0] !== '') {
        req.s_time = formatDateToString(new Date(req.timeArr[0]))
        req.e_time = formatDateToString(new Date(req.timeArr[1]))
      }
      delete req.timeArr

      const res = await this.$axios.request({
        url: '/hallNotice',
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
    handleChangeMenu() {
      this.query.game_id = ''
    },
    handleOpenModal(row) {
      this.$store.commit('common/setNotice', row)
    }
  }
}
</script>

<style lang="less" scope>
@import './index.less';
</style>
