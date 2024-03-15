<template>
  <div id="Order">
    <Spin v-if="loading.page" size="large" fix></Spin>
    <div class="outer-box">
      <div class="nav">
        <!-- 一级导航 -->
        <div
          v-for="(item, i) in menu"
          :key="i"
          :class="['label', curTab === item.type && 'active']"
          @click="changeCurTab(item)"
        >
          <span>{{ item.name }}</span>
        </div>
      </div>
      <!-- 一级面板 -->
      <div class="pane">
        <div v-if="pane.childs && pane.childs.length" class="inner-box">
          <div class="nav">
            <div
              v-for="(tt, j) in pane.childs"
              :key="j"
              :class="['label', curChildTab === tt.type && 'active']"
              @click="changeCurChildTab(tt)"
            >
              <span>{{ tt.name }}</span>
            </div>
          </div>
          <div class="query_con">
            <div class="item">
              <span>{{i18n_lang.components131}}</span>
              <Input v-model="query.order_number" placeholder style="width: 150px"/>
            </div>
            <div class="item">
              <span>{{i18n_lang.components132}}</span>
              <!-- <DatePicker
                v-model="query.timeArr"
                type="daterange"
                placement="bottom-end"
                placeholder
                style="width: 200px"
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
          <Table style="margin: 0 10px;" border :columns="columns" :data="dataSource"></Table>
        </div>
        <div v-else>
          <div class="query_con">
            <div class="item">
              <span>{{i18n_lang.components131}}</span>
              <Input v-model="query.order_number" placeholder style="width: 150px"/>
            </div>
            <div class="item">
              <span>{{i18n_lang.components132}}</span>
              <!-- <DatePicker
                v-model="query.timeArr"
                type="daterange"
                placement="bottom-end"
                placeholder
                style="width: 200px"
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
          <Table style="margin: 0 10px;" border :columns="columns" :data="dataSource"></Table>
          <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{ `${i18n_lang.components288}${page.total}${i18n_lang.components289}` }}</div>
        </div>
      </div>
      <Page
        class="page_box"
        placement="top"
        :current="page.currentPage"
        :page-size="page.pageSize"
        :total="page.total"
        show-sizer
        @on-change="getData"
        @on-page-size-change="changePageSize"
      ></Page>

      <!-- 订单详情 -->
      <Modal v-model="visible.qipai" :title="i18n_lang.components133" @on-visible-change="handleCloseModal">
        <Spin v-if="loading.modal" size="large" fix></Spin>
        <div v-for="(item, i) in orderInfo" :key="i" class="order-info">
          <span class="item-key" v-html="renderKey(item.key)"></span>
          <span v-if="item.value">{{ item.value }}</span>
          <div v-else>
            <img v-for="(li, j) in item.list" :key="j" :src="li.img" alt>
          </div>
        </div>
        <div slot="footer">
          <Button type="primary" @click="visible.qipai = false">{{i18n_lang.components134}}</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>
<script>
import columns from './columns/order'
import { computeDay } from '@/libs/handleDate'

// 不同游戏接口不一样
const API = {
  THIRD: '/order/third',
  LOTTERY: '/lottery/play/records'
}

