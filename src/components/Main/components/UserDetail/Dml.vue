<template>
  <div id="Dml">
    <Spin v-if="loading.page" size="large" fix></Spin>
    <div class="query_con">
      <div class="item">
        <span>{{i18n_lang.components53}}</span>
        <!-- <DatePicker
          v-model="query.timeArr"
          type="daterange"
          placement="bottom-start"
          placeholder
          style="width: 200px"
          clearable
          @on-change="selectTime"
        ></DatePicker> -->
        <DatePicker v-model="query.date_start" type="datetime" placeholder style="width: 180px" :options="dateOpt" :editable="false"></DatePicker>
        <span>-</span>
        <DatePicker v-model="query.date_end" type="datetime" placeholder style="width: 180px" :options="dateOpt" :editable="false"></DatePicker>
      </div>
      <div class="item">
        <Button type="primary" icon="ios-search" @click="getData()">{{i18n_lang.components54}}</Button>
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
import columns from './columns/dml'
import MyPage from '@/components/MyPage'
import { computeDay } from '@/libs/handleDate'
import { MathDiv } from '@/libs/formatMath'

const initQuery = {
  date_start: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 00:00:00`, // 开始时间
  date_end: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 23:59:59`, // 结束时间
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
      timeArr: [initQuery.date_start, initQuery.date_end],
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
      }
    }
  },
  methods: {
    // 选择时间
    selectTime(val) {
      [this.query.date_start, this.query.date_end] = val
    },
    // 切换条数
    changePageSize(pageSize) {
      this.page.pageSize = pageSize
      this.getData()
    },
    async getData(i = 1) {
      this.page.currentPage = i
      this.loading.page = true
      const req = {
        page: this.page.currentPage,
        page_size: this.page.pageSize,
        date_start: this.query.date_start ? this.$dateTimeFormat(new Date(this.query.date_start)) : '',
        date_end: this.query.date_end ? this.$dateTimeFormat(new Date(this.query.date_end)) : ''
      }
      const res = await this.$axios.request({
        url: `/user/info/dml/${this.id}`,
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

      const { dml_logs, game_menu } = res.data
      // 构建新的表头
      const dynamicMenu = game_menu.map(o => {
        return {
          title: o.name,
          align: 'center',
          key: o.type,
          minWidth: 100,
          render(h, { row }) {
            return <span>{row[o.type] || '--'}</span>
          }
        }
      })
      this.columns = columns(this).concat(dynamicMenu)

      // 遍历每行数据 logs 里的值，构成 key - value 对
      dml_logs.forEach(o => {
        o.logs.forEach(l => {
          o[l.game_type] = MathDiv(l.dml, 1)
        })
      })
      this.dataSource = dml_logs
    },
    reset() {
      this.query = { ...initQuery }
      this.getData()
    }
  }
}
</script>
<style lang="less" scoped>
#Dml {
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