const initQuery = {
  hall_level: 'all', // 模式
  state: 'all', // 注单状态
  order_number: '',
  timeArr: [computeDay(), computeDay()],
  start_time: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 00:00:00`,
  end_time: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 23:59:59`
}
export default {
  props: ['id', 'username'],
  data() {
    const i18n_lang = this.$t('components');
    return {
      i18n_lang: i18n_lang,
      loading: {
        page: false,
        modal: false
      },
      visible: {
        qipai: false
      },
      query: { ...initQuery },
      dateOpt: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now() - 4320000000
        }
      },
      page: {
        pageSize: 20,
        total: 0,
        currentPage: 1
      },
      dataSource: [],
      columns: [],
      menu: [],
      curTab: '', // 一级菜单
      curChildTab: '', // 二级菜单
      orderInfo: []
    }
  },
  computed: {
    // 获取一级面板
    pane() {
      return this.menu.find(o => o.type === this.curTab) || {}
    }
  },
  created() {
    this.getMenu()
  },
  methods: {
    // 选择日期
    selectTime(val) {
      [this.query.start_time, this.query.end_time] = val
    },
    // 获取注单
    async getMenu() {
      this.loading.page = true
      const res = await this.$axios.request({
        url: '/game/menu',
        method: 'GET'
      })
      this.loading.page = false
      if (res.status !== 200 || res.state === 11050 || res.state === 11051) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      const lottery = { type: 'LOTTERY', name: '彩票', childs: [] }
      this.menu = [lottery, ...res.data]
      this.changeCurTab(lottery)
    },
    // 获取注单列表
    async getData(i = 1) {
      // 彩票注单写死不需要二级
      if (this.curTab !== 'LOTTERY' && !this.curChildTab) return
      this.page.currentPage = i
      this.loading.page = true
      // 只有彩票注单是一级菜单
      const type_name = this.curChildTab || this.curTab
      const req = {
        page: this.page.currentPage,
        page_size: this.page.pageSize,
        type_name,
        user_name: this.username,
        ...this.query
      }
      if(req.start_time && req.end_time){
        req.start_time = this.$dateTimeFormat(new Date(req.start_time))
        req.end_time = this.$dateTimeFormat(new Date(req.end_time))
      }
      delete req.timeArr
      const res = await this.$axios.request({
        url: API[type_name] || API['THIRD'],
        method: 'GET',
        params: req
      })
      this.loading.page = false
      if (res.status !== 200 || res.state === 11050 || res.state === 11051) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      this.page.total = res.attributes ? res.attributes.total : 0
      this.dataSource = res.data
    },
    // 切换一级选项卡
    changeCurTab(item) {
      if (this.curTab === item.type) return
      this.dataSource = []
      this.curTab = item.type
      if (this.curTab === 'LOTTERY') {
        this.columns = columns(this)['LOTTERY']
        this.curChildTab = ''
      } else if (item.childs.length) {
        this.curChildTab = item.childs[0].type
        this.columns = columns(this)[this.curChildTab] || columns(this)['DEFAULTTABLE']
      } else {
        this.curChildTab = ''
        this.columns = []
      }
      this.getData()
    },
    // 切换二级选项卡
    changeCurChildTab(item) {
      if (this.curChildTab === item.type) return
      this.curChildTab = item.type
      this.columns = columns(this)[this.curChildTab] || columns(this)['DEFAULTTABLE']
      this.getData()
    },
    // 注单详情
    async getOrderInfo(row) {
      this.visible.qipai = true
      this.loading.modal = true
      const res = await this.$axios.request({
        url: '/order/third/info',
        method: 'GET',
        params: {
          type_name: this.curChildTab,
          order_number: row.order_number
        }
      })
      this.loading.modal = false
      if (res.status !== 200 || res.state === 11050 || res.state === 11051) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      this.orderInfo = res.data.detail
    },
    // 关闭弹窗
    handleCloseModal(visible) {
      if (!visible) {
        this.orderInfo = []
      }
    },
    // 处理key #号标红
    renderKey(str) {
      str = str.replace(/#([^#]*)#/g, '<span style="color: red;">$1</span>')
      str = str.replace(/#/g, '')
      return str
    },
    // 设置每页条数
    changePageSize(pageSize) {
      this.page.pageSize = pageSize
      this.getData()
    },
    // 彩票撤单
    async orderCancel(row) {
      this.loading.page = true
      const res = await this.$axios.request({
        url: `/lottery/play/records/stop/${row.id}`,
        method: 'PATCH',
        data: {
          state: 'canceled'
        }
      })
      this.loading.page = false
      this.$msg({
        type: res.status !== 200 || res.state === 11050 || res.state === 11051 ? 'error' : 'success',
        message: res.message
      })
      if (res.status !== 200 || res.state === 11050 || res.state === 11051) return
      this.getData()
    }
  }
}
</script>
<style lang="less" scoped>
#Order {
  position: relative;
  max-height: 800px;
  .outer-box {
    overflow-y: scroll;
    height: 500px;
    padding-bottom: 10px;
    border: 1px solid #dee;
    border-radius: 3px;
    min-height: 625px;
  }
  .inner-box {
    margin: 10px auto;
    width: 98%;
    min-height: 490px;
    border: 1px solid #dee;
    border-radius: 3px;
  }
  .nav {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    background: #eef1f6;
    border-bottom: none;

    .label {
      width: 70px;
      text-align: center;
      &.active {
        background: #fff;
      }
    }
  }
  .query_con {
    display: flex;
    padding: 10px 16px;
    .item {
      margin-right: 60px;
    }
  }
}
</style>
